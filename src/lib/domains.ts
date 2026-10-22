/**
 * Séparation des domaines : le site vitrine vit sur www.reemite.com, l'espace client
 * (connexion, inscription, dashboard) sur business.reemite.com. Les deux sont servis par
 * le même build Vercel — ce module décide quelles routes monter selon l'hôte courant et
 * fabrique les liens croisés entre les deux domaines.
 *
 * L'ancien domaine trustsend.africa reste servi pour l'espace client (business., sandbox.) : un
 * visiteur qui y arrive reste dessus et parle à l'API du même domaine, sinon le cookie de session
 * (SameSite=Lax) ne suivrait pas les requêtes. Le site vitrine www.trustsend.africa, lui, est
 * redirigé en 301 vers www.reemite.com (vercel.json) : les liens vers la vitrine pointent donc
 * toujours sur reemite.com.
 *
 * Les redirections « dures » se font en amont dans vercel.json (règles conditionnées par hôte) ;
 * ce fichier est la seconde barrière, côté client, et la source de vérité pour les liens.
 */

const hostname = typeof window === "undefined" ? "" : window.location.hostname;

const PRIMARY_DOMAIN = "reemite.com";
const LEGACY_DOMAIN = "trustsend.africa";

/** Visite sur l'ancien domaine trustsend.africa. */
export const isLegacyHost = hostname === LEGACY_DOMAIN || hostname.endsWith(`.${LEGACY_DOMAIN}`);

/** Domaine racine courant ; reemite.com hors production (local, previews). */
export const ROOT_DOMAIN = isLegacyHost ? LEGACY_DOMAIN : PRIMARY_DOMAIN;

/** Visite sur un domaine de production (reemite.com ou l'ancien trustsend.africa). */
export const isProductionHost =
  isLegacyHost || hostname === PRIMARY_DOMAIN || hostname.endsWith(`.${PRIMARY_DOMAIN}`);

export const BUSINESS_HOST = `business.${ROOT_DOMAIN}`;
export const MARKETING_HOST = `www.${PRIMARY_DOMAIN}`;
export const SANDBOX_HOST = `sandbox.${ROOT_DOMAIN}`;

export const BUSINESS_ORIGIN = `https://${BUSINESS_HOST}`;
export const MARKETING_ORIGIN = `https://${MARKETING_HOST}`;

/** Adresse publique de référence du site (canonical, Open Graph, données structurées). */
export const CANONICAL_ORIGIN = `https://www.${PRIMARY_DOMAIN}`;

/** API de production du domaine courant. */
export const API_BASE_URL = isLegacyHost
  ? `https://api.${LEGACY_DOMAIN}/api/v1`
  : `https://api.${PRIMARY_DOMAIN}/api/v1`;

/** API de la sandbox : comptes, clés et argent de test, totalement séparés de la production. */
export const SANDBOX_API_BASE_URL = isLegacyHost
  ? `https://sandbox-api.${LEGACY_DOMAIN}/api/v1`
  : `https://api-sandbox.${PRIMARY_DOMAIN}/api/v1`;

/** En développement (localhost, IP locale, preview Vercel) tout reste accessible sur un seul hôte. */
export const isLocalHost =
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname.endsWith(".local") ||
  hostname.endsWith(".vercel.app");

/** Espace client de la sandbox : même build, reconnu à son hôte. */
export const isSandboxHost = hostname === SANDBOX_HOST || hostname.startsWith("sandbox.");

/**
 * Mode sandbox de l'interface. En local, VITE_APP_MODE=sandbox permet de tester l'affichage
 * sandbox contre une API locale (VITE_API_BASE_URL) sans passer par le vrai domaine.
 */
export const isSandbox = isSandboxHost || import.meta.env.VITE_APP_MODE === "sandbox";

export const isBusinessHost =
  hostname === BUSINESS_HOST || hostname.startsWith("business.") || isSandboxHost;

/** Routes connexion / inscription / dashboard. */
export const showBusinessRoutes = isLocalHost || isBusinessHost;

/** Pages publiques du site vitrine. */
export const showMarketingRoutes = isLocalHost || !isBusinessHost;

/** Lien vers l'espace client : relatif quand on y est déjà, absolu depuis le site vitrine. */
export function businessUrl(path: string) {
  return showBusinessRoutes ? path : `${BUSINESS_ORIGIN}${path}`;
}

/** Lien vers le site vitrine : relatif quand on y est déjà, absolu depuis l'espace client. */
export function marketingUrl(path: string) {
  return showMarketingRoutes ? path : `${MARKETING_ORIGIN}${path}`;
}
