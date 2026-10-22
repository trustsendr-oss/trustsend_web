import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";

type FeedItem = { icon: string; title: string; meta: string; amount: string };

// Une ligne d'activité qui défile lentement (liste doublée pour une boucle sans couture)
function ActivityTicker({ items }: { items: FeedItem[] }) {
  const reduceMotion = useReducedMotion();
  const loop = [...items, ...items];
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.ul
        className="flex w-max"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <li key={i} className="flex items-baseline gap-2 whitespace-nowrap pr-10 text-sm">
            <span className="text-white/55">{item.title}</span>
            <span
              className={`font-medium tabular-nums ${
                item.amount.startsWith("+") ? "text-accent-light" : "text-white"
              }`}
            >
              {item.amount}
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

export function CTABanner() {
  const { t } = useTranslation();
  const feed = t("ctaBanner.feed", { returnObjects: true }) as FeedItem[];

  return (
    <section className="px-5 pb-16 sm:px-6 sm:pb-24">
      <Reveal className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] bg-brand">
          <div className="grid gap-8 px-7 pb-12 pt-14 sm:px-12 sm:pt-16 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16 lg:px-16 lg:pb-16 lg:pt-20">
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              {t("ctaBanner.title")}
            </h2>
            <div>
              <p className="max-w-sm text-base leading-7 text-white/60">{t("ctaBanner.subtitle")}</p>
              <Link
                to="/signup"
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
              >
                {t("ctaBanner.cta")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div role="img" aria-label={t("ctaBanner.feedLabel")} className="border-t border-white/10 py-5">
            <ActivityTicker items={feed} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
