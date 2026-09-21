import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpFromLine,
  Bell,
  ChevronDown,
  CircleUserRound,
  CreditCard,
  FlaskConical,
  Home,
  KeyRound,
  Loader2,
  LogOut,
  Menu,
  Repeat,
  Search,
  Settings,
  ShieldCheck,
  TriangleAlert,
  Wallet,
  Webhook as WebhookIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageFlag } from "../LanguageFlag";
import { useLogout } from "../../hooks/useLogout";
import { useProfile } from "../../hooks/useProfile";
import { getStoredBusiness } from "../../lib/session";
import { NotificationBell } from "./NotificationBell";
import { BUSINESS_ORIGIN, isSandbox } from "../../lib/domains";
import "../../styles/geist.css";

type NavItem = { key: string; icon: typeof Home; to?: string };

const navSections: { headingKey?: string; items: NavItem[] }[] = [
  {
    items: [
      { key: "overview", icon: Home, to: "/dashboard" },
      { key: "kyc", icon: ShieldCheck, to: "/dashboard/kyc" },
      { key: "transactions", icon: ArrowLeftRight, to: "/dashboard/transactions" },
      { key: "notifications", icon: Bell, to: "/dashboard/notifications" },
      { key: "accountSettings", icon: Settings, to: "/dashboard/profile" },
    ],
  },
  {
    headingKey: "wallet",
    items: [
      { key: "balance", icon: Wallet, to: "/dashboard/wallet" },
      { key: "deposit", icon: ArrowDownToLine, to: "/dashboard/deposit" },
      { key: "withdraw", icon: ArrowUpFromLine, to: "/dashboard/withdraw" },
      { key: "swap", icon: Repeat, to: "/dashboard/swap" },
      { key: "cards", icon: CreditCard, to: "/dashboard/cards" },
    ],
  },
  {
    headingKey: "developers",
    items: [
      { key: "apiKeys", icon: KeyRound, to: "/dashboard/api-keys" },
      { key: "webhooks", icon: WebhookIcon, to: "/dashboard/webhooks" },
    ],
  },
];

// En sandbox, le compte est actif sans vérification : l'entrée KYC n'a rien à proposer.
const visibleNavSections = isSandbox
  ? navSections.map((section) => ({
      ...section,
      items: section.items.filter((item) => item.key !== "kyc"),
    }))
  : navSections;

const COLLAPSED_KEY = "dashboard.sidebarCollapsed";

function readCollapsed() {
  try {
    return localStorage.getItem(COLLAPSED_KEY) === "1";
  } catch {
    return false;
  }
}

export function DashboardLayout() {
  const { t, i18n } = useTranslation();
  const business = getStoredBusiness();
  const navigate = useNavigate();
  const logout = useLogout();
  const location = useLocation();
  const profile = useProfile();
  const showPinBanner = profile.data && !profile.data.pin_set;
  // L'hôte décide de l'API appelée ; la réponse de l'API dit dans quel environnement elle tourne.
  // S'ils divergent, l'utilisateur doit le savoir avant de faire quoi que ce soit.
  const environmentMismatch =
    !!profile.data?.environment && (profile.data.environment === "sandbox") !== isSandbox;
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [langOpen]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSED_KEY, collapsed ? "1" : "0");
    } catch {
      /* stockage indisponible */
    }
  }, [collapsed]);

  const toggleMenu = () => {
    if (window.matchMedia("(min-width: 64rem)").matches) {
      setCollapsed((c) => !c);
    } else {
      setDrawerOpen((o) => !o);
    }
  };

  const switchLang = (lng: "fr" | "en" | "ln" | "sw") => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const handleLogout = () => {
    logout.mutate(undefined, { onSettled: () => navigate("/login") });
  };

  const renderNav = (rail: boolean) => (
    <>
      <nav className="flex-1 overflow-y-auto pe-3 pb-4">
        {visibleNavSections.map((section, i) => (
          <div key={i} className={i > 0 ? "mt-4" : undefined}>
            {section.headingKey &&
              (rail ? (
                <div className="mx-auto mb-2 h-px w-8 bg-black/10" />
              ) : (
                <p className="mb-1 ps-7 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  {t(`dashboard.nav.${section.headingKey}`)}
                </p>
              ))}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = item.to === location.pathname;
                const label = t(`dashboard.nav.${item.key}`);
                const className = `flex h-9 items-center gap-4 text-sm transition-colors ${
                  rail
                    ? "mx-auto w-12 justify-center rounded-full"
                    : "rounded-e-full ps-7 pe-4"
                } ${
                  active
                    ? "bg-brand-light font-semibold text-brand"
                    : "font-medium text-ink hover:bg-black/[0.05]"
                }`;
                const content = (
                  <>
                    <item.icon size={18} strokeWidth={active ? 2.25 : 1.75} className="shrink-0" />
                    {rail ? <span className="sr-only">{label}</span> : <span className="truncate">{label}</span>}
                  </>
                );
                return item.to ? (
                  <Link
                    key={item.key}
                    to={item.to}
                    title={rail ? label : undefined}
                    aria-current={active ? "page" : undefined}
                    className={className}
                  >
                    {content}
                  </Link>
                ) : (
                  <a key={item.key} href="#" title={rail ? label : undefined} className={className}>
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="pe-3 pb-4">
        <button
          onClick={handleLogout}
          disabled={logout.isPending}
          aria-busy={logout.isPending || undefined}
          title={rail ? t("dashboard.logout") : undefined}
          className={`flex h-9 items-center gap-4 text-sm font-medium text-muted-2 transition-colors hover:bg-black/[0.05] hover:text-ink disabled:opacity-60 ${
            rail ? "mx-auto w-12 justify-center rounded-full" : "w-full rounded-e-full ps-7 pe-4"
          }`}
        >
          {logout.isPending ? (
            <Loader2 size={18} className="shrink-0 animate-spin" aria-hidden="true" />
          ) : (
            <LogOut size={18} strokeWidth={1.75} className="shrink-0" />
          )}
          <span className={rail ? "sr-only" : "truncate"}>
            {logout.isPending ? t("dashboard.loggingOut") : t("dashboard.logout")}
          </span>
        </button>
      </div>
    </>
  );

  return (
    <div className="font-geist flex h-screen flex-col bg-surface-2">
      {/* ---------- Header pleine largeur ---------- */}
      <header className="flex h-16 shrink-0 items-center gap-4 pe-4">
        <div className="flex shrink-0 items-center gap-1 ps-2 lg:w-60">
          <button
            onClick={toggleMenu}
            aria-label={t("dashboard.menu")}
            aria-expanded={drawerOpen || !collapsed}
            className="flex h-12 w-12 items-center justify-center rounded-full text-muted-2 transition-colors hover:bg-black/[0.06] hover:text-ink"
          >
            <Menu size={20} />
          </button>
          <Link to="/dashboard" className="flex h-12 items-center overflow-hidden">
            <img src="/assets/icons/logo.png" alt="TrustSend" className="h-40 w-auto object-contain" />
          </Link>
        </div>

        <div className="relative hidden max-w-3xl flex-1 sm:block">
          <Search
            size={18}
            className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted-2"
          />
          <input
            type="search"
            placeholder={t("dashboard.searchPlaceholder")}
            className="h-12 w-full rounded-full border border-transparent bg-brand-light/70 ps-12 pe-4 text-sm text-ink outline-none transition-colors placeholder:text-muted-2 hover:bg-brand-light focus:border-black/10 focus:bg-white focus:shadow-card"
          />
        </div>

        <div className="ms-auto flex items-center gap-1">
          <span className="me-2 hidden items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-ink md:inline-flex">
            <span className={`h-2 w-2 rounded-full ${isSandbox ? "bg-amber-500" : "bg-accent"}`} />
            {isSandbox ? t("dashboard.sandboxMode") : t("dashboard.liveMode")}
          </span>
          <button
            aria-label={t("dashboard.activity")}
            className="hidden h-10 w-10 items-center justify-center rounded-full text-muted-2 transition-colors hover:bg-black/[0.06] hover:text-ink sm:flex"
          >
            <Activity size={18} />
          </button>
          <NotificationBell />

          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-expanded={langOpen}
              className="flex h-10 items-center gap-1 rounded-full px-3 text-sm font-medium text-muted-2 transition-colors hover:bg-black/[0.06] hover:text-ink"
            >
              <LanguageFlag language={i18n.language.startsWith("en") ? "en" : i18n.language.startsWith("ln") ? "ln" : i18n.language.startsWith("sw") ? "sw" : "fr"} />
              {i18n.language.startsWith("en") ? "EN" : i18n.language.startsWith("ln") ? "LN" : i18n.language.startsWith("sw") ? "SW" : "FR"}
              <ChevronDown size={14} className="opacity-60" />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute end-0 top-full z-40 mt-2 min-w-28 overflow-hidden rounded-xl border border-surface-2 bg-white py-1 shadow-pop"
                >
                  <button
                    onClick={() => switchLang("fr")}
                    className={`block w-full px-3 py-2 text-start text-sm font-medium hover:bg-surface ${
                      i18n.language.startsWith("fr") ? "text-brand" : "text-ink"
                    }`}
                  >
                    <span className="flex items-center gap-2"><LanguageFlag language="fr" /> Français</span>
                  </button>
                  <button
                    onClick={() => switchLang("en")}
                    className={`block w-full px-3 py-2 text-start text-sm font-medium hover:bg-surface ${
                      i18n.language.startsWith("en") ? "text-brand" : "text-ink"
                    }`}
                  >
                    <span className="flex items-center gap-2"><LanguageFlag language="en" /> English</span>
                  </button>
                  <button
                    onClick={() => switchLang("ln")}
                    className={`block w-full px-3 py-2 text-start text-sm font-medium hover:bg-surface ${
                      i18n.language.startsWith("ln") ? "text-brand" : "text-ink"
                    }`}
                  >
                    <span className="flex items-center gap-2"><LanguageFlag language="ln" /> Lingála</span>
                  </button>
                  <button
                    onClick={() => switchLang("sw")}
                    className={`block w-full px-3 py-2 text-start text-sm font-medium hover:bg-surface ${
                      i18n.language.startsWith("sw") ? "text-brand" : "text-ink"
                    }`}
                  >
                    <span className="flex items-center gap-2"><LanguageFlag language="sw" /> Kiswahili</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/dashboard/profile"
            aria-label={t("dashboard.account")}
            className="ms-1 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition-opacity hover:opacity-90"
          >
            <CircleUserRound size={20} />
          </Link>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* ---------- Sidebar desktop (repliable en rail) ---------- */}
        <aside
          className={`hidden shrink-0 flex-col transition-[width] duration-200 lg:flex ${
            collapsed ? "w-[72px]" : "w-64"
          }`}
        >
          {renderNav(collapsed)}
        </aside>

        {/* ---------- Tiroir mobile ---------- */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setDrawerOpen(false)}
                className="fixed inset-0 z-30 bg-black/30 lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed inset-y-0 start-0 z-40 flex w-72 max-w-[85vw] flex-col bg-surface-2 pt-4 shadow-pop lg:hidden"
              >
                {renderNav(false)}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ---------- Contenu : carte blanche arrondie ---------- */}
        <main className="min-w-0 flex-1 overflow-y-auto bg-white px-5 py-6 sm:me-4 sm:mb-4 sm:rounded-2xl lg:px-8 lg:py-8">
          {environmentMismatch && (
            <div
              role="alert"
              className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              <TriangleAlert size={15} className="shrink-0" />
              {t("dashboard.environmentMismatch")}
            </div>
          )}
          {isSandbox && (
            <a
              href={`${BUSINESS_ORIGIN}/signup`}
              className="group mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm transition-colors hover:border-amber-300"
            >
              <FlaskConical size={15} className="shrink-0 text-amber-600" />
              <span className="font-medium text-ink">{t("dashboard.sandboxBanner.title")}</span>
              <span className="text-muted">{t("dashboard.sandboxBanner.desc")}</span>
              <span className="ms-auto flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-700">
                {t("dashboard.sandboxBanner.cta")}
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
              </span>
            </a>
          )}
          {showPinBanner && (
            <Link
              to="/dashboard/profile"
              className="group mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-surface-2 bg-white px-4 py-3 text-sm transition-colors hover:border-amber-300"
            >
              <KeyRound size={15} className="shrink-0 text-amber-600" />
              <span className="font-medium text-ink">{t("dashboard.pinBanner.title")}</span>
              <span className="text-muted">{t("dashboard.pinBanner.desc")}</span>
              <span className="ms-auto flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-600">
                {t("dashboard.pinBanner.cta")}
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
              </span>
            </Link>
          )}
          <Outlet context={{ business }} />
        </main>
      </div>
    </div>
  );
}
