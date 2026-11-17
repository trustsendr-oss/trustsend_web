import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { authPath, clearSession } from "../lib/session";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post(`${authPath()}/logout`);
    },
    // onSettled et non onSuccess : même si l'appel echoue (reseau, cookie deja expire),
    // la session locale doit disparaitre.
    onSettled: () => {
      clearSession();
      // Profil, portefeuilles, transactions... restent en memoire dans le cache react-query :
      // on l'annule et on le vide pour qu'aucune donnee du compte ne survive a la deconnexion.
      queryClient.cancelQueries();
      queryClient.clear();
    },
  });
}
