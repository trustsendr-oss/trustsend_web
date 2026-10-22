/**
 * Langue portée par l'URL : le français vit à la racine (/pricing), l'anglais sous /en (/en/pricing).
 * Le lingala et le swahili, encore peu traduits, ne sont pas indexés : ils restent une préférence
 * du visiteur, appliquée sur les URL françaises.
 *
 * Sur une page /en, le routeur reçoit le basename "/en" : tous les <Link to="/pricing"> deviennent
 * /en/pricing sans toucher aux composants.
 */

export type UrlLanguage = "fr" | "en";

export const EN_BASENAME = "/en";

/** Langue de l'URL : "en" sous /en, "fr" ailleurs. */
export function languageFromPath(pathname: string): UrlLanguage {
  return pathname === EN_BASENAME || pathname.startsWith(`${EN_BASENAME}/`) ? "en" : "fr";
}

/** Basename du routeur pour cette URL. */
export function routerBasename(pathname: string) {
  return languageFromPath(pathname) === "en" ? EN_BASENAME : undefined;
}

/** Chemin d'une page dans une langue : localizedPath("/pricing", "en") → "/en/pricing". */
export function localizedPath(path: string, language: UrlLanguage) {
  if (language === "fr") return path;
  return path === "/" ? EN_BASENAME : `${EN_BASENAME}${path}`;
}
