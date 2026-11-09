import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ButtonSpinner, LoadingSpinner } from "../components/LoadingSpinner";
import { AuthField } from "../components/auth/AuthField";
import { Nav } from "../components/Nav";
import { ApiError } from "../lib/api";
import {
  useAcceptInvitation,
  useInvitationLookup,
  useRegisterFromInvitation,
} from "../hooks/useInvitation";
import "../styles/geist.css";

/** Pourquoi le lien ne peut pas servir, d'après le code renvoyé par l'API. */
function closedReason(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.code) {
      case "E_INVITATION_ACCEPTED":
        return "accepted";
      case "E_INVITATION_REVOKED":
        return "revoked";
      case "E_INVITATION_EXPIRED":
        return "expired";
      case "E_BUSINESS_INACTIVE":
        return "inactive";
    }
  }
  return "invalid";
}

function joinError(error: unknown, t: (key: string) => string): string {
  if (error instanceof ApiError) {
    if (error.code === "E_INVALID_CREDENTIALS") return t("invitation.errors.password");
    if (error.code === "E_ACCOUNT_LOCKED") return t("invitation.errors.locked");
    if (error.code === "E_ACCOUNT_EXISTS") return t("invitation.errors.accountExists");
    if (error.code === "E_ALREADY_STAFF") return t("invitation.errors.alreadyMember");
    if (error.status === 422) return t("invitation.errors.weakPassword");
    if (error.status === 410) return t("invitation.errors.closed");
    return error.message;
  }
  return t("invitation.errors.generic");
}

/**
 * La page d'un lien d'invitation. Elle montre qui invite, pour quelle entreprise et quel rôle,
 * puis fait rejoindre l'équipe : avec le mot de passe du compte Reemite déjà associé à l'adresse,
 * ou en créant ce compte ici. Dans les deux cas la personne arrive directement dans le dashboard.
 */
export function Invitation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [params] = useSearchParams();
  const token = params.get("token");
  const lookup = useInvitationLookup(token);
  const accept = useAcceptInvitation();
  const register = useRegisterFromInvitation();
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const join = lookup.data?.has_account ? accept : register;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!token || !lookup.data) return;
    const done = {
      onSuccess: () => {
        // Le cache appartient à une éventuelle session précédente.
        queryClient.clear();
        navigate("/dashboard");
      },
    };
    if (lookup.data.has_account) accept.mutate({ token, password }, done);
    else register.mutate({ token, full_name: fullName.trim(), password }, done);
  };

  const shell = (children: ReactNode) => (
    <div className="font-geist flex min-h-dvh flex-col items-center justify-center bg-surface-2 px-4 py-6 sm:py-10">
      <Nav />
      <main className="w-full max-w-[28rem] rounded-[28px] bg-white p-6 sm:p-10 min-[52rem]:max-w-[65rem]">
        {children}
      </main>
    </div>
  );

  if (!token) return shell(<Closed reason="invalid" />);
  if (lookup.isPending) return shell(<LoadingSpinner label={t("invitation.loading")} className="py-16" />);
  if (lookup.isError || !lookup.data) return shell(<Closed reason={closedReason(lookup.error)} />);

  const inv = lookup.data;
  const role = t(`dashboard.team.roles.${inv.role}`);
  const initial = inv.business.name.trim()[0]?.toUpperCase() ?? "?";

  return shell(
    <div className="grid gap-x-12 gap-y-8 min-[52rem]:grid-cols-2">
      {/* Colonne : qui invite, pour quoi */}
      <div className="min-w-0">
        {inv.business.logo_url ? (
          <img
            src={inv.business.logo_url}
            alt=""
            className="h-14 w-14 rounded-2xl border border-black/5 object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl font-semibold text-white"
          >
            {initial}
          </span>
        )}
        <h1 className="mt-6 font-display text-[2rem] leading-tight text-ink sm:text-[2.25rem]">
          {t("invitation.title", { business: inv.business.name })}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-2">
          {inv.inviter_name
            ? t("invitation.byInviter", { inviter: inv.inviter_name, role })
            : t("invitation.byBusiness", { role })}
        </p>
        <div className="mt-6 rounded-2xl bg-surface-2/60 p-4">
          <p className="text-sm font-medium text-ink">{role}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-2">{t(`dashboard.team.roleDesc.${inv.role}`)}</p>
        </div>
      </div>

      {/* Colonne : rejoindre */}
      <form onSubmit={onSubmit} className="min-w-0 min-[52rem]:pt-[4.5rem]">
        <p className="text-sm text-muted-2">
          {inv.has_account ? t("invitation.signInHint") : t("invitation.createHint")}
        </p>

        <div className="mt-6 space-y-6">
          <div className="flex h-14 items-center gap-3 rounded border border-black/10 bg-surface-2/50 px-4">
            <Lock size={16} aria-hidden className="shrink-0 text-muted" />
            <span className="min-w-0 truncate text-base text-ink">{inv.email}</span>
          </div>

          {!inv.has_account && (
            <AuthField
              id="full_name"
              name="full_name"
              autoComplete="name"
              autoFocus
              required
              minLength={2}
              label={t("invitation.fullName")}
              value={fullName}
              onInput={(e) => setFullName(e.currentTarget.value)}
            />
          )}

          <AuthField
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={inv.has_account ? "current-password" : "new-password"}
            autoFocus={inv.has_account}
            required
            minLength={inv.has_account ? undefined : 8}
            label={inv.has_account ? t("invitation.password") : t("invitation.newPassword")}
            hint={inv.has_account ? undefined : t("invitation.passwordHint")}
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
            className="pe-14"
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? t("login.hidePassword") : t("login.showPassword")}
                aria-pressed={showPassword}
                className="absolute end-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {showPassword ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
              </button>
            }
          />
        </div>

        {join.isError && (
          <p role="alert" className="mt-4 flex items-start gap-2 text-sm leading-snug text-red-700">
            <AlertCircle size={17} aria-hidden className="mt-px shrink-0" />
            {joinError(join.error, t)}
          </p>
        )}

        <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent-light/50 px-3 py-1.5 text-xs font-medium text-brand">
          <ShieldCheck size={14} aria-hidden className="shrink-0" />
          {t("invitation.private")}
        </p>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={join.isPending}
            aria-busy={join.isPending || undefined}
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {join.isPending ? (
              <ButtonSpinner label={t("invitation.joining")} size={16} />
            ) : inv.has_account ? (
              t("invitation.accept")
            ) : (
              t("invitation.createAndJoin")
            )}
          </button>
        </div>
      </form>
    </div>,
  );
}

function Closed({ reason }: { reason: string }) {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-md py-8 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-muted-2">
        <AlertCircle size={24} aria-hidden />
      </span>
      <h1 className="mt-5 font-display text-2xl text-ink">{t(`invitation.closed.${reason}.title`)}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-2">{t(`invitation.closed.${reason}.desc`)}</p>
      <Link
        to="/login"
        className="mt-6 inline-flex h-10 items-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        {t("invitation.goToLogin")}
      </Link>
    </div>
  );
}
