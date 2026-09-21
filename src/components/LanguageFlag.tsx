type Language = "fr" | "en" | "ln" | "sw";

export function LanguageFlag({ language }: { language: Language }) {
  const colors: Record<Language, string> = {
    fr: "linear-gradient(90deg,#002654 33%,#fff 33% 66%,#ce1126 66%)",
    en: "linear-gradient(#b22234 0 7.7%,#fff 7.7% 15.4%,#b22234 15.4% 23.1%,#fff 23.1% 30.8%,#b22234 30.8% 38.5%,#fff 38.5% 46.2%,#b22234 46.2% 53.9%,#fff 53.9% 61.6%,#b22234 61.6% 69.3%,#fff 69.3% 77%,#b22234 77% 84.7%,#fff 84.7% 92.4%,#b22234 92.4%), linear-gradient(90deg,#3c3b6e 42%,transparent 42%)",
    ln: "linear-gradient(145deg,#007fff 44%,#f7d116 44% 51%,#ce1021 51% 57%,#007fff 57%)",
    sw: "linear-gradient(145deg,#1eb53a 42%,#fff 42% 48%,#ce1126 48% 54%,#fff 54% 60%,#000 60% 68%,#1eb53a 68%)",
  };
  return <span aria-hidden="true" className="h-3.5 w-5 rounded-[2px] shadow-sm" style={{ background: colors[language] }} />;
}
