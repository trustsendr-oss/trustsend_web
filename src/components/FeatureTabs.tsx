import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";
import { Reveal } from "./Reveal";
import { useHashTab } from "../hooks/useHashTab";
import cryptoSwapImage from "../assets/crypto-swap-topup.jpeg";

const featureImages: Record<string, { src: string; alt: string }> = {
  "cartes-virtuelles": {
    src: "/assets/images/figure-get-card.webp",
    alt: "Carte virtuelle Reemite",
  },
  "cryptos-swap": {
    src: cryptoSwapImage,
    alt: "Recharger un compte Reemite en USDT sur BNB Smart Chain",
  },
  paiements: {
    src: "/assets/images/merchant-qr.webp",
    alt: "Paiement marchand par QR code",
  },
  transferts: {
    src: "/assets/images/industry-diaspora.webp",
    alt: "Transfert d’argent vers les proches",
  },
  "retrait-depot": {
    src: "/assets/images/industry-agents.webp",
    alt: "Dépôt et retrait auprès d’un agent",
  },
  "epargne-bgame": {
    src: "/assets/images/industry-savings.webp",
    alt: "Épargne collective et Likelemba",
  },
};

export function FeatureTabs() {
  const { t } = useTranslation();
  const { featureTabs } = useContent();
  const [active, setActive] = useState(0);
  const tab = featureTabs[active];
  const featureImage = featureImages[tab.id] ?? featureImages["cartes-virtuelles"];
  // "/#solution-epargne-bgame" ouvre l'onglet correspondant
  useHashTab("solution", featureTabs.map((f) => f.id), setActive);

  return (
    <section id="solutions" data-anchor-prefix="solution" className="scroll-mt-16 lg:scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl sm:mx-auto sm:text-center">
          <h2 className="font-display font-bold text-[1.75rem] leading-[1.15] tracking-tight text-balance sm:text-3xl lg:text-4xl text-ink">
            {t("featureTabs.title")}
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg">
            {t("featureTabs.subtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 -mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:mt-10 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
            {featureTabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className={`relative flex shrink-0 snap-start items-center gap-1.5 px-4 py-2.5 sm:px-5 rounded-full text-sm font-semibold transition-colors ${
                  active === i
                    ? "bg-brand text-white shadow-soft"
                    : "bg-white text-muted-2 hover:text-ink border border-surface-2"
                }`}
              >
                {t.label}
                {t.badge && (
                  <span className="text-[9px] font-bold uppercase bg-accent-light text-accent px-1.5 py-0.5 rounded-full">
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-14 grid lg:grid-cols-2 gap-10 sm:gap-12 items-center ">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="order-2 lg:order-1"
            >
              <div className="h-10 w-10 rounded-xl bg-brand-light flex items-center justify-center mb-4">
                <img src={tab.icon} alt="" className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-ink">
                {tab.heading}
              </h3>
              <p className="mt-4 text-muted text-base sm:text-lg">{tab.description}</p>
              <ul className="mt-6 space-y-4">
                {tab.bullets.map((b) => (
                  <li key={b.label} className="border-l-2 border-accent-light pl-4">
                    <p className="font-semibold text-ink">{b.label}</p>
                    <p className="text-sm text-muted mt-0.5">{b.desc}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab.id + "-mockup"}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="order-1 lg:order-2"
            >
              <motion.img
                src={featureImage.src}
                alt={featureImage.alt}
                className="mx-auto block aspect-[5/4] w-full select-none rounded-xl object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
