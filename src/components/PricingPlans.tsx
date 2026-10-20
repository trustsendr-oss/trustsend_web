import { AlertCircle, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { Reveal } from "./Reveal";
import { usePricing } from "../hooks/usePricing";
import { businessUrl } from "../lib/domains";
import { countryName } from "../lib/countries";
import type { Plan } from "../types/dashboard";

// Montants de l'API en centièmes de la devise ; « 100 $ » plutôt que « 100,00 $ » quand c'est rond.
function formatPlanAmount(amount: string, currency: string, locale: string): string {
  const value = Number(amount) / 100;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Une ligne par fonctionnalité de l'offre, avec ses restrictions (pays, devises) quand il y en a.
function featureLines(plan: Plan, t: TFunction, locale: string): string[] {
  return Object.entries(plan.features).flatMap(([key, restriction]) => {
    if (!restriction) return [];
    const label = t(`dashboard.overview.planGate.feature.${key}`, { defaultValue: key });
    if (restriction === true) return [label];
    const scope = [
      ...(restriction.countries ?? []).map((code) => countryName(code, locale)),
      ...(restriction.currencies ?? []),
    ];
    return [scope.length > 0 ? t("pricing.featureScoped", { feature: label, scope: scope.join(", ") }) : label];
  });
}

export function PricingPlans() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith("en") ? "en-US" : "fr-FR";
  const pricing = usePricing();

  // Du plus complet au plus accessible : niveau 1 = l'offre la plus chère, mise en avant.
  const plans = [...(pricing.data ?? [])].sort((a, b) => Number(b.price) - Number(a.price));

  return (
    <>
      {/* ---------- Header ---------- */}
      <section className="relative overflow-hidden bg-surface-2 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <span className="text-sm font-semibold tracking-wide text-brand">
              Tarification API
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold text-balance text-ink lg:text-4xl">
              Frais d'installation API
            </h1>
            <p className="mt-4 max-w-md text-lg text-muted">
              Un frais unique selon votre marché, réglé une seule fois lors de
              l'intégration à votre plateforme.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto w-full max-w-[620px] lg:max-w-[660px]">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-light opacity-70 blur-3xl"
              />
              <img
                src="/assets/home/pg-graphic.png"
                alt="Passerelle de paiement Reemite connectée aux différents moyens de paiement"
                width={1020}
                height={960}
                loading="eager"
                decoding="async"
                // className="mx-auto block h-auto w-full max-w-full select-none object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Cards ---------- */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          {pricing.isLoading ? (
            <div className="grid gap-6 lg:grid-cols-3" aria-busy="true" aria-label={t("pricing.loading")}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[26rem] animate-pulse rounded-2xl border border-ink/10 bg-surface-2/60" />
              ))}
            </div>
          ) : pricing.isError ? (
            <p role="alert" className="mx-auto flex max-w-lg items-center justify-center gap-2 text-center text-sm text-muted">
              <AlertCircle size={16} className="shrink-0 text-red-600" aria-hidden />
              {t("pricing.error")}
            </p>
          ) : plans.length === 0 ? (
            <p className="text-center text-sm text-muted">{t("pricing.empty")}</p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {plans.map((plan, i) => {
                const level = i + 1;
                const featured = i === 0 && plans.length > 1;
                const features = featureLines(plan, t, locale);
                return (
                  <Reveal key={plan.id} delay={i * 0.06} className="h-full">
                    <article
                      aria-labelledby={`tier-${plan.id}`}
                      className={[
                        "flex h-full flex-col rounded-2xl bg-white p-8",
                        featured ? "border-2 border-brand" : "border border-ink/10",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm text-muted">{t("pricing.level", { level })}</p>
                        {featured && (
                          <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-medium text-white">
                            {t("pricing.featured")}
                          </span>
                        )}
                      </div>

                      <h3
                        id={`tier-${plan.id}`}
                        className="mt-2 font-display text-xl font-semibold text-ink"
                      >
                        {plan.name}
                      </h3>
                      {plan.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {plan.description}
                        </p>
                      )}

                      <p className="mt-8 flex items-baseline gap-2">
                        <span className="font-display text-4xl font-semibold tracking-tight text-ink tabular-nums">
                          {Number(plan.price) > 0
                            ? formatPlanAmount(plan.price, plan.currency_code, locale)
                            : t("pricing.free")}
                        </span>
                        {Number(plan.price) > 0 && (
                          <span className="text-sm text-muted">{t("pricing.once")}</span>
                        )}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {Number(plan.maintenance_price) > 0
                          ? t("pricing.maintenance", {
                              amount: formatPlanAmount(plan.maintenance_price, plan.currency_code, locale),
                            })
                          : t("pricing.noMaintenance")}
                      </p>

                      <ul className="mt-8 flex-1 space-y-3 border-t border-ink/10 pt-8">
                        {features.map((feat) => (
                          <li
                            key={feat}
                            className="flex items-start gap-3 text-sm text-ink/80"
                          >
                            <Check
                              size={16}
                              strokeWidth={2}
                              className="mt-0.5 shrink-0 text-ink"
                              aria-hidden
                            />
                            {feat}
                          </li>
                        ))}
                      </ul>

                      <a
                        href={businessUrl("/signup")}
                        className={[
                          "mt-8 flex min-h-11 items-center justify-center rounded-lg px-5 text-sm font-semibold transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                          featured
                            ? "bg-brand text-white hover:bg-brand/90"
                            : "border border-ink/15 text-ink hover:bg-surface-2",
                        ].join(" ")}
                      >
                        {t("pricing.choose", { level })}
                      </a>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}

          <Reveal delay={0.2} className="mt-10">
            <p className="mx-auto max-w-lg text-center text-sm leading-relaxed text-muted">
              Les frais de maintenance couvrent le support et le fonctionnement
              continu de votre intégration API.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
