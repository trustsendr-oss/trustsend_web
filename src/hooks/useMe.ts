import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { DashboardMe, DashboardPermission } from "../types/auth";

/** Qui est connecté au dashboard, et ce que son rôle lui permet. */
export function useMe() {
  return useQuery({
    queryKey: ["dashboard", "me"],
    queryFn: async () => {
      const { data } = await api.get<{ data: DashboardMe }>("/business/dashboard/me");
      return data.data;
    },
    staleTime: 60_000,
  });
}

/**
 * `can("money.move")` — pour masquer les écrans et boutons qu'un rôle ne peut pas utiliser.
 * Tant que la réponse n'est pas arrivée, rien n'est autorisé : mieux vaut un bouton qui
 * apparaît une fraction de seconde plus tard qu'un bouton qui mène à un refus.
 * Le serveur reste juge à chaque requête.
 */
export function usePermissions() {
  const me = useMe();
  const permissions = me.data?.permissions ?? [];
  return {
    me: me.data,
    isLoading: me.isPending,
    /** Droits de propriétaire : le login de l'entreprise, ou un membre au rôle `owner`. */
    isOwner: me.data?.kind === "owner" || me.data?.role === "owner",
    /** Session ouverte avec le login de l'entreprise (e-mail + mot de passe de l'inscription). */
    isOwnerLogin: me.data?.kind === "owner",
    isMember: me.data?.kind === "member",
    can: (permission: DashboardPermission) => permissions.includes(permission),
  };
}
