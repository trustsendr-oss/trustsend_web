import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, Info, Phone } from "lucide-react";
import { ButtonSpinner, LoadingSpinner } from "../LoadingSpinner";
import type { UseMutationResult } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { usePaymentMethods } from "../../hooks/usePaymentMethods";
import { ImageSelect } from "./ImageSelect";
import type { MobileMoneyPayload } from "../../hooks/useMobileMoney";
import { mobileMoneyErrorMessage } from "../../hooks/useMobileMoney";
import { decimalsCount, type MobileMoneyOperation } from "../../types/paymentMethods";
import type { MobileMoneyOperationResult, Wallet } from "../../types/dashboard";
import { formatMinorUnits } from "../../lib/format";
import { LiveStatusCheck } from "./LiveStatusCheck";
import { PinModal } from "./PinModal";
import { OutlinedField, outlinedControl } from "./OutlinedField";

export interface MobileMoneyPreview {
  wallet?: Wallet;
  currencyCode: string;
  countryLabel?: string;
  providerLabel?: string;
  amount: string;
  requestedMinorAmount: number | null;
  insufficientBalance: boolean;
  canSubmit: boolean;
}

function StepTitle({ step, title, desc }: { step: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
        {step}
      </span>
      <div>
        <h2 className="font-display text-[15px] font-semibold text-ink sm:text-base">{title}</h2>
        <p className="mt-0.5 text-xs text-muted sm:text-sm">{desc}</p>
      </div>
    </div>
  );
}

function newIdempotencyKey() {
  return crypto.randomUUID();
}

export function MobileMoneyForm({
  operation,
  mutation,
  submitLabel,
  pendingLabel,
  wallets,
  onSelectionChange,
  formId,
  hideSubmitButton = false,
}: {
  operation: MobileMoneyOperation;
  mutation: UseMutationResult<MobileMoneyOperationResult, unknown, MobileMoneyPayload>;
  submitLabel: string;
  pendingLabel: string;
  wallets?: Wallet[];
  onSelectionChange?: (preview: MobileMoneyPreview) => void;
  formId?: string;
  hideSubmitButton?: boolean;
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "fr";
  const methods = usePaymentMethods();
  const [countryCode, setCountryCode] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [providerCode, setProviderCode] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState(newIdempotencyKey);
  const [pinModalOpen, setPinModalOpen] = useState(false);

  const countries = methods.data?.active_configuration?.countries ?? [];
  const country = countries.find((c) => c.country === countryCode);

  const currencies = useMemo(() => {
    if (!country) return [];
    const seen = new Map<string, string>();
    for (const p of country.providers) {
      for (const c of p.currencies) {
        if (c.operationTypes[operation]?.status === "OPERATIONAL") {
          seen.set(c.currency, c.displayName);
        }
      }
    }
    return Array.from(seen, ([currency, displayName]) => ({ currency, displayName }));
  }, [country, operation]);

  const providers = useMemo(() => {
    if (!country || !currencyCode) return [];
    return country.providers.filter((p) =>
      p.currencies.some(
        (c) => c.currency === currencyCode && c.operationTypes[operation]?.status === "OPERATIONAL",
      ),
    );
  }, [country, currencyCode, operation]);

  const countryOptions = useMemo(
    () => countries.map((c) => ({ value: c.country, label: c.displayName[lang], image: c.flag })),
    [countries, lang],
  );

  const providerOptions = useMemo(
    () => providers.map((p) => ({ value: p.provider, label: p.displayName, image: p.logo })),
    [providers],
  );

  const activeConfig = useMemo(() => {
    const provider = providers.find((p) => p.provider === providerCode);
    const currency = provider?.currencies.find((c) => c.currency === currencyCode);
    return currency?.operationTypes[operation] ?? null;
  }, [providers, providerCode, currencyCode, operation]);

  const selectedWallet = useMemo(
    () => wallets?.find((w) => w.currency_code === currencyCode),
    [wallets, currencyCode],
  );

  // Décimales acceptées par l'opérateur pour cette devise (0 pour XAF, XOF…).
  const amountDecimals = activeConfig ? Math.min(decimalsCount(activeConfig.decimalsInAmount), 2) : 2;

  // L'API attend des centièmes pour toutes les devises : 100 XAF → "10000". La saisie est
  // arrondie au pas de l'opérateur, qui refuserait une fraction d'unité.
  const requestedMinorAmount = useMemo(() => {
    if (!activeConfig || !amount) return null;
    const major = Number(amount);
    if (!Number.isFinite(major) || major <= 0) return null;
    return Math.round(major * 10 ** amountDecimals) * 10 ** (2 - amountDecimals);
  }, [activeConfig, amount, amountDecimals]);

  const insufficientBalance =
    operation === "PAYOUT" &&
    !!wallets &&
    !!currencyCode &&
    requestedMinorAmount !== null &&
    (!selectedWallet || requestedMinorAmount > Number(selectedWallet.balance));

  const providerLabel = providerOptions.find((p) => p.value === providerCode)?.label;
  const canSubmit = !!activeConfig && !insufficientBalance;

  useEffect(() => {
    onSelectionChange?.({
      wallet: selectedWallet,
      currencyCode,
      countryLabel: country?.displayName[lang],
      providerLabel,
      amount,
      requestedMinorAmount,
      insufficientBalance,
      canSubmit,
    });
  }, [
    selectedWallet,
    currencyCode,
    country,
    lang,
    providerLabel,
    amount,
    requestedMinorAmount,
    insufficientBalance,
    canSubmit,
    onSelectionChange,
  ]);

  const onCountryChange = (value: string) => {
    setCountryCode(value);
    setCurrencyCode("");
    setProviderCode("");
  };

  const onCurrencyChange = (value: string) => {
    setCurrencyCode(value);
    setProviderCode("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || requestedMinorAmount === null) return;
    setPinModalOpen(true);
  };

  const confirmWithPin = (pin: string) => {
    if (requestedMinorAmount === null) return;
    mutation.mutate({
      amount: String(requestedMinorAmount),
      currency_code: currencyCode,
      phone_number: phone,
      provider: providerCode,
      idempotency_key: idempotencyKey,
      pin,
    });
  };

  const closePinModal = () => {
    setPinModalOpen(false);
    if (mutation.isError) mutation.reset();
  };

  const reset = () => {
    setCountryCode("");
    setCurrencyCode("");
    setProviderCode("");
    setPhone("");
    setAmount("");
    setPinModalOpen(false);
    setIdempotencyKey(newIdempotencyKey());
    mutation.reset();
  };

  if (mutation.isSuccess) {
    return (
      <div className="rounded-2xl border border-surface-2 bg-white p-8 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 size={30} className="text-emerald-600" />
        </span>
        <p className="mt-3 font-display text-lg font-semibold text-ink">{t("dashboard.mobileMoneyForm.success")}</p>
        <p className="mt-1 text-sm text-muted">
          {t("dashboard.mobileMoneyForm.status")} : <span className="font-semibold text-ink">{mutation.data.status}</span>
          {" · "}{t("dashboard.mobileMoneyForm.reference")}{" "}
          <span className="font-semibold text-ink">
            #{mutation.data.deposit_id ?? mutation.data.payout_id}
          </span>
        </p>
        <button
          onClick={reset}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-surface-2 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand/30"
        >
          {t("dashboard.mobileMoneyForm.newOperation")}
        </button>

        <LiveStatusCheck
          kind={operation === "DEPOSIT" ? "deposits" : "payouts"}
          id={(mutation.data.deposit_id ?? mutation.data.payout_id)!}
        />
      </div>
    );
  }

  if (methods.isLoading) {
    return (
      <LoadingSpinner label={t("dashboard.mobileMoneyForm.loadingMethods")} size={20} className="py-6" />
    );
  }

  if (methods.isError) {
    return (
      <p className="flex items-center gap-1.5 text-sm text-red-600">
        <AlertCircle size={15} /> {t("dashboard.mobileMoneyForm.methodsError")}
      </p>
    );
  }

  return (
    <>
      <form
        id={formId}
        onSubmit={onSubmit}
        className="rounded-2xl border border-surface-2 bg-white shadow-card"
      >
        <section className="p-4 sm:p-6">
          <StepTitle
            step={1}
            title={t("dashboard.mobileMoneyForm.sectionMethod")}
            desc={t("dashboard.mobileMoneyForm.sectionMethodDesc")}
          />
          <div className="mt-5 grid gap-4 sm:gap-5 sm:grid-cols-2">
            <OutlinedField label={t("dashboard.mobileMoneyForm.country")} htmlFor="country" filled={!!countryCode}>
              <ImageSelect
                id="country"
                bare
                options={countryOptions}
                value={countryCode}
                onChange={onCountryChange}
                placeholder={t("dashboard.mobileMoneyForm.countryPlaceholder")}
              />
            </OutlinedField>

            <OutlinedField
              label={t("dashboard.mobileMoneyForm.currency")}
              htmlFor="currency"
              filled={!!currencyCode}
              disabled={!country}
            >
              <select
                id="currency"
                required
                disabled={!country}
                value={currencyCode}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className={`${outlinedControl} pe-10`}
              >
                <option value="" disabled hidden />
                {currencies.map((c) => (
                  <option key={c.currency} value={c.currency}>
                    {c.displayName} ({c.currency})
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute end-3.5 top-1/2 z-[1] -translate-y-1/2 text-muted-2"
              />
            </OutlinedField>

            <div className="sm:col-span-2">
              <OutlinedField
                label={t("dashboard.mobileMoneyForm.provider")}
                htmlFor="provider"
                filled={!!providerCode}
                disabled={!currencyCode}
              >
                <ImageSelect
                  id="provider"
                  bare
                  options={providerOptions}
                  value={providerCode}
                  onChange={setProviderCode}
                  placeholder={t("dashboard.mobileMoneyForm.providerPlaceholder")}
                  disabled={!currencyCode}
                />
              </OutlinedField>
            </div>
          </div>
        </section>

        <section className="border-t border-surface-2 p-4 sm:p-6">
          <StepTitle
            step={2}
            title={t("dashboard.mobileMoneyForm.sectionDetails")}
            desc={t("dashboard.mobileMoneyForm.sectionDetailsDesc")}
          />
          <div className="mt-5 grid gap-4 sm:gap-5 sm:grid-cols-2">
            <OutlinedField
              label={t("dashboard.mobileMoneyForm.phone")}
              htmlFor="phone"
              filled={!!phone}
              start={<Phone size={16} className="text-muted-2" />}
              helper={
                country &&
                t("dashboard.mobileMoneyForm.prefix", { country: country.displayName[lang], prefix: country.prefix })
              }
            >
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                required
                value={phone}
                onInput={(e) => setPhone(e.currentTarget.value.replace(/[^0-9]/g, ""))}
                placeholder={country ? `${country.prefix}…` : "260763456789"}
                className={`${outlinedControl} ps-2.5 font-mono tracking-wide`}
              />
            </OutlinedField>

            <OutlinedField
              label={t("dashboard.mobileMoneyForm.amount")}
              htmlFor="amount"
              filled={!!amount}
              disabled={!activeConfig}
              error={insufficientBalance && !!amount}
              end={currencyCode || undefined}
              helper={
                <>
                  {activeConfig && (
                    <p>
                      {t("dashboard.mobileMoneyForm.amountRange", {
                        min: activeConfig.minAmount,
                        max: activeConfig.maxAmount,
                        currency: currencyCode,
                      })}
                    </p>
                  )}
                  {operation === "PAYOUT" && wallets && currencyCode && (
                    <p className={insufficientBalance ? "text-red-600" : ""}>
                      {selectedWallet
                        ? t("dashboard.mobileMoneyForm.availableBalance", {
                            balance: formatMinorUnits(selectedWallet.balance, selectedWallet.currency_code),
                          })
                        : t("dashboard.mobileMoneyForm.noWalletForCurrency")}
                    </p>
                  )}
                </>
              }
            >
              <input
                id="amount"
                type="number"
                inputMode="decimal"
                min="0"
                step={activeConfig ? String(10 ** -amountDecimals) : "any"}
                required
                disabled={!activeConfig}
                value={amount}
                onInput={(e) => setAmount(e.currentTarget.value)}
                placeholder="0"
                className={`${outlinedControl} font-semibold tabular-nums`}
              />
            </OutlinedField>
          </div>

          {activeConfig && (
            <p className="mt-5 flex items-start gap-2 rounded-lg bg-surface px-3.5 py-2.5 text-xs text-muted-2">
              <Info size={14} className="mt-px shrink-0 text-brand" />
              {t("dashboard.mobileMoneyForm.operatorFeesNotice")}
            </p>
          )}

          {insufficientBalance && amount && (
            <p className="mt-4 flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              <AlertCircle size={15} />
              {selectedWallet
                ? t("dashboard.mobileMoneyForm.insufficientBalanceWarning")
                : t("dashboard.mobileMoneyForm.noWalletForCurrency")}
            </p>
          )}

          {!hideSubmitButton && (
            <button
              type="submit"
              disabled={mutation.isPending || !canSubmit}
              aria-busy={mutation.isPending || undefined}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mutation.isPending ? (
                <ButtonSpinner label={pendingLabel} />
              ) : (
                <>
                  {submitLabel}
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          )}
        </section>
      </form>

      <PinModal
        open={pinModalOpen}
        onClose={closePinModal}
        onConfirm={confirmWithPin}
        loading={mutation.isPending}
        error={mutation.isError ? mobileMoneyErrorMessage(mutation.error, t) : null}
      />
    </>
  );
}
