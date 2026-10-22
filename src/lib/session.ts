import type { Business, LoginResult } from "../types/auth";

const BUSINESS_KEY = "TrustSend_business";
const EXPIRES_AT_KEY = "TrustSend_token_expires_at";
const CSRF_KEY = "TrustSend_csrf_token";

// Le cookie CSRF appartient au domaine de l'API (api.reemite.com) : depuis
// business.reemite.com, document.cookie ne peut pas le lire. On conserve donc
// le jeton renvoyé dans le corps des réponses de connexion et de rafraîchissement.
export function storeCsrfToken(token: string | null | undefined): void {
  try {
    if (token) localStorage.setItem(CSRF_KEY, token);
  } catch {
    /* stockage indisponible */
  }
}

export function getStoredCsrfToken(): string | null {
  try {
    return localStorage.getItem(CSRF_KEY);
  } catch {
    return null;
  }
}

// L'access token vit dans un cookie httpOnly posé par le backend (voir auth_cookie_service.ts
// côté serveur) — ce code ne le voit jamais et ne le stocke jamais. Seul le profil business
// (données d'affichage, pas un secret) et une estimation de l'expiration (pour l'UX) sont
// mis en cache ici.
export function storeSession(result: LoginResult): void {
  storeCsrfToken(result.csrf_token);
  localStorage.setItem(BUSINESS_KEY, JSON.stringify(result.business));
  localStorage.setItem(
    EXPIRES_AT_KEY,
    String(Date.now() + result.expires_in * 1000),
  );
}

// Vide tout le stockage du navigateur à la déconnexion (pas seulement les clés de session) :
// sur un poste partagé, rien ne doit rester après logout. Les accès sont protégés car
// localStorage/sessionStorage lèvent une exception en navigation privée ou quand les données
// de site sont bloquées — un échec de nettoyage ne doit pas casser la déconnexion.
export function clearSession(): void {
  try {
    localStorage.clear();
  } catch {
    /* stockage indisponible */
  }

  try {
    sessionStorage.clear();
  } catch {
    /* stockage indisponible */
  }
}

export function getStoredBusiness(): Business | null {
  const raw = localStorage.getItem(BUSINESS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Business;
  } catch {
    return null;
  }
}

export function isSessionExpired(): boolean {
  const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);
  if (!expiresAt) return true;
  return Date.now() >= Number(expiresAt);
}
