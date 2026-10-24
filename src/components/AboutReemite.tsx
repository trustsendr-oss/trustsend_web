import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import reemiteWoman from "../assets/8988 copie.png";
import { Reveal } from "./Reveal";

// Le « R » du logo Reemite en ton sur ton, agrandi derrière le portrait.
// Les cartes empilées sont détourées par un contour couleur panneau, comme dans le logo.
function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <g fill="currentColor">
        <path d="M 51 47.5 L 65 47.5 L 93 89 Q 95 92 91.4 92 L 81 92 Q 78.6 92 77.4 90.2 Z" />
        <path d="M 15 7 L 61 7 C 79 7 91 18.5 91 33 C 91 44.5 85.5 52.5 78 56.5 Q 74 58.6 70.6 55.4 L 64.4 49.6 Q 62 47.4 64.8 45.6 C 69.6 42.8 72 39.4 72 35 C 72 30 68 27 62 27 L 28.5 27 Q 25.5 27 23.4 24.9 L 12.6 14.2 Q 9.6 11.2 11.3 9 Q 12.6 7 15 7 Z" />
      </g>
      <g fill="currentColor" stroke="var(--color-brand-light)" strokeWidth="2.6" paintOrder="stroke">
        <rect x="18" y="40.5" width="29.5" height="17" rx="3.2" />
        <rect x="10.5" y="49.5" width="34.5" height="19" rx="3.6" />
        <rect x="5" y="57.5" width="36.5" height="27" rx="4.6" />
      </g>
    </svg>
  );
}

export function AboutReemite() {
  const { i18n } = useTranslation();
  const english = i18n.language.startsWith("en");

  return (
    <section aria-labelledby="about-reemite-title" className="px-6 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32 lg:px-10">
      <Reveal className="relative mx-auto grid max-w-7xl rounded-[2rem] bg-brand-light lg:min-h-[440px] lg:grid-cols-2">
        {/* Le « R » reste dans le cadre ; le portrait, lui, en déborde par le haut */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[2rem]">
          <BrandMark className="absolute right-[7%] top-[10%] w-[34%] text-white max-lg:hidden" />
        </div>

        <div className="relative flex flex-col justify-center px-7 py-12 sm:px-12 lg:py-16 lg:pl-16">
          <h2
            id="about-reemite-title"
            className="max-w-md font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink text-balance sm:text-4xl lg:text-[2.75rem]"
          >
            {english ? "Finance that helps Africa move forward." : "Une finance qui fait avancer l’Afrique."}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            {english
              ? "Reemite brings useful digital financial services closer to businesses and communities."
              : "Reemite rapproche les services financiers numériques des entreprises et des communautés."}
          </p>
          <Link
            to="/transferts-internationaux"
            className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-brand-light"
          >
            {english ? "Explore Reemite" : "Découvrir Reemite"}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="relative h-80 sm:h-96 lg:h-auto">
          <img
            src={reemiteWoman}
            alt={english ? "A woman holding a phone with the Reemite app" : "Une femme présentant l’application Reemite sur son téléphone"}
            loading="lazy"
            decoding="async"
            className="absolute bottom-0 left-1/2 h-full! w-auto max-w-none! -translate-x-1/2 lg:h-[122%]!"
          />
        </div>
      </Reveal>
    </section>
  );
}
