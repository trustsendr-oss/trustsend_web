import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";
import { Reveal } from "./Reveal";
import {
  CardIcon,
  ReceiptIcon,
  SavingsIcon,
  SecurityIcon,
  TransferIcon,
  WalletIcon,
} from "./StandardIcons";

const icons: Record<string, ComponentType<{ className?: string }>> = {
  Wallet: WalletIcon,
  Percent: TransferIcon,
  Receipt: ReceiptIcon,
  Card: CardIcon,
  Savings: SavingsIcon,
  ShieldCheck: SecurityIcon,
};

export function PlatformStandards() {
  const { t } = useTranslation();
  const { platformStandards } = useContent();
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* En-tête : titre à gauche, engagement à droite */}
        <Reveal className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-20">
          <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink text-balance sm:text-4xl lg:text-[2.75rem]">
            {t("platformStandards.title")}
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-muted sm:text-lg lg:justify-self-end">
            {t("platformStandards.subtitle")}
          </p>
        </Reveal>

        {/* Les engagements, séparés par des filets */}
        <Reveal delay={0.1}>
          <ul className="mt-12 grid grid-cols-2 gap-px border-y border-surface-2 bg-surface-2 lg:mt-16 lg:grid-cols-3">
            {platformStandards.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.label} className="group bg-white px-1 py-7 sm:px-8 sm:py-10 lg:first:pl-0 lg:[&:nth-child(4)]:pl-0">
                  <Icon className="h-10 w-10 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 sm:h-12 sm:w-12" />
                  <h3 className="mt-5 max-w-[15rem] font-display text-[0.95rem] font-semibold leading-snug text-ink text-pretty sm:text-lg">
                    {item.label}
                  </h3>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
