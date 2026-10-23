import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const PHONE = "256795533410";

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.8h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.78 9.78 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.82-9.8 2.62 0 5.08 1.03 6.93 2.88a9.74 9.74 0 0 1 2.87 6.93c0 5.4-4.41 9.81-9.81 9.81M20.5 3.49A11.74 11.74 0 0 0 12.04 0C5.55 0 .27 5.28.26 11.76c0 2.07.55 4.1 1.58 5.88L.16 24l6.5-1.7a11.75 11.75 0 0 0 5.38 1.36h.01c6.48 0 11.76-5.28 11.77-11.77 0-3.14-1.23-6.1-3.45-8.32Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(t("whatsapp.prefill"))}`;

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(18rem,calc(100vw-2rem))] rounded-3xl bg-white shadow-pop border border-black/5 overflow-hidden">
          <div className="bg-[#25D366] text-white px-5 py-4 flex items-start gap-3">
            <span className="shrink-0 mt-0.5">
              <WhatsAppIcon size={22} />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{t("whatsapp.title")}</p>
              <p className="text-xs text-white/85">{t("whatsapp.status")}</p>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-neutral-600">{t("whatsapp.message")}</p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1ebe5b] transition-colors"
            >
              <MessageCircle size={16} />
              {t("whatsapp.cta")}
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? t("whatsapp.close") : t("whatsapp.label")}
        className="group flex items-center gap-2 rounded-full bg-[#25D366] text-white p-3 shadow-pop sm:p-4 hover:bg-[#1ebe5b] transition-colors"
      >
        {open ? <X size={26} /> : <WhatsAppIcon />}
      </button>
    </div>
  );
}
