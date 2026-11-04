import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, Building2, ChevronRight, Eye, EyeOff, FlaskConical, ShieldCheck } from "lucide-react";
import { ButtonSpinner } from "../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { useLogin, useMemberLogin, loginErrorMessage } from "../hooks/useLogin";
import type { Membership } from "../types/auth";
import { isSandbox } from "../lib/domains";
import { AuthField } from "../components/auth/AuthField";
import "../styles/geist.css";
import { Nav } from "../components/Nav";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { CookieConsent } from "../components/CookieConsent";

export function Login() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const ownerLogin = useLogin();
  const memberLogin = useMemberLogin();
  // Deux portes : le login de l'entreprise (propriétaire), ou le compte Reemite personnel d'un
  // membre de l'équipe. Les identifiants ne sont pas les mêmes, on ne devine donc pas.
  // `?mode=member` : le sélecteur de compte y mène pour se connecter avec son compte personnel.
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<"owner" | "member">(
    searchParams.get("mode") === "member" ? "member" : "owner",
  );
  // Membre de plusieurs entreprises : la connexion renvoie la liste, il en choisit une.
  const [choices, setChoices] = useState<Membership[] | null>(null);
  const login = mode === "owner" ? ownerLogin : memberLogin;

  const update =
    (field: keyof typeof form) => (e: FormEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setForm((f) => ({ ...f, [field]: value }));
    };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "owner") {
      ownerLogin.mutate(form, { onSuccess: () => navigate("/dashboard") });
      return;
    }
    memberLogin.mutate(form, {
      onSuccess: (result) => {
        if (result.requires_business) setChoices(result.businesses);
        else navigate("/dashboard");
      },
    });
  };

  const chooseBusiness = (businessId: number) => {
    memberLogin.mutate(
      { ...form, business_id: businessId },
      { onSuccess: (result) => !result.requires_business && navigate("/dashboard") },
    );
  };

  const switchMode = (next: "owner" | "member") => {
    setMode(next);
    setChoices(null);
    ownerLogin.reset();
    memberLogin.reset();
  };

  return (
    <>
    <div className="font-geist flex min-h-dvh flex-col items-center justify-center bg-surface-2 px-4 py-6 sm:py-10">
      <Nav/>
      {/* ---------- Carte de connexion ---------- */}
      <main className="w-full max-w-[28rem] rounded-[28px] bg-white p-6 sm:p-10 min-[52rem]:max-w-[65rem]">
        <div className="grid gap-x-12 gap-y-8 min-[52rem]:grid-cols-2">
          {/* Colonne titre */}
          <div className="min-w-0">

            <h1 className="mt-6 font-display text-[2rem] leading-tight text-ink sm:text-[2.25rem]">
              {t("login.title")}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-2">{t("login.subtitle")}</p>
            {isSandbox && (
              <p className="mt-4 flex items-start gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                <FlaskConical size={15} aria-hidden className="mt-0.5 shrink-0" />
                {t("login.sandboxNotice")}
              </p>
            )}
          </div>

          {/* Colonne formulaire */}
          {choices ? (
            <div className="min-w-0 min-[52rem]:pt-[4.5rem]">
              <h2 className="text-lg font-medium text-ink">{t("login.chooseBusiness")}</h2>
              <p className="mt-1 text-sm text-muted-2">{t("login.chooseBusinessDesc")}</p>
              <ul className="mt-5 divide-y divide-surface-2 overflow-hidden rounded-2xl border border-surface-2">
                {choices.map((choice) => (
                  <li key={choice.business.id}>
                    <button
                      type="button"
                      onClick={() => chooseBusiness(choice.business.id)}
                      disabled={memberLogin.isPending}
                      aria-busy={
                        (memberLogin.isPending &&
                          memberLogin.variables?.business_id === choice.business.id) ||
                        undefined
                      }
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-start transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                        <Building2 size={18} aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink">
                          {choice.business.name}
                        </span>
                        <span className="block text-xs text-muted">
                          {t(`dashboard.team.roles.${choice.role}`)}
                        </span>
                      </span>
                      {memberLogin.isPending &&
                      memberLogin.variables?.business_id === choice.business.id ? (
                        <ButtonSpinner label={t("login.submitting")} size={16} />
                      ) : (
                        <ChevronRight size={18} aria-hidden className="text-muted rtl:rotate-180" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              {memberLogin.isError && (
                <p role="alert" className="mt-4 flex items-start gap-2 text-sm leading-snug text-red-700">
                  <AlertCircle size={17} aria-hidden className="mt-px shrink-0" />
                  {loginErrorMessage(memberLogin.error, t)}
                </p>
              )}
              <button
                type="button"
                onClick={() => setChoices(null)}
                className="-ms-3 mt-6 inline-flex h-10 items-center rounded-full px-3 text-sm font-semibold text-accent transition-colors hover:bg-brand-light"
              >
                {t("login.back")}
              </button>
            </div>
          ) : (
          <form onSubmit={onSubmit} className="min-w-0 min-[52rem]:pt-[4.5rem]">
            <div
              role="radiogroup"
              aria-label={t("login.modeLabel")}
              className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-surface-2 p-1"
            >
              {(["owner", "member"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="radio"
                  aria-checked={mode === m}
                  onClick={() => switchMode(m)}
                  className={`h-9 rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    mode === m ? "bg-white text-ink shadow-card" : "text-muted-2 hover:text-ink"
                  }`}
                >
                  {m === "owner" ? t("login.modeOwner") : t("login.modeMember")}
                </button>
              ))}
            </div>
            {mode === "member" && (
              <p className="-mt-2 mb-6 text-sm text-muted-2">{t("login.memberHint")}</p>
            )}
            <div className="space-y-6">
              <AuthField
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoFocus
                required
                label={t("login.email")}
                value={form.email}
                onInput={update("email")}
              />

              <div>
                <AuthField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  label={t("login.password")}
                  value={form.password}
                  onInput={update("password")}
                  className="pe-14"
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? t("login.hidePassword") : t("login.showPassword")}
                      aria-pressed={showPassword}
                      className="absolute end-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {showPassword ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
                    </button>
                  }
                />
                <a
                  href="#"
                  className="-ms-2 mt-2 inline-flex h-9 items-center rounded-full px-2 text-sm font-medium text-accent transition-colors hover:bg-brand-light"
                >
                  {t("login.forgotPassword")}
                </a>
              </div>
            </div>

            <label
              htmlFor="remember"
              className="mt-3 flex w-fit cursor-pointer select-none items-center gap-3 py-1 text-sm text-ink"
            >
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-[18px] w-[18px] cursor-pointer rounded border-black/20 accent-accent"
              />
              {t("login.rememberMe")}
            </label>

            {login.isError && (
              <p role="alert" className="mt-4 flex items-start gap-2 text-sm leading-snug text-red-700">
                <AlertCircle size={17} aria-hidden className="mt-px shrink-0" />
                {loginErrorMessage(login.error, t)}
              </p>
            )}

            <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent-light/50 px-3 py-1.5 text-xs font-medium text-brand">
              <ShieldCheck size={14} aria-hidden className="shrink-0" />
              {t("login.secure")}
            </p>

            {/* Actions : secondaire au début, principale à la fin (comme Google) */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              {mode === "owner" && (
              <Link
                  to="/signup"
                  className="-ms-3 inline-flex h-10 items-center rounded-full px-3 text-sm font-semibold text-accent transition-colors hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {t("login.createAccount")}
                </Link>
              )}
              <button
                type="submit"
                disabled={login.isPending}
                aria-busy={login.isPending || undefined}
                className="ms-auto inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {login.isPending ? (
                  <ButtonSpinner label={t("login.submitting")} size={16} />
                ) : (
                  t("login.submit")
                )}
              </button>
            </div>
          </form>
          )}
        </div>
      </main>

      {/* ---------- Pied de page hors carte ---------- */}
      <footer className="mt-4 w-full max-w-[28rem] px-2 text-xs leading-relaxed text-muted min-[52rem]:max-w-[65rem] min-[52rem]:text-end">
        {t("login.termsPrefix")}{" "}
        <a href="#" className="font-medium text-ink underline-offset-2 hover:underline">
          {t("login.terms")}
        </a>{" "}
        {t("login.and")}{" "}
        <a href="#" className="font-medium text-ink underline-offset-2 hover:underline">
          {t("login.privacy")}
        </a>
        .
      </footer>
          <WhatsAppButton />
            <CookieConsent/>
    </div>
    </>
  );
}
