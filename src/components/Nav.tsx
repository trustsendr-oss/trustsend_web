import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Quote,
  Terminal,
  X,
} from "lucide-react";
import { useContent } from "../hooks/useContent";
import { AuthLink } from "./AuthLink";
import { LanguageFlag } from "./LanguageFlag";
import type { NavMegaMenu } from "../data/content.fr";
import cardmaprBg from "../assets/cardmapr-nl-0hs_mYB9KRc-unsplash.jpg";

const BANNER_KEY = "nav-banner-dismissed";

export function Nav() {
  const { t, i18n } = useTranslation();
  const { navLinks, navMegaMenus } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!localStorage.getItem(BANNER_KEY)) {
      setBannerVisible(true);
    }
  }, []);

  const dismissBanner = () => {
    localStorage.setItem(BANNER_KEY, "1");
    setBannerVisible(false);
  };

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

  const switchLang = (lng: "fr" | "en" | "ln" | "sw") => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu mobile avec Échap, et bloquer le scroll de fond
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const solid = scrolled || open || activeMenu !== null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid
        ? "border-b border-surface-2/80 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/70"
        : "border-b border-transparent bg-transparent"
        }`}
      onMouseLeave={scheduleClose}
    >
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-accent  text-white hidden md:block"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-2 text-sm font-medium">
              <span className="text-center">{t("nav.banner.message")}</span>
              <a
                href="#"
                className="shrink-0 whitespace-nowrap font-bold underline underline-offset-2 hover:no-underline text-brand"
              >
                {t("nav.banner.cta")}
              </a>
              <button
                onClick={dismissBanner}
                aria-label={t("nav.banner.close")}
                className="ml-1 shrink-0 rounded p-1 hover:bg-white/10"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Main Navbar ---------- */}
      <div
        className="
          mx-auto grid h-16 w-full max-w-7xl
          grid-cols-[auto_minmax(0,1fr)_auto]
          items-center gap-2
          px-3 sm:px-4 md:px-6
          lg:h-20
        "
      >
        {/* ---------- Logo : toujours à gauche ---------- */}
        <Link
          to="/"
          aria-label="TrustSend"
          className="relative z-20 flex min-w-0 shrink-0 items-center"
        >
          <div
            className="
      flex h-12 w-[135px] items-center justify-start
      overflow-visible
      sm:h-13 sm:w-[150px]
      md:h-14 md:w-[165px]
      lg:h-15 lg:w-[180px]
      xl:w-[195px]
    "
          >
            <img
              src="/assets/icons/logo.png"
              alt="TrustSend"
              className="block h-full w-full object-contain object-left"
            />
          </div>
        </Link>

        {/* ---------- Navigation : centrée ---------- */}
        <nav
          className="
            hidden min-w-0 items-center justify-center
            gap-4 overflow-hidden
            px-2
            xl:flex
            2xl:gap-7
          "
          aria-label="Main navigation"
        >
          <div className="flex min-w-0 max-w-full items-center justify-center gap-4 2xl:gap-7">
            {navLinks.map((link) => {
              const menu = navMegaMenus[link.label];
              const isActive = activeMenu === link.label;

              return (
                <NavItemLink
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => {
                    if (menu) {
                      cancelClose();
                      setActiveMenu(link.label);
                    }
                  }}
                  onFocus={() => menu && setActiveMenu(link.label)}
                  className="
                    group relative flex shrink-0 items-center gap-1
                    whitespace-nowrap py-2
                    text-sm font-medium text-muted-2
                    transition-colors
                    hover:text-ink
                    focus-visible:text-ink
                    focus-visible:outline-none
                  "
                  aria-expanded={menu ? isActive : undefined}
                >
                  {link.label}

                  {menu && (
                    <ChevronDown
                      size={14}
                      className={`shrink-0 opacity-60 transition-transform duration-200 ${isActive ? "-rotate-180" : ""
                        }`}
                    />
                  )}

                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-300 ${isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </NavItemLink>
              );
            })}
          </div>
        </nav>

        {/* ---------- Actions : toujours à droite ---------- */}
        <div className="relative z-20 flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
          {/* Language */}
          <div className="relative hidden lg:block" ref={langRef}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              aria-expanded={langOpen}
              aria-haspopup="menu"
              className="
                flex items-center gap-1 rounded-full
                px-2 py-2
                text-sm font-medium text-muted-2
                transition-colors
                hover:bg-surface hover:text-ink
              "
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
                  className="
                    absolute right-0 top-full z-50 mt-2
                    w-36 overflow-hidden rounded-xl
                    border border-surface-2 bg-white py-1 shadow-pop
                  "
                >
                  <button
                    onClick={() => switchLang("fr")}
                    className={`block w-full px-3 py-2 text-left text-sm font-medium hover:bg-surface ${i18n.language.startsWith("fr")
                        ? "text-brand"
                        : "text-ink"
                      }`}
                  >
                    <span className="flex items-center gap-2"><LanguageFlag language="fr" /> Français</span>
                  </button>

                  <button
                    onClick={() => switchLang("en")}
                    className={`block w-full px-3 py-2 text-left text-sm font-medium hover:bg-surface ${i18n.language.startsWith("en")
                        ? "text-brand"
                        : "text-ink"
                      }`}
                  >
                    <span className="flex items-center gap-2"><LanguageFlag language="en" /> English</span>
                  </button>
                  <button
                    onClick={() => switchLang("ln")}
                    className={`block w-full px-3 py-2 text-left text-sm font-medium hover:bg-surface ${i18n.language.startsWith("ln") ? "text-brand" : "text-ink"}`}
                  >
                    <span className="flex items-center gap-2"><LanguageFlag language="ln" /> Lingála</span>
                  </button>
                  <button
                    onClick={() => switchLang("sw")}
                    className={`block w-full px-3 py-2 text-left text-sm font-medium hover:bg-surface ${i18n.language.startsWith("sw") ? "text-brand" : "text-ink"}`}
                  >
                    <span className="flex items-center gap-2"><LanguageFlag language="sw" /> Kiswahili</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Separator */}
          <span
            aria-hidden
            className="hidden h-4 w-px bg-surface-2 lg:block"
          />

          {/* Login */}
          <AuthLink
            to="/login"
            className="
              shrink-0 whitespace-nowrap
              rounded-full px-2.5 py-2
              text-xs font-semibold text-ink
              transition-colors hover:text-brand
              sm:px-3 sm:text-sm
            "
          >
            {t("nav.login")}
          </AuthLink>

          {/* Sign Up */}
          <AuthLink
            to="/signup"
            className="
              group flex shrink-0 items-center gap-1
              whitespace-nowrap rounded-lg
              bg-accent px-2.5 py-2
              text-xs font-semibold text-white
              transition-colors hover:bg-brand-dark
              sm:gap-1.5 sm:px-4 sm:py-2.5 sm:text-sm
            "
          >
            <span>{t("nav.signup")}</span>
            <ArrowRight
              size={14}
              className="
                hidden transition-transform duration-300
                group-hover:translate-x-0.5 sm:block
              "
            />
          </AuthLink>

          {/* Mobile menu */}
          <button
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg text-ink transition-colors hover:bg-surface
              xl:hidden
              sm:h-10 sm:w-10
            "
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            aria-controls="trustsend-mobile-menu"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* ---------- Mega menu (desktop) ---------- */}
      <div className="pointer-events-none absolute inset-x-0 top-full hidden xl:block">
        <AnimatePresence>
          {activeMenu && navMegaMenus[activeMenu] && (
            <motion.div
              key={activeMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="pointer-events-auto border-b border-surface-2 bg-white shadow-pop max-w-5xl mx-auto rounded-b-xl"
            >
              <MegaMenuPanel menu={navMegaMenus[activeMenu]} onNavigate={() => setActiveMenu(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- Scrim ---------- */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={scheduleClose}
            className="fixed inset-0 -z-10 hidden bg-ink/[0.06] backdrop-blur-[1px] xl:block"
          />
        )}
      </AnimatePresence>

      {/* ---------- Menu mobile ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            id="trustsend-mobile-menu"
            className="overflow-hidden border-t border-surface-2 bg-white xl:hidden"
          >
            <div className="flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto px-6 py-5">
              {navLinks.map((link) => {
                const menu = navMegaMenus[link.label];
                const expanded = mobileExpanded === link.label;
                return (
                  <div key={link.label} className="border-b border-surface-2/60 last:border-0">
                    <div className="flex items-center">
                      <a
                        href={link.href}
                        className="flex-1 py-3.5 text-[15px] font-medium text-ink"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </a>
                      {menu && (
                        <button
                          onClick={() =>
                            setMobileExpanded(expanded ? null : link.label)
                          }
                          aria-label={`${expanded ? t("nav.collapse") : t("nav.expand")} ${link.label}`}
                          aria-expanded={expanded}
                          className="-mr-2 flex h-10 w-10 shrink-0 items-center justify-center text-muted-2"
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      )}
                    </div>

                    {menu && (
                      <AnimatePresence>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-5 pb-5 pl-1">
                              {menu.columns.map((col) => (
                                <div key={col.heading}>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                                    {col.heading}
                                  </p>
                                  <div className="mt-2 flex flex-col">
                                    {col.items.map((item) => (
                                      <NavItemLink
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="flex items-start gap-3 rounded-lg py-2.5"
                                      >
                                        {item.icon && (
                                          <img
                                            src={item.icon}
                                            alt=""
                                            className="mt-0.5 h-5 w-5 shrink-0"
                                          />
                                        )}
                                        <span className="min-w-0">
                                          <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                                            {item.label}
                                            {item.badge && (
                                              <span className="rounded-full bg-accent-light px-1.5 py-0.5 text-[9px] font-bold uppercase text-accent">
                                                {item.badge}
                                              </span>
                                            )}
                                          </span>
                                          <span className="mt-0.5 block text-[13px] text-muted">
                                            {item.desc}
                                          </span>
                                        </span>
                                      </NavItemLink>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}

              <div className="mt-5 flex items-center gap-3">
                <AuthLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-surface-2 py-3 text-center text-sm font-semibold text-ink"
                >
                  {t("nav.login")}
                </AuthLink>
                <AuthLink
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-brand py-3 text-center text-sm font-semibold text-white"
                >
                  {t("nav.signup")}
                </AuthLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


// Rend un lien interne via le router, et un lien externe / ancre via <a>
function NavItemLink({
  href,
  children,
  ...props
}: {
  href?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const target = href ?? "#";
  if (target.startsWith("/")) {
    return (
      <Link to={target} {...props}>
        {children}
      </Link>
    );
  }
  // Lien externe (documentation, etc.) : nouvel onglet, sans accès à window.opener
  const external = target.startsWith("http");

  return (
    <a
      href={target}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

function MegaMenuPanel({
  menu,
  onNavigate,
}: {
  menu: NavMegaMenu;
  onNavigate: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-[1.1fr_1.1fr_1fr] gap-x-10 px-6 py-9">
      {menu.columns.map((col) => (
        <div key={col.heading}>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {col.heading}
          </p>

          <div className="mt-3 flex flex-col gap-0.5">
            {col.items.map((item) => (
              <NavItemLink
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className="group flex items-start gap-3 rounded-xl px-2.5 py-2.5 -ml-2.5 transition-colors hover:bg-brand"
              >
                {item.icon && (
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-light">
                    <img
                      src={item.icon}
                      alt=""
                      className="h-4 w-4"
                    />
                  </span>
                )}

                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 text-[14px] font-semibold text-ink transition-colors group-hover:text-white">
                    {item.label}

                    {item.badge && (
                      <span className="rounded-full bg-accent-light px-1.5 py-0.5 text-[9px] font-bold uppercase text-accent">
                        {item.badge}
                      </span>
                    )}
                  </span>

                  <span className="mt-0.5 block text-[13px] leading-snug text-muted group-hover:text-white/70">
                    {item.desc}
                  </span>
                </span>
              </NavItemLink>
            ))}
          </div>
        </div>
      ))}

      {/* ---------- Promo rail ---------- */}
      <div className="group relative min-h-[280px] overflow-hidden rounded-2xl bg-brand">

        {/* Background Image */}
        <img
          src={cardmaprBg}
          alt=""
          className="
            absolute inset-0
            h-full w-full
            object-cover
            object-center
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-brand/75" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-brand/30 to-transparent" />

        {/* Card Content */}
        <div className="relative z-10 flex h-full flex-col p-6">
          {menu.promo.kind === "quote" ? (
            <>
              <Quote
                size={20}
                className="text-accent-light"
                strokeWidth={2.5}
              />

              <p className="mt-3 font-display text-[15px] leading-snug text-white">
                {menu.promo.desc}
              </p>

              {menu.promo.quote && (
                <p className="mt-4 text-[13px] text-white/70">
                  {menu.promo.quote.name},{" "}
                  {menu.promo.quote.title}{" "}
                  {t("nav.quoteAt")}{" "}
                  {menu.promo.quote.company}
                </p>
              )}
            </>
          ) : menu.promo.kind === "code" ? (
            <>
              <div className="flex items-center gap-1.5 text-white/70">
                <Terminal size={14} />

                <span className="text-[11px] font-semibold uppercase tracking-wide">
                  {t("nav.nodeLabel")}
                </span>
              </div>

              <pre className="mt-3 overflow-hidden rounded-lg bg-dark/70 p-3 font-mono text-[10.5px] leading-relaxed text-white/90 backdrop-blur-sm">
                {menu.promo.code}
              </pre>

              <p className="mt-4 font-display text-[15px] font-semibold text-white">
                {menu.promo.heading}
              </p>

              <p className="mt-1 text-[13px] text-white/70">
                {menu.promo.desc}
              </p>
            </>
          ) : (
            <>
              {menu.promo.icon && (
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/95 backdrop-blur-sm">
                  <img
                    src={menu.promo.icon}
                    alt=""
                    className="h-5 w-5"
                  />
                </span>
              )}

              {menu.promo.eyebrow && (
                <p className="mt-3 text-[11px] font-bold uppercase tracking-wide text-accent-light">
                  {menu.promo.eyebrow}
                </p>
              )}

              <p
                className={`font-display text-[17px] font-semibold text-white ${menu.promo.eyebrow ? "mt-1" : "mt-3"
                  }`}
              >
                {menu.promo.heading}
              </p>

              <p className="mt-2 text-[13px] leading-snug text-white/70">
                {menu.promo.desc}
              </p>
            </>
          )}

          {/* CTA pushed to bottom */}
          <a
            href="#"
            onClick={onNavigate}
            className="group/cta mt-auto flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-white"
          >
            {menu.promo.cta}

            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/cta:translate-x-1"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
