import { useEffect, useState } from "react";
import { AlertCircle, ChevronLeft, ChevronRight, Inbox, Search, X } from "lucide-react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { useTransactions, type TransactionFilters } from "../../hooks/useTransactions";
import { useWallets } from "../../hooks/useWallets";
import { useOperators, type OperatorInfo } from "../../hooks/usePaymentMethods";
import {
  OperatorLogo,
  TransactionDetails,
  TxStatusBadge,
  TxTypeIcon,
  signedAmount,
} from "../../components/dashboard/TransactionDetails";
import { formatDateTime } from "../../lib/format";
import { metaString, txDirection } from "../../lib/transactions";
import type { Transaction, TransactionStatus, TransactionType } from "../../types/dashboard";

const LIMIT = 20;

const TYPES: TransactionType[] = [
  "mobile_money_deposit",
  "mobile_money_payout",
  "fx_swap",
  "business_plan_subscription",
  "business_plan_maintenance_fee",
  "sandbox_funding",
];
const STATUSES: TransactionStatus[] = ["completed", "pending", "initiated", "failed"];

const EMPTY_FILTERS: Required<Omit<TransactionFilters, "q">> = {
  type: "",
  status: "",
  currency_code: "",
  date_from: "",
  date_to: "",
};

const fieldClasses =
  "h-10 rounded-lg border border-surface-2 bg-white px-3 text-sm text-ink outline-none transition-shadow focus:border-ink focus:ring-4 focus:ring-ink/[0.08]";

/** Moyen de paiement affiché en liste : opérateur mobile money, paire de devises ou portefeuille. */
function PaymentMethod({ tx, operator }: { tx: Transaction; operator?: OperatorInfo }) {
  const { t } = useTranslation();
  if (tx.type === "mobile_money_deposit" || tx.type === "mobile_money_payout") {
    const phone = metaString(tx, "phone_number");
    return (
      <div className="flex min-w-0 items-center gap-2.5">
        <OperatorLogo operator={operator} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">
            {operator?.name ?? metaString(tx, "provider_code") ?? tx.provider}
          </p>
          {phone && <p className="truncate font-mono text-xs text-muted">+{phone.replace(/^\+/, "")}</p>}
        </div>
      </div>
    );
  }
  if (tx.type === "fx_swap") {
    return (
      <p className="text-sm font-medium text-ink">
        {metaString(tx, "from_currency")} → {metaString(tx, "to_currency")}
      </p>
    );
  }
  return <p className="text-sm text-muted">{t("dashboard.transactions.wallet")}</p>;
}

function amountClass(tx: Transaction) {
  return txDirection(tx) === "in" ? "text-emerald-600" : "text-ink";
}

export function TransactionsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const txs = useTransactions(page, LIMIT, { ...filters, q });
  const wallets = useWallets();
  const operators = useOperators();

  // Recherche envoyée à l'API après une courte pause de frappe.
  useEffect(() => {
    const id = setTimeout(() => {
      setQ(search.trim());
      setPage(1);
    }, 350);
    return () => clearTimeout(id);
  }, [search]);

  const setFilter = <K extends keyof typeof EMPTY_FILTERS>(key: K, value: (typeof EMPTY_FILTERS)[K]) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  };
  const hasFilters = q !== "" || Object.values(filters).some((v) => v !== "");
  const resetFilters = () => {
    setSearch("");
    setQ("");
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };
  const totalPages = txs.data ? Math.max(1, Math.ceil(txs.data.meta.total / LIMIT)) : 1;
  const operatorOf = (tx: Transaction) => {
    const code = metaString(tx, "provider_code");
    return code ? operators.get(code) : undefined;
  };
  const typeLabel = (tx: Transaction) => t(`dashboard.transactions.types.${tx.type}`, { defaultValue: tx.type });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">{t("dashboard.transactions.title")}</h1>
      <p className="mt-1 text-muted">{t("dashboard.transactions.subtitle")}</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-surface-2 bg-white shadow-card">
        <div className="space-y-3 border-b border-surface-2 p-4">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("dashboard.transactions.filters.searchPlaceholder")}
              aria-label={t("dashboard.transactions.filters.search")}
              className={`${fieldClasses} w-full pl-9`}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center">
            <select
              value={filters.type}
              onChange={(e) => setFilter("type", e.target.value as TransactionType | "")}
              aria-label={t("dashboard.transactions.filters.type")}
              className={fieldClasses}
            >
              <option value="">{t("dashboard.transactions.filters.allTypes")}</option>
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {t(`dashboard.transactions.types.${type}`)}
                </option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={(e) => setFilter("status", e.target.value as TransactionStatus | "")}
              aria-label={t("dashboard.transactions.filters.status")}
              className={fieldClasses}
            >
              <option value="">{t("dashboard.transactions.filters.allStatuses")}</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {t(`dashboard.transactions.status.${status}`)}
                </option>
              ))}
            </select>
            <select
              value={filters.currency_code}
              onChange={(e) => setFilter("currency_code", e.target.value)}
              aria-label={t("dashboard.transactions.filters.currency")}
              className={fieldClasses}
            >
              <option value="">{t("dashboard.transactions.filters.allCurrencies")}</option>
              {(wallets.data ?? []).map((w) => (
                <option key={w.id} value={w.currency_code}>
                  {w.currency_code}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-xs text-muted">
              <span className="shrink-0">{t("dashboard.transactions.filters.from")}</span>
              <input
                type="date"
                value={filters.date_from}
                max={filters.date_to || undefined}
                onChange={(e) => setFilter("date_from", e.target.value)}
                className={`${fieldClasses} min-w-0 flex-1`}
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-muted">
              <span className="shrink-0">{t("dashboard.transactions.filters.to")}</span>
              <input
                type="date"
                value={filters.date_to}
                min={filters.date_from || undefined}
                onChange={(e) => setFilter("date_to", e.target.value)}
                className={`${fieldClasses} min-w-0 flex-1`}
              />
            </label>
            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-2 transition-colors hover:bg-surface hover:text-ink lg:ml-auto"
              >
                <X size={14} /> {t("dashboard.transactions.filters.reset")}
              </button>
            )}
          </div>
        </div>

        {txs.isLoading ? (
          <LoadingSpinner label={t("dashboard.loading")} />
        ) : txs.isError ? (
          <p className="flex items-center gap-1.5 px-5 py-8 text-sm text-red-600">
            <AlertCircle size={15} /> {t("dashboard.transactions.error")}
          </p>
        ) : txs.data && txs.data.data.length > 0 ? (
          <>
            {/* Tableau (écrans moyens et larges) */}
            <table className="hidden w-full text-left md:table">
              <thead className="border-b border-surface-2 bg-surface text-[11px] font-semibold uppercase tracking-wider text-muted-2">
                <tr>
                  <th className="px-5 py-3">{t("dashboard.transactions.columns.transaction")}</th>
                  <th className="px-5 py-3">{t("dashboard.transactions.columns.method")}</th>
                  <th className="px-5 py-3">{t("dashboard.transactions.columns.date")}</th>
                  <th className="px-5 py-3">{t("dashboard.transactions.columns.status")}</th>
                  <th className="px-5 py-3 text-end">{t("dashboard.transactions.columns.amount")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-2">
                {txs.data.data.map((tx) => (
                  <tr
                    key={tx.transaction_id}
                    tabIndex={0}
                    onClick={() => setSelected(tx)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSelected(tx))}
                    className={`cursor-pointer transition-colors hover:bg-surface focus:bg-surface focus:outline-none ${
                      selected?.transaction_id === tx.transaction_id ? "bg-brand-light/60" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <TxTypeIcon tx={tx} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">{typeLabel(tx)}</p>
                          <p className="font-mono text-xs text-muted">#{tx.transaction_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-[220px] px-5 py-3.5">
                      <PaymentMethod tx={tx} operator={operatorOf(tx)} />
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-sm text-muted">{formatDateTime(tx.created_at)}</td>
                    <td className="px-5 py-3.5">
                      <TxStatusBadge status={tx.status} />
                    </td>
                    <td className={`whitespace-nowrap px-5 py-3.5 text-end text-sm font-semibold tabular-nums ${amountClass(tx)}`}>
                      {signedAmount(tx) ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Liste (mobile) */}
            <ul className="divide-y divide-surface-2 md:hidden">
              {txs.data.data.map((tx) => {
                const operator = operatorOf(tx);
                return (
                  <li key={tx.transaction_id}>
                    <button
                      type="button"
                      onClick={() => setSelected(tx)}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface"
                    >
                      <TxTypeIcon tx={tx} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-ink">{typeLabel(tx)}</p>
                        <p className="truncate text-xs text-muted">
                          {operator?.name ?? metaString(tx, "provider_code") ?? `#${tx.transaction_id}`} ·{" "}
                          {formatDateTime(tx.created_at)}
                        </p>
                      </div>
                      <div className="shrink-0 text-end">
                        <p className={`text-sm font-semibold tabular-nums ${amountClass(tx)}`}>{signedAmount(tx) ?? "—"}</p>
                        <div className="mt-1">
                          <TxStatusBadge status={tx.status} />
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="flex flex-col items-center px-5 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-muted-2">
              <Inbox size={20} />
            </span>
            <p className="mt-3 text-sm text-muted">
              {hasFilters ? t("dashboard.transactions.filters.noResults") : t("dashboard.transactions.none")}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 text-sm font-semibold text-brand hover:underline"
              >
                {t("dashboard.transactions.filters.reset")}
              </button>
            )}
          </div>
        )}

        {txs.data && (txs.data.meta.total > LIMIT || (hasFilters && txs.data.meta.total > 0)) && (
          <div className="flex items-center justify-between border-t border-surface-2 px-5 py-3.5">
            <p className="text-xs text-muted">
              {t("dashboard.transactions.pageOf", { page: txs.data.meta.page, total: totalPages })} ·{" "}
              {t("dashboard.transactions.outOfTotal", { count: txs.data.meta.total })}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                aria-label={t("dashboard.transactions.previous")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-2 text-muted-2 transition-colors hover:text-ink disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                aria-label={t("dashboard.transactions.next")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-2 text-muted-2 transition-colors hover:text-ink disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <TransactionDetails
        tx={selected}
        operator={selected ? operatorOf(selected) : undefined}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
