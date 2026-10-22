export type MockupVariant =
  | "payments"
  | "banking"
  | "payroll"
  | "payouts"
  | "checkout";

export const navLinks = [
  { label: "Paiements", href: "#paiements" },
  { label: "Transferts", href: "/transferts-internationaux" },
  // { label: "Épargne & Jeux", href: "#epargne" },
  { label: "Partenaires", href: "#partenaires" },
  { label: "Tarifs", href: "/pricing" },

];

export type MegaMenuItem = {
  label: string;
  desc: string;
  href?: string;
  icon?: string;
  badge?: string;
};

export type MegaMenuColumn = {
  heading: string;
  items: MegaMenuItem[];
};

export type NavMegaMenu = {
  columns: MegaMenuColumn[];
  promo: {
    eyebrow?: string;
    heading: string;
    desc: string;
    cta: string;
    icon?: string;
    kind?: "quote" | "code" | "default";
    quote?: { name: string; title: string; company: string };
    code?: string;
  };
};

export const navMegaMenus: Record<string, NavMegaMenu> = {
  Paiements: {
    columns: [
      {
        heading: "Encaisser",
        items: [
          {
            label: "Cartes Virtuelles",
            href: "/cartes-virtuelles",
            desc: "Émettez des cartes Visa/Mastercard virtuelles pour vos paiements en ligne, en quelques secondes.",
            icon: "/assets/icons/products/capital.svg",
          },
          {
            label: "Cryptomonnaies",
            href: "/cryptomonnaies",
            desc: "Achetez, conservez et dépensez vos cryptos directement depuis votre wallet Reemite.",
            icon: "/assets/icons/products/x.svg",
          },
          {
            label: "Paiement Marchand",
            href: "/paiement-marchand",
            desc: "Encaissez vos ventes en boutique avec un QR code ou un lien de paiement partageable.",
            icon: "/assets/icons/products/paymentpages.svg",
          },
        ],
      },
      {
        heading: "Facturation récurrente",
        items: [
          {
            label: "Abonnements",
            desc: "Automatisez la facturation récurrente de vos clients SaaS ou médias.",
            icon: "/assets/icons/products/subscriptions.svg",
          },
          {
            label: "Frais scolaires",
            desc: "Collectez les frais de scolarité en ligne et suivez chaque versement en temps réel.",
            icon: "/assets/icons/products/invoices.svg",
          },
          {
            label: "Factures & Services",
            desc: "Générez des factures et recevez vos règlements en un clic.",
            icon: "/assets/icons/products/paymentlinks.svg",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "Nouveau",
      heading: "Cartes Virtuelles Reemite",
      desc: "Créez une carte virtuelle en quelques secondes pour tous vos paiements en ligne.",
      cta: "Découvrir les cartes",
      icon: "/assets/icons/products/capital.svg",
    },
  },

  Transferts: {
    columns: [
      {
        heading: "Envoyer de l'argent",
        items: [
          {
            label: "Transfert Local",
            desc: "Envoyez des fonds instantanément vers n'importe quel portefeuille Reemite.",
            icon: "/assets/icons/products/route.svg",
          },
          {
            label: "Transfert International",
            href: "/transferts-internationaux",
            desc: "Recevez et envoyez de l'argent depuis l'étranger, aussi simplement qu'avec Wave.",
            icon: "/assets/icons/products/capital.svg",
          },
          {
            label: "Swap Wallet to Wallet",
            desc: "Échangez des fonds entre deux portefeuilles Reemite en un instant.",
            icon: "/assets/icons/products/x.svg",
          },
        ],
      },
      {
        heading: "Cash In / Cash Out",
        items: [
          {
            label: "Dépôt via Agent",
            href: "/agents",
            desc: "Déposez du cash chez un agent Reemite proche de vous.",
            icon: "/assets/icons/products/smartcollect.svg",
          },
          {
            label: "Dépôt Mobile Money",
            desc: "Rechargez votre portefeuille directement depuis votre compte Mobile Money.",
            icon: "/assets/icons/products/paymentlinks.svg",
          },
          {
            label: "Retrait Agent & Mobile Money",
            href: "/agents",
            desc: "Retirez votre argent en cash chez un agent ou via Mobile Money.",
            icon: "/assets/icons/products/route.svg",
          },
        ],
      },
    ],
    promo: {
      kind: "quote",
      heading: "",
      desc: "Envoyer de l'argent à ma famille prenait des jours avant. Avec le transfert Reemite, ça arrive en quelques secondes, comme avec Wave.",
      cta: "Envoyer maintenant",
      quote: { name: "N. Gitau", title: "Cliente", company: "Diaspora" },
    },
  },

  "Épargne & Jeux": {
    columns: [
      {
        heading: "Épargner",
        items: [
          {
            label: "Likelemba Digital",
            desc: "Créez ou rejoignez une tontine digitale et épargnez en groupe en toute transparence.",
            icon: "/assets/icons/products/capital.svg",
          },
          {
            label: "Objectifs d'épargne",
            desc: "Fixez un objectif et laissez Reemite mettre de l'argent de côté pour vous.",
            icon: "/assets/icons/products/capital.svg",
          },
          {
            label: "Épargne Bloquée",
            desc: "Bloquez des fonds sur une durée choisie pour ne plus être tenté de les dépenser.",
            icon: "/assets/icons/products/invoices.svg",
          },
        ],
      },
      {
        heading: "BGame",
        items: [
          {
            label: "Mini-jeux & Récompenses",
            desc: "Jouez, gagnez des bonus et boostez votre épargne avec BGame.",
            icon: "/assets/icons/products/x.svg",
          },
          {
            label: "Cagnotte Communautaire",
            desc: "Participez à des cagnottes collectives et tentez de remporter le pot commun.",
            icon: "/assets/icons/products/x-club.svg",
          },
          {
            label: "Programme de fidélité",
            desc: "Cumulez des points à chaque transaction et débloquez des récompenses.",
            icon: "/assets/icons/products/subscriptions.svg",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "BGame",
      heading: "Jouez, épargnez, gagnez",
      desc: "Le jeu qui récompense votre fidélité et donne un coup de pouce à votre épargne à chaque transaction.",
      cta: "Découvrir BGame",
      icon: "/assets/icons/products/x.svg",
    },
  },

  Partenaires: {
    columns: [
      {
        heading: "Réseau d'agents",
        items: [
          {
            label: "Devenir Agent",
            href: "/agents",
            desc: "Rejoignez le réseau d'agents Reemite et gagnez une commission sur chaque dépôt et retrait.",
            icon: "/assets/icons/products/route.svg",
          },
          {
            label: "Programme de Parrainage",
            desc: "Recommandez Reemite à des commerçants et gagnez sur chaque transaction.",
            icon: "/assets/icons/products/capital.svg",
          },
        ],
      },
      {
        heading: "Développeurs",
        items: [
          {
            label: "Documentation API",
            href: "https://docs.trustsend.africa",
            desc: "Toute la documentation pour intégrer paiements, transferts et cartes virtuelles.",
            icon: "/assets/icons/develop/api.svg",
          },
          {
            label: "Webhooks",
            href: "https://docs.trustsend.africa/webhooks",
            desc: "Recevez des notifications en temps réel pour chaque transaction.",
            icon: "/assets/icons/develop/docs.svg",
          },
          {
            label: "Environnement Sandbox",
            href: "https://sandbox.reemite.com/signup",
            desc: "Testez votre intégration avec des données fictives avant le passage en production.",
            icon: "/assets/icons/develop/integrations.svg",
          },
        ],
      },
    ],
    promo: {
      kind: "code",
      heading: "Conçu pour les développeurs",
      desc: "Intégrez cartes, paiements et transferts en une après-midi grâce à nos SDKs.",
      cta: "Lire la documentation",
      code: `const Reemite = require("Reemite")(apiKey);

const transfert = await Reemite.transfers.create({
  amount: 50,
  currency: "USD",
  destination: "wallet_98213",
});`,
    },
  },
};

export const heroCapabilities: { label: string; variant: MockupVariant }[] = [
  { label: "Payer vos abonnements", variant: "payments" },
  { label: "Épargner en Likelemba", variant: "payroll" },
  { label: "Transférer localement et à l'international", variant: "payouts" },
  { label: "Gérer votre carte virtuelle", variant: "checkout" },
  { label: "Retirer chez un agent", variant: "banking" },
];

export const heroSpotlight = {
  eyebrow: "L'API business qui connecte tout",
  heading: "cartes, cash, mobile money et cryptos",
  subline: "Cartes Virtuelles | Transferts façon Wave | Retrait & Dépôt Agents | Likelemba | BGame",
  appName: "École La Sagesse",
  productLabel: "Frais de scolarité — Trim. 2",
  price: "45 $",
  attribution: "Direction, École La Sagesse",
  signature: "Aïcha",
};

export const recommendationChips = [
  "Envoyer de l'argent",
  "Retirer chez un agent",
  "Ouvrir une carte virtuelle",
  "Épargner (Likelemba)",
  "Acheter des cryptos",
  "Jouer sur BGame",
];

export const paymentMethods = [
  { name: "Visa", src: "/assets/icons/payment-modes/visa.png" },
  { name: "Mastercard", src: "/assets/icons/payment-modes/mastercard.png" },
  { name: "Virement bancaire", src: "/assets/icons/payment-modes/netbanking.png" },
];

export const mobileMoneyProviders: { name: string; src: string }[] = [
  { name: "M-Pesa", src: "/assets/icons/mobile-money/mpesa.svg" },
  { name: "Orange Money", src: "/assets/icons/mobile-money/orange-money.svg" },
  { name: "MTN MoMo", src: "/assets/icons/mobile-money/mtn.svg" },
  { name: "Airtel Money", src: "/assets/icons/mobile-money/airtel.svg" },
  { name: "Moov Money", src: "/assets/icons/mobile-money/moov-money.png" },
  { name: "Africell Afrimoney", src: "/assets/icons/mobile-money/africell.png" },
  { name: "EcoCash", src: "/assets/icons/mobile-money/ecocash.png" },
];

export const platformStandards: { icon: string; label: string }[] = [
  { icon: "Wallet", label: "Un compte sans frais de dépôt ou retrait" },
  { icon: "Percent", label: "Des transferts d'argent à seulement 1%" },
  { icon: "Receipt", label: "Le paiement de factures sans frais" },
  { icon: "Smartphone", label: "L'achat de crédit instantané tous réseaux" },
  { icon: "Phone", label: "Un numéro de contact unique et gratuit" },
  { icon: "ShieldCheck", label: "Un système de sécurité aux standards internationaux" },
];

export const featureTabs: {
  id: string;
  label: string;
  badge?: string;
  heading: string;
  description: string;
  bullets: { label: string; desc: string }[];
  variant: MockupVariant;
  icon: string;
}[] = [
  {
    id: "cartes-virtuelles",
    label: "Cartes Virtuelles",
    badge: "new",
    heading: "Cartes Virtuelles",
    description:
      "Émettez des cartes Visa/Mastercard virtuelles en quelques secondes pour vos paiements en ligne et ceux de vos équipes.",
    bullets: [
      { label: "Émission instantanée", desc: "Créez une carte virtuelle directement depuis votre dashboard, sans attendre." },
      { label: "Plafonds & contrôle", desc: "Définissez des limites de dépense et bloquez une carte en un clic." },
    ],
    variant: "checkout",
    icon: "/assets/icons/products/capital.svg",
  },
  {
    id: "cryptos-swap",
    label: "Cryptos & Swap",
    heading: "Cryptomonnaies & Swap",
    description:
      "Gérez vos actifs numériques et échangez des fonds entre portefeuilles Reemite, sans passer par une banque.",
    bullets: [
      { label: "Wallet crypto", desc: "Achetez, conservez et convertissez vos cryptos au meilleur taux du marché." },
      { label: "Swap Wallet to Wallet", desc: "Transférez instantanément des fonds d'un portefeuille Reemite à un autre." },
    ],
    variant: "payments",
    icon: "/assets/icons/products/x.svg",
  },
  {
    id: "paiements",
    label: "Paiements",
    heading: "Paiements & Encaissements",
    description: "Encaissez vos abonnements, frais de scolarité et ventes en magasin depuis une seule plateforme.",
    bullets: [
      { label: "Abonnements", desc: "Automatisez la facturation récurrente pour vos clients SaaS ou médias." },
      { label: "Frais scolaires", desc: "Collectez les frais de scolarité en ligne et suivez chaque paiement en temps réel." },
      { label: "Paiement Marchand", desc: "Encaissez en boutique avec un QR code ou un lien de paiement partageable." },
    ],
    variant: "payments",
    icon: "/assets/icons/products/paymentpages.svg",
  },
  {
    id: "transferts",
    label: "Transferts",
    heading: "Transferts Locaux & Internationaux",
    description: "Envoyez de l'argent en un instant, au pays comme à l'international, aussi simplement qu'avec Wave.",
    bullets: [
      { label: "Transfert Local", desc: "Envoyez des fonds instantanément vers n'importe quel portefeuille Reemite." },
      { label: "Transfert International", desc: "Recevez et envoyez de l'argent depuis l'étranger sans frais cachés." },
    ],
    variant: "payouts",
    icon: "/assets/icons/products/route.svg",
  },
  {
    id: "retrait-depot",
    label: "Retrait & Dépôt",
    heading: "Retrait & Dépôt",
    description: "Convertissez votre argent numérique en cash et inversement, chez un agent ou via Mobile Money.",
    bullets: [
      { label: "Réseau d'agents", desc: "Déposez ou retirez du cash chez un agent Reemite proche de vous." },
      { label: "Mobile Money", desc: "Rechargez ou retirez directement depuis votre compte Mobile Money." },
    ],
    variant: "banking",
    icon: "/assets/icons/products/capital.svg",
  },
  {
    id: "epargne-bgame",
    label: "Épargne & BGame",
    heading: "Épargne (Likelemba) & BGame",
    description: "Épargnez en groupe à la manière d'une tontine et boostez vos économies en jouant sur BGame.",
    bullets: [
      { label: "Likelemba Digital", desc: "Créez ou rejoignez une tontine digitale et suivez chaque cotisation en toute transparence." },
      { label: "BGame", desc: "Jouez, cumulez des bonus et donnez un coup de pouce à votre épargne." },
    ],
    variant: "payroll",
    icon: "/assets/icons/products/subscriptions.svg",
  },
];

export const industries: {
  name: string;
  headingLead: string;
  headingHighlight: string;
  blurb: string;
  detail: string;
  count: string;
  icon: string;
  photo: string;
  logos: string[];
}[] = [
  {
    name: "Commerçants",
    headingLead: "Encaissez vos ventes en",
    headingHighlight: "boutique et en ligne",
    blurb: "Acceptez cartes, Mobile Money et QR code depuis une seule plateforme.",
    detail:
      "Créez des liens de paiement et des pages de vente, et acceptez les règlements de vos clients en magasin comme en ligne, sans code.",
    count: "+ 12 000 commerçants",
    icon: "/assets/icons/products/paymentpages.svg",
    photo:
      "/assets/images/industry-merchants.webp",
    logos: ["Nova", "Loopay", "Bluewave"],
  },
  {
    name: "Écoles",
    headingLead: "Simplifiez les",
    headingHighlight: "frais de scolarité",
    blurb: "Collectez les paiements des parents et suivez chaque versement en temps réel.",
    detail:
      "Mettez en place la collecte des frais de scolarité en quelques minutes, avec ou sans site web, et suivez chaque versement depuis un tableau de bord unique.",
    count: "+ 300 établissements",
    icon: "/assets/icons/products/invoices.svg",
    photo:
      "/assets/images/industry-schools.webp",
    logos: ["Orbit", "Vantik", "Northstar"],
  },
  {
    name: "Diaspora",
    headingLead: "Envoyez de l'argent à votre",
    headingHighlight: "famille, où qu'elle soit",
    blurb: "Transferts internationaux instantanés vers n'importe quel portefeuille Reemite.",
    detail:
      "Envoyez des fonds depuis l'étranger en quelques secondes, avec des frais transparents et un taux de change clair, aussi simplement qu'avec Wave.",
    count: "+ 2 800 familles connectées",
    icon: "/assets/icons/products/capital.svg",
    photo:
      "/assets/images/industry-diaspora.webp",
    logos: ["Fintra", "Corelink", "Meridian"],
  },
  {
    name: "Agents",
    headingLead: "Développez votre activité en tant",
    headingHighlight: "qu'agent Reemite",
    blurb: "Gagnez une commission sur chaque dépôt et retrait effectué dans votre point de vente.",
    detail:
      "Rejoignez le réseau d'agents Reemite, traitez les dépôts et retraits de vos clients, et recevez votre commission automatiquement.",
    count: "+ 5 000 agents actifs",
    icon: "/assets/icons/products/route.svg",
    photo:
      "/assets/images/industry-agents.webp",
    logos: ["Zenpay", "Cobalt", "Driftly"],
  },
  {
    name: "Groupes d'épargne",
    headingLead: "Digitalisez votre",
    headingHighlight: "Likelemba",
    blurb: "Gérez une tontine digitale avec vos proches, en toute transparence.",
    detail:
      "Créez un groupe, invitez ses membres, suivez chaque cotisation et débloquez l'épargne collective au tour de chacun, sans cahier ni disputes.",
    count: "+ 45 000 membres",
    icon: "/assets/icons/products/x-club.svg",
    photo:
      "/assets/images/industry-savings.webp",
    logos: ["Lumen", "Parallel", "Corelink"],
  },
];

export const innovationBlocks: {
  name: string;
  stat: string;
  description: string;
  variant: MockupVariant;
}[] = [
  {
    name: "Portefeuille Multi-Devises",
    stat: "Gérez cash, Mobile Money et cryptos dans un seul portefeuille, disponible dans plus de 15 pays.",
    description: "Un portefeuille unique pour tout gérer, du cash à la crypto.",
    variant: "banking",
  },
 
];

export const devCards = [
  {
    title: "Intégrations",
    desc: "SDKs et plugins prêts à l'emploi pour intégrer cartes virtuelles, transferts et Mobile Money en quelques lignes.",
    icon: "/assets/icons/develop/integrations.svg",
  },
  {
    title: "Référence API",
    desc: "Documentation complète pour connecter paiements, transferts, retrait/dépôt et cryptos à votre produit.",
    icon: "/assets/icons/develop/api.svg",
  },
  {
    title: "Webhooks",
    desc: "Recevez des notifications en temps réel pour chaque transaction, dépôt, retrait ou paiement.",
    icon: "/assets/icons/develop/docs.svg",
  },
];

export const codeSamples: Record<string, string> = {
  "CURL": `curl -X POST https://api.reemite.com/v1/payments \\
  -u key_live_xxxxx: \\
  -d amount=50 \\
  -d currency="USD" \\
  -d receipt="qwsaq1" \\
  -d partial_payment=true \\
  -d first_payment_min_amount=20`,
  "JAVA": `ReemiteClient client = new ReemiteClient(apiKey);

JSONObject paymentRequest = new JSONObject();
paymentRequest.put("amount", 50);
paymentRequest.put("currency", "USD");
paymentRequest.put("receipt", "qwsaq1");
paymentRequest.put("partial_payment", true);
paymentRequest.put("first_payment_min_amount", 20);

Payment payment = client.payments.create(paymentRequest);`,
  "Python": `import Reemite

client = Reemite.Client(api_key=API_KEY)

payment = client.payment.create({
    "amount": 50,
    "currency": "USD",
    "receipt": "qwsaq1",
    "partial_payment": True,
    "first_payment_min_amount": 20,
})`,
  "PHP": `$api = new Reemite\\Api($apiKey);

$payment = $api->payment->create([
  "amount"                   => 50,
  "currency"                 => "USD",
  "receipt"                  => "qwsaq1",
  "partial_payment"          => true,
  "first_payment_min_amount" => 20,
]);`,
  "NODE JS": `const Reemite = require("Reemite")(apiKey);

const payment = await Reemite.payments.create({
  amount: 50,
  currency: "USD",
  receipt: "qwsaq1",
  partial_payment: true,
  first_payment_min_amount: 20,
});`,
};

export const noCodeExamples: { icon: string; title: string; subtitle: string }[] = [
  {
    icon: "QrCode",
    title: "QR code marchand",
    subtitle: "Encaissez en boutique : le client scanne, vous êtes payé instantanément",
  },
  {
    icon: "Send",
    title: "Transfert Mobile Money",
    subtitle: "Envoyez vers M-Pesa, Orange Money, Airtel ou MTN à seulement 1%",
  },
  {
    icon: "Receipt",
    title: "Factures & frais scolaires",
    subtitle: "Eau, électricité, TV, scolarité : payez ou collectez sans frais",
  },
  {
    icon: "Users",
    title: "Likelemba & épargne de groupe",
    subtitle: "Créez votre groupe, cotisez et suivez chaque tour en toute transparence",
  },
];

// Témoignages fictifs illustrant l'usage des produits Reemite (cartes,
// Likelemba, agents, transferts). Noms et sociétés sont des exemples
// génériques, pas de vrais clients.
export const testimonials: {
  quote: string;
  name: string;
  title: string;
  company: string;
}[] = [
  {
    quote:
      "Avec les cartes virtuelles Reemite, mes abonnements en ligne ne bloquent plus jamais. Je les gère toutes depuis mon téléphone.",
    name: "A. Kariuki",
    title: "Fondatrice",
    company: "Boutique A",
  },
  {
    quote:
      "Notre Likelemba tournait sur WhatsApp et un cahier. Avec Reemite, chaque cotisation est enregistrée et personne ne peut plus contester.",
    name: "D. Mensah",
    title: "Trésorière du groupe",
    company: "Groupe B",
  },
  {
    quote:
      "En tant qu'agent Reemite, je fais des dépôts et des retraits toute la journée. La commission tombe automatiquement, sans calcul à la main.",
    name: "N. Achieng",
    title: "Agent Reemite",
    company: "Point C",
  },
  {
    quote:
      "Je collecte les frais de scolarité par lien de paiement. Plus de files d'attente le jour de la rentrée.",
    name: "D. Rawat",
    title: "Directeur",
    company: "École D",
  },
  {
    quote:
      "Envoyer de l'argent à ma famille à l'étranger prenait des jours avant. Avec le transfert international Reemite, ça arrive en quelques secondes.",
    name: "N. Gitau",
    title: "Cliente",
    company: "Diaspora E",
  },
  {
    quote:
      "On a intégré l'API Reemite pour le paiement de nos commandes en boutique et en ligne en une semaine, cartes et Mobile Money compris.",
    name: "A. Njoroge",
    title: "Co-fondateur",
    company: "Commerce F",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Qu'est-ce que Reemite ?",
    answer:
      "Reemite est une API business qui permet aux entreprises et aux particuliers d'émettre des cartes virtuelles, d'accepter des paiements, d'envoyer et de recevoir de l'argent, de gérer des cryptos, d'épargner en groupe (Likelemba) et bien plus, depuis un seul compte.",
  },
  {
    question: "Quels services propose Reemite ?",
    answer:
      "Cartes virtuelles, cryptomonnaies, paiements (abonnements, frais scolaires, ventes en magasin), transferts locaux et internationaux, retrait et dépôt via agents ou Mobile Money, swap wallet to wallet, épargne Likelemba et BGame — le tout dans une seule plateforme.",
  },
  {
    question: "Comment fonctionnent les cartes virtuelles Reemite ?",
    answer:
      "Générez une carte Visa ou Mastercard virtuelle en quelques secondes depuis l'application, avec des plafonds personnalisables et la possibilité de la bloquer instantanément.",
  },
  {
    question: "Puis-je acheter et gérer des cryptomonnaies avec Reemite ?",
    answer:
      "Oui. Le wallet Reemite vous permet d'acheter, de conserver et de convertir vos cryptos en cash, au meilleur taux du marché.",
  },
  {
    question: "Comment envoyer de l'argent avec Reemite ?",
    answer:
      "Envoyez des fonds instantanément vers n'importe quel portefeuille Reemite, localement ou à l'international, aussi simplement qu'avec Wave.",
  },
  {
    question: "Comment fonctionnent le retrait et le dépôt ?",
    answer:
      "Rendez-vous chez un agent Reemite proche de vous, ou utilisez votre compte Mobile Money, pour déposer ou retirer du cash en quelques minutes.",
  },
  {
    question: "Qu'est-ce que le Swap Wallet to Wallet ?",
    answer:
      "Le Swap vous permet de transférer instantanément des fonds entre deux portefeuilles Reemite, sans passer par une banque.",
  },
  {
    question: "Comment fonctionne l'épargne Likelemba ?",
    answer:
      "Créez ou rejoignez une tontine digitale avec vos proches ou vos collègues, suivez chaque cotisation et débloquez l'épargne collective en toute transparence.",
  },
  {
    question: "Qu'est-ce que BGame ?",
    answer:
      "BGame est notre espace de mini-jeux et de récompenses : jouez, cumulez des bonus et boostez votre épargne à chaque transaction.",
  },
  {
    question: "Reemite est-il sûr et sécurisé ?",
    answer:
      "Oui. Reemite utilise le chiffrement et la tokenisation pour que vos données sensibles ne transitent jamais en clair, et chaque transaction est tracée.",
  },
  {
    question: "Reemite est-il réglementé ?",
    answer:
      "Reemite opère en tant qu'établissement de paiement agréé dans chacun des marchés où la plateforme est disponible.",
  },
  {
    question: "Comment devenir agent Reemite ?",
    answer:
      "Inscrivez-vous depuis l'application, complétez la vérification de votre point de vente, et commencez à traiter des dépôts et retraits sous 48h.",
  },
  {
    question: "Comment intégrer l'API Reemite à mon business ?",
    answer:
      "Créez un compte développeur gratuit, générez vos clés API en mode test, et suivez notre documentation pour intégrer paiements, cartes et transferts en quelques heures.",
  },
];

export const footerColumns: {
  title: string;
  links: { label: string; badge?: string; href?: string }[];
}[] = [
  {
    title: "Paiements",
    links: [
      { label: "Cartes Virtuelles" },
      { label: "Paiement Marchand" },
      { label: "Abonnements" },
      { label: "Frais scolaires" },
      { label: "QR Code", badge: "NEW" },
      { label: "Liens de paiement" },
      { label: "Factures" },
    ],
  },
  {
    title: "Épargne & Jeux",
    links: [
      { label: "Likelemba Digital" },
      { label: "Objectifs d'épargne" },
      { label: "Épargne Bloquée" },
      { label: "BGame" },
    ],
  },
  {
    title: "Devenir Partenaire",
    links: [{ label: "Devenir Agent" }, { label: "Programme de Parrainage" }, { label: "Agents API" }],
  },
  {
    title: "Transferts",
    links: [
      { label: "Transfert Local" },
      { label: "Transfert International" },
      { label: "Swap Wallet to Wallet" },
      { label: "Retrait" },
      { label: "Dépôt" },
    ],
  },
  {
    title: "Cash & Mobile Money",
    links: [
      { label: "Retrait Agent" },
      { label: "Retrait Mobile Money" },
      { label: "Dépôt Agent" },
      { label: "Dépôt Mobile Money" },
      { label: "Portefeuille Multi-devises" },
    ],
  },
  {
    title: "Développeurs",
    links: [
      { label: "Documentation", href: "https://docs.trustsend.africa" },
      { label: "Intégrations" },
      { label: "Référence API", href: "https://docs.trustsend.africa" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog" },
      { label: "Guides" },
      { label: "Témoignages clients" },
      { label: "Événements" },
    ],
  },
  {
    title: "Nos utilisateurs",
    links: [
      { label: "Commerçants" },
      { label: "Écoles" },
      { label: "Diaspora" },
      { label: "Agents" },
      { label: "Groupes d'épargne" },
    ],
  },
  {
    title: "Outils gratuits",
    links: [
      { label: "Calculateur de frais" },
      { label: "Convertisseur crypto" },
      { label: "Simulateur Likelemba" },
      { label: "Générateur de lien de paiement" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos" },
      { label: "Carrières" },
      { label: "Conditions d'utilisation" },
      { label: "Politique de confidentialité" },
      { label: "Réclamations" },
      { label: "Divulgation responsable" },
    ],
  },
  {
    title: "Aide & Support",
    links: [{ label: "Support" }, { label: "Centre d'aide" }],
  },
];

// ---------------------------------------------------------------------------
// Page Agents — réseau de dépôt / retrait cash Reemite
// ---------------------------------------------------------------------------
export const agentsPage = {
  hero: {
    eyebrow: "Réseau d'agents Reemite",
    title: "Transformez votre boutique en",
    titleAccent: "point cash Reemite",
    subtitle:
      "Traitez les dépôts et retraits de vos clients, encaissez une commission sur chaque opération et attirez du monde dans votre point de vente, chaque jour.",
    ctaPrimary: "Devenir agent",
    ctaSecondary: "Parler à un conseiller",
    stats: [
      { value: "+ 5 000", label: "agents actifs" },
      { value: "24 h", label: "pour être validé" },
      { value: "0 $", label: "de frais d'adhésion" },
    ],
  },
  benefits: {
    title: "Pourquoi devenir agent",
    subtitle:
      "Un revenu complémentaire, sans investissement de départ et sans changer votre façon de travailler.",
    items: [
      {
        icon: "Coins",
        title: "Commission sur chaque opération",
        desc: "Dépôt, retrait, transfert : votre commission est calculée et créditée automatiquement.",
      },
      {
        icon: "Users",
        title: "Plus de passage en boutique",
        desc: "Les clients qui viennent déposer ou retirer achètent aussi vos produits.",
      },
      {
        icon: "Wallet",
        title: "Float toujours disponible",
        desc: "Rechargez votre float par Mobile Money ou virement, à toute heure, depuis l'application.",
      },
      {
        icon: "ShieldCheck",
        title: "Opérations sécurisées",
        desc: "Chaque transaction est confirmée par code et tracée dans votre historique.",
      },
      {
        icon: "MapPin",
        title: "Visible sur la carte",
        desc: "Votre point de vente apparaît dans l'application pour tous les clients du quartier.",
      },
      {
        icon: "Headphones",
        title: "Support agent dédié",
        desc: "Une ligne WhatsApp réservée aux agents, pour débloquer une opération en quelques minutes.",
      },
    ],
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "Agent en 4 étapes",
    subtitle: "Aucun matériel spécifique : un téléphone et votre pièce d'identité suffisent.",
    items: [
      {
        title: "Créez votre compte",
        desc: "Inscrivez-vous en quelques minutes avec votre numéro de téléphone.",
      },
      {
        title: "Validez votre identité",
        desc: "Envoyez votre pièce d'identité et les informations de votre point de vente (KYC).",
      },
      {
        title: "Chargez votre float",
        desc: "Alimentez votre solde agent par Mobile Money, virement ou dépôt cash.",
      },
      {
        title: "Servez vos clients",
        desc: "Dépôts, retraits et transferts : la commission tombe à chaque opération validée.",
      },
    ],
  },
  earnings: {
    eyebrow: "Vos revenus",
    title: "Une commission claire, connue à l'avance",
    desc: "Vous voyez le montant gagné avant de valider l'opération, et le cumul du jour dans votre tableau de bord agent.",
    rows: [
      { label: "Dépôt cash client", value: "0,8 %" },
      { label: "Retrait cash client", value: "1,0 %" },
      { label: "Retrait Mobile Money", value: "0,5 %" },
      { label: "Ouverture de compte", value: "1 $ / compte" },
    ],
    note: "Les taux affichés sont indicatifs et peuvent varier selon le pays et le volume mensuel.",
    providersLabel: "Rechargez votre float via",
  },
  testimonial: {
    quote:
      "En tant qu'agent Reemite, je fais des dépôts et des retraits toute la journée. La commission tombe automatiquement, sans calcul à la main.",
    name: "J. Mwamba",
    role: "Agent Reemite, Kinshasa",
  },
  faq: {
    title: "Questions des agents",
    items: [
      {
        q: "Qui peut devenir agent Reemite ?",
        a: "Toute personne majeure disposant d'un point de vente ou d'une activité commerciale régulière, avec une pièce d'identité valide.",
      },
      {
        q: "Faut-il un capital de départ ?",
        a: "L'adhésion est gratuite. Vous avez seulement besoin d'un float, c'est-à-dire du cash et d'un solde Reemite pour servir vos clients.",
      },
      {
        q: "Quand est versée la commission ?",
        a: "Elle est créditée sur votre solde agent dès que l'opération est confirmée par le client. Vous pouvez la retirer à tout moment.",
      },
      {
        q: "Que faire en cas d'opération bloquée ?",
        a: "Contactez le support agent par WhatsApp depuis l'application : la ligne est réservée aux agents et répond en quelques minutes.",
      },
    ],
  },
  cta: {
    title: "Prêt à ouvrir votre point cash ?",
    desc: "Inscrivez-vous aujourd'hui, envoyez vos documents et commencez à servir vos clients dès validation.",
    primary: "Devenir agent",
    secondary: "Nous écrire sur WhatsApp",
  },
};

// ---------------------------------------------------------------------------
// Page Transferts internationaux
// ---------------------------------------------------------------------------
export const transfersPage = {
  hero: {
    eyebrow: "Transferts internationaux",
    title: "Envoyez de l'argent chez vous,",
    titleAccent: "en quelques minutes",
    subtitle:
      "Vers un Mobile Money, un compte bancaire ou du cash chez un agent, avec un taux clair et des frais annoncés avant l'envoi.",
    ctaPrimary: "Envoyer de l'argent",
    ctaSecondary: "Voir les frais",
    stats: [
      { value: "20+", label: "pays couverts" },
      { value: "1 %", label: "de frais à partir de" },
      { value: "< 5 min", label: "temps de réception moyen" },
    ],
  },
  simulator: {
    eyebrow: "Simulateur",
    title: "Combien reçoit votre famille ?",
    desc: "Estimez en direct le montant reçu. Le taux exact est confirmé avant la validation de l'envoi.",
    youSend: "Vous envoyez",
    theyGet: "Votre bénéficiaire reçoit",
    feeLabel: "Frais Reemite",
    rateLabel: "Taux appliqué",
    deliveryLabel: "Réception estimée",
    delivery: "moins de 5 minutes",
    note: "Estimation indicative : le taux et les frais définitifs s'affichent avant confirmation.",
    cta: "Envoyer maintenant",
  },
  channels: {
    title: "Votre bénéficiaire choisit comment recevoir",
    subtitle:
      "Un seul envoi, plusieurs façons de récupérer l'argent, selon ce qui est le plus pratique sur place.",
    items: [
      {
        icon: "Smartphone",
        title: "Mobile Money",
        desc: "M-Pesa, Orange Money, MTN MoMo, Airtel Money : l'argent arrive directement sur le numéro.",
      },
      {
        icon: "Wallet",
        title: "Portefeuille Reemite",
        desc: "Réception instantanée dans le wallet, prête à être dépensée ou épargnée.",
      },
      {
        icon: "Landmark",
        title: "Compte bancaire",
        desc: "Virement vers les principales banques locales, sans déplacement.",
      },
      {
        icon: "Store",
        title: "Cash chez un agent",
        desc: "Retrait en espèces chez l'un des agents Reemite du quartier.",
      },
      {
        icon: "CreditCard",
        title: "Carte virtuelle",
        desc: "Alimentez une carte Visa/Mastercard virtuelle pour les achats en ligne.",
      },
      {
        icon: "Bitcoin",
        title: "Cryptomonnaies",
        desc: "Convertissez et recevez en stablecoins depuis votre wallet Reemite.",
      },
    ],
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "Trois étapes, c'est tout",
    items: [
      {
        title: "Indiquez le montant",
        desc: "Choisissez la devise d'envoi et le pays d'arrivée : le montant reçu s'affiche immédiatement.",
      },
      {
        title: "Ajoutez le bénéficiaire",
        desc: "Numéro Mobile Money, compte bancaire ou identifiant Reemite : une seule fois, puis enregistré.",
      },
      {
        title: "Payez et suivez",
        desc: "Réglez par carte, virement ou solde Reemite et suivez l'envoi jusqu'à la réception.",
      },
    ],
  },
  corridors: {
    eyebrow: "Corridors",
    title: "Les routes les plus utilisées",
    subtitle: "Des corridors optimisés pour la diaspora, avec un taux clair et une réception rapide.",
    items: [
      { from: "France", to: "RD Congo", delay: "< 5 min", fee: "dès 1 %" },
      { from: "Belgique", to: "Rwanda", delay: "< 5 min", fee: "dès 1 %" },
      { from: "Canada", to: "Cameroun", delay: "< 10 min", fee: "dès 1,2 %" },
      { from: "États-Unis", to: "Kenya", delay: "< 10 min", fee: "dès 1,2 %" },
      { from: "Afrique du Sud", to: "Zimbabwe", delay: "< 5 min", fee: "dès 1 %" },
      { from: "Émirats arabes unis", to: "Nigeria", delay: "< 15 min", fee: "dès 1,5 %" },
    ],
    providersLabel: "Réception Mobile Money chez",
  },
  trust: {
    eyebrow: "Sécurité & conformité",
    title: "Chaque envoi est protégé de bout en bout",
    desc: "Vos transferts sont chiffrés, suivis et soumis aux contrôles anti-fraude, du paiement jusqu'à la réception.",
    items: [
      { icon: "ShieldCheck", title: "Chiffrement de bout en bout", desc: "Données et opérations protégées aux standards internationaux." },
      { icon: "BadgeCheck", title: "KYC & conformité", desc: "Vérification d'identité et contrôles AML sur chaque corridor." },
      { icon: "Bell", title: "Suivi en temps réel", desc: "Notification à chaque étape, pour vous et votre bénéficiaire." },
      { icon: "Headphones", title: "Support 7j/7", desc: "Une équipe joignable par WhatsApp en cas de question sur un envoi." },
    ],
    photo:
      "/assets/images/team-handshake.jpg",
  },
  testimonial: {
    quote:
      "Envoyer de l'argent à ma famille prenait des jours avant. Avec le transfert Reemite, ça arrive en quelques secondes, comme avec Wave.",
    name: "N. Gitau",
    role: "Cliente diaspora, Londres",
    photo:
      "/assets/images/team-laptop.jpg",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Quels sont les frais réels ?",
        a: "Les frais démarrent à 1 % du montant envoyé et dépendent du corridor et du moyen de paiement. Le montant exact est affiché avant la validation, sans surprise à l'arrivée.",
      },
      {
        q: "Combien de temps prend un transfert ?",
        a: "La plupart des envois vers un Mobile Money ou un portefeuille Reemite arrivent en moins de cinq minutes. Les virements bancaires peuvent prendre jusqu'à un jour ouvré.",
      },
      {
        q: "Mon bénéficiaire doit-il avoir un compte Reemite ?",
        a: "Non. Il peut recevoir directement sur son Mobile Money, son compte bancaire ou en cash chez un agent Reemite.",
      },
      {
        q: "Quelle est la limite d'envoi ?",
        a: "Elle dépend de votre niveau de vérification (KYC). Après validation complète de votre identité, les plafonds sont relevés automatiquement.",
      },
    ],
  },
  cta: {
    title: "Votre premier transfert en quelques minutes",
    desc: "Créez votre compte, ajoutez un bénéficiaire et envoyez dès aujourd'hui, où que soit votre famille.",
    primary: "Créer mon compte",
    secondary: "Nous écrire sur WhatsApp",
  },
};

export const transferCurrencies: { code: string; label: string; rate: number; symbol: string }[] = [
  { code: "CDF", label: "Franc congolais", rate: 2850, symbol: "FC" },
  { code: "KES", label: "Shilling kényan", rate: 129, symbol: "KSh" },
  { code: "XAF", label: "Franc CFA (CEMAC)", rate: 605, symbol: "FCFA" },
  { code: "XOF", label: "Franc CFA (UEMOA)", rate: 605, symbol: "FCFA" },
  { code: "RWF", label: "Franc rwandais", rate: 1310, symbol: "FRw" },
  { code: "NGN", label: "Naira nigérian", rate: 1480, symbol: "₦" },
];

// ---------------------------------------------------------------------------
// Page Cartes virtuelles
// ---------------------------------------------------------------------------
export const virtualCardsPage = {
  hero: {
    eyebrow: "Cartes virtuelles",
    title: "Une carte Visa ou Mastercard",
    titleAccent: "en quelques secondes",
    subtitle:
      "Créez, alimentez et bloquez vos cartes virtuelles depuis votre compte Reemite, pour vos achats en ligne et ceux de votre équipe.",
  },
  features: {
    title: "Tout ce qu'il faut pour payer en ligne",
    subtitle:
      "Des cartes pensées pour les abonnements, les achats internationaux et les dépenses d'équipe.",
    items: [
      {
        icon: "Zap",
        title: "Émission instantanée",
        desc: "Créez une carte depuis votre tableau de bord et utilisez-la immédiatement.",
      },
      {
        icon: "Globe",
        title: "Acceptée dans le monde entier",
        desc: "Payez partout où Visa et Mastercard sont acceptées, en ligne comme en application.",
      },
      {
        icon: "SlidersHorizontal",
        title: "Plafonds & contrôle",
        desc: "Fixez une limite par carte, par jour ou par mois, et ajustez-la à tout moment.",
      },
      {
        icon: "Lock",
        title: "Blocage en un clic",
        desc: "Gelez ou supprimez une carte instantanément en cas de doute.",
      },
      {
        icon: "Repeat",
        title: "Cartes jetables ou récurrentes",
        desc: "Une carte à usage unique pour un achat, une carte dédiée pour chaque abonnement.",
      },
      {
        icon: "Users",
        title: "Cartes d'équipe",
        desc: "Donnez une carte à chaque collaborateur et suivez les dépenses au même endroit.",
      },
    ],
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "Votre première carte en 3 étapes",
    items: [
      {
        title: "Alimentez votre wallet",
        desc: "Par Mobile Money, chez un agent ou par virement, en dollars comme en monnaie locale.",
      },
      {
        title: "Créez la carte",
        desc: "Choisissez le réseau, la devise et le plafond : la carte est générée aussitôt.",
      },
      {
        title: "Payez en ligne",
        desc: "Utilisez le numéro de carte pour vos abonnements, vos achats et vos publicités en ligne.",
      },
    ],
  },
  useCases: {
    eyebrow: "Cas d'usage",
    title: "Pensée pour vos dépenses du quotidien",
    desc: "Une carte différente pour chaque besoin, pour garder le contrôle sur ce qui est débité.",
    items: [
      { title: "Abonnements", desc: "Netflix, Spotify, Canva, ChatGPT : une carte dédiée par abonnement." },
      { title: "Publicité en ligne", desc: "Meta Ads, Google Ads, TikTok : alimentez la carte au budget prévu." },
      { title: "Achats internationaux", desc: "Payez vos fournisseurs et vos commandes sur les sites étrangers." },
      { title: "Outils SaaS", desc: "Hébergement, licences et logiciels facturés au mois pour votre entreprise." },
    ],
  },
  security: {
    eyebrow: "Sécurité",
    title: "Vous gardez la main sur chaque paiement",
    desc: "Chaque opération est notifiée et chaque carte reste sous votre contrôle, du plafond au blocage.",
    items: [
      { icon: "ShieldCheck", title: "3-D Secure", desc: "Confirmation des paiements sensibles par code, directement dans l'application." },
      { icon: "Bell", title: "Notifications en temps réel", desc: "Une alerte à chaque débit, avec le marchand et le montant." },
      { icon: "EyeOff", title: "Numéros masqués", desc: "Le vrai numéro de votre compte n'est jamais communiqué au marchand." },
      { icon: "History", title: "Historique détaillé", desc: "Retrouvez chaque transaction par carte, exportable quand vous voulez." },
    ],
  },
  fees: {
    eyebrow: "Frais",
    title: "Des frais simples et annoncés",
    rows: [
      { label: "Création d'une carte virtuelle", value: "1 $" },
      { label: "Rechargement de la carte", value: "1,5 %" },
      { label: "Paiement en ligne", value: "0 $" },
      { label: "Conversion de devise", value: "1 %" },
    ],
    note: "Tarifs indicatifs : le détail s'affiche avant chaque opération dans votre tableau de bord.",
    networksLabel: "Réseaux disponibles",
  },
  coverage: {
    eyebrow: "Couverture",
    title: "Créez votre carte depuis toute l'Afrique",
    desc: "Alimentez votre carte avec le Mobile Money de votre pays et payez en dollars sur les sites du monde entier.",
    providersLabel: "Rechargement via",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Ai-je besoin d'un compte bancaire ?",
        a: "Non. Votre wallet Reemite suffit : vous l'alimentez par Mobile Money, chez un agent ou par virement.",
      },
      {
        q: "Puis-je créer plusieurs cartes ?",
        a: "Oui. Vous pouvez créer une carte par abonnement, par projet ou par collaborateur, et les supprimer quand vous voulez.",
      },
      {
        q: "Dans quelle devise sont les cartes ?",
        a: "Les cartes sont libellées en dollars américains, avec une conversion claire depuis votre solde en monnaie locale.",
      },
      {
        q: "Que se passe-t-il si un paiement est refusé ?",
        a: "Vérifiez le solde de la carte et son plafond dans le tableau de bord. Si le problème persiste, le support répond par WhatsApp.",
      },
    ],
  },
  cta: {
    title: "Créez votre carte virtuelle maintenant",
    desc: "Ouvrez un compte, alimentez votre wallet et générez votre première carte en quelques minutes.",
    primary: "Créer ma carte",
    secondary: "Nous écrire sur WhatsApp",
  },
};

// ---------------------------------------------------------------------------
// Page Cryptomonnaies
// ---------------------------------------------------------------------------
export type CryptoAsset = {
  id: string;
  symbol: string;
  name: string;
  color: string;
  logo: string;
  stable: boolean;
  network?: string;
  // Valeurs de repli si l'API de cours n'est pas joignable (mises à jour le 12/09/2026)
  fallbackPrice: number;
  fallbackChange: number;
};

export const cryptoCoins: CryptoAsset[] = [
  {
    id: "tether",
    symbol: "USDT",
    name: "Tether USD",
    color: "#26A17B",
    logo: "/assets/icons/crypto/usdt.svg",
    stable: true,
    network: "TRC20 · ERC20",
    fallbackPrice: 0.9998,
    fallbackChange: 0.02,
  },
  {
    id: "usd-coin",
    symbol: "USDC",
    name: "USD Coin",
    color: "#2775CA",
    logo: "/assets/icons/crypto/usdc.svg",
    stable: true,
    network: "ERC20 · Solana",
    fallbackPrice: 0.9999,
    fallbackChange: 0.01,
  },
  {
    id: "dai",
    symbol: "DAI",
    name: "Dai",
    color: "#F5AC37",
    logo: "/assets/icons/crypto/dai.svg",
    stable: true,
    network: "ERC20",
    fallbackPrice: 0.9998,
    fallbackChange: -0.01,
  },
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    color: "#F7931A",
    logo: "/assets/icons/crypto/btc.svg",
    stable: false,
    fallbackPrice: 77334,
    fallbackChange: 0.11,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    color: "#627EEA",
    logo: "/assets/icons/crypto/eth.svg",
    stable: false,
    fallbackPrice: 2532.43,
    fallbackChange: 2.4,
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "BNB",
    color: "#F3BA2F",
    logo: "/assets/icons/crypto/bnb.svg",
    stable: false,
    fallbackPrice: 734.91,
    fallbackChange: 3.08,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    color: "#14F195",
    logo: "/assets/icons/crypto/sol.svg",
    stable: false,
    fallbackPrice: 101.87,
    fallbackChange: 2.13,
  },
  {
    id: "tron",
    symbol: "TRX",
    name: "TRON",
    color: "#EF0027",
    logo: "/assets/icons/crypto/trx.svg",
    stable: false,
    fallbackPrice: 0.3395,
    fallbackChange: 0.22,
  },
];

export const cryptoPage = {
  hero: {
    eyebrow: "Cryptomonnaies",
    title: "Achetez, conservez et dépensez vos cryptos",
    titleAccent: "depuis votre wallet",
    subtitle:
      "Convertissez votre Mobile Money en Bitcoin, Ethereum ou stablecoins, et revenez en monnaie locale quand vous le souhaitez.",
  },
  market: {
    eyebrow: "Marché",
    title: "Les actifs disponibles sur Reemite",
    subtitle: "Achetez à partir de 1 $, sans passer par un compte bancaire étranger.",
    stableTitle: "Stablecoins",
    stableSubtitle:
      "Indexés sur le dollar américain : la valeur reste stable, même quand la monnaie locale bouge.",
    pegLabel: "Indexé 1:1 sur le dollar",
    othersTitle: "Autres actifs",
    priceLabel: "Prix",
    change24h: "24 h",
    liveLabel: "Cours en direct",
    updatedLabel: "Mis à jour",
    sourceLabel: "Source : CoinGecko",
    offlineNote:
      "Cours de référence affichés : la connexion au flux de prix n'a pas abouti.",
    note: "Le cours exact, frais inclus, s'affiche avant la validation de chaque ordre.",
  },
  features: {
    title: "Une porte d'entrée simple vers la crypto",
    subtitle:
      "Tout se fait depuis le même compte : achat, vente, échange et retrait vers le Mobile Money.",
    items: [
      {
        icon: "ArrowLeftRight",
        title: "Achat & vente instantanés",
        desc: "Payez en Mobile Money ou avec votre solde Reemite et recevez vos cryptos en quelques secondes.",
      },
      {
        icon: "Repeat",
        title: "Swap entre actifs",
        desc: "Échangez BTC, ETH, USDT ou USDC entre eux, sans quitter l'application.",
      },
      {
        icon: "ShieldCheck",
        title: "Stablecoins protégés",
        desc: "Mettez votre épargne à l'abri de la dépréciation en la convertissant en USDT ou USDC.",
      },
      {
        icon: "Smartphone",
        title: "Retrait vers Mobile Money",
        desc: "Revendez vos cryptos et récupérez votre argent sur M-Pesa, Orange Money, MTN ou Airtel.",
      },
      {
        icon: "Send",
        title: "Envoi à un proche",
        desc: "Transférez des cryptos vers un autre wallet Reemite ou une adresse externe.",
      },
      {
        icon: "CreditCard",
        title: "Dépense par carte",
        desc: "Convertissez en dollars et alimentez votre carte virtuelle pour payer en ligne.",
      },
    ],
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "Votre premier achat en 3 étapes",
    items: [
      {
        title: "Vérifiez votre identité",
        desc: "Un KYC rapide avec votre pièce d'identité, une seule fois.",
      },
      {
        title: "Alimentez votre wallet",
        desc: "Mobile Money, dépôt chez un agent ou virement : votre solde est prêt en quelques minutes.",
      },
      {
        title: "Passez votre ordre",
        desc: "Choisissez l'actif et le montant : la crypto arrive immédiatement dans votre wallet.",
      },
    ],
  },
  stablecoins: {
    eyebrow: "Stablecoins",
    title: "Protégez votre épargne de la dévaluation",
    desc: "En convertissant une partie de votre solde en USDT ou USDC, vous gardez la valeur en dollars tout en restant libre de revenir en monnaie locale à tout moment.",
    items: [
      { title: "Indexé sur le dollar", desc: "1 USDT ou 1 USDC vaut environ 1 dollar américain." },
      { title: "Disponible à tout moment", desc: "Aucune période de blocage : reconvertissez quand vous voulez." },
      { title: "Transfert instantané", desc: "Envoyez des stablecoins à un proche en quelques secondes." },
      { title: "Accepté partout", desc: "Utilisez-les pour payer des fournisseurs ou alimenter une carte." },
    ],
    photo:
      "/assets/images/phone-card-crypto.jpg",
  },
  security: {
    eyebrow: "Sécurité",
    title: "Vos fonds, protégés à chaque étape",
    desc: "Conservation sécurisée, contrôles anti-fraude et validation de chaque opération sensible.",
    items: [
      { icon: "Lock", title: "Conservation sécurisée", desc: "La majorité des actifs est gardée hors ligne, en stockage à froid." },
      { icon: "BadgeCheck", title: "KYC & conformité", desc: "Vérification d'identité et contrôles AML sur chaque compte." },
      { icon: "Bell", title: "Alertes en temps réel", desc: "Notification à chaque ordre, retrait ou tentative de connexion." },
      { icon: "KeyRound", title: "Double authentification", desc: "Confirmez les opérations sensibles par code avant exécution." },
    ],
  },
  fees: {
    eyebrow: "Frais",
    title: "Des frais lisibles, affichés avant l'ordre",
    rows: [
      { label: "Achat de crypto", value: "1 %" },
      { label: "Vente vers Mobile Money", value: "1 %" },
      { label: "Swap entre actifs", value: "0,5 %" },
      { label: "Conservation dans le wallet", value: "0 $" },
    ],
    note: "Les frais de réseau (blockchain) sur les envois externes s'ajoutent et sont affichés avant validation.",
    providersLabel: "Achat et retrait via",
  },
  risk: {
    title: "Investir comporte un risque",
    desc: "Les cryptomonnaies sont volatiles : leur valeur peut fortement baisser. N'investissez que ce que vous pouvez vous permettre de perdre. Les stablecoins dépendent de leur émetteur.",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Quel est le montant minimum ?",
        a: "Vous pouvez acheter à partir de 1 $ d'équivalent, payé en Mobile Money ou depuis votre solde Reemite.",
      },
      {
        q: "Puis-je retirer en monnaie locale ?",
        a: "Oui. Vendez votre crypto dans l'application et récupérez le montant sur votre Mobile Money ou chez un agent Reemite.",
      },
      {
        q: "Qui garde mes cryptos ?",
        a: "Vos actifs sont conservés par Reemite, majoritairement en stockage à froid, et restent disponibles à la vente ou au retrait à tout moment.",
      },
      {
        q: "Puis-je envoyer vers un wallet externe ?",
        a: "Oui, vers une adresse compatible. Les frais de réseau s'affichent avant la confirmation de l'envoi.",
      },
    ],
  },
  cta: {
    title: "Commencez avec 1 $",
    desc: "Créez votre compte, vérifiez votre identité et achetez votre première crypto dès aujourd'hui.",
    primary: "Créer mon compte",
    secondary: "Nous écrire sur WhatsApp",
  },
};

// ---------------------------------------------------------------------------
// Page Paiement marchand
// ---------------------------------------------------------------------------
export const merchantPage = {
  hero: {
    eyebrow: "Paiement marchand",
    title: "Encaissez vos ventes",
    titleAccent: "sans terminal bancaire",
    subtitle:
      "QR code, lien de paiement ou page boutique : vos clients paient par Mobile Money, carte ou solde Reemite, et vous êtes crédité en temps réel.",
    photo: "/assets/images/merchant-hero.webp",
  },
  channels: {
    title: "Trois façons d'encaisser, une seule caisse",
    subtitle:
      "Choisissez ce qui colle à votre activité : en boutique, sur WhatsApp ou sur votre site.",
    items: [
      {
        icon: "QrCode",
        title: "QR code en boutique",
        desc: "Affichez votre QR près de la caisse : le client scanne, saisit le montant et vous recevez une confirmation.",
      },
      {
        icon: "Link2",
        title: "Lien de paiement",
        desc: "Envoyez un lien par WhatsApp ou SMS pour vous faire payer à distance, sans site web.",
      },
      {
        icon: "Store",
        title: "Page boutique",
        desc: "Créez une page avec vos produits et vos prix, partageable en un lien.",
      },
      {
        icon: "FileText",
        title: "Factures",
        desc: "Émettez une facture professionnelle et suivez son règlement en temps réel.",
      },
      {
        icon: "Repeat",
        title: "Abonnements",
        desc: "Encaissez automatiquement vos clients récurrents, chaque mois, sans relance.",
      },
      {
        icon: "Code",
        title: "API & plugins",
        desc: "Intégrez l'encaissement à votre site ou à votre application avec nos APIs.",
      },
    ],
  },
  qr: {
    eyebrow: "QR code",
    title: "Le client scanne, vous êtes payé",
    desc: "Pas de terminal à louer, pas de papier à imprimer chaque jour : un seul QR suffit pour toutes vos ventes.",
    items: [
      { title: "Affichez votre QR", desc: "Sur le comptoir, la vitrine ou l'écran de votre téléphone." },
      { title: "Le client scanne", desc: "Depuis Reemite ou son application Mobile Money habituelle." },
      { title: "Confirmation immédiate", desc: "Vous et votre caissier recevez la notification au même moment." },
      { title: "Solde crédité", desc: "L'argent arrive dans votre wallet, prêt à être retiré ou réutilisé." },
    ],
    photo: "/assets/images/merchant-qr.webp",
  },
  steps: {
    eyebrow: "Démarrer",
    title: "Votre caisse prête en 3 étapes",
    items: [
      {
        title: "Créez votre compte marchand",
        desc: "Inscription avec votre numéro, puis vérification d'identité de votre commerce.",
      },
      {
        title: "Générez votre QR et vos liens",
        desc: "Depuis le tableau de bord, en quelques secondes et sans frais.",
      },
      {
        title: "Encaissez et suivez",
        desc: "Chaque vente apparaît dans votre historique, avec le moyen de paiement utilisé.",
      },
    ],
  },
  manage: {
    eyebrow: "Gestion",
    title: "Gardez l'œil sur votre caisse",
    desc: "Un tableau de bord pensé pour le commerce : ce qui rentre, qui a encaissé, et ce qu'il reste à retirer.",
    items: [
      { icon: "BarChart3", title: "Ventes du jour", desc: "Suivez votre chiffre en direct, par jour, par semaine ou par mois." },
      { icon: "Users", title: "Caissiers", desc: "Donnez un accès à vos employés et voyez qui a encaissé quoi." },
      { icon: "Download", title: "Exports", desc: "Exportez vos transactions pour votre comptabilité." },
      { icon: "Bell", title: "Notifications", desc: "Une alerte à chaque encaissement, pour vous et votre équipe." },
    ],
    photo: "/assets/images/merchant-shop.webp",
  },
  fees: {
    eyebrow: "Frais",
    title: "Une commission claire par encaissement",
    rows: [
      { label: "Encaissement QR / lien", value: "1 %" },
      { label: "Encaissement Mobile Money", value: "1,5 %" },
      { label: "Encaissement par carte", value: "2,5 %" },
      { label: "Retrait vers Mobile Money ou agent", value: "1 %" },
    ],
    note: "Aucun abonnement ni frais d'ouverture : vous ne payez que lorsque vous encaissez.",
    providersLabel: "Vos clients paient avec",
  },
  testimonial: {
    quote:
      "Avant, je notais les ventes dans un cahier et je courais après la monnaie. Aujourd'hui, le client scanne le QR et je vois le paiement arriver tout de suite.",
    name: "M. Nsimba",
    role: "Commerçante, marché de Kinshasa",
    photo: "/assets/images/merchant-vendor.webp",
  },
  faq: {
    title: "Questions des marchands",
    items: [
      {
        q: "Faut-il un terminal de paiement ?",
        a: "Non. Un simple téléphone suffit : le QR code et les liens de paiement remplacent le terminal bancaire.",
      },
      {
        q: "Quand suis-je crédité ?",
        a: "Immédiatement. Le montant arrive sur votre solde marchand dès la confirmation du paiement par le client.",
      },
      {
        q: "Mes clients doivent-ils avoir Reemite ?",
        a: "Non. Ils peuvent payer depuis leur application Mobile Money habituelle, par carte ou depuis leur wallet Reemite.",
      },
      {
        q: "Puis-je avoir plusieurs points de vente ?",
        a: "Oui. Créez un QR par boutique ou par caissier et suivez les encaissements séparément dans le tableau de bord.",
      },
    ],
  },
  cta: {
    title: "Ouvrez votre compte marchand",
    desc: "Créez votre compte, générez votre QR et encaissez votre première vente aujourd'hui.",
    primary: "Créer mon compte marchand",
    secondary: "Nous écrire sur WhatsApp",
  },
};
