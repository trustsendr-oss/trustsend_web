import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Défilement à chaque navigation : nouvelle page → en haut ; ancre → la section visée.
 * Une ancre d'onglet ("#profil-ecoles", "#solution-epargne-bgame") vise la section qui déclare
 * data-anchor-prefix="profil" / "solution" ; les autres ("#temoignages") visent l'élément de même id.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  const previousPathname = useRef<string | null>(null);

  useLayoutEffect(() => {
    const isFirst = previousPathname.current === null;
    const pageChanged = previousPathname.current !== pathname;
    previousPathname.current = pathname;

    // Changement de page : saut instantané. index.css met scroll-behavior: smooth sur <html>,
    // et une animation lancée depuis le bas serait interrompue par le montage de la nouvelle page.
    const behavior: ScrollBehavior = pageChanged ? "instant" : "smooth";

    if (!hash) {
      // Au premier chargement, le navigateur gère la position (rechargement, retour arrière)
      if (!isFirst && pageChanged) window.scrollTo({ top: 0, left: 0, behavior });
      return;
    }
    // Ancre vers une autre page : on remonte d'abord, pour mesurer la section depuis le haut
    if (pageChanged && !isFirst) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const id = decodeURIComponent(hash.slice(1));
    // Deux frames : laisse la page cible se monter et l'onglet se sélectionner avant de mesurer
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        const target =
          document.getElementById(id) ??
          document.querySelector(`[data-anchor-prefix="${id.split("-")[0]}"]`);
        target?.scrollIntoView({ block: "start", behavior });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
