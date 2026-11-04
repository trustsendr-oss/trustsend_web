import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, FlaskConical, Plus } from "lucide-react";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { useWallets } from "../../hooks/useWallets";
import { formatMinorUnits } from "../../lib/format";
import { isSandbox } from "../../lib/domains";
import { WalletLogo } from "../../components/dashboard/WalletLogo";
import { SandboxFundDialog } from "../../components/dashboard/SandboxFundDialog";
import { usePermissions } from "../../hooks/useMe";

export function WalletPage() {
  const { t } = useTranslation();
  const wallets = useWallets();
  const [fundOpen, setFundOpen] = useState(false);
  const canMove = usePermissions().can("money.move");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">{t("dashboard.wallet.title")}</h1>
          <p className="mt-1 text-muted">{t("dashboard.wallet.subtitle")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {isSandbox && canMove && (
            <button
              type="button"
              onClick={() => setFundOpen(true)}
              disabled={!wallets.data?.length}
              className="inline-flex items-center gap-2 rounded border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FlaskConical size={16} />
              {t("dashboard.wallet.fund.button")}
            </button>
          )}
          {canMove && (
            <Link
              to="/dashboard/wallet/new"
              className="inline-flex items-center gap-2 rounded bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              <Plus size={16} />
              {t("dashboard.wallet.addWallet")}
            </Link>
          )}
        </div>
      </div>

      {wallets.isLoading ? (
        <LoadingSpinner label={t("dashboard.wallet.loading")} className="mt-6" />
      ) : wallets.isError ? (
        <p className="mt-6 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle size={15} /> {t("dashboard.wallet.error")}
        </p>
      ) : wallets.data && wallets.data.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wallets.data.map((w) => (
            <div key={w.id} className="rounded-2xl border border-surface-2 bg-white p-5">
              <div className="flex items-center justify-between">
                <WalletLogo wallet={w} />
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    w.status === "active"
                      ? "bg-accent-light text-accent"
                      : "bg-surface text-muted-2"
                  }`}
                >
                  {w.status}
                </span>
              </div>

              <p className="mt-4 text-sm text-muted">
                {w.currency_code}
                {w.currency?.name && <span className="text-muted-2"> · {w.currency.name}</span>}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">
                {formatMinorUnits(w.balance, w.currency_code)}
              </p>

              {(w.per_transaction_limit || w.daily_limit || w.monthly_limit) && (
                <dl className="mt-4 space-y-1.5 border-t border-surface-2 pt-4 text-xs">
                  {w.per_transaction_limit && (
                    <div className="flex justify-between">
                      <dt className="text-muted">{t("dashboard.wallet.perTransaction")}</dt>
                      <dd className="font-medium text-ink">
                        {formatMinorUnits(w.per_transaction_limit, w.currency_code)}
                      </dd>
                    </div>
                  )}
                  {w.daily_limit && (
                    <div className="flex justify-between">
                      <dt className="text-muted">{t("dashboard.wallet.dailyLimit")}</dt>
                      <dd className="font-medium text-ink">
                        {formatMinorUnits(w.daily_limit, w.currency_code)}
                      </dd>
                    </div>
                  )}
                  {w.monthly_limit && (
                    <div className="flex justify-between">
                      <dt className="text-muted">{t("dashboard.wallet.monthlyLimit")}</dt>
                      <dd className="font-medium text-ink">
                        {formatMinorUnits(w.monthly_limit, w.currency_code)}
                      </dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">{t("dashboard.wallet.none")}</p>
      )}

      {isSandbox && (
        <SandboxFundDialog
          open={fundOpen}
          onClose={() => setFundOpen(false)}
          wallets={wallets.data ?? []}
        />
      )}
    </div>
  );
}
