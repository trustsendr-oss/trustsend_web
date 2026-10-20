import type { ComponentType } from "react";
import {
  ArrowRight,
  Coins,
  Headphones,
  MapPin,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CookieConsent } from "../components/CookieConsent";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Reveal } from "../components/Reveal";
import { useContent } from "../hooks/useContent";
import { businessUrl } from "../lib/domains";
import arcAsset from "../assets/Group (1).png";
import loopPattern from "../assets/Group (2).png";
import agentHero from "../assets/agent_hero.webp";
import networkVisual from "../assets/bg_2.png";
import walletVisual from "../assets/multi_device.webp";
import africaCard from "../assets/africa_card.png";

const icons: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Coins,
  Users,
  Wallet,
  ShieldCheck,
  MapPin,
  Headphones,
};

export function Agents() {
  const { agentsPage, mobileMoneyProviders } = useContent();
  const { hero, benefits, steps, earnings, testimonial, faq, cta } = agentsPage;

  return (
    <div className="overflow-x-hidden">
      <Nav />

      <main>
        {/* ===================================================== HERO ===== */}
        <section className="relative overflow-hidden bg-surface-2">
          {/* Image de fond (desktop) */}
          <img
            src={agentHero}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full select-none object-cover object-right lg:block"
          />
          {/* Voile de lisibilite cote texte */}
          <div
            aria-hidden
            className="absolute inset-0 hidden bg-gradient-to-r from-white via-white/90 to-transparent lg:block"
          />

          <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-6 pt-32 pb-16 lg:min-h-[640px] lg:pt-40 lg:pb-20">
            <div className="max-w-xl">
              <span className="text-sm font-semibold tracking-wide text-brand">
                {hero.eyebrow}
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold text-balance text-ink lg:text-4xl">
                {hero.title} <span className="text-accent">{hero.titleAccent}</span>
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted">{hero.subtitle}</p>
            </div>

            {/* Image (mobile / tablette) */}
            <img
              src={agentHero}
              alt="Agents Reemite servant des clients dans un point Mobile Money"
              className="mt-12 block w-full select-none rounded-4xl object-cover lg:hidden"
            />
          </div>
        </section>

        {/* ================================================= BENEFITS ===== */}
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
                {benefits.title}
              </h2>
              <p className="mt-4 text-lg text-muted">{benefits.subtitle}</p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.items.map((item, i) => {
                const Icon = icons[item.icon] ?? Coins;
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
        <section className="relative overflow-hidden py-24">
          <img
            src={arcAsset}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-0 top-10 hidden w-28 select-none opacity-80 lg:block"
          />

          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
              <Reveal>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand">
                  {steps.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold text-ink lg:text-4xl">
                  {steps.title}
                </h2>
                <p className="mt-4 text-lg text-muted">{steps.subtitle}</p>

                <ol className="mt-10 space-y-6">
                  {steps.items.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-display font-semibold text-ink">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm text-muted">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="relative mx-auto w-full max-w-[520px]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-light opacity-70 blur-3xl"
                  />
                  <img
                    src={networkVisual}
                    alt=""
                    aria-hidden
                    className="block w-full select-none rounded-4xl object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================================================= EARNINGS ===== */}
        <section id="agent-commissions" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal>
                <div className="relative mx-auto w-full max-w-[460px]">
                  <img
                    src={walletVisual}
                    alt=""
                    aria-hidden
                    className="block w-full select-none object-contain"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <span className="text-sm font-semibold uppercase tracking-wide text-brand">
                  {earnings.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold text-ink lg:text-4xl">
                  {earnings.title}
                </h2>
                <p className="mt-4 text-lg text-muted">{earnings.desc}</p>

                <div className="mt-8 overflow-hidden rounded-4xl border border-surface-2">
                  {earnings.rows.map((row, i) => (
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

                <p className="mt-3 text-xs text-muted">{earnings.note}</p>

                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {earnings.providersLabel}
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
            </div>
          </div>
        </section>

        {/* ============================================== TESTIMONIAL ===== */}
        <section className="px-6 pb-24">
          <Reveal className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-5xl bg-brand px-8 py-14 lg:px-14">
              <img
                src={africaCard}
                alt=""
                aria-hidden
                className="pointer-events-none absolute -right-10 -bottom-16 hidden w-72 select-none opacity-25 lg:block"
              />
              <img
                src="/assets/home/top-quotation.svg"
                alt=""
                aria-hidden
                className="h-8 w-8 opacity-70"
              />
              <p className="relative mt-5 max-w-3xl font-display text-2xl font-semibold leading-snug text-white lg:text-3xl">
                {testimonial.quote}
              </p>
              <p className="relative mt-6 font-semibold text-white">
                {testimonial.name}
              </p>
              <p className="relative text-sm text-white/70">{testimonial.role}</p>
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
