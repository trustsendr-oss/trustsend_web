export type MockupVariant =
  | "payments"
  | "banking"
  | "payroll"
  | "payouts"
  | "checkout";

export const navLinks = [
  { label: "Paiements", href: "#paiements" },
  { label: "Transferts", href: "#transferts" },
  { label: "Épargne & Jeux", href: "#epargne" },
  { label: "Partenaires", href: "#partenaires" },
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
            desc: "Émettez des cartes Visa/Mastercard virtuelles pour vos paiements en ligne, en quelques secondes.",
            icon: "/assets/icons/products/capital.svg",
          },
          {
            label: "Cryptomonnaies",
            desc: "Achetez, conservez et dépensez vos cryptos directement depuis votre wallet Reemite.",
            icon: "/assets/icons/products/x.svg",
          },
          {
            label: "Paiement Marchand",
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
            desc: "Toute la documentation pour intégrer paiements, transferts et cartes virtuelles.",
            icon: "/assets/icons/develop/api.svg",
          },
          {
            label: "Webhooks",
            desc: "Recevez des notifications en temps réel pour chaque transaction.",
            icon: "/assets/icons/develop/docs.svg",
          },
          {
            label: "Environnement Sandbox",
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

export const noCodeExamples = [
  { title: "Lien de frais scolaires", subtitle: "Collectez les frais de scolarité en un lien, sans site web" },
  { title: "Page boutique", subtitle: "Vendez vos produits avec une page de paiement personnalisée" },
  { title: "Lien de cotisation Likelemba", subtitle: "Faites cotiser votre groupe d'épargne en un clic" },
  { title: "Page d'abonnement", subtitle: "Vendez des abonnements récurrents sans code" },
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

export const footerColumns: { title: string; links: { label: string; badge?: string }[] }[] = [
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
    links: [{ label: "Documentation" }, { label: "Intégrations" }, { label: "Référence API" }],
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
