import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";
import { Reveal } from "./Reveal";

export function FAQ() {
  const { t } = useTranslation();
  const { faqs } = useContent();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="sm:text-center">
          <h2 className="font-display font-bold text-[1.75rem] leading-[1.15] tracking-tight text-balance sm:text-3xl lg:text-4xl text-ink">
            {t("faq.title")}
          </h2>
        </Reveal>

        <div className="mt-10 sm:mt-12 divide-y divide-surface-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.question} delay={Math.min(i * 0.03, 0.3)}>
                <div className="py-5">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="w-full flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-display font-semibold text-ink">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 text-muted"
                    >
                      <ChevronDown size={20} />
                    </motion.span>
                  </button>
                  {/* Toujours dans le DOM (indexé par les moteurs), replié visuellement */}
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={false}
                    animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                    inert={!isOpen}
                  >
                    <p className="pt-3 text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
