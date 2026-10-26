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

const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification =
  import.meta.env.VITE_BING_SITE_VERIFICATION?.trim() || "A998CC0DF022F0DBC705B89989B5443E";
const yandexVerification = import.meta.env.VITE_YANDEX_VERIFICATION?.trim();

/** Optional ownership verification codes from Google, Bing, and Yandex webmaster consoles. */
export const SEARCH_VERIFICATION_META: { name: string; content: string }[] = [
  ...(googleVerification ? [{ name: "google-site-verification", content: googleVerification }] : []),
  ...(bingVerification ? [{ name: "msvalidate.01", content: bingVerification }] : []),
  ...(yandexVerification ? [{ name: "yandex-verification", content: yandexVerification }] : []),
];

export const seoConfig: Record<string, SeoEntry> = {
  "/": {
    title: "Reemite | Paiements, transferts et API fintech en RDC",
    description:
      "Reemite réunit paiements, transferts locaux et internationaux, cartes virtuelles et API fintech pour les particuliers et entreprises en RDC.",
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
    title: "Reemite | Payments, Transfers and Fintech APIs in the DRC",
    description:
      "Reemite brings together payments, local and international transfers, virtual cards and fintech APIs for individuals and businesses in the DRC.",
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
    ? "Reemite is a financial technology platform for payments, local and international transfers, virtual cards, crypto services and business APIs, serving individuals and businesses in the DRC and across Africa."
    : "Reemite est une plateforme de technologie financière proposant paiements, transferts locaux et internationaux, cartes virtuelles, services crypto et API aux particuliers et aux entreprises en RDC et en Afrique.";
  const founderDescription = lang === "en" ? "Founder of Reemite." : "Fondateur de Reemite.";
  const cofounderDescription = lang === "en" ? "Co-founder of Reemite." : "Co-fondateur de Reemite.";
  const princeMulokoBiography =
    "Né le 27 décembre 1996 à Fizi, Prince Muloko est un entrepreneur congolais engagé dans l’innovation technologique, la santé et l’inclusion financière. Fils de Victorine Shabani et de Muloko Kipili, il a trois sœurs : Machozi Muloko BJ, Bora Muloko et Moza Muloko. À six ans, il part vivre chez son oncle Étienne Shabani, qui contribue à son éducation. À 18 ans, il quitte Fizi pour poursuivre des études universitaires à l’Université Espoir d’Afrique, au Burundi. Après ses études, il travaille comme contrôleur technicien à la Commission électorale nationale indépendante (CENI) de la République démocratique du Congo. En 2023, il quitte cette institution et se porte candidat à la députation nationale dans le territoire de Fizi, au Sud-Kivu, sous la bannière du RDT et le numéro 190. Il lance ensuite Living Tomorrow, un projet explorant l’utilisation de drones intelligents équipés d’intelligence artificielle pour acheminer du matériel médical et des poches de sang vers les patients des zones rurales, présenté lors d’un événement au Burundi en présence de la Fondation Mvura. Il conçoit également une couveuse néonatale connectée pour suivre la santé des nouveau-nés prématurés grâce à l’intelligence artificielle et à l’Internet des objets (IoT). En 2024, il crée LIPAXE, un projet d’inclusion financière dont le développement est confronté à des défis réglementaires et de marché ; il prend du recul pour préparer ses prochaines étapes. En 2026, il lance Reemite avec son cofondateur Prince Lulinda Crespo, spécialiste du développement web et de l’intelligence artificielle, qui contribue à la conception et à la structuration technique de la plateforme. À travers ses projets, Prince Muloko poursuit l’ambition de mettre l’innovation au service des populations, notamment dans la santé, la technologie et la finance.";
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": ["Organization", "FinancialService"], "@id": `${CANONICAL_ORIGIN}/#organization`, name: "Reemite", url: CANONICAL_ORIGIN, logo: `${CANONICAL_ORIGIN}/android-chrome-512x512.png`, description: organizationDescription, founder: [{ "@type": "Person", "@id": `${CANONICAL_ORIGIN}/#prince-muloko`, name: "Prince Muloko", description: princeMulokoBiography, birthDate: "1996-12-27", birthPlace: { "@type": "Place", name: "Fizi, République démocratique du Congo" }, knowsAbout: ["Innovation technologique", "Santé", "Inclusion financière", "Intelligence artificielle", "Internet des objets"] }, { "@type": "Person", "@id": `${CANONICAL_ORIGIN}/#prince-lulinda`, name: "Prince Lulinda", description: cofounderDescription }], areaServed: "Africa and international markets", contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: `${CANONICAL_ORIGIN}/contact`, areaServed: "Worldwide" } },
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
    ...SEARCH_VERIFICATION_META.map(({ name, content }) => `<meta name="${name}" content="${escapeHtml(content)}" />`),
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
