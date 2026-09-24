import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpFromLine,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  CreditCard,
  FileText,
  Home,
  IdCard,
  Loader2,
  Plus,
  ScanFace,
  ShieldAlert,
  Ticket,
  Wallet,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useOverview } from "../../hooks/useOverview";
import { useWallets } from "../../hooks/useWallets";
import { useTransactions } from "../../hooks/useTransactions";
import { useKycStatus } from "../../hooks/useKyc";
import { isSandbox } from "../../lib/domains";
import { ButtonSpinner, LoadingSpinner } from "../../components/LoadingSpinner";
import { planErrorMessage, useActivePlan, usePlans, useSubscribePlan } from "../../hooks/usePlans";
import { getStoredBusiness } from "../../lib/session";
import { formatMinorUnits } from "../../lib/format";
import { TransactionRow } from "../../components/dashboard/TransactionRow";
import { PinModal } from "../../components/dashboard/PinModal";
import type { KycStatusData, Plan } from "../../types/dashboard";

const keyUpdates = [
  {
    icon: AlertTriangle,
    tone: "warn" as const,
    titleKey: "keyUpdate1Title",
    descKey: "keyUpdate1Desc",
  },
  {
    icon: Ticket,
    tone: "info" as const,
    titleKey: "keyUpdate2Title",
    descKey: "keyUpdate2Desc",
  },
  {
    icon: CheckCircle2,
    tone: "success" as const,
    titleKey: "keyUpdate3Title",
    descKey: "keyUpdate3Desc",
  },
];

const toneClasses = {
  warn: "bg-amber-50 text-amber-600",
  info: "bg-brand-light text-brand",
  success: "bg-accent-light text-accent",
};

const KYC_TONE = {
  not_started: {
    icon: ShieldAlert,
    iconColor: "text-brand",
    cta: "bg-brand text-white hover:bg-brand-dark",
  },
  pending: {
    icon: Clock3,
    iconColor: "text-amber-600",
    cta: "border border-black/10 text-ink hover:bg-surface",
  },
  rejected: {
    icon: XCircle,
    iconColor: "text-red-600",
    cta: "bg-red-600 text-white hover:bg-red-700",
  },
} as const;

const card = "rounded-3xl border border-black/[0.08] bg-white";
const sectionTitle = "font-display text-base font-semibold text-ink";


function documentIcon(doc: string) {
  if (doc === "selfie") return ScanFace;
  if (doc === "proof_of_address") return Home;
  if (doc === "business_registration_certificate" || doc === "tax_identification_certificate") return Building2;
  if (
    doc.startsWith("id_card") ||
    doc === "passport" ||
    doc.startsWith("driver_license") ||
    doc.startsWith("representative_id")
  ) {
    return IdCard;
  }
  return FileText;
}

function greetingDate(locale: string) {
  return new Date().toLocaleDateString(locale.startsWith("en") ? "en-US" : "fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

function Greeting({ actions }: { actions?: ReactNode }) {
  const { t, i18n } = useTranslation();
  const business = getStoredBusiness();
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div className="min-w-0">
        <h1 className="font-display text-2xl text-ink sm:text-[1.75rem]">
          {t("dashboard.overview.greeting", {
            name: business?.name ?? t("dashboard.overview.yourBusiness"),
          })}
        </h1>
        <p className="mt-1 text-sm capitalize text-muted">{greetingDate(i18n.language)}</p>
      </div>
      {actions}
    </div>
  );
}

/** Vue affichée tant que le business n'a pas terminé son KYC (accès aux
 * routes financières bloqué côté API tant que le KYC n'est pas approuvé). */
function KycOnboardingView({ kyc }: { kyc: KycStatusData }) {
  const { t } = useTranslation();
  const status = kyc.status;
  const tone =
    status === "pending" ? KYC_TONE.pending : status === "rejected" ? KYC_TONE.rejected : KYC_TONE.not_started;
  const submitted = status !== "not_started";
  const reviewed = status === "approved" || status === "rejected";

  const steps = [
    { key: "accountCreated", done: true },
    { key: "kycSubmitted", done: submitted },
    { key: "kycReviewed", done: reviewed, failed: status === "rejected" },
  ];
  const completedSteps = steps.filter((s) => s.done || s.failed).length;
  const documents = "documents" in kyc ? kyc.documents : [];

  return (
    <div className="mx-auto max-w-4xl">
      <Greeting />

      <div className={`mt-6 p-6 lg:p-7 ${card}`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2">
              <tone.icon size={19} className={tone.iconColor} />
            </span>
            <div className="min-w-0">
              <h2 className={sectionTitle}>{t(`dashboard.overview.kycOnboarding.${status}Title`)}</h2>
              <p className="mt-1 max-w-md text-sm text-muted">
                {status === "rejected" && "decision_reason" in kyc && kyc.decision_reason
                  ? kyc.decision_reason
                  : t(`dashboard.overview.kycOnboarding.${status}Desc`)}
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/kyc"
            className={`inline-flex h-10 shrink-0 items-center gap-1.5 self-start rounded-full px-5 text-sm font-semibold transition-colors ${tone.cta}`}
          >
            {t(`dashboard.overview.kycOnboarding.${status}Cta`)}
            <ArrowRight size={14} className="rtl:rotate-180" />
          </Link>
        </div>

        {/* Progression */}
        <div className="mt-6 rounded-2xl bg-surface-2 p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">
              {t("dashboard.overview.kycOnboarding.stepsTitle")}
            </p>
            <p className="text-xs font-medium text-muted-2">
              {completedSteps}/{steps.length}
            </p>
          </div>
          <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                status === "rejected" ? "bg-red-500" : "bg-accent"
              }`}
              style={{ width: `${(completedSteps / steps.length) * 100}%` }}
            />
          </div>

          <ul className="mt-4 space-y-2.5">
            {steps.map((step) => {
              const StepIcon = step.failed ? XCircle : step.done ? CheckCircle2 : Circle;
              return (
                <li key={step.key} className="flex items-center gap-2.5 text-sm">
                  <StepIcon
                    size={16}
                    className={`shrink-0 ${
                      step.failed ? "text-red-600" : step.done ? "text-accent" : "text-muted-2"
                    }`}
                  />
                  <span className={step.done || step.failed ? "font-medium text-ink" : "text-muted-2"}>
                    {t(`dashboard.overview.kycOnboarding.steps.${step.key}`)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {documents.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-2">
              {t("dashboard.overview.kycOnboarding.documentsTitle")}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {documents.map((doc) => {
                const DocIcon = documentIcon(doc);
                return (
                  <li
                    key={doc}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-sm text-ink"
                  >
                    <DocIcon size={15} className="shrink-0 text-muted-2" />
                    {t(`dashboard.kyc.document.${doc}`, { defaultValue: doc })}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Aperçu de l'étape suivante (souscription) — accessible même avant
          l'approbation KYC, pour montrer où mène le parcours. */}
      <div className="mt-6">
        <PlanPrompt />
      </div>
    </div>
  );
}

/** Rappel affiché sur l'Overview pour inciter à passer sur un plan payant.
 * Souscrire débite immédiatement le prix du plan depuis le wallet du
 * business — d'où la confirmation par PIN, comme pour un retrait. */
function PlanPrompt() {
  const { t, i18n } = useTranslation();
  const plans = usePlans();
  const activePlan = useActivePlan();
  const current = activePlan.data ?? null;
  const pastDue = current?.payment_status === "past_due";
  const subscribe = useSubscribePlan();
  const wallets = useWallets();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [pinModalOpen, setPinModalOpen] = useState(false);

  useEffect(() => {
    if (subscribe.isSuccess) setPinModalOpen(false);
  }, [subscribe.isSuccess]);

  const openPinFor = (plan: Plan) => {
    // Wallet vide (ou absent / insuffisant dans la devise du plan) : inutile de
    // demander le PIN, on envoie directement vers la page de dépôt.
    if (wallets.data) {
      const wallet = wallets.data.find((w) => w.currency_code === plan.currency_code);
      if (!wallet || Number(wallet.balance) < Number(plan.price)) {
        navigate("/dashboard/deposit");
        return;
      }
    }
    setSelectedPlanId(plan.id);
    setPinModalOpen(true);
  };

  const confirmSubscribe = (pin: string) => {
    if (selectedPlanId === null) return;
    subscribe.mutate({ plan_id: selectedPlanId, pin });
  };

  const closePinModal = () => {
    setPinModalOpen(false);
    if (subscribe.isError) subscribe.reset();
  };

  // Évite d'afficher « plan gratuit » le temps de charger le plan actif.
  if (activePlan.isLoading) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className={`flex w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl px-5 py-3.5 text-start text-sm transition-colors ${
          pastDue ? "bg-amber-50 hover:bg-amber-100" : "bg-brand-light/60 hover:bg-brand-light"
        }`}
      >
        {pastDue ? (
          <AlertTriangle size={16} className="shrink-0 text-amber-600" />
        ) : current ? (
          <CheckCircle2 size={16} className="shrink-0 text-accent" />
        ) : (
          <CreditCard size={16} className="shrink-0 text-brand" />
        )}
        {current ? (
          <>
            <span className="font-semibold text-ink">
              {t("dashboard.overview.planGate.currentTitle", { name: current.name })}
            </span>
            <span className={pastDue ? "text-amber-700" : "text-muted-2"}>
              {pastDue
                ? t("dashboard.overview.planGate.pastDue")
                : current.next_maintenance_billing_at
                  ? t("dashboard.overview.planGate.nextBilling", {
                      date: new Date(current.next_maintenance_billing_at).toLocaleDateString(
                        i18n.language.startsWith("en") ? "en-US" : "fr-FR",
                        { day: "numeric", month: "long", year: "numeric" },
                      ),
                    })
                  : t("dashboard.overview.planGate.activeDesc")}
            </span>
          </>
        ) : (
          <>
            <span className="font-semibold text-ink">{t("dashboard.overview.planGate.bannerTitle")}</span>
            <span className="text-muted-2">{t("dashboard.overview.planGate.bannerDesc")}</span>
          </>
        )}
        <span className="ms-auto flex shrink-0 items-center gap-1 text-sm font-semibold text-brand">
          {expanded
            ? t("dashboard.overview.planGate.hide")
            : current
              ? t("dashboard.overview.planGate.changePlan")
              : t("dashboard.overview.planGate.viewPlans")}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {expanded && (
        <div className="mt-4">
          {plans.isLoading ? (
            <LoadingSpinner label={t("dashboard.loading")} />
          ) : plans.isError ? (
            <p className="flex items-center gap-1.5 text-sm text-red-600">
              <AlertCircle size={15} /> {t("dashboard.overview.planGate.plansError")}
            </p>
          ) : plans.data && plans.data.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {plans.data.map((plan) => {
                const isSubscribingThis = subscribe.isPending && selectedPlanId === plan.id;
                const isCurrent = current?.id === plan.id;
                const grantedFeatures = Object.entries(plan.features)
                  .filter(([, granted]) => granted)
                  .map(([key]) => key);
                return (
                  <div
                    key={plan.id}
                    className={`flex h-full flex-col p-6 ${card} ${isCurrent ? "border-accent ring-1 ring-accent" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-ink">{plan.name}</h3>
                      {isCurrent && (
                        <span className="shrink-0 rounded-full bg-accent-light px-2.5 py-0.5 text-xs font-semibold text-accent">
                          {t("dashboard.overview.planGate.currentPlan")}
                        </span>
                      )}
                    </div>
                    {plan.description && (
                      <p className="mt-1 text-sm text-muted">{plan.description}</p>
                    )}

                    <div className="mt-5">
                      <p className="font-display text-3xl font-bold text-ink">
                        {formatMinorUnits(plan.price, plan.currency_code)}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {t("dashboard.overview.planGate.thenMonthly", {
                          amount: formatMinorUnits(plan.maintenance_price, plan.currency_code),
                        })}
                      </p>
                    </div>

                    {grantedFeatures.length > 0 && (
                      <ul className="mt-5 flex-1 space-y-2.5">
                        {grantedFeatures.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-ink/80">
                            <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                            {t(`dashboard.overview.planGate.feature.${f}`, { defaultValue: f })}
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      type="button"
                      onClick={() => openPinFor(plan)}
                      disabled={subscribe.isPending || isCurrent}
                      aria-busy={isSubscribingThis || undefined}
                      className="mt-6 flex h-10 items-center justify-center gap-1.5 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubscribingThis ? (
                        <ButtonSpinner label={t("dashboard.overview.planGate.subscribing")} size={16} />
                      ) : isCurrent ? (
                        t("dashboard.overview.planGate.currentPlan")
                      ) : (
                        t("dashboard.overview.planGate.subscribe")
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted">{t("dashboard.overview.planGate.noPlans")}</p>
          )}
        </div>
      )}

      <PinModal
        open={pinModalOpen}
        onClose={closePinModal}
        onConfirm={confirmSubscribe}
        loading={subscribe.isPending}
        error={subscribe.isError ? planErrorMessage(subscribe.error, t) : null}
      />
    </div>
  );
}

function Stat({ label, value, hint, accent }: { label: string; value: ReactNode; hint?: string; accent?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className={`mt-1 font-display text-2xl font-semibold ${accent ? "text-accent" : "text-ink"}`}>{value}</p>
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function Overview() {
  const { t } = useTranslation();
  const overview = useOverview();
  const wallets = useWallets();
  const txs = useTransactions(1, 5);
  const kyc = useKycStatus();
  const updatesRef = useRef<HTMLDivElement>(null);

  const scrollUpdates = (dir: 1 | -1) => {
    const el = updatesRef.current;
    if (!el) return;
    // En RTL, l'axe de défilement horizontal est inversé.
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: dir * (rtl ? -1 : 1) * 300, behavior: "smooth" });
  };

  const primaryWallet = wallets.data?.[0];
  const last30 = overview.data?.last_30_days;

  if (kyc.isLoading) {
    return <LoadingSpinner label={t("dashboard.loading")} className="min-h-[50vh]" />;
  }

  // En sandbox, le compte est actif dès l'inscription, sans KYC : l'écran d'attente de
  // vérification bloquerait l'accès au tableau de bord.
  if (!isSandbox && kyc.data && kyc.data.status !== "approved") {
    return <KycOnboardingView kyc={kyc.data} />;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Greeting
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard/deposit"
              className="inline-flex h-12 items-center gap-2.5 rounded-2xl bg-brand-light px-5 text-sm font-semibold text-brand shadow-card transition-shadow hover:shadow-pop"
            >
              <ArrowDownToLine size={18} />
              {t("dashboard.overview.deposit")}
            </Link>
            <Link
              to="/dashboard/withdraw"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-semibold text-ink transition-colors hover:bg-surface"
            >
              <ArrowUpFromLine size={16} />
              {t("dashboard.overview.withdraw")}
            </Link>
          </div>
        }
      />

      {/* En sandbox, toutes les fonctionnalités sont ouvertes : rien à souscrire. */}
      {!isSandbox && (
        <div className="mt-6">
          <PlanPrompt />
        </div>
      )}

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        {/* Solde */}
        <section className="rounded-3xl bg-surface-2 p-6 xl:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-sm font-medium text-muted-2">
              <Wallet size={16} />
              {t("dashboard.overview.balanceLabel")}
            </p>
            <Link
              to="/dashboard/wallet/new"
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
            >
              <Plus size={14} />
              {t("dashboard.overview.addWallet")}
            </Link>
          </div>

          {wallets.isLoading ? (
            <Loader2 size={22} className="mt-4 animate-spin text-muted" />
          ) : wallets.isError ? (
            <p className="mt-4 flex items-center gap-1.5 text-sm text-red-600">
              <AlertCircle size={15} /> {t("dashboard.overview.balanceError")}
            </p>
          ) : primaryWallet ? (
            <>
              <p className="mt-4 flex flex-wrap items-center gap-3 font-display text-3xl font-bold text-ink lg:text-4xl">
                {primaryWallet.flag_url && (
                  <img src={primaryWallet.flag_url} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" />
                )}
                {formatMinorUnits(primaryWallet.balance, primaryWallet.currency_code)}
              </p>
              {wallets.data && wallets.data.length > 1 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {wallets.data.slice(1).map((w) => (
                    <span
                      key={w.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-muted-2"
                    >
                      {w.flag_url && <img src={w.flag_url} alt="" className="h-4 w-4 rounded-full object-cover" />}
                      {formatMinorUnits(w.balance, w.currency_code)}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="mt-4 text-sm text-muted">
              {t("dashboard.overview.noWallet")}{" "}
              <Link to="/dashboard/wallet/new" className="font-semibold text-brand hover:text-brand-dark">
                {t("dashboard.overview.addOne")}
              </Link>
            </p>
          )}
        </section>

        {/* Aperçu des paiements */}
        <section className={`p-6 ${card}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className={sectionTitle}>{t("dashboard.overview.paymentsOverview")}</h2>
            <span className="text-xs text-muted">{t("dashboard.overview.last30days")}</span>
          </div>

          {overview.isLoading ? (
            <Loader2 size={22} className="mt-5 animate-spin text-muted" />
          ) : overview.isError ? (
            <p className="mt-5 flex items-center gap-1.5 text-sm text-red-600">
              <AlertCircle size={15} /> {t("dashboard.overview.overviewError")}
            </p>
          ) : (
            last30 && (
              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 xl:grid-cols-2">
                <Stat
                  label={t("dashboard.overview.successfulDeposits")}
                  value={last30.deposits.completed}
                  hint={t("dashboard.overview.outOf", { total: last30.deposits.total })}
                />
                <Stat
                  label={t("dashboard.overview.successfulWithdrawals")}
                  value={last30.payouts.completed}
                  hint={t("dashboard.overview.outOf", { total: last30.payouts.total })}
                />
                <Stat
                  label={t("dashboard.overview.depositSuccessRate")}
                  value={`${last30.deposit_success_rate_percent ?? "—"}%`}
                  accent
                />
                <Stat
                  label={t("dashboard.overview.withdrawalSuccessRate")}
                  value={`${last30.payout_success_rate_percent ?? "—"}%`}
                  accent
                />
              </div>
            )
          )}
        </section>
      </div>

      {/* Transactions récentes : liste façon boîte de réception */}
      <section className={`mt-4 overflow-hidden ${card}`}>
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <h2 className={sectionTitle}>{t("dashboard.overview.recentTransactions")}</h2>
          <Link
            to="/dashboard/transactions"
            className="inline-flex h-9 items-center rounded-full px-3 text-sm font-semibold text-brand transition-colors hover:bg-brand-light"
          >
            {t("dashboard.overview.seeAll")}
          </Link>
        </div>

        {txs.isLoading ? (
          <LoadingSpinner label={t("dashboard.loading")} className="border-t border-black/[0.06]" />
        ) : txs.isError ? (
          <p className="flex items-center gap-1.5 border-t border-black/[0.06] px-5 py-6 text-sm text-red-600">
            <AlertCircle size={15} /> {t("dashboard.overview.transactionsError")}
          </p>
        ) : txs.data && txs.data.data.length > 0 ? (
          <ul className="divide-y divide-black/[0.06] border-t border-black/[0.06]">
            {txs.data.data.map((tx) => (
              <TransactionRow key={tx.transaction_id} tx={tx} />
            ))}
          </ul>
        ) : (
          <p className="border-t border-black/[0.06] px-5 py-6 text-sm text-muted">
            {t("dashboard.overview.noTransactions")}
          </p>
        )}
      </section>

      {/* Actualités clés */}
      <section className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className={sectionTitle}>
            {t("dashboard.overview.keyUpdates")} <span className="font-normal text-muted">({keyUpdates.length})</span>
          </h2>
          <div className="flex gap-1">
            <button
              onClick={() => scrollUpdates(-1)}
              aria-label={t("dashboard.overview.prev")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-2 transition-colors hover:bg-black/[0.06] hover:text-ink"
            >
              <ChevronLeft size={18} className="rtl:rotate-180" />
            </button>
            <button
              onClick={() => scrollUpdates(1)}
              aria-label={t("dashboard.overview.next")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-2 transition-colors hover:bg-black/[0.06] hover:text-ink"
            >
              <ChevronRight size={18} className="rtl:rotate-180" />
            </button>
          </div>
        </div>

        <div ref={updatesRef} className="mt-3 flex gap-4 overflow-x-auto scroll-smooth pb-2">
          {keyUpdates.map((u) => (
            <div key={u.titleKey} className="flex w-72 shrink-0 gap-3 rounded-2xl bg-surface-2 p-4">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${toneClasses[u.tone]}`}>
                <u.icon size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{t(`dashboard.overview.${u.titleKey}`)}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{t(`dashboard.overview.${u.descKey}`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
