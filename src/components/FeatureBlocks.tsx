import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";
import { Reveal } from "./Reveal";
import multiDeviceAsset from "../assets/multi_device.webp";

export function FeatureBlocks() {
  const { t } = useTranslation();
  const { innovationBlocks, mobileMoneyProviders } = useContent();

  return (
    <section className="bg-surface-2 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <Reveal className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand">
            {t("featureBlocks.eyebrow")}
          </span>

          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("featureBlocks.title")}
          </h2>
        </Reveal>

        {/* Features */}
        <div className="space-y-14 sm:space-y-20 lg:space-y-28">
          {innovationBlocks.map((block, i) => (
            <div
              key={block.name}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Text */}
              <Reveal>
                <div className="max-w-xl">
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-3xl">
                    {block.name}
                  </h3>

                  <p className="mt-4 text-lg font-medium leading-relaxed text-ink/80">
                    {block.stat}
                  </p>

                  <p className="mt-3 leading-7 text-muted">
                    {block.description}
                  </p>
                </div>
              </Reveal>

              {/* Image */}
              <Reveal delay={0.1}>
                <div className="flex justify-center">
                  <img
                    src={multiDeviceAsset}
                    alt="Aperçu de l'application Reemite"
                    className="block w-full max-w-[520px] select-none object-contain"
                  />
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Mobile Money */}
        <Reveal delay={0.15} className="mt-20 lg:mt-28">
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center sm:px-10 lg:py-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand">
              {t("featureBlocks.mobileMoneyEyebrow")}
            </span>

            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {t("featureBlocks.mobileMoneyTitle")}
            </h3>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-muted">
              {t("featureBlocks.mobileMoneyDesc")}
            </p>

            {/* Providers */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {mobileMoneyProviders.map((provider) => (
                <div
                  key={provider.name}
                  className="flex h-12 w-28 items-center justify-center rounded-xl border border-slate-200 bg-white px-4"
                >
                  <img
                    src={provider.src}
                    alt={provider.name}
                    className="max-h-7 max-w-full select-none object-contain"
                  />
                </div>
              ))}
            </div>

            <a
              href="#"
              className="group mt-9 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              {t("featureBlocks.cta")}

              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}