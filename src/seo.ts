import { CANONICAL_ORIGIN } from "./lib/domains";
import { faqs as faqsFr } from "./data/content.fr";
import { faqs as faqsEn } from "./data/content.en";
import { languageFromPath, localizedPath, type UrlLanguage } from "./lib/languageRoutes";

/**
 * Configuration SEO par route : utilisée côté client par <Seo /> (navigation SPA) et au build
 * par le pré-rendu (scripts/prerender.mjs), qui écrit ces balises directement dans le HTML.
 */

export type SeoEntry = {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  robots?: string;
};

export const DEFAULT_SEO_IMAGE = "/og-image.png";

export const seoConfig: Record<string, SeoEntry> = {
  "/": {
    title: "Reemite | Dépôt, retrait gratuit partout en RDC",
    description:
      "Dépôt et retrait gratuit chez un agent Reemite partout en RDC, cartes virtuelles et transferts internationaux. Trouvez un agent près de vous ou devenez agent.",
    keywords:
      "Reemite, finance en Afrique, paiements en Afrique, fintech africaine, Prince Muloko, Prince Lulinda, transferts internationaux, cartes virtuelles, réseau d'agents",
    image: "/og-image.png",
    robots: "index,follow",
  },
  "/pricing": {
    title: "Tarifs Reemite | Paiements et fintech pour entreprises",
    description:
      "Découvrez les tarifs Reemite pour les paiements, les transferts, le payroll et les solutions de fintech adaptées aux entreprises.",
    keywords: "tarifs fintech, prix paiement entreprise, payroll pricing, transferts prix, carte virtuelle prix",
    image: "/og-image.png",
    robots: "index,follow",
  },
  "/privacy": {
    title: "Politique de confidentialité | Reemite",
    description: "Consultez la politique de confidentialité de Reemite.",
    keywords: "confidentialité Reemite, données personnelles, privacy policy",
    robots: "index,follow",
  },
  "/terms": {
    title: "Conditions d’utilisation | Reemite",
    description: "Consultez les conditions d’utilisation des services Reemite.",
    keywords: "conditions Reemite, termes utilisation, conditions fintech",
    robots: "index,follow",
  },
  "/contact": {
    title: "Support et contact | Reemite",
    description: "Créez un ticket et contactez l’équipe Support Reemite.",
    keywords: "support Reemite, contact Reemite, ticket paiement, assistance fintech",
    robots: "index,follow",
  },
  "/agents": {
    title: "Réseau d'agents Reemite | Devenez agent",
    description:
      "Rejoignez le réseau d'agents Reemite : proposez dépôts, retraits, cartes virtuelles et transferts internationaux à vos clients et gagnez des commissions.",
    keywords: "devenir agent, réseau d'agents, agent de dépôt et retrait, point de service, commissions agent, Reemite",
    image: "/og-image.png",
    robots: "index,follow",
  },
  "/transferts-internationaux": {
    title: "Transferts internationaux | Reemite",
    description:
      "Envoyez et recevez de l'argent à travers les frontières avec des transferts internationaux rapides, moins chers et sécurisés.",
    keywords: "transferts internationaux, envoi d'argent, mobile money, transfer Afrique, paiement global",
    image: "/og-image.png",
    robots: "index,follow",
  },
  "/cartes-virtuelles": {
    title: "Cartes virtuelles | Reemite",
    description:
      "Créez et gérez des cartes virtuelles pour vos achats, abonnements et dépenses professionnelles en toute sécurité.",
    keywords: "cartes virtuelles, paiement digital, carte entreprise, carte de dépenses, cartes VCC",
    image: "/og-image.png",
    robots: "index,follow",
  },
  "/cryptomonnaies": {
    title: "Crypto & paiements numériques | Reemite",
    description:
      "Accédez aux paiements crypto, aux stablecoins et aux flux financiers numériques via une solution fintech moderne.",
    keywords: "cryptomonnaies, paiements crypto, stablecoins, fintech crypto, blockchain entreprise",
    image: "/og-image.png",
    robots: "index,follow",
  },
  "/paiement-marchand": {
    title: "Paiement marchand | Reemite",
    description:
      "Offrez à vos clients une expérience de paiement sécurisée, rapide et adaptée à votre activité en ligne ou hors ligne.",
    keywords: "paiement marchand, checkout entreprise, acceptation de paiement, ecommerce Africa, paiement en ligne",
    image: "/og-image.png",
    robots: "index,follow",
  },
  "/login": {
    title: "Connexion Reemite",
    description: "Connectez-vous à votre espace Reemite pour gérer vos paiements, comptes et dashboard.",
    keywords: "connexion Reemite, espace client, dashboard paiement",
    robots: "noindex,nofollow",
  },
  "/signup": {
    title: "Créer un compte Reemite",
    description: "Ouvrez votre compte Reemite pour accéder aux paiements, transferts et outils de gestion d'entreprise.",
    keywords: "inscription Reemite, créer un compte fintech, signup entreprise",
    robots: "noindex,nofollow",
  },
};

/** Version anglaise des pages publiques (servies sous /en). */
export const seoConfigEn: Record<string, SeoEntry> = {
  "/": {
    title: "Reemite | Deposits, free withdrawals anywhere in the DRC",
    description:
      "Deposit cash and withdraw for free at a Reemite agent anywhere in the DRC, buy virtual cards and send money abroad. Find an agent near you or become one.",
    keywords: "Reemite, finance in Africa, African payments, African fintech, Prince Muloko, Prince Lulinda, international transfers, virtual cards, agent network",
  },
  "/pricing": {
    title: "Reemite pricing | Payments and fintech for businesses",
    description:
      "Explore Reemite pricing for payments, transfers, payroll and fintech solutions built for businesses.",
    keywords: "fintech pricing, business payment fees, payroll pricing, transfer fees, virtual card pricing",
  },
  "/privacy": {
    title: "Privacy policy | Reemite",
    description: "Read the Reemite privacy policy.",
    keywords: "Reemite privacy, personal data, privacy policy",
  },
  "/terms": {
    title: "Terms of use | Reemite",
    description: "Read the terms of use of Reemite services.",
    keywords: "Reemite terms, terms of use, fintech terms",
  },
  "/contact": {
    title: "Support and contact | Reemite",
    description: "Open a ticket and get in touch with the Reemite Support team.",
    keywords: "Reemite support, contact Reemite, payment ticket, fintech help",
  },
  "/agents": {
    title: "Reemite agent network | Become an agent",
    description:
      "Join the Reemite agent network: offer deposits, withdrawals, virtual cards and international transfers to your customers and earn commissions.",
    keywords: "become an agent, agent network, cash deposit and withdrawal agent, service point, agent commissions, Reemite",
  },
  "/transferts-internationaux": {
    title: "International transfers | Reemite",
    description: "Send and receive money across borders with fast, affordable and secure international transfers.",
    keywords: "international transfers, send money, mobile money, Africa transfers, global payments",
  },
  "/cartes-virtuelles": {
    title: "Virtual cards | Reemite",
    description: "Create and manage virtual cards for purchases, subscriptions and business spending, securely.",
    keywords: "virtual cards, digital payments, business card, spend card, VCC",
  },
  "/cryptomonnaies": {
    title: "Crypto & digital payments | Reemite",
    description: "Access crypto payments, stablecoins and digital financial flows through a modern fintech platform.",
    keywords: "cryptocurrencies, crypto payments, stablecoins, crypto fintech, enterprise blockchain",
  },
  "/paiement-marchand": {
    title: "Merchant payments | Reemite",
    description: "Give your customers a secure, fast payment experience suited to your business, online or in store.",
    keywords: "merchant payments, business checkout, payment acceptance, Africa ecommerce, online payments",
  },
};

/** Pages publiques du site vitrine, générées en HTML au build (en français à la racine, en anglais sous /en). */
export const PRERENDER_ROUTES = [
  "/",
  "/pricing",
  "/privacy",
  "/terms",
  "/contact",
  "/agents",
  "/transferts-internationaux",
  "/cartes-virtuelles",
  "/cryptomonnaies",
  "/paiement-marchand",
];

/** Langues indexées : chacune a sa propre URL, reliée aux autres par hreflang. */
export const INDEXED_LANGUAGES: UrlLanguage[] = ["fr", "en"];

/** Toutes les URL pré-rendues : /pricing, /en/pricing, etc. */
export const PRERENDER_URLS = INDEXED_LANGUAGES.flatMap((lang) =>
  PRERENDER_ROUTES.map((route) => localizedPath(route, lang)),
);

/** SEO d'une page ; pathname sans préfixe de langue ("/pricing"). */
export function resolveSeo(pathname: string, lang: UrlLanguage = "fr") {
  const base = seoConfig[pathname] ?? seoConfig["/"];
  const translated = lang === "en" ? seoConfigEn[pathname] : undefined;
  const seo = { ...base, ...translated };
  const canonicalOf = (l: UrlLanguage) => `${CANONICAL_ORIGIN}${localizedPath(pathname, l)}`;
  // Une page sans version anglaise n'annonce pas d'alternative
  const hasEnglish = pathname in seoConfigEn;
  return {
    ...seo,
    lang,
    image: seo.image ?? DEFAULT_SEO_IMAGE,
    robots: seo.robots ?? "index,follow",
    url: canonicalOf(lang),
    alternates: hasEnglish ? INDEXED_LANGUAGES.map((l) => ({ lang: l, url: canonicalOf(l) })) : [],
    xDefault: canonicalOf("fr"),
  };
}

/** Données structurées schema.org de la page. */
export function buildSchema(pathname: string, lang: UrlLanguage = "fr") {
  const { title, description, url } = resolveSeo(pathname, lang);
  const faqs = lang === "en" ? faqsEn : faqsFr;
  const organizationDescription = lang === "en"
    ? "Reemite builds financial technology solutions to support African businesses and communities, with a vision to contribute to the transformation of Africa through finance and the mining industry."
    : "Reemite développe des solutions technologiques financières pour soutenir les entreprises et les communautés africaines, avec la vision de contribuer à transformer l’Afrique grâce à la finance et à l’industrie minière.";
  const founderDescription = lang === "en" ? "Founder of Reemite." : "Fondateur de Reemite.";
  const cofounderDescription = lang === "en" ? "Co-founder of Reemite." : "Co-fondateur de Reemite.";
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": ["Organization", "FinancialService"], "@id": `${CANONICAL_ORIGIN}/#organization`, name: "Reemite", url: CANONICAL_ORIGIN, logo: `${CANONICAL_ORIGIN}/android-chrome-512x512.png`, description: organizationDescription, founder: [{ "@type": "Person", "@id": `${CANONICAL_ORIGIN}/#prince-muloko`, name: "Prince Muloko", description: founderDescription }, { "@type": "Person", "@id": `${CANONICAL_ORIGIN}/#prince-lulinda`, name: "Prince Lulinda", description: cofounderDescription }], areaServed: "Africa and international markets", contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: `${CANONICAL_ORIGIN}/contact`, areaServed: "Worldwide" } },
      { "@type": "WebSite", "@id": `${CANONICAL_ORIGIN}/#website`, url: `${CANONICAL_ORIGIN}/`, name: "Reemite", publisher: { "@id": `${CANONICAL_ORIGIN}/#organization` }, inLanguage: ["fr", "en", "ln", "sw"] },
      { "@type": pathname === "/contact" ? "ContactPage" : "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: lang, isPartOf: { "@id": `${CANONICAL_ORIGIN}/#website` }, about: { "@id": `${CANONICAL_ORIGIN}/#organization` } },
      // FAQ de l'accueil, dans la langue de la page
      ...(pathname === "/"
        ? [{ "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }]
        : []),
    ],
  };
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Balises <head> de la page (lisibles sans JavaScript) ; url avec préfixe de langue ("/en/pricing"). */
export function renderHeadTags(url: string) {
  const lang = languageFromPath(url);
  const pathname = lang === "en" ? url.slice(3) || "/" : url;
  const seo = resolveSeo(pathname, lang);
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  // Les robots de partage (WhatsApp, Facebook, LinkedIn) exigent une URL d'image absolue
  const image = escapeHtml(seo.image.startsWith("http") ? seo.image : `${CANONICAL_ORIGIN}${seo.image}`);
  const schema = JSON.stringify(buildSchema(pathname, lang)).replace(/</g, "\\u003c");
  const ogLocale = lang === "en" ? "en_US" : "fr_FR";

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    `<link rel="canonical" href="${seo.url}" />`,
    ...seo.alternates.map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${a.url}" />`),
    ...(seo.alternates.length ? [`<link rel="alternate" hreflang="x-default" href="${seo.xDefault}" />`] : []),
    `<meta property="og:locale" content="${ogLocale}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:url" content="${seo.url}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json" data-seo="organization">${schema}</script>`,
  ].join("\n  ");
}

/** sitemap.xml : chaque page avec ses versions linguistiques (xhtml:link hreflang). */
export function renderSitemap(lastmod: string) {
  const entries = PRERENDER_ROUTES.flatMap((route) => {
    const { alternates } = resolveSeo(route);
    const links = alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}" />`);
    return (alternates.length ? alternates : [{ url: resolveSeo(route).url }]).map(
      (a) => [`  <url>`, `    <loc>${a.url}</loc>`, `    <lastmod>${lastmod}</lastmod>`, ...links, `  </url>`].join("\n"),
    );
  });
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ...entries,
    `</urlset>`,
    ``,
  ].join("\n");
}
