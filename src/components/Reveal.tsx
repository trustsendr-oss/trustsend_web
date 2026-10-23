import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Apparition au défilement. Le contenu est visible par défaut (HTML pré-rendu, premier écran) :
 * seuls les blocs encore sous la ligne de flottaison au chargement sont masqués, sans transition,
 * puis révélés quand ils entrent dans l'écran. Ni les moteurs de recherche ni le LCP n'attendent
 * donc une animation.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [belowFold, setBelowFold] = useState(false);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Avant le premier affichage : un bloc hors écran peut être masqué sans flash visible
  useLayoutEffect(() => {
    if (reduceMotion || !ref.current) return;
    if (ref.current.getBoundingClientRect().top > window.innerHeight) setBelowFold(true);
  }, [reduceMotion]);

  const hidden = belowFold && !inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y, scale: 0.985 } : { opacity: 1, y: 0, scale: 1 }}
      transition={hidden ? { duration: 0 } : { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
