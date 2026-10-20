import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import africaCardImg from "../assets/africa_card.png";

export function AfricaAPIs() {
  const { t } = useTranslation();

  return (
    <section
      id="africa-apis"
      aria-label={t("africaAPIs.title")}
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Content */}
          <div className="max-w-xl">
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.01em] text-balance text-ink sm:text-4xl lg:text-[3.25rem]">
                {t("africaAPIs.title")}
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-pretty text-ink/80 sm:text-lg sm:leading-8">
                {t("africaAPIs.subtitle")}
              </p>

              <p className="mt-4 max-w-lg text-[15px] leading-7 text-pretty text-muted">
                {t("africaAPIs.description")}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#developers"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  {t("africaAPIs.ctaDocs")}

                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-slate-50 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  {t("africaAPIs.ctaContact")}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Africa Coverage */}
          <Reveal delay={0.1}>
            <div className="-mx-2 sm:mx-auto sm:w-full sm:max-w-[520px] lg:max-w-none">
              <img
                src={africaCardImg}
                alt="Reemite Pan-African APIs Coverage Map"
                draggable={false}
                className="w-full select-none object-contain"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}