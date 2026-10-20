import { useTranslation } from "react-i18next";
import { useContent } from "../hooks/useContent";

export function LogoMarquee() {
  const { t } = useTranslation();
  const { mobileMoneyProviders } = useContent();

  const group = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
    >
      {mobileMoneyProviders.map((provider) => (
        <li
          key={provider.name}
          className="flex h-8 w-28 shrink-0 items-center justify-center sm:h-9 sm:w-32"
        >
          <img
            src={provider.src}
            alt={hidden ? "" : provider.name}
            draggable={false}
            className="max-h-full select-none object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="border-b border-surface-2 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:gap-12 lg:py-12">
        <p className="shrink-0 text-center text-sm font-medium text-balance text-muted lg:max-w-[15rem] lg:border-r lg:border-surface-2 lg:pr-12 lg:text-left">
          {t("logoMarquee.title")}
        </p>
        <div className="mask-fade-x min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {group(false)}
            {group(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
