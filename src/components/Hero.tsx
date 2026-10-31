import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";
import { Reveal } from "./Reveal";
import heroAsset from "../assets/hero.png";
import patternAsset from "../assets/Group.png";
import bgAsset from "../assets/hero_woman.webp";
import bgAsset2 from "../assets/bg_2.png";

const SLIDE_COUNT = 2;
const SLIDE_INTERVAL = 8000;

// TODO: remplacer par les liens réels des stores
const APP_STORE_URL = "#";
const PLAY_STORE_URL = "#";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.54 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.41 1.2-2.47-.03-.01-2.3-.88-2.3-3.52ZM14.2 6.13c.6-.74 1.01-1.75.9-2.77-.87.04-1.93.58-2.55 1.31-.56.64-1.05 1.68-.92 2.67.97.08 1.97-.49 2.57-1.21Z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path fill="#34A853" d="M3.6 2.3 13.4 12l-9.8 9.7a1.6 1.6 0 0 1-.6-1.3V3.6c0-.5.2-1 .6-1.3Z" />
      <path fill="#FBBC04" d="m16.7 15.3-3.3-3.3 3.3-3.3 3.8 2.2c1.1.6 1.1 1.6 0 2.2l-3.8 2.2Z" />
      <path fill="#EA4335" d="M16.7 15.3 13.4 12l-9.8 9.7c.4.4 1 .4 1.7 0l11.4-6.4Z" />
      <path fill="#4285F4" d="M16.7 8.7 5.3 2.3c-.7-.4-1.3-.4-1.7 0l9.8 9.7 3.3-3.3Z" />
    </svg>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const { heroCapabilities, heroSpotlight, paymentMethods, recommendationChips } =
    useContent();
  const [slide, setSlide] = useState(0);
  const [capIndex, setCapIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setCapIndex((i) => (i + 1) % heroCapabilities.length);
    }, 2600);

    return () => clearInterval(t);
  }, []);

  // Défilement automatique des slides, relancé à chaque navigation manuelle
  useEffect(() => {
    if (paused) return;

    const t = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDE_COUNT);
    }, SLIDE_INTERVAL);

    return () => clearInterval(t);
  }, [slide, paused]);

  const prevSlide = () =>
    setSlide((s) => (s - 1 + SLIDE_COUNT) % SLIDE_COUNT);

  const nextSlide = () =>
    setSlide((s) => (s + 1) % SLIDE_COUNT);

  return (
    <section
      className="relative overflow-hidden bg-[#020D30] pt-16 pb-12 sm:pt-28 sm:pb-14 lg:pt-30 lg:pb-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Navigation gauche */}
      <button
        onClick={prevSlide}
        aria-label={t("hero.slidePrev")}
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow-card text-muted-2 hover:text-brand transition-colors"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Navigation droite */}
      <button
        onClick={nextSlide}
        aria-label={t("hero.slideNext")}
        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow-card text-muted-2 hover:text-brand transition-colors"
      >
        <ChevronRight size={18} />
      </button>

      <div className="relative mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-0 lg:px-10">
        {/* Illustration décorative */}
        <img
          src={heroAsset}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-10 left-4 hidden w-36 select-none opacity-10 drop-shadow-[0_25px_60px_rgba(124,58,237,0.5)] sm:block md:right-10 lg:top-0 lg:w-82"
        />

        {/* Pattern décoratif */}
        <img
          src={patternAsset}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-4 bottom-24 hidden w-40 select-none opacity-30 md:block lg:bottom-20 lg:w-56"
        />

        <AnimatePresence mode="wait" initial={false}>
          {/* =========================================================
              SLIDE 1 — MOBILE MONEY
          ========================================================= */}
          {slide === 0 ? (
            <motion.div
              key="capability-slide"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
            >
              {/* Colonne texte */}
              <div className="max-w-xl">
                <Reveal>
                  <h1 className="font-display font-bold text-[1.95rem] sm:text-4xl lg:text-[2.6rem] leading-[1.12] tracking-tight text-white text-balance">
                    {t("hero.headline")}{" "}
                    <span className="text-accent">
                      {t("hero.headlineAccent")}
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                    {t("hero.subtext")}
                  </p>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
                    <a
                      href={APP_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-accent px-3 py-2.5 sm:justify-start sm:gap-3 sm:px-5 text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent/90"
                    >
                      <AppleIcon />
                      <span className="flex flex-col text-left leading-tight">
                        <span className="text-[10px] font-medium uppercase tracking-wide text-white/80">
                          {t("hero.downloadOn")}
                        </span>
                        <span className="font-semibold">App Store</span>
                      </span>
                    </a>

                    <a
                      href={PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 px-3 py-2.5 sm:justify-start sm:gap-3 sm:px-5 text-white transition-all hover:-translate-y-0.5 hover:border-white"
                    >
                      <PlayIcon />
                      <span className="flex flex-col text-left leading-tight">
                        <span className="text-[10px] font-medium uppercase tracking-wide text-white/70">
                          {t("hero.getItOn")}
                        </span>
                        <span className="font-semibold">Google Play</span>
                      </span>
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-white/60">
                      {t("hero.availablePayments")}
                    </span>

                    <div className="flex items-center gap-3">
                      {paymentMethods.map((m) => (
                        <img
                          key={m.name}
                          src={m.src}
                          alt={m.name}
                          className="h-7 w-7 rounded-md border border-white/15 bg-white/5 object-contain transition hover:opacity-90 hover:grayscale-0"
                        />
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Colonne visuelle */}
              <Reveal delay={0.15}>
                <div className="relative mx-auto w-full max-w-[460px]">
                  {/* Halo décoratif */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-light opacity-70 blur-3xl"
                  />

                  <motion.img
                    key={capIndex}
                    src={bgAsset}
                    alt="Aperçu de l'application Reemite"
                    className="mx-auto aspect-[5/4] w-full select-none object-contain lg:scale-125 lg:h-[60vh]"
                  />

                  {/* Indicateurs */}
                  <div className="mt-6 flex justify-center gap-2 sm:mt-8">
                    {heroCapabilities.map((s, i) => (
                      <button
                        key={s.label}
                        onClick={() => setCapIndex(i)}
                        aria-label={t("hero.showLabel", { label: s.label })}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === capIndex
                            ? "w-7 bg-accent"
                            : "w-2 bg-white/25"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            </motion.div>
          ) : (
            /* =========================================================
                SLIDE 2 — SPOTLIGHT
            ========================================================= */
            <motion.div
              key="spotlight-slide"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 1, x: -24 }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
            >
              <div className="max-w-xl">
                <Reveal>
                  <p className="font-display font-bold text-[1.75rem] sm:text-3xl lg:text-[2.35rem] leading-[1.12] tracking-tight text-accent-light">
                    {heroSpotlight.eyebrow}
                  </p>

                  <p className="font-display font-bold text-[1.75rem] sm:text-3xl lg:text-[2.35rem] leading-[1.12] tracking-tight text-white">
                    {heroSpotlight.heading}
                  </p>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-5 text-white/70">
                    {heroSpotlight.subline}
                  </p>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-soft transition-colors hover:bg-accent/90"
                    >
                      {t("hero.ctaSignupNow")}
                      <ArrowRight size={18} />
                    </a>

                    <a
                      href="#"
                      className="font-semibold text-white transition-colors hover:text-accent-light"
                    >
                      {t("hero.ctaLearnMore")}
                    </a>
                  </div>
                </Reveal>
              </div>

              {/* Visuel spotlight */}
              <Reveal delay={0.15}>
                <div className="relative mx-auto w-full max-w-[460px]">
                  {/* Halo décoratif */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-light opacity-70 blur-3xl"
                  />

                  <img
                    src={bgAsset2}
                    alt="Reemite : paiements, cartes et mobile money en Afrique"
                    className="mx-auto aspect-[5/4] w-full select-none object-contain lg:scale-125 lg:h-[60vh]"
                  />
                </div>
              </Reveal>
            </motion.div>
          )}
        </AnimatePresence>

          {/* =========================================================
              RECOMMENDATIONS
          ========================================================= */}
          <Reveal delay={0.25}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded border border-surface-2 bg-white px-4 py-3.5 sm:px-5 sm:py-4 lg:-mb-20">
              <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-ink bg-accent/30 p-2 rounded-full">
                {t("hero.whatToDo")}
              </span>
              <div className="-mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none] sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible sm:px-0">
                {recommendationChips.map((c) => (
                  <button
                    key={c}
                    className="shrink-0 whitespace-nowrap rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-ink/80 transition-colors hover:bg-brand-light hover:text-brand"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
      </div>
    </section>
  );
}
