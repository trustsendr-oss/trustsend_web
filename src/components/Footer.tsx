import { Camera, Code2, Globe, MessageCircle, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useContent } from "../hooks/useContent";

const socials = [{ icon: Users, label: "Facebook" }, { icon: MessageCircle, label: "Twitter" }, { icon: Globe, label: "LinkedIn" }, { icon: Camera, label: "Instagram" }, { icon: Code2, label: "Github" }];

export function Footer() {
  const { t, i18n } = useTranslation();
  const { footerColumns } = useContent();
  const language = i18n.language.startsWith("ln") ? "ln" : i18n.language.startsWith("sw") ? "sw" : i18n.language.startsWith("en") ? "en" : "fr";
  const disclosure = {
    fr: "TrustSend est une entreprise de technologie financière, et non une banque. Nous opérons au moyen de licences détenues sur nos marchés et de partenariats avec des institutions financières et processeurs de paiement dûment agréés et réglementés.",
    en: "TrustSend is a financial technology company, not a bank. We operate through licences held across our markets and through partnerships with fully licensed, nationally regulated financial institutions and payment processors.",
    ln: "TrustSend ezali kompani ya technologie financière, kasi ezali banki te. Tosalaka na nzela ya licences mpe boyokani na institutions financières na processeurs ya paiement oyo ezali na ndingisa.",
    sw: "TrustSend ni kampuni ya teknolojia ya fedha, si benki. Tunafanya kazi kupitia leseni na ubia na taasisi za kifedha na wachakataji wa malipo wenye leseni na wanaodhibitiwa.",
  }[language];

  return <footer className="w-full overflow-hidden border-t border-surface-2 bg-surface pb-8 pt-14 sm:pt-20"><div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">{footerColumns.map((col) => <div key={col.title} className="min-w-0"><h4 className="mb-4 text-xs font-bold uppercase tracking-wide text-ink">{col.title}</h4><ul className="space-y-3">{col.links.map((link) => <li key={link.label}><a href={link.href ?? "#"} className="inline-flex max-w-full items-center gap-1.5 text-sm text-muted transition-colors hover:text-brand"><span className="truncate">{link.label}</span>{link.badge && <span className="shrink-0 rounded bg-accent-light/50 px-1.5 py-0.5 text-[10px] font-bold text-accent">{link.badge}</span>}</a></li>)}</ul></div>)}</div>
    <div className="mt-12 border-t border-surface-2 pt-8 sm:mt-16"><div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-[1fr_auto_1fr] lg:gap-10"><div className="flex items-center justify-center gap-3 lg:justify-start">{socials.slice(0, 3).map((social) => <SocialIcon key={social.label} {...social} />)}</div><div className="order-first flex items-center justify-center lg:order-none"><Link to="/" aria-label="TrustSend" className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"><img src="/assets/icons/logo.png" alt="TrustSend" className="h-10 w-[125px] object-contain sm:h-11 sm:w-[140px] lg:h-12 lg:w-[155px]" /></Link></div><div className="flex items-center justify-center gap-3 lg:justify-end">{socials.slice(3).map((social) => <SocialIcon key={social.label} {...social} />)}</div></div></div>
    <div className="mt-8 text-center text-xs leading-relaxed text-muted"><p>{t("footer.legal")}</p><p className="mx-auto mt-3 max-w-4xl">{disclosure}</p><p className="mt-2">© 2026 TrustSend. {t("footer.rights")} · <Link to="/contact" className="transition-colors hover:text-brand">Support</Link> · <Link to="/terms" className="transition-colors hover:text-brand">{t("footer.terms")}</Link> · <Link to="/privacy" className="transition-colors hover:text-brand">{t("footer.privacy")}</Link> · <a href="#" className="transition-colors hover:text-brand">{t("footer.responsibleDisclosure")}</a></p></div>
  </div></footer>;
}

function SocialIcon({ icon: Icon, label }: (typeof socials)[number]) {
  return <a href="#" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-2 bg-white text-muted transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand"><Icon size={16} strokeWidth={2} /></a>;
}
