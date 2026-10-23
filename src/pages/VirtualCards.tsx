import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  EyeOff,
  Globe,
  History,
  Lock,
  Repeat,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  Zap,
} from "lucide-react";
import { Nav } from "../components/Nav";
import { useTranslation } from "react-i18next";
import { Footer } from "../components/Footer";
import { CookieConsent } from "../components/CookieConsent";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Reveal } from "../components/Reveal";
import { useContent } from "../hooks/useContent";
import { businessUrl } from "../lib/domains";
import arcAsset from "../assets/Group (1).png";
import loopPattern from "../assets/Group (2).png";

const icons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Zap,
  Globe,
  SlidersHorizontal,
  Lock,
  Repeat,
  Users,
  ShieldCheck,
  Bell,
  EyeOff,
  History,
};

const cardArt = [
  { left: "3%", top: "2%", rotate: -10, colors: "from-[#07194A] via-[#173F9E] to-[#26A9E0]" },
  { left: "13%", top: "18%", rotate: 7, colors: "from-[#0A173B] via-[#2B2A72] to-[#7768E8]" },
  { left: "5%", top: "35%", rotate: -3, colors: "from-white via-[#EFF6FF] to-[#C7E8FF]" },
];

function VirtualCardShowcase({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  const { i18n } = useTranslation();
  const english = i18n.language.startsWith("en");

  return (
    <div
      role="img"
      aria-label={english ? "Reemite virtual card designs" : "Aperçu des cartes virtuelles Reemite"}
      className={`relative mx-auto w-full ${compact ? "aspect-[1.5] max-w-[460px]" : "aspect-[1.18] max-w-[590px]"}`}
    >
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-blue-300/40 blur-3xl" />
      {(compact ? cardArt.slice(0, 1) : cardArt).map((card, index) => (
        <motion.div
          key={card.colors}
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, y: 22, rotate: card.rotate - 4 }}
          animate={reduceMotion
            ? { opacity: 1, y: 0, rotate: card.rotate }
            : { opacity: 1, y: [0, -8, 0], rotate: [card.rotate, card.rotate + 1, card.rotate] }}
          transition={{
            opacity: { duration: 0.55, delay: 0.14 * index },
            y: { duration: 5.2, delay: 0.25 * index, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5.2, delay: 0.25 * index, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            left: compact ? "8%" : card.left,
            top: compact ? "13%" : card.top,
            width: "84%",
            zIndex: 3 - index,
          }}
          className={`absolute aspect-[1.586] overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br ${card.colors} p-4 shadow-[0_28px_65px_-20px_rgba(3,22,69,0.48)] sm:rounded-[1.65rem] sm:p-5`}
        >
          <div aria-hidden="true" className="absolute -right-12 -top-20 h-52 w-52 rounded-full border border-white/15" />
          <div aria-hidden="true" className="absolute -right-5 -top-14 h-40 w-40 rounded-full border border-white/15" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="inline-flex h-8 items-center rounded-lg bg-white px-2.5 py-1 shadow-sm sm:h-9 sm:px-3">
                <img src="/assets/icons/logo.png" alt="" className="h-5 w-[82px] object-contain sm:h-6 sm:w-[98px]" />
              </span>
              <span className={`mt-1 h-6 w-8 rounded-md border border-white/55 bg-gradient-to-br from-amber-100 via-amber-300 to-amber-500/70 ${index === 2 ? "opacity-70" : ""}`} />
            </div>
            <div className={index === 2 ? "text-brand" : "text-white"}>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] opacity-75 sm:text-[10px]">
                {english ? "Virtual card" : "Carte virtuelle"}
              </p>
              <div className="mt-2 flex items-end justify-between gap-2">
                <p className="whitespace-nowrap font-mono text-[10px] tracking-[0.1em] sm:text-xs sm:tracking-[0.16em]">•••• &nbsp;•••• &nbsp;•••• &nbsp;••••</p>
                <span className="shrink-0 text-[9px] font-bold uppercase tracking-widest opacity-85 sm:text-[10px]">USD</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-[4%] right-[1%] z-10 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-card backdrop-blur sm:right-0"
      >
        <p className="text-[10px] font-medium text-muted">{english ? "Card status" : "État de la carte"}</p>
        <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-ink">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {english ? "Ready for purchases" : "Prête pour vos achats"}
        </p>
      </motion.div>
    </div>
  );
}

export function VirtualCards() {
  const { i18n } = useTranslation();
  const english = i18n.language.startsWith("en");
  const { virtualCardsPage, mobileMoneyProviders, paymentMethods } = useContent();
  const { hero, features, steps, useCases, security, fees, coverage, faq, cta } =
    virtualCardsPage;

  return (
    <div className="overflow-x-hidden">
      <Nav />

      <main>
        {/* ===================================================== HERO ===== */}
        <section className="relative overflow-hidden bg-surface-2 pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal className="max-w-xl">
              <span className="text-sm font-semibold tracking-wide text-brand">
                {hero.eyebrow}
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold text-balance text-ink lg:text-4xl">
                {hero.title} <span className="text-accent">{hero.titleAccent}</span>
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted">{hero.subtitle}</p>
              <a
                href={businessUrl("/signup")}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                {english ? "Create a virtual card" : "Créer une carte virtuelle"}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </Reveal>

            <Reveal delay={0.12} className="w-full">
              <VirtualCardShowcase />
            </Reveal>
          </div>
        </section>

        {/* ================================================= FEATURES ===== */}
        <section className="relative overflow-hidden py-24">
          <img
            src={loopPattern}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 hidden w-72 select-none opacity-20 lg:block"
          />

          <div className="relative mx-auto max-w-7xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-ink lg:text-4xl">
                {features.title}
              </h2>
              <p className="mt-4 text-lg text-muted">{features.subtitle}</p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.items.map((item, i) => {
                const Icon = icons[item.icon] ?? Zap;
                return (
                  <Reveal key={item.title} delay={i * 0.06}>
                    <div className="group h-full rounded-4xl border border-surface-2 p-6 transition-all hover:border-brand/20 hover:shadow-soft">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light transition-colors group-hover:bg-brand">
                        <Icon
                          size={18}
                          className="text-brand transition-colors group-hover:text-white"
                        />
                      </div>
                      <h3 className="mt-4 font-display font-semibold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted">{item.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================== STEPS ===== */}
        <section className="relative overflow-hidden bg-surface py-24">
          <img
            src={arcAsset}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-0 top-16 hidden w-24 select-none opacity-80 lg:block"
          />

          <div className="relative mx-auto max-w-5xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold tracking-wide text-brand">
                {steps.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink lg:text-4xl">
                {steps.title}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {steps.items.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.08}>
                  <div className="h-full rounded-4xl border border-surface-2 bg-white p-6">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 font-display font-semibold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================ USE CASES ===== */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal>
                <img
                  src={"/assets/images/figure-get-card.webp"}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-5xl object-cover"
                />
              </Reveal>

              <Reveal delay={0.1}>
                <span className="text-sm font-semibold tracking-wide text-brand">
                  {useCases.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold text-ink lg:text-4xl">
                  {useCases.title}
                </h2>
                <p className="mt-4 text-lg text-muted">{useCases.desc}</p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {useCases.items.map((item) => (
                    <div key={item.title}>
                      <p className="font-display font-semibold text-ink">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-muted">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================= SECURITY ===== */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold tracking-wide text-brand">
                {security.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink lg:text-4xl">
                {security.title}
              </h2>
              <p className="mt-4 text-lg text-muted">{security.desc}</p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {security.items.map((item, i) => {
                const Icon = icons[item.icon] ?? ShieldCheck;
                return (
                  <Reveal key={item.title} delay={i * 0.06}>
                    <div className="h-full rounded-4xl border border-surface-2 p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-light">
                        <Icon size={17} className="text-brand" />
                      </div>
                      <p className="mt-3 font-display font-semibold text-ink">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-muted">{item.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================== FEES ===== */}
        <section className="pb-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold tracking-wide text-brand">
                {fees.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink lg:text-4xl">
                {fees.title}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 overflow-hidden rounded-4xl border border-surface-2">
                {fees.rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between px-6 py-4 ${
                      i % 2 === 1 ? "bg-surface" : ""
                    }`}
                  >
                    <span className="text-sm text-ink/80">{row.label}</span>
                    <span className="font-display font-bold text-brand">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <p className="mt-3 text-center text-xs text-muted">{fees.note}</p>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {fees.networksLabel}
                </span>
                <div className="flex items-center gap-3">
                  {paymentMethods.map((m) => (
                    <img
                      key={m.name}
                      src={m.src}
                      alt={m.name}
                      className="h-9 w-9 rounded-lg border border-surface-2 bg-white object-contain p-1.5"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================================================= COVERAGE ===== */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal>
                <span className="text-sm font-semibold tracking-wide text-brand">
                  {coverage.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold text-ink lg:text-4xl">
                  {coverage.title}
                </h2>
                <p className="mt-4 text-lg text-muted">{coverage.desc}</p>

                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {coverage.providersLabel}
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    {mobileMoneyProviders.map((p) => (
                      <img
                        key={p.name}
                        src={p.src}
                        alt={p.name}
                        className="h-8 w-8 rounded-md border border-surface-2 bg-white object-contain p-1"
                      />
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <VirtualCardShowcase compact />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ====================================================== FAQ ===== */}
        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal className="text-center">
              <h2 className="font-display text-3xl font-bold text-ink lg:text-4xl">
                {faq.title}
              </h2>
            </Reveal>

            <div className="mt-10 divide-y divide-surface-2 border-y border-surface-2">
              {faq.items.map((item, i) => (
                <Reveal key={item.q} delay={i * 0.05}>
                  <details className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-ink marker:hidden">
                      {item.q}
                      <span className="shrink-0 text-brand transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================== CTA ===== */}
        <section className="px-6 pb-24">
          <Reveal className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-5xl bg-brand px-8 py-16 text-center lg:py-20">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10" />

              <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-bold text-white lg:text-4xl">
                {cta.title}
              </h2>
              <p className="relative mx-auto mt-4 max-w-2xl text-lg text-white/80">
                {cta.desc}
              </p>

              <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={businessUrl("/signup")}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-brand transition-colors hover:bg-white/90"
                >
                  {cta.primary} <ArrowRight size={18} />
                </a>
                <a
                  href="https://wa.me/243972716360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors hover:border-white"
                >
                  {cta.secondary}
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
}
