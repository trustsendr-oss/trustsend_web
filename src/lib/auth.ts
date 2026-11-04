import { api } from "./api";
import { storeSession, clearSession, authPath, getSessionKind, getStoredBusiness } from "./session";
import type { LoginResult } from "../types/auth";

// Renouvelle le token avant expiration (à appeler ex. depuis un minuteur ou
// avant une requête sensible). Déconnecte si le refresh échoue.
export async function refreshSession(): Promise<LoginResult | null> {
  try {
    const kind = getSessionKind();
    const { data } = await api.post<{ data: LoginResult }>(`${authPath()}/refresh`);
    // Le refresh propriétaire ne renvoie que csrf_token et expires_in : on garde l'entreprise connue.
    const business = data.data.business ?? getStoredBusiness();
    if (!business) throw new Error("no business in session");
    const result = { ...data.data, business };
    storeSession(result, kind);
    return result;
  } catch {
    clearSession();
    return null;
  }
}
