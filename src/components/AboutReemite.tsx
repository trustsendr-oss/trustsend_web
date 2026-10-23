import { ArrowLeftRight, ArrowUpRight, CreditCard, Gem } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import reemiteWoman from "../assets/8988 copie.png";
import reemiteApp from "../assets/Tiree.jpeg";
import { Reveal } from "./Reveal";

export function AboutReemite() {
  const { i18n } = useTranslation();
  const english = i18n.language.startsWith("en");
  const pillars = english
    ? [
        { icon: CreditCard, title: "Finance within reach", text: "Useful financial services, brought together in one place." },
        { icon: ArrowLeftRight, title: "Connected payments", text: "Move money across borders and closer to everyday needs." },
        { icon: Gem, title: "Productive industries", text: "A long-term vision for finance that supports Africa’s growth." },
      ]
    : [
        { icon: CreditCard, title: "La finance à portée de main", text: "Des services financiers utiles, réunis au même endroit." },
        { icon: ArrowLeftRight, title: "Des paiements connectés", text: "Faire circuler l’argent au-delà des frontières et au plus près des besoins." },
        { icon: Gem, title: "Des secteurs productifs", text: "Une vision à long terme d’une finance au service de la croissance africaine." },
      ];

  return (
    <section aria-labelledby="about-reemite-title" className="px-5 py-16 sm:px-6 sm:py-24">
      <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-surface-2 bg-white shadow-[0_24px_80px_-48px_rgba(30,24,114,0.38)]">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative isolate flex flex-col justify-center overflow-hidden bg-brand px-7 py-10 text-white sm:px-10 sm:py-14 lg:px-12 lg:py-16">
            <div aria-hidden="true" className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
              {english ? "Our vision for Africa" : "Notre vision pour l’Afrique"}
            </p>
            <h2 id="about-reemite-title" className="mt-6 max-w-xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
              {english ? "Finance that helps Africa move forward." : "Une finance qui fait avancer l’Afrique."}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              {english
                ? "Reemite brings useful digital financial services closer to businesses and communities. Our long-term vision is to help transform Africa through finance and an economy that includes productive industries such as mining."
                : "Reemite rapproche les services financiers numériques des entreprises et des communautés. Notre vision à long terme est de contribuer à transformer l’Afrique grâce à la finance et à une économie qui inclut des secteurs productifs comme l’industrie minière."}
            </p>
            <Link
              to="/transferts-internationaux"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
            >
              {english ? "Explore Reemite" : "Découvrir Reemite"}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative min-h-[340px] overflow-hidden bg-[#f5f8ff] sm:min-h-[440px] lg:min-h-[530px]">
            <img
              src={reemiteWoman}
              alt={english ? "A woman holding a phone with the Reemite app" : "Une femme présentant l’application Reemite sur son téléphone"}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute bottom-5 left-5 h-[112px] w-[112px] overflow-hidden rounded-[1.15rem] border-[5px] border-white bg-white shadow-[0_18px_50px_-16px_rgba(15,23,42,0.48)] sm:bottom-8 sm:left-8 sm:h-[145px] sm:w-[145px]">
              <img
                src={reemiteApp}
                alt={english ? "Reemite app showing transfers and multi-currency accounts" : "L’application Reemite avec ses transferts et comptes multidevises"}
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover object-top"
              />
            </div>
            <p className="absolute bottom-6 right-5 max-w-[9rem] rounded-xl border border-white/80 bg-white/90 px-3 py-2 text-xs font-semibold leading-5 text-ink shadow-lg backdrop-blur-sm sm:bottom-9 sm:right-8 sm:max-w-[11rem] sm:px-4 sm:py-3 sm:text-sm">
              {english ? "One app, closer to your everyday finances." : "Une application au plus près de vos besoins."}
            </p>
          </div>
        </div>

        <div className="grid divide-y divide-surface-2 border-t border-surface-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} className="flex gap-4 px-6 py-6 sm:block sm:px-7 sm:py-8 lg:px-9">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/5 text-brand sm:mb-5">
                <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-ink sm:text-base">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
