import { useEffect, useState, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowDownToLine,
  ArrowUpFromLine,
  Check,
  Copy,
  CreditCard,
  FlaskConical,
  Maximize2,
  Minimize2,
  Minus,
  Repeat,
  Smartphone,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Transaction, TransactionStatus, TransactionType } from "../../types/dashboard";
import type { OperatorInfo } from "../../hooks/usePaymentMethods";
import { formatFullDateTime } from "../../lib/format";
import { metaAmount, metaString, txAmount, txDirection } from "../../lib/transactions";

const statusClasses: Record<TransactionStatus, string> = {
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  failed: "bg-red-50 text-red-700 ring-red-600/20",
  pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  initiated: "bg-brand-light text-brand ring-brand/20",
};

const statusDots: Record<TransactionStatus, string> = {
  completed: "bg-emerald-500",
  failed: "bg-red-500",
  pending: "bg-amber-500",
  initiated: "bg-brand",
};

export function TxStatusBadge({ status }: { status: TransactionStatus }) {
  const { t } = useTranslation();
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${statusClasses[status] ?? "bg-surface text-muted-2 ring-surface-2"}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${statusDots[status] ?? "bg-muted"}`} />
      {t(`dashboard.transactions.status.${status}`, { defaultValue: status })}
    </span>
  );
}

const typeIcons: Record<TransactionType, typeof Repeat> = {
  mobile_money_deposit: ArrowDownToLine,
  mobile_money_payout: ArrowUpFromLine,
  fx_swap: Repeat,
  business_plan_subscription: CreditCard,
  business_plan_maintenance_fee: CreditCard,
  sandbox_funding: FlaskConical,
};

export function TxTypeIcon({ tx, size = "h-10 w-10" }: { tx: Transaction; size?: string }) {
  const Icon = typeIcons[tx.type] ?? ArrowUpFromLine;
  const direction = txDirection(tx);
  const tone =
    direction === "in"
      ? "bg-emerald-50 text-emerald-600"
      : direction === "swap"
        ? "bg-brand-light text-brand"
        : "bg-surface-2 text-muted-2";
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full ${tone} ${size}`}>
      <Icon size={16} />
    </span>
  );
}

/** Logo de l'opérateur mobile money, avec une icône téléphone en secours. */
export function OperatorLogo({ operator, size = "h-8 w-8" }: { operator?: OperatorInfo; size?: string }) {
  const [failed, setFailed] = useState(false);
  if (!operator?.logo || failed) {
    return (
      <span className={`flex shrink-0 items-center justify-center rounded-lg bg-surface-2 text-muted-2 ${size}`}>
        <Smartphone size={14} />
      </span>
    );
  }
  return (
    <img
      src={operator.logo}
      alt={operator.name}
      onError={() => setFailed(true)}
      className={`aspect-square shrink-0 rounded-lg border border-surface-2 bg-white object-contain p-0.5 ${size}`}
    />
  );
}

export function signedAmount(tx: Transaction): string | null {
  const amount = txAmount(tx);
  if (!amount) return null;
  const direction = txDirection(tx);
  return direction === "in" ? `+${amount}` : direction === "out" ? `−${amount}` : amount;
}

function CopyButton({ value }: { value: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(value).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      aria-label={t("dashboard.transactions.detail.copy")}
      className="rounded-md p-1 text-muted-2 transition-colors hover:bg-surface hover:text-ink"
    >
      {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
    </button>
  );
}

function Row({ label, children, copy }: { label: string; children: ReactNode; copy?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-sm text-muted">{label}</dt>
      <dd className="flex min-w-0 items-center gap-1 text-end text-sm font-medium text-ink">
        <span className="min-w-0 break-all">{children}</span>
        {copy && <CopyButton value={copy} />}
      </dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-2">{title}</h3>
      <dl className="mt-1 divide-y divide-surface-2">{children}</dl>
    </section>
  );
}

export function TransactionDetails({
  tx,
  operator,
  onClose,
}: {
  tx: Transaction | null;
  operator?: OperatorInfo;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "fr";
  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Ouvrir une autre transaction ré-affiche la fenêtre dépliée, comme un nouveau brouillon.
  useEffect(() => {
    setMinimized(false);
  }, [tx?.transaction_id]);

  useEffect(() => {
    if (!tx) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [tx, onClose]);

  if (!tx) return null;

  const direction = txDirection(tx);
  const amount = signedAmount(tx);
  const isMobileMoney = tx.type === "mobile_money_deposit" || tx.type === "mobile_money_payout";
  const isSwap = tx.type === "fx_swap";
  const isPlan = tx.type === "business_plan_subscription" || tx.type === "business_plan_maintenance_fee";
  const phone = metaString(tx, "phone_number");
  const providerCode = metaString(tx, "provider_code");
  const failureReason = metaString(tx, "failure_reason");
  const fee = isSwap ? null : metaAmount(tx, "fee");
  const net = metaAmount(tx, "net_to_user") ?? metaAmount(tx, "net_to_clearing");
  const providerRef = metaString(tx, "provider_transaction_id");
  const postedId = metaString(tx, "posted_transaction_id");
  const fromCurrency = metaString(tx, "from_currency");
  const toCurrency = metaString(tx, "to_currency");

  return (
    <>
      {expanded && !minimized && (
        <div className="fixed inset-0 z-40 hidden bg-ink/40 backdrop-blur-sm md:block" onClick={() => setExpanded(false)} />
      )}
      <aside
        role="dialog"
        aria-labelledby="tx-detail-title"
        className={`fixed z-50 flex animate-compose-in flex-col overflow-hidden bg-white shadow-[0_8px_40px_rgba(25,40,57,0.28)] ${
          minimized
            ? "bottom-0 right-4 w-72 rounded-t-xl md:right-6"
            : expanded
              ? "inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:h-[85vh] md:w-[min(760px,92vw)] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl"
              : "inset-0 md:inset-auto md:bottom-0 md:right-6 md:h-[min(640px,88vh)] md:w-[440px] md:rounded-t-xl"
        }`}
      >
        <header
          onClick={() => minimized && setMinimized(false)}
          className={`flex shrink-0 items-center gap-2 bg-ink py-2.5 pl-4 pr-2 text-white ${minimized ? "cursor-pointer" : ""}`}
        >
          <h2 id="tx-detail-title" className="min-w-0 flex-1 truncate text-sm font-semibold">
            {t(`dashboard.transactions.types.${tx.type}`, { defaultValue: tx.type })}
            <span className="font-normal text-white/60"> · #{tx.transaction_id}</span>
          </h2>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMinimized((m) => !m);
            }}
            aria-label={t(minimized ? "dashboard.transactions.detail.restore" : "dashboard.transactions.detail.minimize")}
            className="hidden rounded p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white md:block"
          >
            <Minus size={15} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMinimized(false);
              setExpanded((x) => !x);
            }}
            aria-label={t(expanded ? "dashboard.transactions.detail.exitFullscreen" : "dashboard.transactions.detail.fullscreen")}
            className="hidden rounded p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white md:block"
          >
            {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label={t("dashboard.transactions.detail.close")}
            className="rounded p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </header>

        <div className={`flex-1 overflow-y-auto px-6 pb-8 ${minimized ? "hidden" : ""}`}>
          <div className="flex flex-col items-center border-b border-surface-2 py-7 text-center">
            <TxTypeIcon tx={tx} size="h-12 w-12" />
            <p className="mt-3 text-sm font-medium text-muted">
              {t(`dashboard.transactions.types.${tx.type}`, { defaultValue: tx.type })}
            </p>
            <p
              className={`mt-1 font-display text-3xl font-bold tabular-nums ${
                direction === "in" ? "text-emerald-600" : "text-ink"
              }`}
            >
              {amount ?? "—"}
            </p>
            {isSwap && fromCurrency && toCurrency && (
              <p className="mt-1 text-sm text-muted">
                {fromCurrency} → {toCurrency}
              </p>
            )}
            <div className="mt-3">
              <TxStatusBadge status={tx.status} />
            </div>
          </div>

          {tx.status === "failed" && failureReason && (
            <p className="mt-5 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
              <span>
                <span className="font-semibold">{t("dashboard.transactions.detail.failureReason")} : </span>
                {failureReason}
              </span>
            </p>
          )}

          {isMobileMoney && (
            <Section title={t("dashboard.transactions.detail.paymentMethod")}>
              <div className="flex items-center gap-3 py-3">
                <OperatorLogo operator={operator} size="h-11 w-11" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {operator?.name ?? providerCode ?? tx.provider}
                  </p>
                  <p className="truncate text-xs text-muted">{t("dashboard.transactions.detail.mobileMoney")}</p>
                </div>
              </div>
              {operator && (
                <Row label={t("dashboard.transactions.detail.country")}>
                  <span className="inline-flex items-center gap-1.5">
                    {operator.flag && (
                      <img src={operator.flag} alt="" className="aspect-[10/7] w-5 rounded-sm object-cover" />
                    )}
                    {operator.countryName[lang]}
                  </span>
                </Row>
              )}
              {phone && (
                <Row
                  label={
                    tx.type === "mobile_money_deposit"
                      ? t("dashboard.transactions.detail.payerPhone")
                      : t("dashboard.transactions.detail.recipientPhone")
                  }
                  copy={phone}
                >
                  <span className="font-mono tabular-nums">+{phone.replace(/^\+/, "")}</span>
                </Row>
              )}
            </Section>
          )}

          {isSwap && (
            <Section title={t("dashboard.transactions.detail.swap")}>
              {metaAmount(tx, "amount_in", fromCurrency) && (
                <Row label={t("dashboard.transactions.detail.debited")}>{metaAmount(tx, "amount_in", fromCurrency)}</Row>
              )}
              {metaAmount(tx, "amount_out", toCurrency) && (
                <Row label={t("dashboard.transactions.detail.credited")}>{metaAmount(tx, "amount_out", toCurrency)}</Row>
              )}
              {metaString(tx, "rate") && (
                <Row label={t("dashboard.transactions.detail.rate")}>
                  1 {fromCurrency} = {metaString(tx, "rate")} {toCurrency}
                </Row>
              )}
              {metaAmount(tx, "fee", metaString(tx, "fee_currency")) && (
                <Row label={t("dashboard.transactions.detail.fee")}>
                  {metaAmount(tx, "fee", metaString(tx, "fee_currency"))}
                </Row>
              )}
            </Section>
          )}

          {isPlan && metaString(tx, "plan_code") && (
            <Section title={t("dashboard.transactions.detail.plan")}>
              <Row label={t("dashboard.transactions.detail.planCode")}>{metaString(tx, "plan_code")}</Row>
            </Section>
          )}

          {(fee || net) && (
            <Section title={t("dashboard.transactions.detail.amounts")}>
              <Row label={t("dashboard.transactions.detail.grossAmount")}>{txAmount(tx) ?? "—"}</Row>
              {fee && <Row label={t("dashboard.transactions.detail.fee")}>{fee}</Row>}
              {net && (
                <Row label={t("dashboard.transactions.detail.netAmount")}>
                  <span className="font-semibold">{net}</span>
                </Row>
              )}
            </Section>
          )}

          <Section title={t("dashboard.transactions.detail.references")}>
            <Row label={t("dashboard.transactions.detail.transactionId")} copy={String(tx.transaction_id)}>
              <span className="font-mono text-xs">{tx.transaction_id}</span>
            </Row>
            {providerRef && (
              <Row label={t("dashboard.transactions.detail.providerRef")} copy={providerRef}>
                <span className="font-mono text-xs">{providerRef}</span>
              </Row>
            )}
            {postedId && (
              <Row label={t("dashboard.transactions.detail.ledgerEntry")} copy={postedId}>
                <span className="font-mono text-xs">{postedId}</span>
              </Row>
            )}
            {tx.provider && <Row label={t("dashboard.transactions.detail.processor")}>{tx.provider}</Row>}
          </Section>

          <Section title={t("dashboard.transactions.detail.timeline")}>
            <Row label={t("dashboard.transactions.detail.createdAt")}>{formatFullDateTime(tx.created_at)}</Row>
            <Row label={t("dashboard.transactions.detail.completedAt")}>
              {tx.completed_at ? formatFullDateTime(tx.completed_at) : "—"}
            </Row>
          </Section>
        </div>
      </aside>
    </>
  );
}
