import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";
import { Reveal } from "./Reveal";
// import loopPattern from "assets/images/figure-get-card.webp";

export function Testimonials() {
  const { t } = useTranslation();
  const { testimonials } = useContent();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (
      testimonials.length < 2 ||
      isPaused ||
      isHovered ||
      hasFocus ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [hasFocus, isHovered, isPaused, testimonials.length]);

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const visibleTestimonials = Array.from(
    { length: Math.min(testimonials.length, 3) },
    (_, offset) => ({
      testimonial: testimonials[(index + offset) % testimonials.length],
      offset,
    }),
  );

  return (
    <section
      id="temoignages"
      className="relative scroll-mt-16 overflow-hidden bg-brand-light/40 py-16 sm:py-20 lg:scroll-mt-20 lg:py-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHasFocus(false);
        }
      }}
    >
      <img
        src="/assets/images/figure-get-card.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-30 top-1/2 hidden w-[520px] max-w-none -translate-y-1/2 select-none opacity-25 lg:block"
      />
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <Reveal>
          <h2 className="font-display font-bold text-[1.75rem] leading-[1.15] tracking-tight text-balance sm:text-3xl lg:text-4xl text-ink">
            {t("testimonials.title")}
          </h2>
          <p className="mt-2 text-muted">
            {t("testimonials.subtitle")}
          </p>
        </Reveal>

        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.14 },
                },
                exit: {
                  opacity: 0,
                  transition: { duration: 0.18 },
                },
              }}
              className="grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleTestimonials.map(({ testimonial, offset }) => (
                <motion.article
                  key={testimonial.name}
                  variants={{
                    hidden: { opacity: 0, y: -24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    },
                    exit: { opacity: 0, y: 12 },
                  }}
                  className={`flex h-full flex-col rounded-3xl border border-ink/5 bg-white p-6 text-left shadow-card sm:p-7 ${
                    offset === 1 ? "hidden sm:flex" : ""
                  } ${offset === 2 ? "hidden lg:flex" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white"
                    >
                      {testimonial.company.charAt(0)}
                    </span>
                    <span className="font-semibold text-ink">
                      {testimonial.company}
                    </span>
                  </div>

                  <p className="mt-6 flex-1 text-base leading-relaxed text-ink sm:text-lg">
                    “{testimonial.quote}”
                  </p>

                  <div
                    className="mt-6 flex items-center gap-1 text-amber-500"
                    role="img"
                    aria-label="5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }, (_, star) => (
                      <Star
                        key={star}
                        aria-hidden="true"
                        size={16}
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    ))}
                    <span className="ml-1 text-sm font-semibold text-ink">
                      5.0
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3 border-t border-ink/10 pt-5">
                    <img
                      src={testimonial.avatar}
                      alt=""
                      loading="lazy"
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              aria-label={t("testimonials.prev")}
              disabled={testimonials.length < 2}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-muted-2 shadow-card transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((tm, i) => (
                <button
                  key={tm.name}
                  onClick={() => setIndex(i)}
                  aria-label={t("testimonials.goTo", { name: tm.name })}
                  aria-pressed={i === index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-brand" : "w-2 bg-brand/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsPaused((paused) => !paused)}
              aria-label={t(
                isPaused ? "testimonials.play" : "testimonials.pause",
              )}
              aria-pressed={isPaused}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-muted-2 shadow-card transition-colors hover:text-brand"
            >
              {isPaused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button
              onClick={next}
              aria-label={t("testimonials.next")}
              disabled={testimonials.length < 2}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-muted-2 shadow-card transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
