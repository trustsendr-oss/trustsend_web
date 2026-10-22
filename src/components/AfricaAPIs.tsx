import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { AFRICA_DOTS } from "../data/africaMap";

// Points de la carte, parsés une seule fois
const DOTS = AFRICA_DOTS.split(",").map((d) => {
  const [x, y, c] = d.split(" ");
  return { x: +x, y: +y, covered: c === "1" };
});

// Hub central (Kinshasa) et routes, coordonnées dans le viewBox 0 0 700 730
const CORE = { x: 333, y: 423 };

type Route = {
  city: string;
  x: number;
  y: number;
  operator: string;
  currency: string;
  amount: number;
  ms: number;
};

const ROUTES: Route[] = [
  {
    city: "Abidjan",
    x: 140,
    y: 327,
    operator: "Orange Money",
    currency: "XOF",
    amount: 25000,
    ms: 182,
  },
  {
    city: "Nairobi",
    x: 548,
    y: 393,
    operator: "M-Pesa",
    currency: "KES",
    amount: 4500,
    ms: 164,
  },
  {
    city: "Lagos",
    x: 214,
    y: 315,
    operator: "MTN MoMo",
    currency: "NGN",
    amount: 60000,
    ms: 205,
  },
  {
    city: "Dakar",
    x: 14,
    y: 233,
    operator: "Wave",
    currency: "XOF",
    amount: 15000,
    ms: 171,
  },
  {
    city: "Kigali",
    x: 481,
    y: 400,
    operator: "MTN MoMo",
    currency: "RWF",
    amount: 30000,
    ms: 149,
  },
  {
    city: "Johannesburg",
    x: 460,
    y: 642,
    operator: "Visa",
    currency: "ZAR",
    amount: 850,
    ms: 223,
  },
  {
    city: "Douala",
    x: 277,
    y: 340,
    operator: "Orange Money",
    currency: "XAF",
    amount: 20000,
    ms: 158,
  },
  {
    city: "Le Caire",
    x: 492,
    y: 80,
    operator: "Mastercard",
    currency: "EGP",
    amount: 1200,
    ms: 241,
  },
];

const ROUTE_INTERVAL = 2800;

// Arc quadratique du hub vers une ville, bombé vers le haut
function arcPath(x: number, y: number) {
  const mx = (CORE.x + x) / 2;
  const my = (CORE.y + y) / 2;
  const dist = Math.hypot(x - CORE.x, y - CORE.y);
  return `M${CORE.x} ${CORE.y} Q${mx} ${my - dist * 0.35} ${x} ${y}`;
}

function CoverageMap({ active, cycled }: { active: number; cycled: boolean }) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const route = ROUTES[active];

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg
        viewBox="0 0 700 730"
        className="h-auto w-full"
        role="img"
        aria-label={t("africaAPIs.mapLabel")}
      >
        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={4.6}
            className={d.covered ? "fill-accent" : "fill-brand"}
            opacity={d.covered ? 0.55 : 0.09}
          />
        ))}

        {/* Routes inactives */}
        {ROUTES.map((r) => (
          <path
            key={r.city}
            d={arcPath(r.x, r.y)}
            fill="none"
            className="stroke-brand"
            strokeOpacity={0.18}
            strokeWidth={1.5}
            strokeDasharray="3 5"
          />
        ))}

        {/* Route active */}
        <motion.path
          key={route.city}
          d={arcPath(route.x, route.y)}
          fill="none"
          className="stroke-accent"
          strokeWidth={3}
          strokeLinecap="round"
          initial={cycled && !reduceMotion ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Villes */}
        {ROUTES.map((r, i) => (
          <g key={r.city}>
            {i === active && !reduceMotion && (
              <motion.circle
                cx={r.x}
                cy={r.y}
                className="fill-accent"
                initial={{ r: 8, opacity: 0.45 }}
                animate={{ r: 26, opacity: 0 }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.6,
                }}
              />
            )}
            <circle
              cx={r.x}
              cy={r.y}
              r={i === active ? 9 : 6.5}
              className={
                i === active
                  ? "fill-accent-light stroke-brand"
                  : "fill-white stroke-accent"
              }
              strokeWidth={i === active ? 3 : 2.5}
              style={{ transition: "r 300ms ease" }}
            />
          </g>
        ))}

        {/* Hub Reemite */}
        <circle
          cx={CORE.x}
          cy={CORE.y}
          r={20}
          className="fill-brand"
          opacity={0.08}
        />
        <circle cx={CORE.x} cy={CORE.y} r={12} className="fill-brand" />
        <circle cx={CORE.x} cy={CORE.y} r={4.5} className="fill-accent-light" />
      </svg>

      {/* Étiquette de la ville active */}
      <motion.div
        key={route.city}
        initial={cycled ? { opacity: 0, y: 6 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink shadow-pop"
        style={{
          left: `${(route.x / 700) * 100}%`,
          top: `calc(${(route.y / 730) * 100}% - 16px)`,
        }}
      >
        {route.city} · <span className="text-accent">{route.operator}</span>
      </motion.div>
    </div>
  );
}

// Requête API unifiée, synchronisée avec la route active
function ApiCard({ route, cycled }: { route: Route; cycled: boolean }) {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden rounded-2xl bg-brand font-mono text-xs leading-6 text-white/80 shadow-pop">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span>
          <span className="font-semibold text-accent-light">POST</span>{" "}
          /v1/payments
        </span>
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </span>
      </div>
      <motion.div
        key={route.city}
        initial={cycled ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="px-4 py-3"
      >
        <p>
          <span className="text-white/45">"amount":</span> {route.amount},
        </p>
        <p>
          <span className="text-white/45">"currency":</span>{" "}
          <span className="text-[#9cc0ff]">"{route.currency}"</span>,
        </p>
        <p>
          <span className="text-white/45">"method":</span>{" "}
          <span className="text-[#9cc0ff]">"auto"</span>
        </p>
        <p className="mt-2 flex items-center gap-2 whitespace-nowrap border-t border-white/10 pt-2 text-accent-light">
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent-light"
            aria-hidden
          />
          {t("africaAPIs.live.routed", { operator: route.operator })}
          <span className="ml-auto text-white/45">{route.ms} ms</span>
        </p>
      </motion.div>
    </div>
  );
}

export function AfricaAPIs() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  // Premier affichage statique (HTML pré-rendu visible), animations à partir de la 1re rotation
  const [cycled, setCycled] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => {
        setCycled(true);
        setActive((i) => (i + 1) % ROUTES.length);
      },
      ROUTE_INTERVAL,
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  const facts = [
    t("africaAPIs.stats.countries"),
    t("africaAPIs.stats.currencies"),
    t("africaAPIs.stats.uptime"),
  ];

  return (
    <section
      id="africa-apis"
      aria-label={t("africaAPIs.title")}
      className="bg-white py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* En-tête : titre court, une phrase, une action */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <Reveal>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance text-ink sm:text-5xl lg:text-[4rem]">
              {t("africaAPIs.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-7 text-pretty text-muted sm:text-lg">
              {t("africaAPIs.subtitle")}
            </p>
            <a
              href="#developers"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              {t("africaAPIs.ctaDocs")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* Scène : la carte porte la section */}
        <Reveal delay={0.1}>
          <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-surface-2 bg-surface px-5 pb-6 pt-10 sm:mt-16 sm:px-10 sm:pb-10 lg:px-14">
            <CoverageMap active={active} cycled={cycled} />

            <div className="mt-6 flex flex-col gap-5 lg:contents">
              <div className="lg:absolute lg:bottom-10 lg:left-14 lg:w-[280px]">
                <ApiCard route={ROUTES[active]} cycled={cycled} />
              </div>

              {/* Légende de la carte */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted lg:absolute lg:right-14 lg:top-10 lg:max-w-[460px] lg:justify-end">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-accent/60"
                    aria-hidden
                  />
                  {t("africaAPIs.legend.covered")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-brand/10"
                    aria-hidden
                  />
                  {t("africaAPIs.legend.soon")}
                </span>
                <span
                  className="hidden h-3 w-px bg-ink/15 sm:block"
                  aria-hidden
                />
                {facts.map((f) => (
                  <span key={f} className="font-semibold text-ink">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
