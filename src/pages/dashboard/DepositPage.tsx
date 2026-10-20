import { useCallback, useState } from "react";
import { AlertCircle, ArrowDownToLine, ArrowRight, Info, Lock, ShieldCheck } from "lucide-react";
import { ButtonSpinner, LoadingSpinner } from "../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { useCreateDeposit } from "../../hooks/useMobileMoney";
import { mobileMoneyErrorMessage } from "../../hooks/useMobileMoney";
import { useWallets } from "../../hooks/useWallets";
import { MobileMoneyForm, type MobileMoneyPreview } from "../../components/dashboard/MobileMoneyForm";
import { WalletLogo } from "../../components/dashboard/WalletLogo";
import { formatMinorUnits } from "../../lib/format";

const DEPOSIT_FORM_ID = "deposit-form";

export function DepositPage() {
  const { t } = useTranslation();
  const deposit = useCreateDeposit();
  const wallets = useWallets();
  const [preview, setPreview] = useState<MobileMoneyPreview | null>(null);
  const onSelectionChange = useCallback((p: MobileMoneyPreview) => setPreview(p), []);

  const balanceAfter =
    preview?.requestedMinorAmount !== null && preview?.requestedMinorAmount !== undefined
      ? Number(preview.wallet?.balance ?? 0) + preview.requestedMinorAmount
      : null;
  const amountLabel =
    preview?.currencyCode && preview.requestedMinorAmount !== null
      ? formatMinorUnits(String(preview.requestedMinorAmount), preview.currencyCode)
      : null;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center gap-3 sm:items-start sm:gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand sm:h-12 sm:w-12 sm:rounded-2xl">
          <ArrowDownToLine size={20} />
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">{t("dashboard.deposit.title")}</h1>
          <p className="mt-0.5 text-sm text-muted sm:mt-1 sm:text-base">{t("dashboard.deposit.subtitle")}</p>
        </div>
      </div>

      {/* Portefeuilles */}
      <div className="mt-6 sm:mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-2">
          {t("dashboard.deposit.yourWallets")}
        </h2>

        {wallets.isLoading ? (
          <LoadingSpinner label={t("dashboard.deposit.walletsLoading")} className="mt-3" />
        ) : wallets.isError ? (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-red-600">
            <AlertCircle size={15} /> {t("dashboard.deposit.walletsError")}
          </p>
        ) : wallets.data && wallets.data.length > 0 ? (
          <div className="-mx-5 mt-3 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0">
            {wallets.data.map((w) => {
              const active = preview?.currencyCode === w.currency_code;
              return (
                <div
                  key={w.id}
                  className={`flex min-w-[165px] shrink-0 snap-start items-center gap-3 rounded-2xl border bg-white px-3.5 py-3 transition-all sm:min-w-[190px] sm:px-4 sm:py-3.5 ${
                    active ? "border-brand shadow-card ring-2 ring-brand/15" : "border-surface-2"
                  }`}
                >
                  <WalletLogo wallet={w} className="h-9 w-9 sm:h-10 sm:w-10" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted">{w.currency_code}</p>
                    <p className="truncate font-display text-base font-bold tabular-nums text-ink">
                      {formatMinorUnits(w.balance, w.currency_code)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">{t("dashboard.deposit.noWallets")}</p>
        )}
      </div>

      <div className="mt-4 grid items-start gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[1fr_360px]">
        <MobileMoneyForm
          operation="DEPOSIT"
          mutation={deposit}
          submitLabel={t("dashboard.deposit.submit")}
          pendingLabel={t("dashboard.deposit.submitting")}
          wallets={wallets.data}
          onSelectionChange={onSelectionChange}
          formId={DEPOSIT_FORM_ID}
          hideSubmitButton
        />

        {/* Récapitulatif */}
        <aside className="overflow-hidden rounded-2xl border border-surface-2 bg-white shadow-card lg:sticky lg:top-6">
          <div className="bg-gradient-to-br from-brand to-brand-dark px-5 py-4 text-white sm:px-6 sm:py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-white/70">
              {t("dashboard.deposit.previewAmount")}
            </p>
            <p className="mt-1 break-words font-display text-2xl font-bold tabular-nums sm:mt-1.5 sm:text-3xl">
              {amountLabel ?? (preview?.currencyCode ? formatMinorUnits("0", preview.currencyCode) : "—")}
            </p>
            {(preview?.countryLabel || preview?.providerLabel) && (
              <p className="mt-1 text-sm text-white/75">
                {[preview.providerLabel, preview.countryLabel].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>

          <div className="p-5 sm:p-6">
            <h2 className="font-display text-base font-semibold text-ink">{t("dashboard.deposit.previewTitle")}</h2>

            {!preview?.currencyCode ? (
              <p className="mt-3 flex items-start gap-2 text-sm text-muted">
                <Info size={15} className="mt-0.5 shrink-0 text-muted-2" />
                {t("dashboard.deposit.previewEmpty")}
              </p>
            ) : (
              <>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">{t("dashboard.deposit.previewBalance")}</dt>
                    <dd className="font-medium tabular-nums text-ink">
                      {formatMinorUnits(preview.wallet?.balance ?? "0", preview.currencyCode)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">{t("dashboard.deposit.previewAmount")}</dt>
                    <dd className="font-medium tabular-nums text-emerald-600">
                      {amountLabel ? `+${amountLabel}` : "—"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-dashed border-surface-2 pt-3">
                    <dt className="font-medium text-ink">{t("dashboard.deposit.previewAfter")}</dt>
                    <dd className="font-display text-lg font-bold tabular-nums text-ink">
                      {balanceAfter !== null ? formatMinorUnits(String(balanceAfter), preview.currencyCode) : "—"}
                    </dd>
                  </div>
                </dl>

                {!preview.wallet && (
                  <p className="mt-4 flex items-start gap-2 rounded-lg bg-brand-light/60 px-3.5 py-2.5 text-xs text-muted-2">
                    <Info size={14} className="mt-px shrink-0 text-brand" />
                    {t("dashboard.deposit.newWalletNotice")}
                  </p>
                )}
              </>
            )}

            {deposit.isError && (
              <p className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-700">
                <AlertCircle size={14} className="mt-px shrink-0" />
                {mobileMoneyErrorMessage(deposit.error, t)}
              </p>
            )}

            <button
              type="submit"
              form={DEPOSIT_FORM_ID}
              disabled={deposit.isPending || deposit.isSuccess || !preview?.canSubmit}
              aria-busy={deposit.isPending || undefined}
              className="group mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deposit.isPending ? (
                <ButtonSpinner label={t("dashboard.deposit.submitting")} />
              ) : (
                <>
                  <Lock size={15} />
                  {t("dashboard.deposit.submit")}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
              <ShieldCheck size={14} className="text-emerald-600" />
              {t("dashboard.deposit.securityNote")}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
