import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getStoredCsrfToken } from "./session";
import { API_BASE_URL, SANDBOX_API_BASE_URL, isProductionHost, isSandboxHost } from "./domains";

/** Reads the CSRF cookie the backend pairs with the httpOnly access-token cookie — deliberately
 * NOT httpOnly (unlike the access token itself) so this same-origin JS can read it and echo it
 * back as a header, proving the request came from our own frontend rather than a forged
 * cross-site one riding on the auth cookie the browser attaches automatically. See
 * auth_cookie_service.ts on the backend.
 *
 * Deliberately NOT decodeURIComponent'd: the backend compares this against the raw `Cookie`
 * header byte-for-byte (cookie_to_bearer_middleware.ts's rawCookieValue()) rather than through
 * Adonis's own cookie decoding, since a browser reading `document.cookie` could never replicate
 * that anyway — both sides must treat the value as an opaque string. */
function getCsrfToken(): string | null {
  // Source principale : le jeton renvoyé par la connexion (le cookie reste illisible depuis un
  // autre sous-domaine que l'API). Le cookie ne sert qu'en local, quand tout tourne sur le même hôte.
  const stored = getStoredCsrfToken();
  if (stored) return stored;
  const match = document.cookie.match(/(?:^|;\s*)business_csrf_token=([^;]+)/);
  return match ? match[1] : null;
}

const MUTATING_METHODS = new Set(["post", "put", "patch", "delete"]);


export const api = axios.create({
  // Un seul build sert la production et la sandbox : sur l'hôte sandbox, l'API sandbox est
  // imposée, quelle que soit la variable de build, pour qu'aucune session de test ne parle à la prod.
  // Sur un domaine de production, l'API est celle du même domaine (cookie de session SameSite=Lax) ;
  // VITE_API_BASE_URL ne sert qu'en local et sur les previews.
  baseURL: isSandboxHost
    ? SANDBOX_API_BASE_URL
    : isProductionHost
      ? API_BASE_URL
      : import.meta.env.VITE_API_BASE_URL || API_BASE_URL,
  timeout: 15000,
  // The access token lives in an httpOnly cookie the backend sets on login — this app never
  // sees or stores it. `withCredentials` makes the browser attach that cookie (and send/receive
  // Set-Cookie) on every cross-origin request to the API.
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attache le jeton CSRF (lu depuis le cookie, voir getCsrfToken) sur toute requête mutante.
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const method = (config.method || "get").toLowerCase();
  if (MUTATING_METHODS.has(method)) {
    const csrfToken = getCsrfToken();
    if (csrfToken) config.headers.set("X-CSRF-Token", csrfToken);
  }
  return config;
});

export interface ApiFieldError {
  message: string;
  rule?: string;
  field?: string;
}

export class ApiError extends Error {
  status?: number;
  code?: string;
  fieldErrors?: ApiFieldError[];

  constructor(message: string, status?: number, code?: string, fieldErrors?: ApiFieldError[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

// La forme exacte du body d'erreur n'est pas garantie : `message` peut être
// une string, ou un objet imbriqué {code, message}. On ne fait jamais
// confiance à ce champ tel quel — toujours extraire une string ici.
function extractMessage(raw: unknown): string | undefined {
  if (typeof raw === "string") return raw;
  if (raw && typeof raw === "object") {
    const nested = (raw as Record<string, unknown>).message;
    if (typeof nested === "string") return nested;
  }
  return undefined;
}

// Certaines erreurs (422 de validation) arrivent sous la forme
// { errors: [{ message, rule, field }] } plutôt qu'un `message` unique.
function extractFieldErrors(raw: unknown): ApiFieldError[] | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const errors = (raw as Record<string, unknown>).errors;
  if (!Array.isArray(errors)) return undefined;
  const parsed = errors.filter(
    (e): e is ApiFieldError => !!e && typeof e === "object" && typeof (e as Record<string, unknown>).message === "string",
  );
  return parsed.length > 0 ? parsed : undefined;
}

// Normalise chaque erreur réseau/HTTP en ApiError. Le 401 n'a plus besoin de purger un token
// local (il n'y en a plus) — la session invalide, c'est simplement l'absence de cookie valide,
// que le prochain rendu de RequireAuth détectera via son propre appel au profil.
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: unknown; code?: string; errors?: unknown }>) => {
    const status = error.response?.status;
    const fieldErrors = extractFieldErrors(error.response?.data);
    const message =
      extractMessage(error.response?.data?.message) ??
      fieldErrors?.[0]?.message ??
      (error.code === "ECONNABORTED"
        ? "La requête a expiré, veuillez réessayer."
        : "Une erreur réseau est survenue.");

    return Promise.reject(
      new ApiError(message, status, error.response?.data?.code ?? error.code, fieldErrors),
    );
  },
);
