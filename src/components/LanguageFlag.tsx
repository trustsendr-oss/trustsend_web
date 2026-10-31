import { flagAssets } from "../lib/languages";
import type { Language } from "../lib/languages";

export function LanguageFlag({ language }: { language: Language }) {
  return (
    <img
      src={flagAssets[language]}
      alt=""
      aria-hidden="true"
      width="24"
      height="16"
      className="language-flag"
    />
  );
}
