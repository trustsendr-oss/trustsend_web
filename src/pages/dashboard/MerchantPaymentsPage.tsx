import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { AlertCircle, ChevronLeft, ChevronRight, Download, Inbox } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useMerchantPayments } from "../../hooks/useMerchantPayments";
import { useProfile } from "../../hooks/useProfile";
import { formatDateTime, formatMinorUnits } from "../../lib/format";

/** Contenu du QR : lien que l'application Reemite ouvre sur l'écran de paiement. */
const payLink = (code: string) => `trustsend://pay?merchant=${code}`;

/** 482913 → « 482 913 », lisible à la caisse. */
const groupCode = (code: string) => code.replace(/^(\d{3})(\d{3})$/, "$1 $2");

const LIMIT = 20;

export function MerchantPaymentsPage() {
  const { t } = useTranslation();
  const profile = useProfile();
  const [page, setPage] = useState(1);
  const payments = useMerchantPayments(page, LIMIT);
  const qrRef = useRef<HTMLCanvasElement>(null);

  const code = profile.data?.payment_code ?? null;
  const totalPages = payments.data ? Math.max(1, Math.ceil(payments.data.meta.total / LIMIT)) : 1;

  const downloadQr = () => {
    const canvas = qrRef.current;
    if (!canvas || !code) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `reemite-${code}.png`;
    link.click();
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">{t("dashboard.merchantPayments.title")}</h1>
      <p className="mt-1 text-muted">{t("dashboard.merchantPayments.subtitle")}</p>

      {code && (
        <section className="mt-6 flex flex-col gap-6 rounded-2xl border border-surface-2 bg-white p-6 sm:flex-row sm:items-center">
          <div className="shrink-0 rounded-xl border border-surface-2 p-3">
            {/* Rendu à 512 px pour une impression nette, affiché en 160. */}
            <QRCodeCanvas
              ref={qrRef}
              value={payLink(code)}
              size={512}
              marginSize={2}
              fgColor="#1E1872"
              style={{ width: 160, height: 160 }}
              aria-label={t("dashboard.merchantPayments.qrLabel", { code })}
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-muted">{t("dashboard.merchantPayments.yourCode")}</p>
            <p className="mt-1 font-display text-3xl font-bold tracking-wide text-ink tabular-nums">
              {groupCode(code)}
            </p>
            <p className="mt-2 max-w-md text-sm text-muted">{t("dashboard.merchantPayments.codeHelp")}</p>
            <button
              onClick={downloadQr}
              className="mt-4 inline-flex items-center gap-2 rounded border border-surface-2 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface"
            >
              <Download size={15} />
              {t("dashboard.merchantPayments.downloadQr")}
            </button>
          </div>
        </section>
      )}

      <div className="mt-6 rounded-2xl border border-surface-2 bg-white">
        {payments.isLoading ? (
          <LoadingSpinner label={t("dashboard.merchantPayments.loading")} />
        ) : payments.isError ? (
          <p className="flex items-center gap-1.5 px-5 py-8 text-sm text-red-600">
            <AlertCircle size={15} /> {t("dashboard.merchantPayments.error")}
          </p>
        ) : payments.data && payments.data.data.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-2 text-left text-xs font-semibold text-muted">
                    <th className="px-5 py-3">{t("dashboard.merchantPayments.date")}</th>
                    <th className="px-5 py-3">{t("dashboard.merchantPayments.customer")}</th>
                    <th className="px-5 py-3">{t("dashboard.merchantPayments.note")}</th>
                    <th className="px-5 py-3 text-right">{t("dashboard.merchantPayments.amount")}</th>
                    <th className="px-5 py-3 text-right">{t("dashboard.merchantPayments.fee")}</th>
                    <th className="px-5 py-3 text-right">{t("dashboard.merchantPayments.net")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-2">
                  {payments.data.data.map((p) => (
                    <tr key={p.id}>
                      <td className="whitespace-nowrap px-5 py-3 text-muted">{formatDateTime(p.created_at)}</td>
                      <td className="px-5 py-3">
                        <span className="font-semibold text-ink">{p.customer?.name ?? "—"}</span>
                        {p.customer?.code && <span className="ml-2 text-xs text-muted">{p.customer.code}</span>}
                      </td>
                      <td className="max-w-[16rem] truncate px-5 py-3 text-muted">{p.note ?? ""}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums text-ink">
                        {formatMinorUnits(p.amount, p.currency_code)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums text-muted">
                        −{formatMinorUnits(p.fee, p.currency_code)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-right font-semibold tabular-nums text-ink">
                        {formatMinorUnits(p.net_amount, p.currency_code)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-surface-2 px-5 py-3">
                <p className="text-xs text-muted">
                  {t("dashboard.transactions.pageOf", { page, total: totalPages })}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((n) => Math.max(1, n - 1))}
                    disabled={page <= 1}
                    aria-label={t("dashboard.transactions.previous")}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-2 text-muted-2 transition-colors hover:text-ink disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setPage((n) => Math.min(totalPages, n + 1))}
                    disabled={page >= totalPages}
                    aria-label={t("dashboard.transactions.next")}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-2 text-muted-2 transition-colors hover:text-ink disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="flex items-center gap-2 px-5 py-8 text-sm text-muted">
            <Inbox size={16} /> {t("dashboard.merchantPayments.none")}
          </p>
        )}
      </div>
    </div>
  );
}
