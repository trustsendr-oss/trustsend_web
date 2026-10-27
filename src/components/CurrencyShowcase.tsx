import { ArrowRight, Check, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Reveal } from "./Reveal";

const currencies = [
  { code: "CDF", country: "drc", flag: "cd" },
  { code: "RWF", country: "rwanda", flag: "rw" },
  { code: "BIF", country: "burundi", flag: "bi" },
  { code: "KES", country: "kenya", flag: "ke" },
  { code: "XOF", country: "westAfrica", flag: "ci" },
  { code: "XAF", country: "centralAfrica", flag: "cm" },
  { code: "USD", country: "usa", flag: "us" },
  { code: "EUR", country: "eurozone", flag: "eu" },
];

function CurrencyFlag({ flag }: { flag: string }) {
  const common = { width: 36, height: 36, viewBox: "0 0 36 36", className: "h-8 w-8 shrink-0 overflow-hidden rounded-full shadow-sm ring-1 ring-black/5 sm:h-9 sm:w-9", "aria-hidden": true as const };

  switch (flag) {
    case "cd":
      return <svg {...common}><circle cx="18" cy="18" r="18" fill="#00A3E0" /><path d="M-3 31 31-3h8L5 41z" fill="#F7D618" /><path d="M-3 29 29-3h5L2 34z" fill="#CE1021" /><path d="m10 4 1.7 4.3 4.6.3-3.5 2.9 1.2 4.5-4-2.5-3.9 2.5 1.2-4.5-3.5-2.9 4.6-.3z" fill="#F7D618" /></svg>;
    case "rw":
      return <svg {...common}><circle cx="18" cy="18" r="18" fill="#2060AD" /><path d="M0 19h36v8H0z" fill="#FAD201" /><path d="M0 27h36v9H0z" fill="#00A650" /><circle cx="27" cy="9" r="4" fill="#FAD201" /><path d="m27 2 .8 4.4L31 3l-1.8 4.2 4.4-.6-4 2 3.5 2.8-4.4-1-.1 4.4-1.6-4.1-2.4 3.7.6-4.4-4.2 1.7 3-3.3-4.4-.8 4.3-.9-3.2-3.1 4.2 1.5z" fill="#FAD201" /></svg>;
    case "bi":
      return <svg {...common}><circle cx="18" cy="18" r="18" fill="#1EB53A" /><path d="M-3 32 32-3h7L4 39zM-3 4 32 39h7L4-3z" fill="#fff" /><path d="M-1 31 31-1h4L3 35zM-1 5 31 37h4L3 1z" fill="#CE1126" /><circle cx="18" cy="18" r="7" fill="#fff" /><circle cx="18" cy="18" r="5.5" fill="#CE1126" /><g fill="#fff"><path d="m18 13 .7 1.6 1.7.1-1.3 1.1.4 1.7-1.5-.9-1.5.9.4-1.7-1.3-1.1 1.7-.1zM14.5 18.5l.7 1.6 1.7.1-1.3 1.1.4 1.7-1.5-.9-1.5.9.4-1.7-1.3-1.1 1.7-.1zM21.5 18.5l.7 1.6 1.7.1-1.3 1.1.4 1.7-1.5-.9-1.5.9.4-1.7-1.3-1.1 1.7-.1z" /></g></svg>;
    case "ke":
      return <svg {...common}><circle cx="18" cy="18" r="18" fill="#fff" /><path d="M0 0h36v11H0z" fill="#000" /><path d="M0 12h36v2H0zM0 22h36v2H0z" fill="#fff" /><path d="M0 14h36v8H0z" fill="#BB0000" /><path d="M0 25h36v11H0z" fill="#006600" /><path d="M18 10c-5 4-5 12 0 16 5-4 5-12 0-16z" fill="#fff" /><path d="M18 12c-3.2 3-3.2 9 0 12 3.2-3 3.2-9 0-12z" fill="#BB0000" /><path d="M18 12v12" stroke="#000" strokeWidth="1.2" /></svg>;
    case "ci":
      return <svg {...common}><circle cx="18" cy="18" r="18" fill="#fff" /><path d="M0 0h12v36H0z" fill="#F77F00" /><path d="M24 0h12v36H24z" fill="#009A44" /></svg>;
    case "cm":
      return <svg {...common}><circle cx="18" cy="18" r="18" fill="#007A5E" /><path d="M12 0h12v36H12z" fill="#CE1126" /><path d="M24 0h12v36H24z" fill="#FCD116" /><path d="m18 12 1.5 4.2 4.4.1-3.5 2.7 1.3 4.2-3.7-2.5-3.7 2.5 1.3-4.2-3.5-2.7 4.4-.1z" fill="#FCD116" /></svg>;
    case "us":
      return <svg {...common}><circle cx="18" cy="18" r="18" fill="#fff" />{[0, 5.54, 11.08, 16.62, 22.16, 27.7, 33.24].map((y) => <path key={y} d={`M0 ${y}h36v2.77H0z`} fill="#B22234" />)}<path d="M0 0h17v19H0z" fill="#3C3B6E" /><g fill="#fff">{[3, 8, 13].map((x) => [3, 8, 13].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r=".7" />))}</g></svg>;
    default:
      return <svg {...common}><circle cx="18" cy="18" r="18" fill="#003399" />{Array.from({ length: 12 }, (_, i) => { const angle = (i * Math.PI) / 6; return <circle key={i} cx={18 + Math.cos(angle) * 8} cy={18 + Math.sin(angle) * 8} r="1.25" fill="#FFCC00" />; })}</svg>;
  }
}

export function CurrencyShowcase() {
  const { t } = useTranslation();

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-dark">
              <Globe2 aria-hidden="true" size={17} />
              {t("currencyShowcase.eyebrow")}
            </p>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink text-balance sm:text-4xl lg:text-[2.75rem]">
              {t("currencyShowcase.title")}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {t("currencyShowcase.description")}
            </p>

            <ul className="mt-7 space-y-4">
              {["bulletPayments", "bulletMobileMoney", "bulletRates"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                    <Check aria-hidden="true" size={15} strokeWidth={2.5} />
                  </span>
                  <span className="leading-6">{t(`currencyShowcase.${item}`)}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/transferts-internationaux"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-brand-dark px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
            >
              {t("currencyShowcase.cta")}
              <ArrowRight aria-hidden="true" size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative isolate min-h-[410px] overflow-hidden rounded-[2rem] bg-brand-light sm:min-h-[470px] lg:min-h-[500px]">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-[74%] bg-brand-dark"
              style={{ clipPath: "polygon(27% 0, 100% 0, 100% 100%, 0 100%)" }}
            />
            <img
              src="/assets/images/merchant-vendor.webp"
              alt={t("currencyShowcase.imageAlt")}
              className="absolute bottom-0 right-0 h-[86%] w-[59%] rounded-tl-[6rem] object-cover object-[55%_center] sm:h-[90%] sm:w-[60%]"
            />

            <div className="absolute left-3 top-4 z-10 w-[78%] rounded-2xl bg-white p-4 shadow-pop sm:left-7 sm:top-8 sm:w-[70%] sm:p-5">
              <h3 className="mb-3 font-display text-sm font-bold text-ink sm:mb-4 sm:text-base">
                {t("currencyShowcase.currenciesTitle")}
              </h3>
              <ul className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {currencies.map(({ code, country, flag }) => (
                  <li key={code} className="flex min-w-0 items-center gap-2 rounded-xl bg-surface px-2 py-2 sm:gap-2.5 sm:px-2.5">
                    <CurrencyFlag flag={flag} />
                    <span className="min-w-0">
                      <span className="block text-xs font-bold leading-tight text-ink sm:text-sm">{code}</span>
                      <span className="block truncate text-[10px] leading-tight text-muted sm:text-[11px]">
                        {t(`currencyShowcase.countries.${country}`)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] leading-relaxed text-muted sm:mt-4 sm:text-[11px]">
                {t("currencyShowcase.currenciesNote")}
              </p>
            </div>

            <div className="absolute bottom-4 right-4 z-10 hidden items-center gap-2 rounded-full border border-white/30 bg-brand/85 px-3 py-2 text-xs font-semibold text-white shadow-soft backdrop-blur sm:flex sm:bottom-6 sm:right-6">
              <Globe2 aria-hidden="true" size={15} />
              {t("currencyShowcase.marketBadge")}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
