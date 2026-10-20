import { useTranslation } from "react-i18next";
import type { Transaction } from "../../types/dashboard";
import type { OperatorInfo } from "../../hooks/usePaymentMethods";
import { formatDateTime } from "../../lib/format";
import { metaString, txDirection } from "../../lib/transactions";
import { OperatorLogo, TxStatusBadge, TxTypeIcon, signedAmount } from "./TransactionDetails";

/** Ligne compacte de transaction (Overview) ; un clic ouvre le détail. */
export function TransactionRow({
  tx,
  operator,
  selected,
  onSelect,
}: {
  tx: Transaction;
  operator?: OperatorInfo;
  selected?: boolean;
  onSelect: (tx: Transaction) => void;
}) {
  const { t } = useTranslation();
  const isMobileMoney = tx.type === "mobile_money_deposit" || tx.type === "mobile_money_payout";
  const phone = metaString(tx, "phone_number");
  const subtitle = isMobileMoney
    ? [operator?.name ?? metaString(tx, "provider_code") ?? tx.provider, phone && `+${phone.replace(/^\+/, "")}`]
        .filter(Boolean)
        .join(" · ")
    : tx.type === "fx_swap"
      ? `${metaString(tx, "from_currency") ?? ""} → ${metaString(tx, "to_currency") ?? ""}`
      : `#${tx.transaction_id}`;

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(tx)}
        className={`flex w-full items-center gap-4 px-5 py-3.5 text-start transition-colors hover:bg-surface ${
          selected ? "bg-brand-light/60" : ""
        }`}
      >
        <span className="relative shrink-0">
          <TxTypeIcon tx={tx} />
          {isMobileMoney && (
            <span className="absolute -bottom-1 -end-1 rounded-md ring-2 ring-white">
              <OperatorLogo operator={operator} size="h-5 w-5" />
            </span>
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">
            {t(`dashboard.transactions.types.${tx.type}`, { defaultValue: tx.type })}
          </p>
          <p className="truncate text-xs text-muted">{subtitle}</p>
        </div>
        <p className="hidden shrink-0 text-xs text-muted sm:block">{formatDateTime(tx.created_at)}</p>
        <div className="hidden shrink-0 sm:block">
          <TxStatusBadge status={tx.status} />
        </div>
        <div className="w-32 shrink-0 text-end">
          <p
            className={`text-sm font-semibold tabular-nums ${txDirection(tx) === "in" ? "text-emerald-600" : "text-ink"}`}
          >
            {signedAmount(tx) ?? "—"}
          </p>
          <div className="mt-1 sm:hidden">
            <TxStatusBadge status={tx.status} />
          </div>
        </div>
      </button>
    </li>
  );
}
