import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  Ban,
  CreditCard,
  Loader2,
  Snowflake,
  PlayCircle,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePermissions } from "../../hooks/useMe";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import {
  useCards,
  useCardTransactions,
  useTopupCard,
  useWithdrawCard,
  useFreezeCard,
  useUnfreezeCard,
  useTerminateCard,
  cardErrorMessage,
} from "../../hooks/useCards";
import { PinModal } from "../../components/dashboard/PinModal";
import { formatMinorUnits, formatDateTime } from "../../lib/format";

const inputClasses =
  "w-full rounded-md border border-surface-2 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-shadow duration-150 placeholder:text-muted-2 focus:border-ink focus:ring-4 focus:ring-ink/[0.08] disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60";

const STATUS_STYLE: Record<string, string> = {
  active: "bg-accent-light text-accent",
  pending: "bg-amber-50 text-amber-700",
  frozen: "bg-sky-50 text-sky-700",
  terminated: "bg-surface text-muted-2",
  failed: "bg-red-50 text-red-700",
};

function newIdempotencyKey() {
  return crypto.randomUUID();
}

function AmountAction({
  cardId,
  kind,
}: {
  cardId: number;
  kind: "topup" | "withdraw";
}) {
  const { t } = useTranslation();
  const topup = useTopupCard();
  const withdraw = useWithdrawCard();
  const mutation = kind === "topup" ? topup : withdraw;
  const [amount, setAmount] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState(newIdempotencyKey);
  const [pinModalOpen, setPinModalOpen] = useState(false);

  const minorAmount = amount ? Math.round(Number(amount) * 100) : null;
  const canSubmit = minorAmount !== null && minorAmount > 0;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setPinModalOpen(true);
  };

  const confirmWithPin = (pin: string) => {
    if (minorAmount === null) return;
    mutation.mutate(
      { id: cardId, amount: String(minorAmount), pin, idempotency_key: idempotencyKey },
      {
        onSuccess: () => {
          setPinModalOpen(false);
          setAmount("");
          setIdempotencyKey(newIdempotencyKey());
        },
      },
    );
  };

  const closePinModal = () => {
    setPinModalOpen(false);
    if (mutation.isError) mutation.reset();
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        type="number"
        min="0"
        step="0.01"
        placeholder={t("dashboard.cardDetail.amountPlaceholder")}
        value={amount}
        onInput={(e) => setAmount(e.currentTarget.value)}
        className={`${inputClasses} max-w-[160px]`}
      />
      <button
        type="submit"
        disabled={!canSubmit || mutation.isPending}
        aria-busy={mutation.isPending || undefined}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-surface-2 px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {mutation.isPending ? (
          <Loader2 size={14} className="animate-spin" aria-hidden="true" />
        ) : kind === "topup" ? (
          <PlusCircle size={14} />
        ) : (
          <MinusCircle size={14} />
        )}
        {t(`dashboard.cardDetail.${kind}`)}
      </button>

      <PinModal
        open={pinModalOpen}
        onClose={closePinModal}
        onConfirm={confirmWithPin}
        loading={mutation.isPending}
        error={mutation.isError ? cardErrorMessage(mutation.error, t) : null}
      />
    </form>
  );
}

export function CardDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const cardId = Number(id);
  const cards = useCards();
  const transactions = useCardTransactions(cardId);
  const freeze = useFreezeCard();
  const unfreeze = useUnfreezeCard();
  const terminate = useTerminateCard();
  const canMove = usePermissions().can("money.move");

  const card = cards.data?.find((c) => c.id === cardId);

  if (cards.isLoading) {
    return (
      <LoadingSpinner label={t("dashboard.cards.loading")} className="min-h-[50vh]" />
    );
  }

  if (cards.isError || !card) {
    return (
      <p className="flex items-center gap-1.5 text-sm text-red-600">
        <AlertCircle size={15} /> {t("dashboard.cardDetail.notFound")}
      </p>
    );
  }

  const doTerminate = () => {
    if (!window.confirm(t("dashboard.cardDetail.confirmTerminate"))) return;
    terminate.mutate({ id: card.id, idempotency_key: newIdempotencyKey() });
  };

  return (
    <div className="max-w-3xl">
      <Link
        to="/dashboard/cards"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-2 transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} />
        {t("dashboard.cardDetail.back")}
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-brand">
            <CreditCard size={20} />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-ink">
              {card.brand} · {card.masked ?? t("dashboard.cards.pendingMask")}
            </h1>
            <p className="text-sm text-muted">{t("dashboard.cardDetail.cardId", { id: card.id })}</p>
          </div>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            STATUS_STYLE[card.status] ?? "bg-surface text-muted-2"
          }`}
        >
          {card.status}
        </span>
      </div>

      <div className="mt-6 rounded-2xl border border-surface-2 bg-white p-6">
        <p className="text-sm text-muted">{t("dashboard.cardDetail.balance")}</p>
        <p className="mt-1 font-display text-3xl font-bold text-ink">
          {formatMinorUnits(card.balance, card.currency_code)}
        </p>

        {canMove && card.status === "active" && (
          <div className="mt-5 flex flex-wrap gap-3 border-t border-surface-2 pt-5">
            <AmountAction cardId={card.id} kind="topup" />
            <AmountAction cardId={card.id} kind="withdraw" />
          </div>
        )}

        {canMove && (
        <div className="mt-5 flex flex-wrap gap-2 border-t border-surface-2 pt-5">
          {card.status === "active" && (
            <button
              onClick={() => freeze.mutate({ id: card.id, idempotency_key: newIdempotencyKey() })}
              disabled={freeze.isPending}
              className="inline-flex items-center gap-1.5 rounded-full border border-surface-2 px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:border-amber-300 hover:text-amber-700 disabled:opacity-50"
            >
              <Snowflake size={14} />
              {t("dashboard.cardDetail.freeze")}
            </button>
          )}
          {card.status === "frozen" && (
            <button
              onClick={() => unfreeze.mutate({ id: card.id, idempotency_key: newIdempotencyKey() })}
              disabled={unfreeze.isPending}
              className="inline-flex items-center gap-1.5 rounded-full border border-surface-2 px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent disabled:opacity-50"
            >
              <PlayCircle size={14} />
              {t("dashboard.cardDetail.unfreeze")}
            </button>
          )}
          {card.status !== "terminated" && (
            <button
              onClick={doTerminate}
              disabled={terminate.isPending}
              className="inline-flex items-center gap-1.5 rounded-full border border-surface-2 px-3.5 py-2 text-xs font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 disabled:opacity-50"
            >
              <Ban size={14} />
              {t("dashboard.cardDetail.terminate")}
            </button>
          )}
        </div>
        )}

        {(freeze.isError || unfreeze.isError || terminate.isError) && (
          <p className="mt-4 flex items-center gap-1.5 rounded border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            <AlertCircle size={15} />
            {cardErrorMessage(freeze.error ?? unfreeze.error ?? terminate.error, t)}
          </p>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-surface-2 bg-white">
        <div className="border-b border-surface-2 px-5 py-4">
          <h2 className="font-display text-base font-bold text-ink">
            {t("dashboard.cardDetail.transactions")}
          </h2>
        </div>
        {transactions.isLoading ? (
          <LoadingSpinner label={t("dashboard.cards.loading")} />
        ) : transactions.isError ? (
          <p className="flex items-center gap-1.5 px-5 py-8 text-sm text-red-600">
            <AlertCircle size={15} /> {t("dashboard.cardDetail.transactionsError")}
          </p>
        ) : transactions.data && transactions.data.length > 0 ? (
          <ul className="divide-y divide-surface-2">
            {transactions.data.map((tx) => (
              <li key={tx.transactionId} className="flex items-center justify-between px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">
                    {tx.description || tx.transactionId}
                  </p>
                  <p className="text-xs text-muted">{formatDateTime(tx.createdAt)}</p>
                </div>
                <p className="shrink-0 font-mono text-sm font-semibold text-ink">
                  {card.currency_code} {tx.amount}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-8 text-sm text-muted">{t("dashboard.cardDetail.noTransactions")}</p>
        )}
      </div>
    </div>
  );
}
