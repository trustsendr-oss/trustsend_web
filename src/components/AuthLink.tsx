import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { businessUrl, showBusinessRoutes } from "../lib/domains";

/**
 * Lien vers l'espace client : navigation SPA quand on est déjà sur le bon hôte (dev ou
 * business.reemite.com), lien classique vers l'autre domaine depuis le site vitrine.
 */
export function AuthLink({
  to,
  className,
  onClick,
  children,
}: {
  to: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (showBusinessRoutes) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={businessUrl(to)} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
