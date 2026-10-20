import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff, FlaskConical, ShieldCheck } from "lucide-react";
import { ButtonSpinner } from "../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { useSignup, useRequestSignupOtp } from "../hooks/useSignup";
import { ApiError } from "../lib/api";
import { isSandbox } from "../lib/domains";
import { AuthField } from "../components/auth/AuthField";
import "../styles/geist.css";
import { Nav } from "../components/Nav";

const primaryButtonClasses =
  "ms-auto inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60";

const textButtonClasses =
  "-ms-3 inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-accent transition-colors hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:text-muted disabled:hover:bg-transparent";

const OTP_LENGTH = 6;

const STEPS = ["email", "otp", "details"] as const;
type Step = (typeof STEPS)[number];

function Logo() {
  return (
    <Link to="/" aria-label="Reemite" className="inline-block">
      {/* Logo recadré au plus près (2133×600) : affiché entier, à sa hauteur. */}
      <img src="/assets/icons/logo.png" alt="Reemite" className="h-9 w-auto" />
    </Link>
  );
}

function ErrorText({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="mt-4 flex items-start gap-2 text-sm leading-snug text-red-700">
      <AlertCircle size={17} aria-hidden className="mt-px shrink-0" />
      {children}
    </p>
  );
}

export function Signup() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpFocused, setOtpFocused] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", password: "", code: "" });
  const requestOtp = useRequestSignupOtp();
  const signup = useSignup();
  const otpInputRef = useRef<HTMLInputElement>(null);

  const stepIndex = STEPS.indexOf(step);

  const otpInvalid =
    signup.isError && signup.error instanceof ApiError && signup.error.status === 400;

  useEffect(() => {
    if (step === "otp") {
      const id = requestAnimationFrame(() => otpInputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [step]);

  // Un code invalide/expiré n'est détecté qu'à la soumission finale (l'API ne l'expose pas
  // séparément) — on ramène l'utilisateur à l'étape du code pour qu'il le corrige en contexte.
  useEffect(() => {
    if (otpInvalid && step !== "otp") setStep("otp");
  }, [otpInvalid, step]);

  const update =
    (field: keyof typeof form) => (e: FormEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setForm((f) => ({ ...f, [field]: value }));
    };

  const onRequestOtp = (e: FormEvent) => {
    e.preventDefault();
    requestOtp.mutate(
      { email },
      { onSuccess: () => setStep("otp") },
    );
  };

  const onChangeEmail = () => {
    setStep("email");
    requestOtp.reset();
    signup.reset();
    setOtp("");
  };

  const onOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH);
    setOtp(digits);
  };

  const onContinueFromOtp = (e?: FormEvent) => {
    e?.preventDefault();
    if (otp.length !== OTP_LENGTH) return;
    if (signup.isError) signup.reset();
    setStep("details");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    signup.mutate({
      name: form.name,
      email,
      otp,
      phone: form.phone,
      password: form.password,
      ...(form.code ? { code: form.code } : {}),
    });
  };

  const errorMessage = (error: unknown) =>
    error instanceof ApiError ? error.message : t("login.errorGeneric");

  const heading =
    step === "email"
      ? { title: t("signup.title"), subtitle: t("signup.subtitle") }
      : step === "otp"
        ? { title: t("signup.verifyTitle"), subtitle: t("signup.verifySubtitle", { email }) }
        : { title: t("signup.detailsTitle"), subtitle: t("signup.detailsSubtitle") };

  const secureNote = (
    <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent-light/50 px-3 py-1.5 text-xs font-medium text-brand">
      <ShieldCheck size={14} aria-hidden className="shrink-0" />
      {t("login.secure")}
    </p>
  );

  return (
    <div className="font-geist flex min-h-dvh flex-col items-center justify-center bg-surface-2 px-4 py-6 sm:py-10">
      <Nav/>
      {signup.isSuccess ? (
        /* ---------- Confirmation ---------- */
        <main className="w-full max-w-[28rem] rounded-[28px] bg-white p-6 text-center sm:p-10">
          <Logo />
          <span className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light/60">
            <CheckCircle2 size={28} aria-hidden className="text-accent" />
          </span>
          <h1 className="mt-5 font-display text-[1.75rem] leading-tight text-ink">
            {t("signup.successCreated")}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-2">
            {/* En sandbox, le compte est actif tout de suite : pas d'attente de validation. */}
            {t(isSandbox ? "signup.sandboxSuccessBody" : "signup.successPendingBody", {
              name: signup.data.name,
              email: signup.data.email,
            })}
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/login" className={primaryButtonClasses.replace("ms-auto ", "")}>
              {t("signup.backToLogin")}
            </Link>
          </div>
        </main>
      ) : (
        /* ---------- Carte d'inscription ---------- */
        <main className="w-full max-w-[28rem] rounded-[28px] bg-white p-6 sm:p-10 min-[52rem]:max-w-[65rem]">
          <div className="grid gap-x-12 gap-y-8 min-[52rem]:grid-cols-2">
            {/* Colonne titre */}
            <div className="min-w-0">

              {/* Progression */}
              <div className="mt-6 flex items-center gap-3">
                <div aria-hidden className="flex w-24 gap-1">
                  {STEPS.map((s, i) => (
                    <span
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        i <= stepIndex ? "bg-brand" : "bg-black/[0.08]"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs font-medium text-muted">
                  {t("signup.stepOf", { current: stepIndex + 1, total: STEPS.length })}
                </p>
              </div>

              <h1 className="mt-4 font-display text-[2rem] leading-tight text-ink sm:text-[2.25rem]">
                {heading.title}
              </h1>
              <p className="mt-3 break-words text-base leading-relaxed text-muted-2">{heading.subtitle}</p>
              {isSandbox && (
                <p className="mt-4 flex items-start gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                  <FlaskConical size={15} aria-hidden className="mt-0.5 shrink-0" />
                  {t("signup.sandboxNotice")}
                </p>
              )}

              {step === "otp" ? (
                <button type="button" onClick={onChangeEmail} className={`${textButtonClasses} mt-2`}>
                  {t("signup.changeEmail")}
                </button>
              ) : (
                <Link to="/" className={`${textButtonClasses} mt-4 font-medium`}>
                  <ArrowLeft size={16} aria-hidden className="rtl:rotate-180" />
                  {t("login.backHome")}
                </Link>
              )}
            </div>

            {/* Colonne formulaire */}
            <div className="min-w-0 min-[52rem]:pt-[5.5rem]">
              {/* ---------- Étape 1 : email ---------- */}
              {step === "email" && (
                <form onSubmit={onRequestOtp}>
                  <AuthField
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoFocus
                    required
                    label={t("signup.email")}
                    placeholder={t("login.emailPlaceholder")}
                    value={email}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                  />

                  {requestOtp.isError && <ErrorText>{errorMessage(requestOtp.error)}</ErrorText>}

                  {secureNote}

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                    <Link to="/login" className={textButtonClasses}>
                      {t("signup.login")}
                    </Link>
                    <button
                      type="submit"
                      disabled={requestOtp.isPending}
                      aria-busy={requestOtp.isPending || undefined}
                      className={primaryButtonClasses}
                    >
                      {requestOtp.isPending ? (
                        <ButtonSpinner label={t("signup.sendingCode")} size={16} />
                      ) : (
                        t("signup.sendCode")
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* ---------- Étape 2 : code de vérification ---------- */}
              {step === "otp" && (
                <form onSubmit={onContinueFromOtp}>
                  <label htmlFor="otp" className="block text-sm font-medium text-ink">
                    {t("signup.otpLabel")}
                  </label>
                  <div className="relative mt-2">
                    <input
                      ref={otpInputRef}
                      id="otp"
                      name="otp"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      aria-invalid={otpInvalid || undefined}
                      value={otp}
                      onChange={onOtpChange}
                      onFocus={() => setOtpFocused(true)}
                      onBlur={() => setOtpFocused(false)}
                      className="absolute inset-0 z-10 h-14 w-full cursor-pointer opacity-0"
                    />
                    <div aria-hidden className="flex items-center gap-2">
                      {Array.from({ length: OTP_LENGTH }).map((_, i) => {
                        const filled = i < otp.length;
                        const active = otpFocused && i === Math.min(otp.length, OTP_LENGTH - 1);
                        return (
                          <span
                            key={i}
                            className={`flex h-14 w-full items-center justify-center rounded border text-xl font-semibold tabular-nums transition duration-150 ${
                              otpInvalid
                                ? "border-red-300 bg-red-50 text-red-700"
                                : active
                                  ? "border-accent bg-white text-ink shadow-[inset_0_0_0_1px_var(--color-accent)]"
                                  : filled
                                    ? "border-black/25 bg-white text-ink"
                                    : "border-black/25 text-transparent"
                            }`}
                          >
                            {otp[i] ?? ""}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => requestOtp.mutate({ email })}
                    disabled={requestOtp.isPending}
                    className={`${textButtonClasses} mt-2 font-medium`}
                  >
                    {requestOtp.isPending ? (
                      <ButtonSpinner label={t("signup.sendingCode")} size={16} />
                    ) : requestOtp.isSuccess ? (
                      t("signup.resendOtpSent")
                    ) : (
                      t("signup.resendOtp")
                    )}
                  </button>

                  {otpInvalid && <ErrorText>{errorMessage(signup.error)}</ErrorText>}

                  <div className="block">{secureNote}</div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                    <button type="button" onClick={onChangeEmail} className={textButtonClasses}>
                      {t("signup.back")}
                    </button>
                    <button type="submit" disabled={otp.length !== OTP_LENGTH} className={primaryButtonClasses}>
                      {t("signup.continue")}
                    </button>
                  </div>
                </form>
              )}

              {/* ---------- Étape 3 : informations du compte ---------- */}
              {step === "details" && (
                <form onSubmit={onSubmit}>
                  <div className="space-y-6">
                    <AuthField
                      id="name"
                      name="organization"
                      type="text"
                      autoComplete="organization"
                      autoFocus
                      required
                      label={t("signup.companyName")}
                      placeholder={t("signup.companyNamePlaceholder")}
                      value={form.name}
                      onInput={update("name")}
                    />
                    <AuthField
                      id="phone"
                      name="tel"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      required
                      label={t("signup.phone")}
                      placeholder="260763456789"
                      value={form.phone}
                      onInput={update("phone")}
                    />
                    <AuthField
                      id="code"
                      name="code"
                      type="text"
                      label={`${t("signup.code")} ${t("signup.codeOptional")}`}
                      placeholder={t("signup.codePlaceholder")}
                      value={form.code}
                      onInput={update("code")}
                    />
                    <AuthField
                      id="password"
                      name="new-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      minLength={8}
                      label={t("signup.password")}
                      hint={t("signup.passwordPlaceholder")}
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
                  </div>

                  <label
                    htmlFor="terms"
                    className="mt-6 flex cursor-pointer select-none items-start gap-3 text-sm leading-relaxed text-muted-2"
                  >
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-black/20 accent-accent"
                    />
                    <span>
                      {t("signup.acceptTerms")}{" "}
                      <a href="#" className="font-medium text-ink underline-offset-2 hover:underline">
                        {t("login.terms")}
                      </a>{" "}
                      {t("signup.and")}{" "}
                      <a href="#" className="font-medium text-ink underline-offset-2 hover:underline">
                        {t("login.privacy")}
                      </a>{" "}
                      {t("signup.termsSuffix")}
                    </span>
                  </label>

                  {signup.isError && !otpInvalid && <ErrorText>{errorMessage(signup.error)}</ErrorText>}

                  {secureNote}

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                    <button type="button" onClick={() => setStep("otp")} className={textButtonClasses}>
                      {t("signup.back")}
                    </button>
                    <button
                      type="submit"
                      disabled={signup.isPending}
                      aria-busy={signup.isPending || undefined}
                      className={primaryButtonClasses}
                    >
                      {signup.isPending ? (
                        <ButtonSpinner label={t("signup.submitting")} size={16} />
                      ) : (
                        t("signup.submit")
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
