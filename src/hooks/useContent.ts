import { useTranslation } from "react-i18next";
import * as fr from "../data/content.fr";
import * as en from "../data/content.en";
import * as ln from "../data/content.ln";
import * as sw from "../data/content.sw";

export function useContent() {
  const { i18n } = useTranslation();
  if (i18n.language.startsWith("en")) return en;
  if (i18n.language.startsWith("ln")) return ln;
  if (i18n.language.startsWith("sw")) return sw;
  return fr;
}
