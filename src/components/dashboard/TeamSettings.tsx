import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, Building2, Check, Link2, Mail, MoreVertical, UserPlus, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { ButtonSpinner, LoadingSpinner } from "../LoadingSpinner";
import { ApiError } from "../../lib/api";
import { usePermissions } from "../../hooks/useMe";
import { useProfile } from "../../hooks/useProfile";
import {
  useCancelInvitation,
  useInvitations,
  useInvite,
  useResendInvitation,
  useTeam,
  useUpdateMember,
  type StaffStatus,
  type TeamInvitation,
  type TeamMember,
} from "../../hooks/useTeam";
import type { StaffRole } from "../../types/auth";

const DASHBOARD_ROLES: StaffRole[] = ["owner", "admin", "finance", "developer", "viewer"];
/** Rôles que seul un propriétaire donne ou retire. */
const OWNER_GRANTED: StaffRole[] = ["owner", "admin"];
const INSTITUTION_ROLES: StaffRole[] = ["branch_manager", "credit_officer"];

const KNOWN_ERRORS = new Set([
  "E_OWNER_ONLY",
  "E_SELF_CHANGE",
  "E_ALREADY_STAFF",
  "E_SESSION_OPEN",
  "E_STAFF_TERMINATED",
  "E_ROLE_FORBIDDEN",
  "E_INVITATION_CLOSED",
]);

function teamError(error: unknown, t: TFunction): string {
  if (error instanceof ApiError) {
    if (error.code && KNOWN_ERRORS.has(error.code)) return t(`dashboard.team.errors.${error.code}`);
    if (error.status === 422) return t("dashboard.team.errors.invalidEmail");
    return error.message;
  }
  return t("dashboard.team.errors.generic");
}

function initialsOf(name: string | null | undefined, fallback: string): string {
  const source = (name || fallback).trim();
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

function daysLeft(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
}

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                 */
/* -------------------------------------------------------------------------- */

function Avatar({ children, muted = false }: { children: ReactNode; muted?: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
        muted ? "bg-[#f1f3f4] text-[#5f6368]" : "bg-accent/10 text-accent"
      }`}
    >
      {children}
    </span>
  );
}

/** Petit menu d'actions attaché à un bouton « ⋮ ». Se ferme au clic extérieur et sur Échap. */
function RowMenu({ label, children }: { label: string; children: (close: () => void) => ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[#444746] transition-colors hover:bg-[#1f1f1f]/[0.08]"
      >
        <MoreVertical size={18} aria-hidden />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute end-0 top-full z-30 mt-1 w-60 overflow-hidden rounded-xl border border-[#dadce0] bg-white py-1.5 shadow-pop"
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

function MenuItem({
  onClick,
  checked,
  danger = false,
  disabled = false,
  children,
}: {
  onClick: () => void;
  checked?: boolean;
  danger?: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role={checked === undefined ? "menuitem" : "menuitemradio"}
      aria-checked={checked}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-10 w-full items-center gap-3 px-4 text-start text-sm transition-colors hover:bg-[#1f1f1f]/[0.05] disabled:opacity-50 ${
        danger ? "text-[#b3261e]" : "text-[#1f1f1f]"
      }`}
    >
      {checked !== undefined && (
        <Check size={16} aria-hidden className={checked ? "text-accent" : "invisible"} />
      )}
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Équipe                                                                     */
/* -------------------------------------------------------------------------- */

export function TeamSettings({ onToast }: { onToast: (message: string) => void }) {
  const { t } = useTranslation();
  const { me, can, isOwner, isOwnerLogin } = usePermissions();
  const location = useLocation();
  const profile = useProfile();
  const team = useTeam();
  const invitations = useInvitations();
  const update = useUpdateMember();
  const resend = useResendInvitation();
  const cancel = useCancelInvitation();
  // Le sélecteur de compte peut mener ici pour lier le compte personnel du propriétaire.
  const linkSelf = (location.state as { linkSelf?: boolean } | null)?.linkSelf === true;
  const [inviting, setInviting] = useState<false | StaffRole | true>(linkSelf ? "owner" : false);
  const [rowError, setRowError] = useState<{ id: number; message: string } | null>(null);

  const manage = can("team.manage");
  const isInstitution = !!me && me.business.kind !== "merchant";
  const roles: StaffRole[] = [...DASHBOARD_ROLES, ...(isInstitution ? INSTITUTION_ROLES : [])];
  // Seul un propriétaire nomme un propriétaire ou un administrateur.
  const assignable = roles.filter((r) => !OWNER_GRANTED.includes(r) || isOwner);

  // Les membres retirés n'ont plus rien à faire dans la liste.
  const members = (team.data ?? []).filter((m) => m.status !== "terminated");
  const pending = invitations.data ?? [];

  const editable = (m: TeamMember) =>
    manage && m.id !== me?.member?.id && (isOwner || !OWNER_GRANTED.includes(m.role));

  const change = (m: TeamMember, changes: { role?: StaffRole; status?: StaffStatus }, done: string) => {
    setRowError(null);
    update.mutate(
      { id: m.id, ...changes },
      {
        onSuccess: () => onToast(done),
        onError: (error) => setRowError({ id: m.id, message: teamError(error, t) }),
      },
    );
  };

  const nameOf = (m: TeamMember) => m.user?.full_name || m.user?.email || t("dashboard.team.unnamed");

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-[#dadce0] bg-white">
        <header className="flex flex-wrap items-start justify-between gap-4 px-6 pb-4 pt-6">
          <div className="min-w-0 max-w-md">
            <h2 className="text-[22px] leading-7 text-[#1f1f1f]">{t("dashboard.team.title")}</h2>
            <p className="mt-1 text-sm text-[#444746]">{t("dashboard.team.subtitle")}</p>
          </div>
          {manage && !inviting && (
            <button
              type="button"
              onClick={() => setInviting(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              <UserPlus size={18} aria-hidden />
              {t("dashboard.team.invite")}
            </button>
          )}
        </header>

        {isOwnerLogin && !inviting && manage && (
          <div className="mx-6 mb-5 flex flex-wrap items-center gap-4 rounded-xl bg-[#f8fafd] px-4 py-3.5">
            <Link2 size={18} aria-hidden className="shrink-0 text-accent" />
            <p className="min-w-0 flex-1 basis-56 text-sm text-[#444746]">
              <span className="font-medium text-[#1f1f1f]">{t("dashboard.team.linkTitle")}</span>{" "}
              {t("dashboard.team.linkDesc")}
            </p>
            <button
              type="button"
              onClick={() => setInviting("owner")}
              className="h-9 shrink-0 rounded-full px-4 text-sm font-medium text-accent transition-colors hover:bg-accent/[0.08]"
            >
              {t("dashboard.team.linkAction")}
            </button>
          </div>
        )}

        {inviting && (
          <InviteForm
            roles={assignable}
            initialRole={typeof inviting === "string" ? inviting : undefined}
            onClose={() => setInviting(false)}
            onSent={(email) => {
              setInviting(false);
              onToast(t("dashboard.team.invitationSent", { email }));
            }}
          />
        )}

        {team.isLoading ? (
          <LoadingSpinner label={t("dashboard.team.loading")} />
        ) : team.isError ? (
          <p className="flex items-center gap-2 border-t border-[#dadce0] px-6 py-5 text-sm text-[#b3261e]">
            <AlertCircle size={16} aria-hidden /> {t("dashboard.team.loadError")}
          </p>
        ) : (
          <ul>
            {/* Le compte principal de l'entreprise, toujours en tête. */}
            {profile.data && (
              <li className="flex items-center gap-4 border-t border-[#dadce0] px-6 py-3.5">
                <Avatar muted>
                  <Building2 size={18} />
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] text-[#1f1f1f]">
                    {profile.data.name}
                    {isOwner && <span className="ms-1.5 text-[#5f6368]">{t("dashboard.team.you")}</span>}
                  </p>
                  <p className="truncate text-sm text-[#5f6368]">{profile.data.email}</p>
                </div>
                <span className="text-sm text-[#444746]">{t("dashboard.team.mainAccount")}</span>
                {manage && <span className="w-10" aria-hidden />}
              </li>
            )}

            {members.map((m) => {
              const isSelf = m.id === me?.member?.id;
              const pendingRow = update.isPending && update.variables?.id === m.id;
              return (
                <li key={m.id} className="border-t border-[#dadce0] px-6 py-3.5">
                  <div className="flex items-center gap-4">
                    <Avatar muted={m.status !== "active"}>
                      {initialsOf(m.user?.full_name, m.user?.email ?? "?")}
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] text-[#1f1f1f]">
                        {nameOf(m)}
                        {isSelf && <span className="ms-1.5 text-[#5f6368]">{t("dashboard.team.you")}</span>}
                      </p>
                      <p className="truncate text-sm text-[#5f6368]">
                        {m.user?.email}
                        {m.status === "suspended" && (
                          <span className="ms-2 rounded-full bg-[#fef7e0] px-2 py-0.5 text-xs font-medium text-[#b06000]">
                            {t("dashboard.team.status.suspended")}
                          </span>
                        )}
                      </p>
                    </div>
                    {pendingRow ? (
                      <ButtonSpinner label={t("dashboard.team.saving")} size={16} />
                    ) : (
                      <span className="hidden text-sm text-[#444746] sm:inline">
                        {t(`dashboard.team.roles.${m.role}`)}
                      </span>
                    )}
                    {manage &&
                      (editable(m) ? (
                        <RowMenu label={t("dashboard.team.actionsFor", { name: nameOf(m) })}>
                          {(close) => (
                            <>
                              <p className="px-4 pb-1 pt-1.5 text-xs font-medium text-[#5f6368]">
                                {t("dashboard.team.roleLabel")}
                              </p>
                              {assignable.map((role) => (
                                <MenuItem
                                  key={role}
                                  checked={m.role === role}
                                  disabled={update.isPending}
                                  onClick={() => {
                                    close();
                                    if (role !== m.role)
                                      change(m, { role }, t("dashboard.team.roleChanged", { name: nameOf(m) }));
                                  }}
                                >
                                  {t(`dashboard.team.roles.${role}`)}
                                </MenuItem>
                              ))}
                              <div className="my-1.5 border-t border-[#dadce0]" />
                              {m.status === "active" ? (
                                <MenuItem
                                  onClick={() => {
                                    close();
                                    change(m, { status: "suspended" }, t("dashboard.team.suspended", { name: nameOf(m) }));
                                  }}
                                >
                                  {t("dashboard.team.suspend")}
                                </MenuItem>
                              ) : (
                                <MenuItem
                                  onClick={() => {
                                    close();
                                    change(m, { status: "active" }, t("dashboard.team.reactivated", { name: nameOf(m) }));
                                  }}
                                >
                                  {t("dashboard.team.reactivate")}
                                </MenuItem>
                              )}
                              <MenuItem
                                danger
                                onClick={() => {
                                  close();
                                  if (window.confirm(t("dashboard.team.confirmRemove", { name: nameOf(m) })))
                                    change(m, { status: "terminated" }, t("dashboard.team.removed", { name: nameOf(m) }));
                                }}
                              >
                                {t("dashboard.team.remove")}
                              </MenuItem>
                            </>
                          )}
                        </RowMenu>
                      ) : (
                        <span className="w-10" aria-hidden />
                      ))}
                  </div>
                  {rowError?.id === m.id && (
                    <p role="alert" className="mt-2 flex items-center gap-1.5 ps-14 text-sm text-[#b3261e]">
                      <AlertCircle size={15} aria-hidden /> {rowError.message}
                    </p>
                  )}
                </li>
              );
            })}

            {members.length === 0 && (
              <li className="border-t border-[#dadce0] px-6 py-5 text-sm text-[#5f6368]">
                {manage ? t("dashboard.team.emptyManage") : t("dashboard.team.empty")}
              </li>
            )}
          </ul>
        )}
      </section>

      {pending.length > 0 && (
        <section className="overflow-hidden rounded-2xl border border-[#dadce0] bg-white">
          <header className="px-6 pb-2 pt-6">
            <h2 className="text-[22px] leading-7 text-[#1f1f1f]">{t("dashboard.team.pendingTitle")}</h2>
            <p className="mt-1 text-sm text-[#444746]">{t("dashboard.team.pendingDesc")}</p>
          </header>
          <ul className="mt-2">
            {pending.map((inv) => (
              <InvitationRow
                key={inv.id}
                invitation={inv}
                manage={manage}
                busy={
                  (resend.isPending && resend.variables === inv.id) ||
                  (cancel.isPending && cancel.variables === inv.id)
                }
                onResend={() =>
                  resend.mutate(inv.id, {
                    onSuccess: () => onToast(t("dashboard.team.invitationResent", { email: inv.email })),
                    onError: (e) => onToast(teamError(e, t)),
                  })
                }
                onCancel={() =>
                  cancel.mutate(inv.id, {
                    onSuccess: () => onToast(t("dashboard.team.invitationCancelled")),
                    onError: (e) => onToast(teamError(e, t)),
                  })
                }
              />
            ))}
          </ul>
        </section>
      )}

      <RoleGuide roles={roles} />
    </div>
  );
}

function InvitationRow({
  invitation,
  manage,
  busy,
  onResend,
  onCancel,
}: {
  invitation: TeamInvitation;
  manage: boolean;
  busy: boolean;
  onResend: () => void;
  onCancel: () => void;
}) {
  const { t } = useTranslation();
  const expired = invitation.status === "expired";
  const days = daysLeft(invitation.expires_at);
  return (
    <li className="flex items-center gap-4 border-t border-[#dadce0] px-6 py-3.5">
      <Avatar muted>
        <Mail size={18} />
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] text-[#1f1f1f]">{invitation.email}</p>
        <p className="truncate text-sm text-[#5f6368]">
          {t(`dashboard.team.roles.${invitation.role}`)} ·{" "}
          {expired ? (
            <span className="text-[#b06000]">{t("dashboard.team.expired")}</span>
          ) : (
            t("dashboard.team.expiresIn", { count: Math.max(days, 1) })
          )}
        </p>
      </div>
      {manage &&
        (busy ? (
          <ButtonSpinner label={t("dashboard.team.saving")} size={16} />
        ) : (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onResend}
              className="h-9 rounded-full px-3 text-sm font-medium text-accent transition-colors hover:bg-accent/[0.08]"
            >
              {t("dashboard.team.resend")}
            </button>
            <button
              type="button"
              onClick={onCancel}
              aria-label={t("dashboard.team.cancelInvitation", { email: invitation.email })}
              title={t("dashboard.team.cancelInvitation", { email: invitation.email })}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#444746] transition-colors hover:bg-[#1f1f1f]/[0.08]"
            >
              <X size={18} aria-hidden />
            </button>
          </div>
        ))}
    </li>
  );
}

function InviteForm({
  roles,
  initialRole,
  onClose,
  onSent,
}: {
  roles: StaffRole[];
  initialRole?: StaffRole;
  onClose: () => void;
  onSent: (email: string) => void;
}) {
  const { t } = useTranslation();
  const invite = useInvite();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<StaffRole>(
    initialRole && roles.includes(initialRole) ? initialRole : roles.includes("viewer") ? "viewer" : roles[0]!,
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const address = email.trim();
    invite.mutate({ email: address, role }, { onSuccess: () => onSent(address) });
  };

  return (
    <form onSubmit={submit} className="border-t border-[#dadce0] bg-[#f8fafd] px-6 py-6">
      <div className="relative">
        <input
          id="invite-email"
          type="email"
          required
          autoFocus
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="nom@entreprise.com"
          className="peer h-14 w-full rounded-md border border-[#747775] bg-white px-4 text-[15px] text-[#1f1f1f] outline-none transition-colors placeholder:text-[#747775] hover:border-[#1f1f1f] focus:border-2 focus:border-accent focus:px-[15px]"
        />
        <label
          htmlFor="invite-email"
          className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-xs text-[#444746] peer-focus:text-accent"
        >
          {t("dashboard.team.emailLabel")}
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-[#1f1f1f]">{t("dashboard.team.roleLabel")}</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {roles.map((r) => {
            const selected = role === r;
            return (
              <label
                key={r}
                className={`flex cursor-pointer gap-3 rounded-xl border bg-white p-3.5 transition-colors ${
                  selected ? "border-accent ring-1 ring-accent" : "border-[#dadce0] hover:border-[#747775]"
                }`}
              >
                <input
                  type="radio"
                  name="invite-role"
                  value={r}
                  checked={selected}
                  onChange={() => setRole(r)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-accent"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-[#1f1f1f]">
                    {t(`dashboard.team.roles.${r}`)}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-[#5f6368]">
                    {t(`dashboard.team.roleDesc.${r}`)}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {invite.isError && (
        <p role="alert" className="mt-4 flex items-center gap-2 text-sm text-[#b3261e]">
          <AlertCircle size={16} aria-hidden className="shrink-0" />
          {teamError(invite.error, t)}
        </p>
      )}

      <p className="mt-5 text-xs text-[#5f6368]">{t("dashboard.team.inviteHelp")}</p>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 items-center rounded-full px-5 text-sm font-medium text-accent transition-colors hover:bg-accent/[0.08]"
        >
          {t("dashboard.team.cancel")}
        </button>
        <button
          type="submit"
          disabled={invite.isPending}
          aria-busy={invite.isPending || undefined}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
        >
          {invite.isPending ? (
            <ButtonSpinner label={t("dashboard.team.sending")} size={16} />
          ) : (
            t("dashboard.team.sendInvite")
          )}
        </button>
      </div>
    </form>
  );
}

/** Ce que chaque rôle permet, replié par défaut : utile une fois, encombrant ensuite. */
function RoleGuide({ roles }: { roles: StaffRole[] }) {
  const { t } = useTranslation();
  return (
    <details className="group rounded-2xl border border-[#dadce0] bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-[15px] text-[#1f1f1f] [&::-webkit-details-marker]:hidden">
        {t("dashboard.team.legendTitle")}
        <span aria-hidden className="text-[#5f6368] transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <dl className="grid gap-x-8 gap-y-4 border-t border-[#dadce0] px-6 py-5 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-[#1f1f1f]">{t("dashboard.team.mainAccount")}</dt>
          <dd className="mt-0.5 text-[#5f6368]">{t("dashboard.team.mainAccountDesc")}</dd>
        </div>
        {roles.map((role) => (
          <div key={role}>
            <dt className="font-medium text-[#1f1f1f]">{t(`dashboard.team.roles.${role}`)}</dt>
            <dd className="mt-0.5 text-[#5f6368]">{t(`dashboard.team.roleDesc.${role}`)}</dd>
          </div>
        ))}
      </dl>
      <p className="border-t border-[#dadce0] px-6 py-4 text-xs text-[#5f6368]">{t("dashboard.team.pinNote")}</p>
    </details>
  );
}
