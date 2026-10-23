import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ouvre un onglet depuis l'ancre de l'URL : "/#solution-epargne-bgame" sélectionne l'onglet
 * "epargne-bgame". La section déclare data-anchor-prefix="solution" pour que ScrollManager la
 * fasse défiler à l'écran. Permet aux liens du pied de page de mener au bon contenu de l'accueil.
 */
export function useHashTab(prefix: string, keys: string[], onSelect: (index: number) => void) {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash.startsWith(`#${prefix}-`)) return;
    const index = keys.indexOf(hash.slice(prefix.length + 2));
    if (index < 0) return;
    onSelect(index);
    // Seule l'ancre déclenche la sélection ; keys et onSelect sont stables pour une section donnée
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);
}
