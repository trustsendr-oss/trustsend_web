import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";
import { Reveal } from "./Reveal";
import { useHashTab } from "../hooks/useHashTab";

// Ancres des profils, dans l'ordre de `industries` : "/#profil-ecoles" ouvre l'onglet Écoles
const PROFILE_SLUGS = ["commercants", "ecoles", "diaspora", "agents", "epargne"];

export function IndustryGrid() {
  const { t } = useTranslation();
  const { industries } = useContent();
  const [active, setActive] = useState(0);
  const ind = industries[active];
  useHashTab("profil", PROFILE_SLUGS, setActive);

  return (
    <section id="profils" data-anchor-prefix="profil" className="scroll-mt-16 py-16 sm:py-20 lg:scroll-mt-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl sm:mx-auto sm:text-center">
          <h2 className="font-display font-bold text-[1.75rem] leading-[1.15] tracking-tight text-balance sm:text-3xl lg:text-4xl text-ink">
            <span className="bg-amber-200/45 box-decoration-clone px-1.5">
              {t("industryGrid.title")}
            </span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg">
            {t("industryGrid.subtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 -mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:mt-10 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
            {industries.map((i, idx) => (
              <button
                key={i.name}
                onClick={() => setActive(idx)}
                className={`flex shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2.5 sm:px-5 text-sm font-semibold transition-colors ${
                  active === idx
                    ? "bg-brand text-white shadow-soft"
                    : "border border-surface-2 bg-white text-muted-2 hover:text-ink"
                }`}
              >
                <img src={i.icon} alt="" className="h-4 w-4" />
                {i.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded bg-white"
            >
              {/* ---------- Photo ---------- */}
              <div className="relative aspect-[4/3] w-full sm:aspect-[2/1] lg:aspect-[21/9]">
                <img
                  src={ind.photo}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/60 via-ink/5 to-transparent sm:block" />
              </div>

              {/* ---------- Contenu : empilé sous la photo en mobile, incrusté dessus à partir de sm ---------- */}
              <div className="relative p-6 sm:absolute sm:inset-0 sm:flex sm:items-center sm:p-0">
                <div className="sm:m-8 sm:max-w-md  sm:bg-white sm:p-8 sm:shadow-pop lg:sm:p-9">
                  <h3 className="font-display text-xl font-bold leading-tight text-ink sm:text-2xl lg:text-[1.7rem]">
                    {ind.headingLead}{" "}
                    <span className="text-accent">{ind.headingHighlight}</span>
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {ind.detail}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {ind.logos.map((logo) => (
                      <span
                        key={logo}
                        className="font-display text-sm font-bold text-ink/70"
                      >
                        {logo}
                      </span>
                    ))}
                    <span className="text-xs font-semibold text-muted">
                      {ind.count}
                    </span>
                  </div>

                  <a
                    href="#"
                    className="group mt-7 inline-flex items-center gap-2 rounded bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    {t("industryGrid.seeSolutions")}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
