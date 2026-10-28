import { Camera, ChevronDown, Code2, Globe, MessageCircle, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";

const DOCS = "https://docs.trustsend.africa";

/**
 * Destination de chaque lien, colonne par colonne, dans l'ordre de `footerColumns` (identique
 * dans toutes les langues). Les rubriques sans page dédiée mènent à la page qui en parle, à
 * l'onglet de l'accueil correspondant (/#solution-…, /#profil-…) ou au support.
 */
const FOOTER_HREFS: string[][] = [
  // Paiements : cartes virtuelles, marchand, abonnements, frais scolaires, QR, liens de paiement, factures
  ["/cartes-virtuelles", "/paiement-marchand", "/cartes-virtuelles", "/#profil-ecoles", "/paiement-marchand", "/paiement-marchand", "/paiement-marchand"],
  // Épargne & Jeux : Likelemba, objectifs, épargne bloquée, BGame
  ["/#solution-epargne-bgame", "/#solution-epargne-bgame", "/#solution-epargne-bgame", "/#solution-epargne-bgame"],
  // Devenir partenaire : agent, parrainage, agents API
  ["/agents", "/agents", DOCS],
  // Transferts : local, international, swap wallet to wallet, retrait, dépôt
  ["/transferts-internationaux", "/transferts-internationaux", "/#solution-cryptos-swap", "/agents", "/agents"],
  // Cash & Mobile Money : retrait agent, retrait MM, dépôt agent, dépôt MM, portefeuille multi-devises
  ["/agents", "/agents", "/agents", "/agents", "/#solution-cryptos-swap"],
  // Développeurs : documentation, intégrations, référence API
  [DOCS, "/#developers", DOCS],
  // Ressources : blog, guides, témoignages, événements
  ["/contact", DOCS, "/#temoignages", "/contact"],
  // Nos utilisateurs : commerçants, écoles, diaspora, agents, groupes d'épargne
  ["/#profil-commercants", "/#profil-ecoles", "/#profil-diaspora", "/#profil-agents", "/#profil-epargne"],
  // Outils gratuits : calculateur de frais, convertisseur crypto, simulateur Likelemba, générateur de lien
  ["/pricing", "/cryptomonnaies", "/#solution-epargne-bgame", "/paiement-marchand"],
  // Entreprise : à propos, carrières, conditions, confidentialité, réclamations, divulgation responsable
  ["/", "/contact", "/terms", "/privacy", "/contact", "/contact"],
  // Aide & Support : support, centre d'aide
  ["/contact", "/contact"],
];

const socials = [{ icon: Users, label: "Facebook" }, { icon: MessageCircle, label: "Twitter" }, { icon: Globe, label: "LinkedIn" }, { icon: Camera, label: "Instagram" }, { icon: Code2, label: "Github" }];

export function Footer() {
  const { t, i18n } = useTranslation();
  const { footerColumns: columns } = useContent();
  const footerColumns = columns.map((col, c) => ({
    ...col,
    links: col.links.map((link, l) => ({ ...link, href: link.href ?? FOOTER_HREFS[c]?.[l] })),
  }));
  const language = i18n.language.startsWith("ln") ? "ln" : i18n.language.startsWith("sw") ? "sw" : i18n.language.startsWith("en") ? "en" : "fr";
  const disclosure = {
    fr: "Reemite est une entreprise de technologie financière, et non une banque. Nous opérons au moyen de licences détenues sur nos marchés et de partenariats avec des institutions financières et processeurs de paiement dûment agréés et réglementés.",
    en: "Reemite is a financial technology company, not a bank. We operate through licences held across our markets and through partnerships with fully licensed, nationally regulated financial institutions and payment processors.",
    ln: "Reemite ezali kompani ya technologie financière, kasi ezali banki te. Tosalaka na nzela ya licences mpe boyokani na institutions financières na processeurs ya paiement oyo ezali na ndingisa.",
    sw: "Reemite ni kampuni ya teknolojia ya fedha, si benki. Tunafanya kazi kupitia leseni na ubia na taasisi za kifedha na wachakataji wa malipo wenye leseni na wanaodhibitiwa.",
  }[language];

  return <footer className="w-full overflow-hidden border-t border-surface-2 bg-surface pb-8 pt-14 sm:pt-20"><div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
    {/* Mobile : colonnes repliables, pour éviter une longue liste de liens */}
    <div className="divide-y divide-surface-2 border-y border-surface-2 sm:hidden">{footerColumns.map((col) => <details key={col.title} className="group"><summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">{col.title}<ChevronDown size={18} className="text-muted transition-transform duration-200 group-open:rotate-180" aria-hidden /></summary><ul className="grid grid-cols-2 gap-x-4 gap-y-3 pb-5">{col.links.map((link) => <li key={link.label} className="min-w-0"><FooterLink link={link} /></li>)}</ul></details>)}</div>
    <div className="hidden grid-cols-3 gap-x-8 gap-y-10 sm:grid lg:grid-cols-6">{footerColumns.map((col) => <div key={col.title} className="min-w-0"><h4 className="mb-4 text-xs font-bold uppercase tracking-wide text-ink">{col.title}</h4><ul className="space-y-3">{col.links.map((link) => <li key={link.label}><FooterLink link={link} /></li>)}</ul></div>)}</div>
    <div className="mt-12 border-t border-surface-2 pt-8 sm:mt-16"><div className="grid grid-cols-2 items-center gap-x-3 gap-y-7 lg:grid-cols-[1fr_auto_1fr] lg:gap-10"><div className="flex items-center justify-end gap-3 lg:justify-start">{socials.slice(0, 3).map((social) => <SocialIcon key={social.label} {...social} />)}</div><div className="order-first col-span-2 flex items-center justify-center lg:order-none lg:col-span-1"><Link to="/" aria-label="Reemite" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><img src="/assets/icons/logo.png" alt="Reemite" className="h-10 w-[125px] object-contain sm:h-11 sm:w-[140px] lg:h-12 lg:w-[155px]" /></Link></div><div className="flex items-center justify-start gap-3 lg:justify-end">{socials.slice(3).map((social) => <SocialIcon key={social.label} {...social} />)}</div></div></div>
    <div className="mt-8 text-center text-xs leading-relaxed text-muted"><p>{t("footer.legal")}</p><p className="mx-auto mt-3 max-w-4xl">{disclosure}</p><p className="mt-2">© 2026 Reemite. {t("footer.rights")} · <Link to="/contact" className="transition-colors hover:text-brand">Support</Link> · <Link to="/terms" className="transition-colors hover:text-brand">{t("footer.terms")}</Link> · <Link to="/privacy" className="transition-colors hover:text-brand">{t("footer.privacy")}</Link> · <Link to="/account-deletion" className="transition-colors hover:text-brand">{t("footer.accountDeletion")}</Link> · <Link to="/contact" className="transition-colors hover:text-brand">{t("footer.responsibleDisclosure")}</Link></p></div>
  </div></footer>;
}

type FooterLinkItem = ReturnType<typeof useContent>["footerColumns"][number]["links"][number];

function FooterLink({ link }: { link: FooterLinkItem }) {
  const className = "inline-flex max-w-full items-center gap-1.5 text-sm text-muted transition-colors hover:text-brand";
  const content = <><span className="truncate">{link.label}</span>{link.badge && <span className="shrink-0 rounded bg-accent-light/50 px-1.5 py-0.5 text-[10px] font-bold text-accent">{link.badge}</span>}</>;
  // Lien interne via le routeur : garde le préfixe de langue (/en) ; externe dans un nouvel onglet
  if (link.href?.startsWith("/")) return <Link to={link.href} className={className}>{content}</Link>;
  return <a href={link.href ?? "#"} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>;
}

function SocialIcon({ icon: Icon, label }: (typeof socials)[number]) {
  return <a href="#" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-2 bg-white text-muted transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand"><Icon size={16} strokeWidth={2} /></a>;
}
