type Language = "fr" | "en" | "ln" | "sw";

export function LanguageFlag({ language }: { language: Language }) {
  const flagPaths: Record<Language, string> = {
    fr: "/flags/fr.svg",
    en: "/flags/us.svg",
    ln: "/flags/cd.svg",
    sw: "/flags/tz.svg",
  };
  return (
    <img
      src={flagPaths[language]}
      alt=""
      aria-hidden="true"
      className="inline-block h-4 w-6 rounded-sm object-cover shadow-sm"
      draggable={false}
    />
  );
}
