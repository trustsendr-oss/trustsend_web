import { CANONICAL_ORIGIN } from "./lib/domains";
import { faqs } from "./data/content.fr";

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
    title: "Reemite | Paiements, transferts et payroll pour les entreprises",
    description:
      "Reemite aide les entreprises à gérer les paiements, les transferts internationaux, les cartes virtuelles et le payroll en Afrique et à l'international.",
    keywords:
      "paiements entreprises, payroll, transferts internationaux, cartes virtuelles, API de paiement, fintech Afrique",
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
    title: "Agents Reemite | Solutions de paiement et d'intégration",
    description:
      "Des solutions de paiement, d'intégration et d'automatisation pour les agents, partenaires et entreprises qui veulent croître plus vite.",
    keywords: "agents fintech, partenaires paiement, intégration API, solutions fintech, business growth",
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

/** Pages publiques du site vitrine, générées en HTML au build. */
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

export function resolveSeo(pathname: string) {
  const seo = seoConfig[pathname] ?? seoConfig["/"];
  return {
    ...seo,
    image: seo.image ?? DEFAULT_SEO_IMAGE,
    robots: seo.robots ?? "index,follow",
    url: `${CANONICAL_ORIGIN}${pathname === "/" ? "/" : pathname}`,
  };
}

/** Données structurées schema.org de la page. */
export function buildSchema(pathname: string) {
  const { title, description, url } = resolveSeo(pathname);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": ["Organization", "FinancialService"], "@id": `${CANONICAL_ORIGIN}/#organization`, name: "Reemite", url: CANONICAL_ORIGIN, logo: `${CANONICAL_ORIGIN}/android-chrome-512x512.png`, description: "Reemite is a financial technology company, not a bank.", areaServed: "Africa and international markets", contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: `${CANONICAL_ORIGIN}/contact`, areaServed: "Worldwide" } },
      { "@type": "WebSite", "@id": `${CANONICAL_ORIGIN}/#website`, url: `${CANONICAL_ORIGIN}/`, name: "Reemite", publisher: { "@id": `${CANONICAL_ORIGIN}/#organization` }, inLanguage: ["fr", "en", "ln", "sw"] },
      { "@type": pathname === "/contact" ? "ContactPage" : "WebPage", "@id": `${url}#webpage`, url, name: title, description, isPartOf: { "@id": `${CANONICAL_ORIGIN}/#website` }, about: { "@id": `${CANONICAL_ORIGIN}/#organization` } },
      // FAQ de l'accueil (version française, celle du HTML pré-rendu)
      ...(pathname === "/"
        ? [{ "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }]
        : []),
    ],
  };
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Balises <head> de la page, écrites dans le HTML pré-rendu (lisibles sans JavaScript). */
export function renderHeadTags(pathname: string) {
  const seo = resolveSeo(pathname);
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  // Les robots de partage (WhatsApp, Facebook, LinkedIn) exigent une URL d'image absolue
  const image = escapeHtml(seo.image.startsWith("http") ? seo.image : `${CANONICAL_ORIGIN}${seo.image}`);
  const schema = JSON.stringify(buildSchema(pathname)).replace(/</g, "\\u003c");

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="keywords" content="${escapeHtml(seo.keywords)}" />`,
    `<meta name="robots" content="${seo.robots}" />`,
    `<link rel="canonical" href="${seo.url}" />`,
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
