import type { ComponentType } from "react";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";
import { Reveal } from "./Reveal";
import loopPattern from "../assets/Group (2).png";
import {
  AirtimeIcon,
  ReceiptIcon,
  SecurityIcon,
  SupportIcon,
  TransferIcon,
  WalletIcon,
} from "./StandardIcons";

const icons: Record<string, ComponentType<{ className?: string }>> = {
  Wallet: WalletIcon,
  Percent: TransferIcon,
  Receipt: ReceiptIcon,
  Smartphone: AirtimeIcon,
  Phone: SupportIcon,
  ShieldCheck: SecurityIcon,
};

export function PlatformStandards() {
  const { t } = useTranslation();
  const { platformStandards } = useContent();
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
        {/* Colonne texte */}
        <Reveal className="max-w-md">
          <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink text-balance sm:text-4xl lg:text-[2.75rem]">
            {t("platformStandards.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {t("platformStandards.subtitle")}
          </p>
          <div className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-brand py-1.5 pl-1.5 pr-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-light text-brand">
              <ShieldCheck size={15} aria-hidden />
            </span>
            <span className="text-sm font-semibold text-white">
              {t("platformStandards.eyebrow")}
            </span>
          </div>
        </Reveal>

        {/* Grille des engagements, motif en arrière-plan */}
        <div className="relative">
          <img
            src={loopPattern}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-14 -top-16 w-64 max-w-none select-none opacity-70 sm:-right-20 sm:-top-20 sm:w-[26rem] lg:-right-24 lg:-top-14"
          />

          <Reveal delay={0.1}>
            <ul className="relative grid gap-px overflow-hidden rounded-3xl border border-surface-2 bg-surface-2 grid-cols-2">
              {platformStandards.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <li
                    key={item.label}
                    className="group flex flex-col items-start gap-3 bg-white p-4 transition-colors hover:bg-surface sm:flex-row sm:gap-4 sm:p-7"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-light sm:h-14 sm:w-14">
                      <Icon className="h-9 w-9 transition-transform sm:h-11 sm:w-11 duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-105" />
                    </span>
                    <h3 className="font-display text-sm font-semibold leading-snug text-pretty text-ink sm:pt-3.5 sm:text-[0.95rem]">
                      {item.label}
                    </h3>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
