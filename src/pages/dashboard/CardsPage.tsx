import { Link } from "react-router-dom";
import { AlertCircle, CreditCard, Plus } from "lucide-react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { useCards } from "../../hooks/useCards";
import { formatMinorUnits } from "../../lib/format";
import { usePermissions } from "../../hooks/useMe";

const STATUS_STYLE: Record<string, string> = {
  active: "bg-accent-light text-accent",
  pending: "bg-amber-50 text-amber-700",
  frozen: "bg-sky-50 text-sky-700",
  terminated: "bg-surface text-muted-2",
  failed: "bg-red-50 text-red-700",
};

export function CardsPage() {
  const { t } = useTranslation();
  const cards = useCards();
  const canMove = usePermissions().can("money.move");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">{t("dashboard.cards.title")}</h1>
          <p className="mt-1 text-muted">{t("dashboard.cards.subtitle")}</p>
        </div>
        {canMove && (
          <Link
            to="/dashboard/cards/new"
            className="inline-flex items-center gap-2 rounded bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            <Plus size={16} />
            {t("dashboard.cards.create")}
          </Link>
        )}
      </div>

      {cards.isLoading ? (
        <LoadingSpinner label={t("dashboard.cards.loading")} className="mt-6" />
      ) : cards.isError ? (
        <p className="mt-6 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle size={15} /> {t("dashboard.cards.error")}
        </p>
      ) : cards.data && cards.data.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.data.map((c) => (
            <Link
              key={c.id}
              to={`/dashboard/cards/${c.id}`}
              className="block rounded-2xl border border-surface-2 bg-white p-5 transition-colors hover:border-brand"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-brand">
                  <CreditCard size={18} />
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    STATUS_STYLE[c.status] ?? "bg-surface text-muted-2"
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <p className="mt-4 text-sm text-muted">
                {c.brand} · {c.masked ?? t("dashboard.cards.pendingMask")}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">
                {formatMinorUnits(c.balance, c.currency_code)}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">{t("dashboard.cards.none")}</p>
      )}
    </div>
  );
}
