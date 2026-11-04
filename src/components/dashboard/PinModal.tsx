import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { AlertCircle, Lock, X } from "lucide-react";
import { ButtonSpinner } from "../LoadingSpinner";
import { useTranslation } from "react-i18next";
import { usePermissions } from "../../hooks/useMe";

const PIN_LENGTH = 4;

export function PinModal({
  open,
  onClose,
  onConfirm,
  loading = false,
  error,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => void;
  loading?: boolean;
  error?: string | null;
}) {
  const { t } = useTranslation();
  // Un membre confirme avec SON PIN Reemite, jamais celui de l'entreprise.
  const { isMember } = usePermissions();
  const [pin, setPin] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setPin("");
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !loading) onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, loading, onClose]);

  if (!open) return null;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, PIN_LENGTH);
    setPin(digits);
  };

  const submit = () => {
    if (pin.length === PIN_LENGTH && !loading) onConfirm(pin);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm"
      onClick={() => !loading && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pin-modal-title"
        className="w-full max-w-sm rounded-2xl border border-surface-2 bg-white p-6 shadow-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-light text-brand">
            <Lock size={18} />
          </span>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label={t("dashboard.mobileMoneyForm.pinModalClose")}
            className="rounded-full p-1.5 text-muted-2 transition-colors hover:bg-surface hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>

        <h2 id="pin-modal-title" className="mt-4 font-display text-lg font-bold text-ink">
          {t("dashboard.mobileMoneyForm.pinModalTitle")}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {isMember
            ? t("dashboard.mobileMoneyForm.pinModalMemberSubtitle")
            : t("dashboard.mobileMoneyForm.pinModalSubtitle")}
        </p>

        <div className="relative mt-6">
          <input
            ref={inputRef}
            type="tel"
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label={t("dashboard.mobileMoneyForm.pinModalLabel")}
            value={pin}
            disabled={loading}
            onChange={onChange}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="absolute inset-0 h-12 w-full cursor-default opacity-0"
          />
          <div className="pointer-events-none flex items-center justify-center gap-3">
            {Array.from({ length: PIN_LENGTH }).map((_, i) => (
              <span
                key={i}
                className={`flex h-12 w-12 items-center justify-center rounded-lg border text-lg font-bold transition-colors ${
                  i < pin.length ? "border-ink bg-surface text-ink" : "border-surface-2 text-transparent"
                }`}
              >
                {i < pin.length ? "•" : ""}
              </span>
            ))}
          </div>
        </div>

        {error && (
          <p className="mt-4 flex items-center gap-1.5 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            <AlertCircle size={14} className="shrink-0" />
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={submit}
          disabled={pin.length !== PIN_LENGTH || loading}
          aria-busy={loading || undefined}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-brand px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <ButtonSpinner label={t("dashboard.mobileMoneyForm.pinModalConfirming")} />
          ) : (
            t("dashboard.mobileMoneyForm.pinModalConfirm")
          )}
        </button>
      </div>
    </div>
  );
}
