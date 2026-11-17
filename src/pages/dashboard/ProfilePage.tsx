import {
  useEffect,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { ButtonSpinner, LoadingSpinner } from "../../components/LoadingSpinner";
import {
  AlertCircle,
  AlertTriangle,
  Building2,
  Calendar,
  Check,
  ChevronRight,
  Copy,
  Hash,
  KeyRound,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
  Webhook as WebhookIcon,
  X,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  useProfile,
  useUpdateProfile,
  useChangePassword,
  useSetPin,
  useChangePin,
} from "../../hooks/useProfile";
import { ApiError } from "../../lib/api";
import { usePermissions } from "../../hooks/useMe";
import { TeamSettings } from "../../components/dashboard/TeamSettings";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/geist.css";

/* -------------------------------------------------------------------------- */
/*  Primitives (style Google Account / Material 3)                             */
/* -------------------------------------------------------------------------- */

type FieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  id: string;
  label: string;
  onValue: (value: string) => void;
};

function Field({ id, label, onValue, ...input }: FieldProps) {
  return (
    <div className="relative">
      <input
        id={id}
        onChange={(e) => onValue(e.currentTarget.value)}
        className="peer h-14 w-full rounded-md border border-[#747775] bg-white px-4 text-[15px] text-[#1f1f1f] outline-none transition-colors placeholder:text-[#747775] hover:border-[#1f1f1f] focus:border-2 focus:border-accent focus:px-[15px]"
        {...input}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-0 -translate-y-1/2 bg-white px-1 text-xs text-[#444746] peer-focus:text-accent"
      >
        {label}
      </label>
    </div>
  );
}

function PinField(props: Omit<FieldProps, "type" | "inputMode">) {
  return (
    <Field
      type="password"
      inputMode="numeric"
      required
      minLength={4}
      maxLength={6}
      placeholder="••••"
      {...props}
      onValue={(v) => props.onValue(v.replace(/\D/g, ""))}
    />
  );
}

function ErrorText({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-sm text-[#b3261e]">
      <AlertCircle size={16} className="shrink-0" />
      {children}
    </p>
  );
}

function Button({
  pending,
  pendingLabel,
  variant = "filled",
  type = "submit",
  onClick,
  children,
}: {
  pending?: boolean;
  pendingLabel?: string;
  variant?: "filled" | "text";
  type?: "submit" | "button";
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={pending}
      aria-busy={pending || undefined}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors disabled:opacity-60 ${
        variant === "filled"
          ? "bg-accent text-white hover:bg-accent/90 hover:shadow-sm"
          : "text-accent hover:bg-accent/[0.08]"
      }`}
    >
      {pending && pendingLabel ? <ButtonSpinner label={pendingLabel} size={16} /> : children}
    </button>
  );
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#dadce0] bg-white">
      <header className="px-6 pb-2 pt-6">
        <h2 className="text-[22px] leading-7 text-[#1f1f1f]">{title}</h2>
        {description && <p className="mt-1 text-sm text-[#444746]">{description}</p>}
      </header>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  warn,
  open,
  onToggle,
  trailing,
  children,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  warn?: boolean;
  open?: boolean;
  onToggle?: () => void;
  trailing?: ReactNode;
  children?: ReactNode;
}) {
  const interactive = Boolean(onToggle);
  const content = (
    <>
      <Icon
        size={20}
        className={`shrink-0 ${warn ? "text-[#b06000]" : "text-[#444746]"}`}
      />
      <div className="grid min-w-0 flex-1 gap-0.5 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-6">
        <span className="text-xs font-medium uppercase tracking-wide text-[#444746] sm:text-[13px] sm:normal-case sm:tracking-normal">
          {label}
        </span>
        <span className="truncate text-[15px] text-[#1f1f1f]">{value}</span>
      </div>
      {trailing}
      {interactive && (
        <ChevronRight
          size={20}
          className={`shrink-0 text-[#444746] transition-transform ${open ? "rotate-90" : ""}`}
        />
      )}
    </>
  );

  return (
    <div className="border-t border-[#dadce0]">
      {interactive ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex min-h-16 w-full items-center gap-5 px-6 py-3 text-left transition-colors hover:bg-[#1f1f1f]/[0.04]"
        >
          {content}
        </button>
      ) : (
        <div className="flex min-h-16 items-center gap-5 px-6 py-3">{content}</div>
      )}
      {open && children && <div className="px-6 pb-6 pt-2 sm:pl-[68px]">{children}</div>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const STATUS_KEYS: Record<string, string> = {
  active: "statusActive",
  pending: "statusPending",
  suspended: "statusSuspended",
};

const errorText = (error: unknown, fallback: string) =>
  error instanceof ApiError ? error.message : fallback;

type Editing = "name" | "phone" | "webhook_url" | "pin" | "password" | null;

export function ProfilePage() {
  const { t } = useTranslation();
  const profile = useProfile();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const setPin = useSetPin();
  const changePin = useChangePin();
  const { me, can, isMember } = usePermissions();
  // Un membre sans `settings.manage` voit le profil de l'entreprise sans pouvoir le modifier.
  const canEdit = can("settings.manage");

  // L'onglet suit l'ancre de l'URL (#team, #security) : un lien peut mener droit à l'équipe.
  const location = useLocation();
  const navigate = useNavigate();
  const tabFromHash = (hash: string): "general" | "security" | "team" =>
    hash === "#team" ? "team" : hash === "#security" ? "security" : "general";
  const requested = tabFromHash(location.hash);
  // L'équipe n'est visible que de qui la gère : un lien #team mène sinon au profil.
  const tab = requested === "team" && !can("team.manage") ? "general" : requested;
  const setTab = (next: "general" | "security" | "team") =>
    navigate({ hash: next === "general" ? "" : next }, { replace: true });
  const [editing, setEditing] = useState<Editing>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", webhook_url: "" });
  const [pw, setPw] = useState({ current_password: "", new_password: "" });
  const [pin, setPinForm] = useState({ current: "", next: "", confirm: "" });
  const [pinMismatch, setPinMismatch] = useState(false);

  const resetForm = () => {
    if (!profile.data) return;
    setForm({
      name: profile.data.name,
      phone: profile.data.phone,
      webhook_url: profile.data.webhook_url ?? "",
    });
  };

  useEffect(resetForm, [profile.data]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  if (profile.isLoading) {
    return <LoadingSpinner label={t("dashboard.profile.loading")} className="min-h-[50vh]" />;
  }

  if (profile.isError || !profile.data) {
    return (
      <p className="flex items-center gap-1.5 text-sm text-red-600">
        <AlertCircle size={15} /> {t("dashboard.profile.error")}
      </p>
    );
  }

  const account = profile.data;
  const pinSet = account.pin_set;
  const pinMutation = pinSet ? changePin : setPin;

  const initials = account.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const toggle = (key: Exclude<Editing, null>) => {
    updateProfile.reset();
    changePassword.reset();
    pinMutation.reset();
    setPinMismatch(false);
    resetForm();
    setEditing((current) => (current === key ? null : key));
  };

  const close = () => {
    resetForm();
    setEditing(null);
  };

  const copyCode = () =>
    navigator.clipboard.writeText(account.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });

  const onSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(
      {
        name: form.name,
        phone: form.phone,
        webhook_url: form.webhook_url || undefined,
      },
      {
        onSuccess: () => {
          setEditing(null);
          setToast(t("dashboard.profile.updateSuccess"));
        },
      },
    );
  };

  const onSavePassword = (e: FormEvent) => {
    e.preventDefault();
    changePassword.mutate(pw, {
      onSuccess: () => {
        setPw({ current_password: "", new_password: "" });
        setEditing(null);
        setToast(t("dashboard.profile.passwordSuccess"));
      },
    });
  };

  const onSavePin = (e: FormEvent) => {
    e.preventDefault();
    if (pin.next !== pin.confirm) {
      setPinMismatch(true);
      return;
    }
    setPinMismatch(false);
    const done = {
      onSuccess: () => {
        setPinForm({ current: "", next: "", confirm: "" });
        setEditing(null);
        setToast(
          pinSet
            ? t("dashboard.profile.pinChangeSuccess")
            : t("dashboard.profile.pinSetSuccess"),
        );
      },
    };
    if (pinSet) {
      changePin.mutate({ current_pin: pin.current, new_pin: pin.next }, done);
    } else {
      setPin.mutate(pin.next, done);
    }
  };

  const profileField = (key: "name" | "phone" | "webhook_url", field: ReactNode) => (
    <form onSubmit={onSaveProfile} className="space-y-4">
      {field}
      {updateProfile.isError && <ErrorText>{t("dashboard.profile.updateError")}</ErrorText>}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="text" onClick={close}>
          {t("dashboard.profile.cancel")}
        </Button>
        <Button
          pending={updateProfile.isPending && editing === key}
          pendingLabel={t("dashboard.profile.saving")}
        >
          {t("dashboard.profile.save")}
        </Button>
      </div>
    </form>
  );

  const tabs = [
    { key: "general" as const, label: t("dashboard.profile.general"), icon: UserRound },
    { key: "security" as const, label: t("dashboard.profile.security"), icon: ShieldCheck },
    ...(can("team.manage")
      ? [{ key: "team" as const, label: t("dashboard.profile.team"), icon: Users }]
      : []),
  ];

  return (
    <div className="font-geist mx-auto max-w-3xl">
      {/* ---------- En-tête ---------- */}
      <header className="flex flex-col items-center pt-4 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-accent text-4xl font-medium text-white">
          {initials}
        </span>
        <h1 className="mt-4 text-[28px] leading-9 text-[#1f1f1f]">
          {t("dashboard.profile.welcome", { name: account.name })}
        </h1>
        <p className="mt-1 text-base text-[#444746]">{t("dashboard.profile.welcomeDesc")}</p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#c4c7c5] px-3 text-[#444746]">
            <span
              className={`h-2 w-2 rounded-full ${
                account.status === "active"
                  ? "bg-[#146c2e]"
                  : account.status === "pending"
                    ? "bg-[#b06000]"
                    : "bg-[#b3261e]"
              }`}
            />
            {t(`dashboard.profile.${STATUS_KEYS[account.status] ?? "statusActive"}`)}
          </span>
          <span className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#c4c7c5] px-3 text-[#444746]">
            <Calendar size={14} />
            {t("dashboard.profile.memberSince", {
              year: new Date(account.created_at).getFullYear(),
            })}
          </span>
        </div>
      </header>

      {/* ---------- Onglets ---------- */}
      <nav className="mt-8 flex justify-center overflow-x-auto border-b border-[#dadce0]">
        {tabs.map((item) => {
          const active = tab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setTab(item.key);
                setEditing(null);
              }}
              className={`relative flex h-12 shrink-0 items-center gap-2 px-4 text-sm font-medium sm:px-6 transition-colors hover:bg-[#1f1f1f]/[0.04] ${
                active ? "text-accent" : "text-[#444746]"
              }`}
            >
              <item.icon size={18} />
              {item.label}
              {active && (
                <span className="absolute inset-x-4 bottom-0 h-[3px] rounded-t-full bg-accent" />
              )}
            </button>
          );
        })}
      </nav>

      {/* ---------- Contenu ---------- */}
      <div className="mt-8 space-y-6 pb-16">
        {tab === "general" && (
          <Card
            title={t("dashboard.profile.accountInfo")}
            description={t("dashboard.profile.accountInfoDesc")}
          >
            <Row
              icon={Building2}
              label={t("dashboard.profile.companyName")}
              value={account.name}
              open={editing === "name"}
              onToggle={canEdit ? () => toggle("name") : undefined}
            >
              {profileField(
                "name",
                <Field
                  id="name"
                  label={t("dashboard.profile.companyName")}
                  required
                  autoFocus
                  value={form.name}
                  onValue={(name) => setForm((f) => ({ ...f, name }))}
                />,
              )}
            </Row>

            <Row
              icon={Mail}
              label={t("dashboard.profile.email")}
              value={account.email}
              trailing={
                <span title={t("dashboard.profile.emailLocked")}>
                  <Lock size={16} className="shrink-0 text-[#747775]" />
                </span>
              }
            />

            <Row
              icon={Phone}
              label={t("dashboard.profile.phone")}
              value={account.phone}
              open={editing === "phone"}
              onToggle={canEdit ? () => toggle("phone") : undefined}
            >
              {profileField(
                "phone",
                <Field
                  id="phone"
                  type="tel"
                  label={t("dashboard.profile.phone")}
                  required
                  autoFocus
                  value={form.phone}
                  onValue={(phone) => setForm((f) => ({ ...f, phone }))}
                />,
              )}
            </Row>

            {(can("developers.manage") || canEdit) && (
            <Row
              icon={WebhookIcon}
              label={t("dashboard.profile.webhookUrl")}
              value={
                account.webhook_url || (
                  <span className="text-[#747775]">{t("dashboard.profile.notSet")}</span>
                )
              }
              open={editing === "webhook_url"}
              onToggle={canEdit ? () => toggle("webhook_url") : undefined}
            >
              {profileField(
                "webhook_url",
                <Field
                  id="webhook_url"
                  type="url"
                  label={t("dashboard.profile.webhookUrl")}
                  placeholder="https://maboutique.com/hook"
                  autoFocus
                  value={form.webhook_url}
                  onValue={(webhook_url) => setForm((f) => ({ ...f, webhook_url }))}
                />,
              )}
            </Row>

            )}

            <Row
              icon={Hash}
              label={t("dashboard.profile.businessCode")}
              value={<span className="font-mono">{account.code}</span>}
              trailing={
                <button
                  type="button"
                  onClick={copyCode}
                  aria-label={t("dashboard.profile.copied")}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#444746] transition-colors hover:bg-[#1f1f1f]/[0.08]"
                >
                  {copied ? <Check size={18} className="text-[#146c2e]" /> : <Copy size={18} />}
                </button>
              }
            />
          </Card>
        )}

        {tab === "team" && <TeamSettings onToast={setToast} />}

        {tab === "security" && isMember && me?.member && (
          <Card
            title={t("dashboard.profile.memberTitle")}
            description={t("dashboard.profile.memberDesc")}
          >
            <Row
              icon={UserRound}
              label={t("dashboard.profile.memberName")}
              value={me.member.user.full_name ?? "—"}
            />
            <Row icon={Mail} label={t("dashboard.profile.email")} value={me.member.user.email ?? "—"} />
            <Row
              icon={ShieldCheck}
              label={t("dashboard.profile.memberRole")}
              value={t(`dashboard.team.roles.${me.role}`)}
            />
            <Row
              icon={KeyRound}
              warn={!me.pin_set}
              label={t("dashboard.profile.pinTitle")}
              value={
                me.pin_set ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={16} className="text-[#146c2e]" />
                    {t("dashboard.profile.memberPinSet")}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[#b06000]">
                    <X size={16} />
                    {t("dashboard.profile.memberPinNotSet")}
                  </span>
                )
              }
            />
            <p className="border-t border-[#dadce0] px-6 py-4 text-sm text-[#444746]">
              {t("dashboard.profile.memberCredentialsNote")}
            </p>
          </Card>
        )}

        {tab === "security" && me?.kind === "owner" && (
          <>
            {!pinSet && (
              <div className="flex items-start gap-4 rounded-2xl bg-[#fef7e0] px-6 py-5">
                <AlertTriangle size={22} className="mt-0.5 shrink-0 text-[#b06000]" />
                <div className="flex-1">
                  <p className="text-[15px] font-medium text-[#1f1f1f]">
                    {t("dashboard.profile.pinNotConfigured")}
                  </p>
                  <p className="mt-0.5 text-sm text-[#444746]">
                    {t("dashboard.profile.pinDescNotSet")}
                  </p>
                  <button
                    type="button"
                    onClick={() => editing !== "pin" && toggle("pin")}
                    className="mt-2 -ml-3 inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-accent hover:bg-accent/[0.08]"
                  >
                    {t("dashboard.profile.setPin")}
                  </button>
                </div>
              </div>
            )}

            <Card
              title={t("dashboard.profile.security")}
              description={t("dashboard.profile.securityDesc")}
            >
              <Row
                icon={ShieldCheck}
                warn={!pinSet}
                label={t("dashboard.profile.pinTitle")}
                value={
                  pinSet ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Check size={16} className="text-[#146c2e]" />
                      {t("dashboard.profile.pinConfigured")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[#b06000]">
                      <X size={16} />
                      {t("dashboard.profile.pinNotConfigured")}
                    </span>
                  )
                }
                open={editing === "pin"}
                onToggle={() => toggle("pin")}
              >
                <form onSubmit={onSavePin} className="space-y-4">
                  <p className="text-sm text-[#444746]">
                    {pinSet
                      ? t("dashboard.profile.pinDescSet")
                      : t("dashboard.profile.pinDescNotSet")}
                  </p>
                  {pinSet && (
                    <PinField
                      id="current_pin"
                      label={t("dashboard.profile.currentPinLabel")}
                      autoFocus
                      value={pin.current}
                      onValue={(current) => setPinForm((p) => ({ ...p, current }))}
                    />
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <PinField
                      id="new_pin"
                      label={t("dashboard.profile.newPinLabel")}
                      autoFocus={!pinSet}
                      value={pin.next}
                      onValue={(next) => setPinForm((p) => ({ ...p, next }))}
                    />
                    <PinField
                      id="confirm_pin"
                      label={t("dashboard.profile.confirmPinLabel")}
                      value={pin.confirm}
                      onValue={(confirm) => setPinForm((p) => ({ ...p, confirm }))}
                    />
                  </div>

                  {pinMismatch && <ErrorText>{t("dashboard.profile.pinMismatch")}</ErrorText>}
                  {pinMutation.isError && (
                    <ErrorText>
                      {errorText(pinMutation.error, t("dashboard.profile.updateError"))}
                    </ErrorText>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="text" onClick={close}>
                      {t("dashboard.profile.cancel")}
                    </Button>
                    <Button
                      pending={pinMutation.isPending}
                      pendingLabel={
                        pinSet ? t("dashboard.profile.changingPin") : t("dashboard.profile.settingPin")
                      }
                    >
                      {pinSet ? t("dashboard.profile.changePin") : t("dashboard.profile.setPin")}
                    </Button>
                  </div>
                </form>
              </Row>

              <Row
                icon={KeyRound}
                label={t("dashboard.profile.password")}
                value={<span className="tracking-widest">••••••••</span>}
                open={editing === "password"}
                onToggle={() => toggle("password")}
              >
                <form onSubmit={onSavePassword} className="space-y-4">
                  <Field
                    id="current_password"
                    type="password"
                    label={t("dashboard.profile.currentPassword")}
                    required
                    autoFocus
                    value={pw.current_password}
                    onValue={(current_password) => setPw((f) => ({ ...f, current_password }))}
                  />
                  <Field
                    id="new_password"
                    type="password"
                    label={t("dashboard.profile.newPassword")}
                    required
                    minLength={8}
                    value={pw.new_password}
                    onValue={(new_password) => setPw((f) => ({ ...f, new_password }))}
                  />

                  {changePassword.isError && (
                    <ErrorText>{t("dashboard.profile.passwordError")}</ErrorText>
                  )}

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="text" onClick={close}>
                      {t("dashboard.profile.cancel")}
                    </Button>
                    <Button
                      pending={changePassword.isPending}
                      pendingLabel={t("dashboard.profile.changingPassword")}
                    >
                      {t("dashboard.profile.changePasswordSubmit")}
                    </Button>
                  </div>
                </form>
              </Row>
            </Card>
          </>
        )}
      </div>

      {/* ---------- Snackbar ---------- */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-md bg-[#303030] py-3 pl-4 pr-2 text-sm text-[#f2f2f2] shadow-pop sm:left-6 sm:translate-x-0"
        >
          {toast}
          <button
            type="button"
            onClick={() => setToast(null)}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
