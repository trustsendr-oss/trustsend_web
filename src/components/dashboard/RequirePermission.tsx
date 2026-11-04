import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "../LoadingSpinner";
import { usePermissions } from "../../hooks/useMe";
import type { DashboardPermission } from "../../types/auth";

/**
 * Masque un écran que le rôle connecté ne peut pas utiliser, au lieu de le laisser se remplir
 * d'erreurs 403. Confort uniquement : le serveur refuse de toute façon chaque requête interdite.
 * `ownerOnly` couvre ce qu'aucun membre ne peut faire (PIN et mot de passe de l'entreprise).
 */
export function RequirePermission({
  permission,
  ownerOnly = false,
  children,
}: {
  permission?: DashboardPermission;
  ownerOnly?: boolean;
  children: ReactNode;
}) {
  const { t } = useTranslation();
  const { can, isOwner, isLoading, me } = usePermissions();

  if (isLoading) return <LoadingSpinner label={t("dashboard.loading")} className="min-h-[50vh]" />;

  const allowed = ownerOnly ? isOwner : permission ? can(permission) : true;
  if (allowed) return children;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-muted-2">
        <Lock size={22} aria-hidden />
      </span>
      <h1 className="mt-5 text-xl font-medium text-ink">{t("dashboard.forbidden.title")}</h1>
      <p className="mt-2 text-sm text-muted-2">
        {t("dashboard.forbidden.desc", {
          role: me ? t(`dashboard.team.roles.${me.role}`) : "",
        })}
      </p>
      <Link
        to="/dashboard"
        className="mt-6 inline-flex h-10 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        {t("dashboard.forbidden.back")}
      </Link>
    </div>
  );
}
