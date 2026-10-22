
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";
import { Reveal } from "./Reveal";

export function DevShowcase() {
  const { t } = useTranslation();
  const { codeSamples, devCards } = useContent();
  const languages = Object.keys(codeSamples);
  const [lang, setLang] = useState(languages[0]);

  return (
    <section id="developers" className="bg-brand py-14 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <Reveal className="mb-10 max-w-2xl sm:mx-auto sm:mb-12 sm:text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-light">
            {t("devShowcase.eyebrow")}
          </p>

          <h2 className="font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight text-balance sm:text-3xl lg:text-4xl">
            {t("devShowcase.title")}
          </h2>

          <p className="mt-4 text-white/60">
            {t("devShowcase.subtitle")}
          </p>
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-2">

          {/* Features */}
          <Reveal className="min-w-0">
            <div className="space-y-3">
              {devCards.map((card) => (
                <div
                  key={card.title}
                  className="flex gap-4 rounded-2xl p-4 transition-colors hover:bg-white/[0.05]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <img
                      src={card.icon}
                      alt=""
                      className="h-6 w-6 object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-display font-semibold">
                      {card.title}
                    </h3>

                    <p className="mt-1 text-sm leading-relaxed text-white/55">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Code */}
          <Reveal delay={0.1} className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>

                  <span className="ml-2 text-xs text-white/40">
                    {t("devShowcase.example")}
                  </span>
                </div>

                <Terminal size={15} className="text-white/30" />
              </div>

              {/* Languages */}
              <div className="flex gap-1 overflow-x-auto border-b border-white/10 px-3">
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => setLang(language)}
                    className={`shrink-0 whitespace-nowrap px-3 py-2.5 text-xs font-medium transition-colors ${
                      lang === language
                        ? "border-b-2 border-accent-light text-accent-light"
                        : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>

              {/* Code */}
              <div className="min-h-[220px] overflow-x-auto p-4 sm:min-h-[280px] sm:p-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.pre
                    key={lang}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs leading-6 text-white/75 sm:text-sm sm:leading-7"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {codeSamples[lang]}
                  </motion.pre>
                </AnimatePresence>
              </div>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

