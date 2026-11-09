type Language = "fr" | "en" | "ln" | "sw";

export function LanguageFlag({ language }: { language: Language }) {
  const colors: Record<Language, string> = {
    fr: "🇫🇷",
    en: "🇺🇸",
    ln: "🇨🇩",
    sw: "🇹🇿",
  };
  return colors[language];
}
