import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useWallets } from "../../hooks/useWallets";
import { useCreateCard, cardErrorMessage } from "../../hooks/useCards";
import { PinModal } from "../../components/dashboard/PinModal";
import { WalletLogo } from "../../components/dashboard/WalletLogo";
import { formatMinorUnits, toMinorUnits } from "../../lib/format";

type Brand = "VISA" | "MASTERCARD";

const BRANDS: { id: Brand; label: string; logo: string }[] = [
  { id: "VISA", label: "Visa", logo: "/assets/icons/payment-modes/visa.png" },
  { id: "MASTERCARD", label: "Mastercard", logo: "/assets/icons/payment-modes/mastercard.png" },
];

function newIdempotencyKey() {
  return crypto.randomUUID();
}

export function CreateCardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const wallets = useWallets();
  const create = useCreateCard();

  // Cards are USD-only (see card_service.ts createCard()).
  const usdWallets = (wallets.data ?? []).filter(
    (w) => w.currency_code === "USD" && w.status === "active",
  );

  const [walletId, setWalletId] = useState("");
  const [brand, setBrand] = useState<Brand>("VISA");
  const [amount, setAmount] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(newIdempotencyKey);
  const [pinModalOpen, setPinModalOpen] = useState(false);

  const wallet = usdWallets.find((w) => String(w.id) === walletId) ?? usdWallets[0];
  const minorAmount = toMinorUnits(amount, 2);
  const insufficientBalance = !!wallet && !!minorAmount && Number(minorAmount) > Number(wallet.balance);
  const canContinue = !!wallet && !!minorAmount && Number(minorAmount) > 0 && !insufficientBalance;
  const brandInfo = BRANDS.find((b) => b.id === brand)!;

  const confirmWithPin = (pin: string) => {
    if (!wallet || !minorAmount) return;
    create.mutate(
      {
        wallet_id: wallet.id,
        brand,
        amount: minorAmount,
        pin,
        idempotency_key: idempotencyKey,
      },
      {
        onSuccess: (card) => {
          setPinModalOpen(false);
          navigate(`/dashboard/cards/${card.id}`);
        },
      },
    );
  };

  const closePinModal = () => {
    setPinModalOpen(false);
    if (create.isError) {
      create.reset();
      setIdempotencyKey(newIdempotencyKey());
    }
  };

  if (wallets.isLoading) {
    return <LoadingSpinner label={t("dashboard.loading")} className="min-h-[50vh]" />;
  }

  return (
    <div className="max-w-xl">
      <Link
        to="/dashboard/cards"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-2 transition-colors hover:text-ink"
      >
        <ArrowLeft size={15} />
        {t("dashboard.createCard.back")}
      </Link>

      <h1 className="mt-3 font-display text-2xl font-bold text-ink">{t("dashboard.createCard.title")}</h1>
      <p className="mt-1 text-muted">{t("dashboard.createCard.subtitle")}</p>

      {!wallet ? (
        <div className="mt-8 rounded-2xl border border-surface-2 bg-white p-6">
          <p className="text-sm text-muted">{t("dashboard.createCard.noUsdWallet")}</p>
          <Link
            to="/dashboard/wallet/new"
            className="mt-4 inline-flex items-center gap-2 rounded bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            <Plus size={16} /> {t("dashboard.swap.addWallet")}
          </Link>
        </div>
      ) : reviewing ? (
        <>
          <div className="mt-8 rounded-2xl border border-surface-2 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-surface-2 px-5 py-4">
              <span className="text-sm font-medium text-muted">{t("dashboard.createCard.loaded")}</span>
              <img src={brandInfo.logo} alt={brandInfo.label} className="h-6 w-auto" />
            </div>
            <p className="px-5 pt-4 font-display text-3xl font-bold text-ink tabular-nums">
              {formatMinorUnits(minorAmount!, "USD")}
            </p>
            <dl className="space-y-2 px-5 pb-5 pt-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("dashboard.createCard.brand")}</dt>
                <dd className="font-medium text-ink">{brandInfo.label}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("dashboard.createCard.wallet")}</dt>
                <dd className="font-medium text-ink">USD · #{wallet.id}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("dashboard.createCard.debited")}</dt>
                <dd className="font-medium text-ink tabular-nums">{formatMinorUnits(minorAmount!, "USD")}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">{t("dashboard.createCard.remaining")}</dt>
                <dd className="font-medium text-ink tabular-nums">
                  {formatMinorUnits(String(Number(wallet.balance) - Number(minorAmount)), "USD")}
                </dd>
              </div>
            </dl>
          </div>

          {create.isError && !pinModalOpen && (
            <p className="mt-4 flex items-center gap-1.5 rounded border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              <AlertCircle size={15} /> {cardErrorMessage(create.error, t)}
            </p>
          )}

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => setReviewing(false)}
              className="rounded border border-surface-2 bg-white px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              {t("dashboard.createCard.edit")}
            </button>
            <button
              type="button"
              disabled={create.isPending}
              onClick={() => {
                create.reset();
                setPinModalOpen(true);
              }}
              className="flex-1 rounded bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("dashboard.createCard.confirm")}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-8 rounded-2xl border border-surface-2 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-muted">{t("dashboard.createCard.amount")}</span>
              <span className={`text-xs ${insufficientBalance ? "text-red-600" : "text-muted"}`}>
                {t("dashboard.swap.balance", { amount: formatMinorUnits(wallet.balance, wallet.currency_code) })}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <input
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                aria-label={t("dashboard.createCard.amount")}
                aria-invalid={insufficientBalance || undefined}
                className="min-w-0 flex-1 bg-transparent font-display text-3xl font-bold text-ink outline-none placeholder:text-surface-2"
              />
              <label className="flex w-44 shrink-0 items-center gap-2.5 rounded-full border border-surface-2 bg-white py-1.5 pl-1.5 pr-3 focus-within:border-brand sm:w-52">
                <WalletLogo wallet={wallet} className="h-8 w-8" />
                <span className="sr-only">{t("dashboard.createCard.wallet")}</span>
                <select
                  value={wallet.id}
                  onChange={(e) => setWalletId(e.target.value)}
                  disabled={usdWallets.length === 1}
                  className="min-w-0 flex-1 cursor-pointer bg-transparent text-sm font-semibold text-ink outline-none disabled:cursor-default"
                >
                  {usdWallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      USD{usdWallets.length > 1 ? ` · #${w.id}` : ""}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {insufficientBalance && (
              <p className="mt-2 text-xs text-red-600">{t("dashboard.createCard.insufficient")}</p>
            )}
          </div>

          <fieldset className="mt-4 rounded-2xl border border-surface-2 bg-white p-5">
            <legend className="sr-only">{t("dashboard.createCard.brand")}</legend>
            <span className="text-sm font-medium text-muted" aria-hidden="true">
              {t("dashboard.createCard.brand")}
            </span>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {BRANDS.map((b) => (
                <label
                  key={b.id}
                  className={`flex cursor-pointer items-center gap-2.5 rounded border px-3.5 py-2.5 text-sm font-semibold text-ink transition-colors has-[:focus-visible]:border-brand ${
                    brand === b.id ? "border-brand" : "border-surface-2 hover:border-muted-2"
                  }`}
                >
                  <input
                    type="radio"
                    name="brand"
                    value={b.id}
                    checked={brand === b.id}
                    onChange={() => setBrand(b.id)}
                    className="sr-only"
                  />
                  <img src={b.logo} alt="" className="h-5 w-8 object-contain" />
                  {b.label}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            disabled={!canContinue}
            onClick={() => setReviewing(true)}
            className="mt-5 w-full rounded bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("dashboard.createCard.submit")}
          </button>
        </>
      )}

      <PinModal
        open={pinModalOpen}
        onClose={closePinModal}
        onConfirm={confirmWithPin}
        loading={create.isPending}
        error={create.isError ? cardErrorMessage(create.error, t) : null}
      />
    </div>
  );
}
