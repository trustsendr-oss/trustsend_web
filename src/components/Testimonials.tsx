import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";
import { Reveal } from "./Reveal";
import loopPattern from "../assets/Group (2).png";

export function Testimonials() {
  const { t } = useTranslation();
  const { testimonials } = useContent();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const current = testimonials[index];

  return (
    <section id="temoignages" className="relative scroll-mt-16 overflow-hidden py-16 lg:scroll-mt-20 sm:py-20 lg:py-24 bg-brand-light/40">
      <img
        src={loopPattern}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-30 top-1/2 hidden w-[520px] max-w-none -translate-y-1/2 select-none opacity-25 lg:block"
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="font-display font-bold text-[1.75rem] leading-[1.15] tracking-tight text-balance sm:text-3xl lg:text-4xl text-ink">
            {t("testimonials.title")}
          </h2>
          <p className="mt-2 text-muted">
            {t("testimonials.subtitle")}
          </p>
        </Reveal>

        <div className="relative mt-10 sm:mt-12">
          <img
            src="/assets/home/top-quotation.svg"
            alt=""
            className="mx-auto h-8 opacity-40"
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4"
            >
              <p className="text-lg sm:text-xl lg:text-2xl font-display text-ink leading-snug">
                “{current.quote}”
              </p>
              <p className="mt-6 font-semibold text-ink">{current.name}</p>
              <p className="text-sm text-muted">
                {current.title}, {current.company}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label={t("testimonials.prev")}
              className="h-10 w-10 rounded-full bg-white shadow-card flex items-center justify-center text-muted-2 hover:text-brand transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((tm, i) => (
                <button
                  key={tm.name}
                  onClick={() => setIndex(i)}
                  aria-label={t("testimonials.goTo", { name: tm.name })}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-brand" : "w-2 bg-brand/20"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label={t("testimonials.next")}
              className="h-10 w-10 rounded-full bg-white shadow-card flex items-center justify-center text-muted-2 hover:text-brand transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
