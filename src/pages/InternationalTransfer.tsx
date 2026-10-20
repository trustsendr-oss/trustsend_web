import { useMemo, useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Bitcoin,
  CreditCard,
  Headphones,
  Landmark,
  ShieldCheck,
  Smartphone,
  Store,
  Wallet,
} from "lucide-react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CookieConsent } from "../components/CookieConsent";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Reveal } from "../components/Reveal";
import { useContent } from "../hooks/useContent";
import { businessUrl } from "../lib/domains";
import transferHero from "../assets/transfer_hero.webp";
import patternAsset from "../assets/Group.png";
import arcAsset from "../assets/Group (1).png";
import loopPattern from "../assets/Group (2).png";
import floatAsset from "../assets/hero.png";

const icons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Smartphone,
  Wallet,
  Landmark,
  Store,
  CreditCard,
  Bitcoin,
  ShieldCheck,
  BadgeCheck,
  Bell,
  Headphones,
};

const FEE_RATE = 0.01;

export function InternationalTransfer() {
  const { transfersPage, transferCurrencies, mobileMoneyProviders } = useContent();
  const { hero, simulator, channels, steps, corridors, trust, testimonial, faq, cta } =
    transfersPage;

  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState(transferCurrencies[0].code);

  const quote = useMemo(() => {
    const target =
      transferCurrencies.find((c) => c.code === currency) ?? transferCurrencies[0];
    const fee = amount * FEE_RATE;
    const received = Math.max(0, amount - fee) * target.rate;
    return { target, fee, received };
  }, [amount, currency, transferCurrencies]);

  const format = (value: number) =>
    value.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <div className="overflow-x-hidden">
      <Nav />

      <main>
        {/* ===================================================== HERO ===== */}
        <section className="relative overflow-hidden bg-surface-2 pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <span className="text-sm font-semibold tracking-wide text-brand">
                {hero.eyebrow}
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold text-balance text-ink lg:text-4xl">
                {hero.title} <span className="text-accent">{hero.titleAccent}</span>
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted">{hero.subtitle}</p>
            </div>

            <div className="relative mx-auto w-full max-w-[1020px] lg:max-w-[1060px]">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-light opacity-70 blur-3xl"
              />
              <img
                src={transferHero}
                alt="Réseau de transferts internationaux Reemite : mobile money, banques, cartes et wallets"
                width={1152}
                height={864}
                loading="eager"
                decoding="async"
                // Rendu 3D sur fond blanc : la multiplication fond ce blanc dans le
                // gris de la section, en gardant le relief et les ombres de la carte.
                className="mx-auto block h-auto w-full max-w-full select-none object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </section>

        {/* ================================================ SIMULATOR ===== */}
        <section id="transfer-simulator" className="relative overflow-hidden py-24">
          <img
            src={arcAsset}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-0 top-16 hidden w-24 select-none opacity-80 lg:block"
          />

          <div className="relative mx-auto max-w-5xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-brand">
                {simulator.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink lg:text-4xl">
                {simulator.title}
              </h2>
              <p className="mt-4 text-lg text-muted">{simulator.desc}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 grid gap-6 rounded-5xl border border-surface-2 bg-white p-6 shadow-card lg:grid-cols-2 lg:p-8">
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {simulator.youSend}
                    </span>
                    <div className="mt-2 flex items-center gap-3 rounded-2xl border border-surface-2 bg-surface px-4 py-3">
                      <input
                        type="number"
                        min={1}
                        value={amount}
                        onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-transparent font-display text-2xl font-bold text-ink outline-none"
                      />
                      <span className="shrink-0 font-semibold text-muted">USD</span>
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                      {simulator.theyGet}
                    </span>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-surface-2 bg-surface px-4 py-3.5 font-semibold text-ink outline-none"
                    >
                      {transferCurrencies.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label} ({c.code})
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="flex flex-col justify-between rounded-4xl bg-brand p-6 text-white">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                      {simulator.theyGet}
                    </p>
                    <p className="mt-2 font-display text-3xl font-bold lg:text-4xl">
                      {format(quote.received)}{" "}
                      <span className="text-xl text-white/70">
                        {quote.target.symbol}
                      </span>
                    </p>

                    <dl className="mt-6 space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-white/60">{simulator.feeLabel}</dt>
                        <dd className="font-semibold">{format(quote.fee)} USD</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-white/60">{simulator.rateLabel}</dt>
                        <dd className="font-semibold">
                          1 USD = {format(quote.target.rate)} {quote.target.code}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-white/60">{simulator.deliveryLabel}</dt>
                        <dd className="font-semibold">{simulator.delivery}</dd>
                      </div>
                    </dl>
                  </div>

                  <a
                    href={businessUrl("/signup")}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand transition-colors hover:bg-white/90"
                  >
                    {simulator.cta} <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </Reveal>

            <p className="mt-4 text-center text-xs text-muted">{simulator.note}</p>
          </div>
        </section>

        {/* ================================================= CHANNELS ===== */}
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
                {channels.title}
              </h2>
              <p className="mt-4 text-lg text-muted">{channels.subtitle}</p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {channels.items.map((item, i) => {
                const Icon = icons[item.icon] ?? Wallet;
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
          <motion.img
            src={floatAsset}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-6 top-10 hidden w-40 select-none opacity-25 lg:block"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative mx-auto max-w-5xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-brand">
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

        {/* ================================================ CORRIDORS ===== */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-brand">
                {corridors.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink lg:text-4xl">
                {corridors.title}
              </h2>
              <p className="mt-4 text-lg text-muted">{corridors.subtitle}</p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {corridors.items.map((c, i) => (
                <Reveal key={`${c.from}-${c.to}`} delay={i * 0.05}>
                  <div className="flex h-full items-center justify-between gap-4 rounded-4xl border border-surface-2 p-6 transition-all hover:border-brand/20 hover:shadow-soft">
                    <div>
                      <p className="font-display font-semibold text-ink">
                        {c.from}
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                        <ArrowRight size={14} className="text-brand" />
                        {c.to}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-brand">{c.fee}</p>
                      <p className="text-xs text-muted">{c.delay}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {corridors.providersLabel}
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {mobileMoneyProviders.map((p) => (
                    <img
                      key={p.name}
                      src={p.src}
                      alt={p.name}
                      className="h-9 w-9 rounded-lg border border-surface-2 bg-white object-contain p-1.5"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ==================================================== TRUST ===== */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal>
                <div className="relative">
                  <img
                    src={trust.photo}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-5xl object-cover"
                  />
                  <img
                    src={patternAsset}
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute -bottom-8 -left-8 hidden w-32 select-none opacity-70 lg:block"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand">
                  {trust.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold text-ink lg:text-4xl">
                  {trust.title}
                </h2>
                <p className="mt-4 text-lg text-muted">{trust.desc}</p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {trust.items.map((item) => {
                    const Icon = icons[item.icon] ?? ShieldCheck;
                    return (
                      <div key={item.title}>
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-light">
                          <Icon size={17} className="text-brand" />
                        </div>
                        <p className="mt-3 font-display font-semibold text-ink">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-muted">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================================== TESTIMONIAL ===== */}
        <section className="px-6 pb-24">
          <Reveal className="mx-auto max-w-6xl">
            <div className="grid overflow-hidden rounded-5xl bg-brand lg:grid-cols-[1.2fr_1fr]">
              <div className="relative p-8 lg:p-14">
                <img
                  src="/assets/home/top-quotation.svg"
                  alt=""
                  aria-hidden
                  className="h-8 w-8 opacity-70"
                />
                <p className="mt-5 font-display text-2xl font-semibold leading-snug text-white lg:text-3xl">
                  {testimonial.quote}
                </p>
                <p className="mt-6 font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-white/70">{testimonial.role}</p>
              </div>

              <img
                src={testimonial.photo}
                alt=""
                aria-hidden
                loading="lazy"
                className="h-full min-h-[220px] w-full object-cover"
              />
            </div>
          </Reveal>
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
