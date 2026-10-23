import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Défilement à chaque navigation : nouvelle page → en haut ; ancre → la section visée.
 * Une ancre d'onglet ("#profil-ecoles", "#solution-epargne-bgame") vise la section qui déclare
 * data-anchor-prefix="profil" / "solution" ; les autres ("#temoignages") visent l'élément de même id.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    const isFirst = firstRender.current;
    firstRender.current = false;
    if (!hash) {
      // Au premier chargement, le navigateur gère la position (rechargement, retour arrière)
      if (!isFirst) window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    // Deux frames : laisse la page cible se monter et l'onglet se sélectionner avant de mesurer
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const target =
          document.getElementById(id) ??
          document.querySelector(`[data-anchor-prefix="${id.split("-")[0]}"]`);
        target?.scrollIntoView({ block: "start" });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
