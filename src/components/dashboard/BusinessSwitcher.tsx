import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Link2, Loader2, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePermissions } from "../../hooks/useMe";
import { useLogout } from "../../hooks/useLogout";
import { useMyBusinesses, useSwitchBusiness } from "../../hooks/useTeam";

function Mark({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-lg bg-brand font-semibold text-white ${
        size === "sm" ? "h-6 w-6 text-[11px]" : "h-8 w-8 text-sm"
      }`}
    >
      {name.trim()[0]?.toUpperCase() ?? "?"}
    </span>
  );
}

/**
 * Le sélecteur de compte, dans l'en-tête : pour quelle entreprise on agit, avec quel rôle, et
 * comment passer à une autre.
 *
 * - Avec son compte Reemite personnel, on voit toutes ses entreprises — propriétaire de l'une,
 *   développeur d'une autre — et on bascule de l'une à l'autre sans se reconnecter.
 * - Avec le login d'une entreprise, on ne voit que celle-ci : le menu propose de lier son compte
 *   personnel (une invitation comme propriétaire), ce qui réunit ensuite tout sous un seul compte.
 */
export function BusinessSwitcher() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { me, isMember, isOwnerLogin } = usePermissions();
  const businesses = useMyBusinesses(isMember);
  const switchBusiness = useSwitchBusiness();
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!me) return null;

  const roleLabel = isOwnerLogin ? t("dashboard.team.mainAccount") : t(`dashboard.team.roles.${me.role}`);
  const person = me.member?.user;

  const choose = (businessId: number) => {
    if (businessId === me.business.id) {
      setOpen(false);
      return;
    }
    switchBusiness.mutate(businessId, {
      onSuccess: () => {
        setOpen(false);
        navigate("/dashboard");
      },
    });
  };

  const otherAccount = () => {
    setOpen(false);
    // Depuis le login d'une entreprise, l'autre compte est le plus souvent le compte personnel.
    const target = isOwnerLogin ? "/login?mode=member" : "/login";
    logout.mutate(undefined, { onSettled: () => navigate(target) });
  };

  const linkPersonal = () => {
    setOpen(false);
    navigate("/dashboard/profile#team", { state: { linkSelf: true } });
  };

  return (
    <div className="relative me-1" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("dashboard.switcher.label", { name: me.business.name })}
        className="flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white ps-1 pe-2 text-start transition-colors hover:bg-surface sm:pe-3"
      >
        <Mark name={me.business.name} />
        <span className="hidden min-w-0 md:block">
          <span className="block max-w-40 truncate text-sm font-medium leading-tight text-ink">
            {me.business.name}
          </span>
          <span className="block max-w-40 truncate text-[11px] leading-tight text-muted">{roleLabel}</span>
        </span>
        <ChevronDown size={14} aria-hidden className="text-muted" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 top-full z-40 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-surface-2 bg-white shadow-pop"
          >
            {/* Qui est connecté */}
            <div className="border-b border-surface-2 px-4 py-3">
              <p className="truncate text-sm font-medium text-ink">
                {person?.full_name || (isOwnerLogin ? me.business.name : person?.email)}
              </p>
              <p className="truncate text-xs text-muted">
                {isOwnerLogin ? t("dashboard.switcher.businessLogin") : person?.email}
              </p>
            </div>

            {/* Ses entreprises */}
            <div className="py-1.5">
              <p className="px-4 pb-1 pt-1 text-xs text-muted">{t("dashboard.switcher.heading")}</p>
              {(isMember ? (businesses.data ?? []) : []).map((m) => {
                const current = m.business.id === me.business.id;
                const pending = switchBusiness.isPending && switchBusiness.variables === m.business.id;
                return (
                  <button
                    key={m.business.id}
                    type="button"
                    role="menuitemradio"
                    aria-checked={current}
                    disabled={switchBusiness.isPending}
                    onClick={() => choose(m.business.id)}
                    className="flex w-full items-center gap-3 px-4 py-2 text-start hover:bg-surface disabled:opacity-60"
                  >
                    <Mark name={m.business.name} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-ink">{m.business.name}</span>
                      <span className="block text-xs text-muted">{t(`dashboard.team.roles.${m.role}`)}</span>
                    </span>
                    {pending ? (
                      <Loader2 size={16} aria-hidden className="animate-spin text-muted-2" />
                    ) : current ? (
                      <Check size={16} aria-hidden className="text-accent" />
                    ) : null}
                  </button>
                );
              })}
              {isOwnerLogin && (
                <div className="flex w-full items-center gap-3 px-4 py-2">
                  <Mark name={me.business.name} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-ink">{me.business.name}</span>
                    <span className="block text-xs text-muted">{t("dashboard.team.mainAccount")}</span>
                  </span>
                  <Check size={16} aria-hidden className="text-accent" />
                </div>
              )}
              {switchBusiness.isError && (
                <p role="alert" className="px-4 py-1.5 text-xs text-red-700">
                  {t("dashboard.switcher.error")}
                </p>
              )}
            </div>

            {/* Autres comptes */}
            <div className="border-t border-surface-2 py-1.5">
              {isOwnerLogin && (
                <button
                  type="button"
                  role="menuitem"
                  onClick={linkPersonal}
                  className="flex w-full items-start gap-3 px-4 py-2.5 text-start hover:bg-surface"
                >
                  <Link2 size={16} aria-hidden className="mt-0.5 shrink-0 text-muted-2" />
                  <span className="min-w-0">
                    <span className="block text-sm text-ink">{t("dashboard.switcher.linkPersonal")}</span>
                    <span className="block text-xs text-muted">{t("dashboard.switcher.linkPersonalDesc")}</span>
                  </span>
                </button>
              )}
              <button
                type="button"
                role="menuitem"
                onClick={otherAccount}
                disabled={logout.isPending}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-start text-sm text-ink hover:bg-surface disabled:opacity-60"
              >
                <LogIn size={16} aria-hidden className="shrink-0 text-muted-2" />
                {t("dashboard.switcher.otherAccount")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
