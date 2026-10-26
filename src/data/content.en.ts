import type { MockupVariant, NavMegaMenu } from "./content.fr";

export const navLinks = [
  { label: "Payments", href: "#payments" },
  { label: "Transfers", href: "/transferts-internationaux" },
  // { label: "Savings & Games", href: "#savings" },
  { label: "Partners", href: "#partners" },
  { label: "Pricing", href: "/pricing" },

];

export const navMegaMenus: Record<string, NavMegaMenu> = {
  Payments: {
    columns: [
      {
        heading: "Collect",
        items: [
          {
            label: "Virtual Cards",
            href: "/cartes-virtuelles",
            desc: "Issue virtual Visa/Mastercard cards for your online payments, in seconds.",
            icon: "/assets/icons/products/capital.svg",
          },
          {
            label: "Cryptocurrencies",
            href: "/cryptomonnaies",
            desc: "Buy, hold and spend crypto directly from your Reemite wallet.",
            icon: "/assets/icons/products/x.svg",
          },
          {
            label: "Merchant Payments",
            href: "/paiement-marchand",
            desc: "Collect in-store sales with a QR code or a shareable payment link.",
            icon: "/assets/icons/products/paymentpages.svg",
          },
        ],
      },
      {
        heading: "Recurring billing",
        items: [
          {
            label: "Subscriptions",
            desc: "Automate recurring billing for your SaaS or media customers.",
            icon: "/assets/icons/products/subscriptions.svg",
          },
          {
            label: "School fees",
            desc: "Collect school fees online and track every payment in real time.",
            icon: "/assets/icons/products/invoices.svg",
          },
          {
            label: "Invoices & Bills",
            desc: "Generate invoices and get paid in one click.",
            icon: "/assets/icons/products/paymentlinks.svg",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "New",
      heading: "Reemite Virtual Cards",
      desc: "Create a virtual card in seconds for all your online payments.",
      cta: "Discover cards",
      icon: "/assets/icons/products/capital.svg",
    },
  },

  Transfers: {
    columns: [
      {
        heading: "Send money",
        items: [
          {
            label: "Local Transfer",
            desc: "Send funds instantly to any Reemite wallet.",
            icon: "/assets/icons/products/route.svg",
          },
          {
            label: "International Transfer",
            href: "/transferts-internationaux",
            desc: "Send and receive money from abroad, as simply as Wave.",
            icon: "/assets/icons/products/capital.svg",
          },
          {
            label: "Wallet to Wallet Swap",
            desc: "Exchange funds between two Reemite wallets instantly.",
            icon: "/assets/icons/products/x.svg",
          },
        ],
      },
      {
        heading: "Cash In / Cash Out",
        items: [
          {
            label: "Agent Deposit",
            href: "/agents",
            desc: "Deposit cash at a Reemite agent near you.",
            icon: "/assets/icons/products/smartcollect.svg",
          },
          {
            label: "Mobile Money Deposit",
            desc: "Top up your wallet directly from your Mobile Money account.",
            icon: "/assets/icons/products/paymentlinks.svg",
          },
          {
            label: "Agent & Mobile Money Withdrawal",
            href: "/agents",
            desc: "Withdraw your money as cash at an agent or via Mobile Money.",
            icon: "/assets/icons/products/route.svg",
          },
        ],
      },
    ],
    promo: {
      kind: "quote",
      heading: "",
      desc: "Sending money to my family used to take days. With Reemite transfers, it arrives in seconds, just like Wave.",
      cta: "Send now",
      quote: { name: "N. Gitau", title: "Customer", company: "Diaspora" },
    },
  },

  "Savings & Games": {
    columns: [
      {
        heading: "Save",
        items: [
          {
            label: "Digital Likelemba",
            desc: "Create or join a digital savings circle and save as a group, fully transparently.",
            icon: "/assets/icons/products/capital.svg",
          },
          {
            label: "Savings Goals",
            desc: "Set a goal and let Reemite set money aside for you.",
            icon: "/assets/icons/products/capital.svg",
          },
          {
            label: "Locked Savings",
            desc: "Lock funds for a chosen period so you're not tempted to spend them.",
            icon: "/assets/icons/products/invoices.svg",
          },
        ],
      },
      {
        heading: "BGame",
        items: [
          {
            label: "Mini-games & Rewards",
            desc: "Play, earn bonuses, and boost your savings with BGame.",
            icon: "/assets/icons/products/x.svg",
          },
          {
            label: "Community Pot",
            desc: "Join community pots and try to win the shared jackpot.",
            icon: "/assets/icons/products/x-club.svg",
          },
          {
            label: "Loyalty Program",
            desc: "Earn points on every transaction and unlock rewards.",
            icon: "/assets/icons/products/subscriptions.svg",
          },
        ],
      },
    ],
    promo: {
      eyebrow: "BGame",
      heading: "Play, save, win",
      desc: "The game that rewards your loyalty and gives your savings a boost with every transaction.",
      cta: "Discover BGame",
      icon: "/assets/icons/products/x.svg",
    },
  },

  Partners: {
    columns: [
      {
        heading: "Agent network",
        items: [
          {
            label: "Become an Agent",
            href: "/agents",
            desc: "Join the Reemite agent network and earn a commission on every deposit and withdrawal.",
            icon: "/assets/icons/products/route.svg",
          },
          {
            label: "Referral Program",
            desc: "Refer Reemite to merchants and earn on every transaction.",
            icon: "/assets/icons/products/capital.svg",
          },
        ],
      },
      {
        heading: "Developers",
        items: [
          {
            label: "API Documentation",
            href: "https://docs.trustsend.africa",
            desc: "All the documentation to integrate payments, transfers and virtual cards.",
            icon: "/assets/icons/develop/api.svg",
          },
          {
            label: "Webhooks",
            desc: "Get real-time notifications for every transaction.",
            icon: "/assets/icons/develop/docs.svg",
          },
          {
            label: "Sandbox Environment",
            href: "https://sandbox.reemite.com/signup",
            desc: "Test your integration with mock data before going live.",
            icon: "/assets/icons/develop/integrations.svg",
          },
        ],
      },
    ],
    promo: {
      kind: "code",
      heading: "Built for developers",
      desc: "Integrate cards, payments and transfers in an afternoon with our SDKs.",
      cta: "Read the docs",
      code: `const Reemite = require("Reemite")(apiKey);

const transfer = await Reemite.transfers.create({
  amount: 50,
  currency: "USD",
  destination: "wallet_98213",
});`,
    },
  },
};

export const heroCapabilities: { label: string; variant: MockupVariant }[] = [
  { label: "Pay your subscriptions", variant: "payments" },
  { label: "Save with Likelemba", variant: "payroll" },
  { label: "Transfer locally and internationally", variant: "payouts" },
  { label: "Manage your virtual card", variant: "checkout" },
  { label: "Withdraw at an agent", variant: "banking" },
];

export const heroSpotlight = {
  eyebrow: "The business API that connects it all",
  heading: "cards, cash, mobile money and crypto",
  subline: "Virtual Cards | Wave-style Transfers | Agent Withdrawal & Deposit | Likelemba | BGame",
  appName: "La Sagesse School",
  productLabel: "School fees — Term 2",
  price: "$45",
  attribution: "Management, La Sagesse School",
  signature: "Aïcha",
};

export const recommendationChips = [
  "Send money",
  "Withdraw at an agent",
  "Open a virtual card",
  "Save (Likelemba)",
  "Buy crypto",
  "Play on BGame",
];

export const paymentMethods = [
  { name: "Visa", src: "/assets/icons/payment-modes/visa.png" },
  { name: "Mastercard", src: "/assets/icons/payment-modes/mastercard.png" },
  { name: "Bank transfer", src: "/assets/icons/payment-modes/netbanking.png" },
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
  { icon: "Wallet", label: "An account with no deposit or withdrawal fees" },
  { icon: "Percent", label: "Money transfers for just 1%" },
  { icon: "Receipt", label: "Fee-free bill payments" },
  { icon: "Card", label: "A virtual card for just $5" },
  { icon: "Savings", label: "Group savings with Likelemba" },
  { icon: "ShieldCheck", label: "Security to international standards" },
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
    label: "Virtual Cards",
    badge: "new",
    heading: "Virtual Cards",
    description:
      "Issue virtual Visa/Mastercard cards in seconds for your own online payments and your team's.",
    bullets: [
      { label: "Instant issuance", desc: "Create a virtual card straight from your dashboard, no waiting." },
      { label: "Limits & control", desc: "Set spending limits and freeze a card in one click." },
    ],
    variant: "checkout",
    icon: "/assets/icons/products/capital.svg",
  },
  {
    id: "cryptos-swap",
    label: "Crypto & Swap",
    heading: "Cryptocurrencies & Swap",
    description:
      "Manage your digital assets and exchange funds between Reemite wallets, without going through a bank.",
    bullets: [
      { label: "Crypto wallet", desc: "Buy, hold and convert your crypto at the best market rate." },
      { label: "Wallet to Wallet Swap", desc: "Instantly transfer funds from one Reemite wallet to another." },
    ],
    variant: "payments",
    icon: "/assets/icons/products/x.svg",
  },
  {
    id: "paiements",
    label: "Payments",
    heading: "Payments & Collections",
    description: "Collect subscriptions, school fees and in-store sales from a single platform.",
    bullets: [
      { label: "Subscriptions", desc: "Automate recurring billing for your SaaS or media customers." },
      { label: "School fees", desc: "Collect school fees online and track every payment in real time." },
      { label: "Merchant Payments", desc: "Collect in-store with a QR code or a shareable payment link." },
    ],
    variant: "payments",
    icon: "/assets/icons/products/paymentpages.svg",
  },
  {
    id: "transferts",
    label: "Transfers",
    heading: "Local & International Transfers",
    description: "Send money instantly, at home or abroad, as simply as Wave.",
    bullets: [
      { label: "Local Transfer", desc: "Send funds instantly to any Reemite wallet." },
      { label: "International Transfer", desc: "Send and receive money from abroad with no hidden fees." },
    ],
    variant: "payouts",
    icon: "/assets/icons/products/route.svg",
  },
  {
    id: "retrait-depot",
    label: "Withdraw & Deposit",
    heading: "Withdraw & Deposit",
    description: "Convert your digital money to cash and back, at an agent or via Mobile Money.",
    bullets: [
      { label: "Agent network", desc: "Deposit or withdraw cash at a Reemite agent near you." },
      { label: "Mobile Money", desc: "Top up or withdraw directly from your Mobile Money account." },
    ],
    variant: "banking",
    icon: "/assets/icons/products/capital.svg",
  },
  {
    id: "epargne-bgame",
    label: "Savings & BGame",
    heading: "Savings (Likelemba) & BGame",
    description: "Save as a group the way a savings circle works, and boost your savings by playing BGame.",
    bullets: [
      { label: "Digital Likelemba", desc: "Create or join a digital savings circle and track every contribution transparently." },
      { label: "BGame", desc: "Play, earn bonuses, and give your savings a boost." },
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
    name: "Merchants",
    headingLead: "Collect your sales",
    headingHighlight: "in-store and online",
    blurb: "Accept cards, Mobile Money and QR codes from a single platform.",
    detail:
      "Create payment links and sales pages, and accept payments from your customers in-store and online, no code required.",
    count: "+ 12,000 merchants",
    icon: "/assets/icons/products/paymentpages.svg",
    photo:
      "/assets/images/industry-merchants.webp",
    logos: ["Nova", "Loopay", "Bluewave"],
  },
  {
    name: "Schools",
    headingLead: "Simplify",
    headingHighlight: "school fees",
    blurb: "Collect payments from parents and track every payment in real time.",
    detail:
      "Set up school fee collection in minutes, with or without a website, and track every payment from a single dashboard.",
    count: "+ 300 institutions",
    icon: "/assets/icons/products/invoices.svg",
    photo:
      "/assets/images/industry-schools.webp",
    logos: ["Orbit", "Vantik", "Northstar"],
  },
  {
    name: "Diaspora",
    headingLead: "Send money to your",
    headingHighlight: "family, wherever they are",
    blurb: "Instant international transfers to any Reemite wallet.",
    detail:
      "Send money from abroad in seconds, with transparent fees and a clear exchange rate, as simply as Wave.",
    count: "+ 2,800 families connected",
    icon: "/assets/icons/products/capital.svg",
    photo:
      "/assets/images/industry-diaspora.webp",
    logos: ["Fintra", "Corelink", "Meridian"],
  },
  {
    name: "Agents",
    headingLead: "Grow your business as a",
    headingHighlight: "Reemite agent",
    blurb: "Earn a commission on every deposit and withdrawal at your point of sale.",
    detail:
      "Join the Reemite agent network, process your customers' deposits and withdrawals, and get your commission automatically.",
    count: "+ 5,000 active agents",
    icon: "/assets/icons/products/route.svg",
    photo:
      "/assets/images/industry-agents.webp",
    logos: ["Zenpay", "Cobalt", "Driftly"],
  },
  {
    name: "Savings groups",
    headingLead: "Digitize your",
    headingHighlight: "Likelemba",
    blurb: "Run a digital savings circle with your loved ones, fully transparently.",
    detail:
      "Create a group, invite its members, track every contribution, and unlock the collective savings in turn, no notebook or disputes.",
    count: "+ 45,000 members",
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
    name: "Multi-Currency Wallet",
    stat: "Manage cash, Mobile Money and crypto in a single wallet, available in over 15 countries.",
    description: "One wallet to manage everything, from cash to crypto.",
    variant: "banking",
  },
];

export const devCards = [
  {
    title: "Integrations",
    desc: "Ready-to-use SDKs and plugins to integrate virtual cards, transfers and Mobile Money in a few lines.",
    icon: "/assets/icons/develop/integrations.svg",
  },
  {
    title: "API Reference",
    desc: "Complete documentation to connect payments, transfers, withdrawals/deposits and crypto to your product.",
    icon: "/assets/icons/develop/api.svg",
  },
  {
    title: "Webhooks",
    desc: "Get real-time notifications for every transaction, deposit, withdrawal or payment.",
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
    title: "Merchant QR code",
    subtitle: "Get paid in store: the customer scans, the money lands instantly",
  },
  {
    icon: "Send",
    title: "Mobile Money transfer",
    subtitle: "Send to M-Pesa, Orange Money, Airtel or MTN for just 1%",
  },
  {
    icon: "Receipt",
    title: "Bills & school fees",
    subtitle: "Water, power, TV, tuition: pay or collect them with no fees",
  },
  {
    icon: "Users",
    title: "Likelemba & group savings",
    subtitle: "Create your group, contribute and follow every round transparently",
  },
];

// Fictional testimonials illustrating how Reemite products are used (cards,
// Likelemba, agents, transfers). Names and companies are generic examples,
// not real customers.
export const testimonials: {
  quote: string;
  name: string;
  title: string;
  company: string;
}[] = [
  {
    quote:
      "With Reemite virtual cards, my online subscriptions never get blocked anymore. I manage them all from my phone.",
    name: "A. Kariuki",
    title: "Founder",
    company: "Boutique A",
  },
  {
    quote:
      "Our Likelemba used to run on WhatsApp and a notebook. With Reemite, every contribution is logged and no one can dispute it anymore.",
    name: "D. Mensah",
    title: "Group treasurer",
    company: "Group B",
  },
  {
    quote:
      "As a Reemite agent, I handle deposits and withdrawals all day. The commission lands automatically, no manual calculations.",
    name: "N. Achieng",
    title: "Reemite Agent",
    company: "Point C",
  },
  {
    quote:
      "I collect school fees through a payment link. No more queues on registration day.",
    name: "D. Rawat",
    title: "Principal",
    company: "School D",
  },
  {
    quote:
      "Sending money to my family abroad used to take days. With Reemite international transfers, it arrives in seconds.",
    name: "N. Gitau",
    title: "Customer",
    company: "Diaspora E",
  },
  {
    quote:
      "We integrated the Reemite API for paying our in-store and online orders in a week, cards and Mobile Money included.",
    name: "A. Njoroge",
    title: "Co-founder",
    company: "Commerce F",
  },
];

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What is Reemite?",
    answer:
      "Reemite is a business API that lets businesses and individuals issue virtual cards, accept payments, send and receive money, manage crypto, save as a group (Likelemba) and much more, from a single account.",
  },
  {
    question: "What services does Reemite offer?",
    answer:
      "Virtual cards, cryptocurrencies, payments (subscriptions, school fees, in-store sales), local and international transfers, withdrawal and deposit via agents or Mobile Money, wallet-to-wallet swap, Likelemba savings and BGame — all in one platform.",
  },
  {
    question: "How do Reemite virtual cards work?",
    answer:
      "Generate a virtual Visa or Mastercard in seconds from the app, with customizable limits and the ability to freeze it instantly.",
  },
  {
    question: "Can I buy and manage cryptocurrencies with Reemite?",
    answer:
      "Yes. The Reemite wallet lets you buy, hold and convert your crypto to cash, at the best market rate.",
  },
  {
    question: "How do I send money with Reemite?",
    answer:
      "Send funds instantly to any Reemite wallet, locally or internationally, as simply as Wave.",
  },
  {
    question: "How does withdrawal and deposit work?",
    answer:
      "Visit a Reemite agent near you, or use your Mobile Money account, to deposit or withdraw cash in minutes.",
  },
  {
    question: "What is Wallet to Wallet Swap?",
    answer:
      "Swap lets you instantly transfer funds between two Reemite wallets, without going through a bank.",
  },
  {
    question: "How does Likelemba savings work?",
    answer:
      "Create or join a digital savings circle with your friends or colleagues, track every contribution, and unlock the collective savings transparently.",
  },
  {
    question: "What is BGame?",
    answer:
      "BGame is our mini-games and rewards space: play, earn bonuses, and boost your savings with every transaction.",
  },
  {
    question: "Is Reemite safe and secure?",
    answer:
      "Yes. Reemite uses encryption and tokenisation so your sensitive data never travels in plain text, and every transaction is tracked.",
  },
  {
    question: "Is Reemite regulated?",
    answer:
      "Reemite operates as a licensed payment institution in each market where the platform is available.",
  },
  {
    question: "How do I become a Reemite agent?",
    answer:
      "Sign up from the app, complete verification of your point of sale, and start processing deposits and withdrawals within 48 hours.",
  },
  {
    question: "How do I integrate the Reemite API into my business?",
    answer:
      "Create a free developer account, generate your API keys in test mode, and follow our documentation to integrate payments, cards and transfers in a few hours.",
  },
];

export const footerColumns: {
  title: string;
  links: { label: string; badge?: string; href?: string }[];
}[] = [
  {
    title: "Payments",
    links: [
      { label: "Virtual Cards" },
      { label: "Merchant Payments" },
      { label: "Subscriptions" },
      { label: "School fees" },
      { label: "QR Code", badge: "NEW" },
      { label: "Payment Links" },
      { label: "Invoices" },
    ],
  },
  {
    title: "Savings & Games",
    links: [
      { label: "Digital Likelemba" },
      { label: "Savings Goals" },
      { label: "Locked Savings" },
      { label: "BGame" },
    ],
  },
  {
    title: "Become a Partner",
    links: [{ label: "Become an Agent" }, { label: "Referral Program" }, { label: "Agent API" }],
  },
  {
    title: "Transfers",
    links: [
      { label: "Local Transfer" },
      { label: "International Transfer" },
      { label: "Wallet to Wallet Swap" },
      { label: "Withdrawal" },
      { label: "Deposit" },
    ],
  },
  {
    title: "Cash & Mobile Money",
    links: [
      { label: "Agent Withdrawal" },
      { label: "Mobile Money Withdrawal" },
      { label: "Agent Deposit" },
      { label: "Mobile Money Deposit" },
      { label: "Multi-currency Wallet" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "https://docs.trustsend.africa" },
      { label: "Integrations" },
      { label: "API Reference", href: "https://docs.trustsend.africa" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog" },
      { label: "Guides" },
      { label: "Customer Stories" },
      { label: "Events" },
    ],
  },
  {
    title: "Our users",
    links: [
      { label: "Merchants" },
      { label: "Schools" },
      { label: "Diaspora" },
      { label: "Agents" },
      { label: "Savings groups" },
    ],
  },
  {
    title: "Free Tools",
    links: [
      { label: "Fee Calculator" },
      { label: "Crypto Converter" },
      { label: "Likelemba Simulator" },
      { label: "Payment Link Generator" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us" },
      { label: "Careers" },
      { label: "Terms of Service" },
      { label: "Privacy Policy" },
      { label: "Complaints" },
      { label: "Responsible Disclosure" },
    ],
  },
  {
    title: "Help & Support",
    links: [{ label: "Support" }, { label: "Help Center" }],
  },
];

// ---------------------------------------------------------------------------
// Agents page — Reemite cash-in / cash-out network
// ---------------------------------------------------------------------------
export const agentsPage = {
  hero: {
    eyebrow: "Reemite agent network",
    title: "Turn your shop into a",
    titleAccent: "Reemite cash point",
    subtitle:
      "Handle your customers' deposits and withdrawals, earn a commission on every operation and bring more people through your door, every single day.",
    ctaPrimary: "Become an agent",
    ctaSecondary: "Talk to an advisor",
    stats: [
      { value: "5,000+", label: "active agents" },
      { value: "24 h", label: "to get approved" },
      { value: "$0", label: "joining fee" },
    ],
  },
  benefits: {
    title: "Why become an agent",
    subtitle:
      "Extra income, with no upfront investment and no change to the way you already work.",
    items: [
      {
        icon: "Coins",
        title: "Commission on every operation",
        desc: "Deposit, withdrawal, transfer: your commission is calculated and credited automatically.",
      },
      {
        icon: "Users",
        title: "More footfall in your shop",
        desc: "Customers who come in to deposit or withdraw also buy your products.",
      },
      {
        icon: "Wallet",
        title: "Float always available",
        desc: "Top up your float by Mobile Money or bank transfer, any time, straight from the app.",
      },
      {
        icon: "ShieldCheck",
        title: "Secure operations",
        desc: "Every transaction is confirmed with a code and tracked in your history.",
      },
      {
        icon: "MapPin",
        title: "Visible on the map",
        desc: "Your outlet shows up in the app for every customer in the neighbourhood.",
      },
      {
        icon: "Headphones",
        title: "Dedicated agent support",
        desc: "A WhatsApp line reserved for agents, to unblock an operation within minutes.",
      },
    ],
  },
  steps: {
    eyebrow: "How it works",
    title: "An agent in 4 steps",
    subtitle: "No special equipment: a phone and your ID are all you need.",
    items: [
      {
        title: "Create your account",
        desc: "Sign up in a few minutes with your phone number.",
      },
      {
        title: "Verify your identity",
        desc: "Send your ID and your outlet details (KYC).",
      },
      {
        title: "Load your float",
        desc: "Fund your agent balance by Mobile Money, bank transfer or cash deposit.",
      },
      {
        title: "Serve your customers",
        desc: "Deposits, withdrawals and transfers: the commission lands on every confirmed operation.",
      },
    ],
  },
  earnings: {
    eyebrow: "Your earnings",
    title: "A clear commission, known upfront",
    desc: "You see what you earn before confirming an operation, and your running daily total in the agent dashboard.",
    rows: [
      { label: "Customer cash deposit", value: "0.8%" },
      { label: "Customer cash withdrawal", value: "1.0%" },
      { label: "Mobile Money withdrawal", value: "0.5%" },
      { label: "Account opening", value: "$1 / account" },
    ],
    note: "Rates shown are indicative and may vary by country and monthly volume.",
    providersLabel: "Top up your float with",
  },
  testimonial: {
    quote:
      "As a Reemite agent, I handle deposits and withdrawals all day long. The commission lands automatically, with no manual maths.",
    name: "J. Mwamba",
    role: "Reemite agent, Kinshasa",
  },
  faq: {
    title: "Agent questions",
    items: [
      {
        q: "Who can become a Reemite agent?",
        a: "Any adult running a shop or a regular commercial activity, with a valid ID document.",
      },
      {
        q: "Do I need starting capital?",
        a: "Joining is free. All you need is a float — cash and a Reemite balance to serve your customers.",
      },
      {
        q: "When is the commission paid?",
        a: "It is credited to your agent balance as soon as the customer confirms the operation. You can withdraw it any time.",
      },
      {
        q: "What if an operation gets stuck?",
        a: "Contact agent support on WhatsApp from the app: the line is reserved for agents and replies within minutes.",
      },
    ],
  },
  cta: {
    title: "Ready to open your cash point?",
    desc: "Sign up today, send your documents and start serving customers as soon as you are approved.",
    primary: "Become an agent",
    secondary: "Message us on WhatsApp",
  },
};

// ---------------------------------------------------------------------------
// International transfers page
// ---------------------------------------------------------------------------
export const transfersPage = {
  hero: {
    eyebrow: "International transfers",
    title: "Send money home,",
    titleAccent: "in minutes",
    subtitle:
      "To a Mobile Money number, a bank account or cash at an agent, with a clear rate and fees shown before you send.",
    ctaPrimary: "Send money",
    ctaSecondary: "See the fees",
    stats: [
      { value: "20+", label: "countries covered" },
      { value: "1%", label: "fees starting from" },
      { value: "< 5 min", label: "average delivery time" },
    ],
  },
  simulator: {
    eyebrow: "Estimator",
    title: "How much does your family receive?",
    desc: "Estimate the amount delivered in real time. The exact rate is confirmed before you send.",
    youSend: "You send",
    theyGet: "Your recipient gets",
    feeLabel: "Reemite fee",
    rateLabel: "Rate applied",
    deliveryLabel: "Estimated delivery",
    delivery: "under 5 minutes",
    note: "Indicative estimate: the final rate and fees are shown before confirmation.",
    cta: "Send now",
  },
  channels: {
    title: "Your recipient picks how to get paid",
    subtitle:
      "One transfer, several ways to collect the money — whatever is most convenient on the ground.",
    items: [
      {
        icon: "Smartphone",
        title: "Mobile Money",
        desc: "M-Pesa, Orange Money, MTN MoMo, Airtel Money: the money lands straight on the number.",
      },
      {
        icon: "Wallet",
        title: "Reemite wallet",
        desc: "Instant delivery into the wallet, ready to spend or save.",
      },
      {
        icon: "Landmark",
        title: "Bank account",
        desc: "Transfer to the main local banks, with no trip to a branch.",
      },
      {
        icon: "Store",
        title: "Cash at an agent",
        desc: "Cash pickup at one of the Reemite agents in the neighbourhood.",
      },
      {
        icon: "CreditCard",
        title: "Virtual card",
        desc: "Top up a virtual Visa/Mastercard for online purchases.",
      },
      {
        icon: "Bitcoin",
        title: "Cryptocurrencies",
        desc: "Convert and receive in stablecoins from your Reemite wallet.",
      },
    ],
  },
  steps: {
    eyebrow: "How it works",
    title: "Three steps, that's it",
    items: [
      {
        title: "Enter the amount",
        desc: "Pick the sending currency and the destination country: the delivered amount shows instantly.",
      },
      {
        title: "Add the recipient",
        desc: "Mobile Money number, bank account or Reemite ID — once, then saved for next time.",
      },
      {
        title: "Pay and track",
        desc: "Pay by card, bank transfer or Reemite balance and follow the transfer until delivery.",
      },
    ],
  },
  corridors: {
    eyebrow: "Corridors",
    title: "The most used routes",
    subtitle: "Corridors optimised for the diaspora, with a clear rate and fast delivery.",
    items: [
      { from: "France", to: "DR Congo", delay: "< 5 min", fee: "from 1%" },
      { from: "Belgium", to: "Rwanda", delay: "< 5 min", fee: "from 1%" },
      { from: "Canada", to: "Cameroon", delay: "< 10 min", fee: "from 1.2%" },
      { from: "United States", to: "Kenya", delay: "< 10 min", fee: "from 1.2%" },
      { from: "South Africa", to: "Zimbabwe", delay: "< 5 min", fee: "from 1%" },
      { from: "United Arab Emirates", to: "Nigeria", delay: "< 15 min", fee: "from 1.5%" },
    ],
    providersLabel: "Mobile Money delivery with",
  },
  trust: {
    eyebrow: "Security & compliance",
    title: "Every transfer is protected end to end",
    desc: "Your transfers are encrypted, tracked and screened for fraud, from payment through to delivery.",
    items: [
      { icon: "ShieldCheck", title: "End-to-end encryption", desc: "Data and operations protected to international standards." },
      { icon: "BadgeCheck", title: "KYC & compliance", desc: "Identity verification and AML checks on every corridor." },
      { icon: "Bell", title: "Real-time tracking", desc: "A notification at each step, for you and your recipient." },
      { icon: "Headphones", title: "Support 7 days a week", desc: "A team reachable on WhatsApp for any question about a transfer." },
    ],
    photo:
      "/assets/images/team-handshake.jpg",
  },
  testimonial: {
    quote:
      "Sending money to my family used to take days. With Reemite transfers, it arrives in seconds, just like Wave.",
    name: "N. Gitau",
    role: "Diaspora customer, London",
    photo:
      "/assets/images/team-laptop.jpg",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "What are the real fees?",
        a: "Fees start at 1% of the amount sent and depend on the corridor and payment method. The exact amount is shown before you confirm, with no surprise on arrival.",
      },
      {
        q: "How long does a transfer take?",
        a: "Most transfers to Mobile Money or a Reemite wallet arrive in under five minutes. Bank transfers can take up to one business day.",
      },
      {
        q: "Does my recipient need a Reemite account?",
        a: "No. They can receive straight to their Mobile Money, their bank account, or as cash at a Reemite agent.",
      },
      {
        q: "What is the sending limit?",
        a: "It depends on your verification level (KYC). Once your identity is fully verified, limits are raised automatically.",
      },
    ],
  },
  cta: {
    title: "Your first transfer in minutes",
    desc: "Create your account, add a recipient and send today, wherever your family is.",
    primary: "Create my account",
    secondary: "Message us on WhatsApp",
  },
};

export const transferCurrencies: { code: string; label: string; rate: number; symbol: string }[] = [
  { code: "CDF", label: "Congolese franc", rate: 2850, symbol: "FC" },
  { code: "KES", label: "Kenyan shilling", rate: 129, symbol: "KSh" },
  { code: "XAF", label: "CFA franc (CEMAC)", rate: 605, symbol: "FCFA" },
  { code: "XOF", label: "CFA franc (UEMOA)", rate: 605, symbol: "FCFA" },
  { code: "RWF", label: "Rwandan franc", rate: 1310, symbol: "FRw" },
  { code: "NGN", label: "Nigerian naira", rate: 1480, symbol: "₦" },
];

// ---------------------------------------------------------------------------
// Virtual cards page
// ---------------------------------------------------------------------------
export const virtualCardsPage = {
  hero: {
    eyebrow: "Virtual cards",
    title: "A Visa or Mastercard card",
    titleAccent: "in seconds",
    subtitle:
      "Create, top up and freeze your virtual cards from your Reemite account, for your online purchases and your team's.",
  },
  features: {
    title: "Everything you need to pay online",
    subtitle:
      "Cards built for subscriptions, international purchases and team spending.",
    items: [
      {
        icon: "Zap",
        title: "Instant issuance",
        desc: "Create a card from your dashboard and use it straight away.",
      },
      {
        icon: "Globe",
        title: "Accepted worldwide",
        desc: "Pay anywhere Visa and Mastercard are accepted, online and in apps.",
      },
      {
        icon: "SlidersHorizontal",
        title: "Limits & control",
        desc: "Set a limit per card, per day or per month, and change it any time.",
      },
      {
        icon: "Lock",
        title: "Freeze in one click",
        desc: "Freeze or delete a card instantly whenever something looks off.",
      },
      {
        icon: "Repeat",
        title: "Single-use or recurring",
        desc: "A burner card for one purchase, a dedicated card for each subscription.",
      },
      {
        icon: "Users",
        title: "Team cards",
        desc: "Give every team member a card and track spending in one place.",
      },
    ],
  },
  steps: {
    eyebrow: "How it works",
    title: "Your first card in 3 steps",
    items: [
      {
        title: "Top up your wallet",
        desc: "By Mobile Money, at an agent or by bank transfer, in dollars or local currency.",
      },
      {
        title: "Create the card",
        desc: "Pick the network, the currency and the limit: the card is generated right away.",
      },
      {
        title: "Pay online",
        desc: "Use the card number for your subscriptions, purchases and online ads.",
      },
    ],
  },
  useCases: {
    eyebrow: "Use cases",
    title: "Built for your everyday spending",
    desc: "A separate card for each need, so you stay in control of what gets charged.",
    items: [
      { title: "Subscriptions", desc: "Netflix, Spotify, Canva, ChatGPT: one dedicated card per subscription." },
      { title: "Online advertising", desc: "Meta Ads, Google Ads, TikTok: fund the card with the budget you planned." },
      { title: "International purchases", desc: "Pay your suppliers and your orders on foreign websites." },
      { title: "SaaS tools", desc: "Hosting, licences and software billed monthly for your business." },
    ],
  },
  security: {
    eyebrow: "Security",
    title: "You stay in control of every payment",
    desc: "Every operation is notified and every card stays under your control, from limits to freezing.",
    items: [
      { icon: "ShieldCheck", title: "3-D Secure", desc: "Sensitive payments confirmed by code, right inside the app." },
      { icon: "Bell", title: "Real-time notifications", desc: "An alert on every charge, with the merchant and the amount." },
      { icon: "EyeOff", title: "Masked numbers", desc: "Your real account number is never shared with the merchant." },
      { icon: "History", title: "Detailed history", desc: "Find every transaction per card, exportable whenever you need." },
    ],
  },
  fees: {
    eyebrow: "Fees",
    title: "Simple fees, stated upfront",
    rows: [
      { label: "Creating a virtual card", value: "$5" },
      { label: "Topping up the card", value: "1.5%" },
      { label: "Online payment", value: "$0" },
      { label: "Currency conversion", value: "1%" },
    ],
    note: "Indicative pricing: the breakdown is shown before each operation in your dashboard.",
    networksLabel: "Available networks",
  },
  coverage: {
    eyebrow: "Coverage",
    title: "Create your card from anywhere in Africa",
    desc: "Fund your card with your country's Mobile Money and pay in dollars on websites worldwide.",
    providersLabel: "Top up with",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Do I need a bank account?",
        a: "No. Your Reemite wallet is enough: top it up by Mobile Money, at an agent or by bank transfer.",
      },
      {
        q: "Can I create several cards?",
        a: "Yes. Create one card per subscription, per project or per team member, and delete them whenever you want.",
      },
      {
        q: "What currency are the cards in?",
        a: "Cards are denominated in US dollars, with a clear conversion from your local-currency balance.",
      },
      {
        q: "What if a payment is declined?",
        a: "Check the card balance and its limit in the dashboard. If it persists, support replies on WhatsApp.",
      },
    ],
  },
  cta: {
    title: "Create your virtual card now",
    desc: "Open an account, top up your wallet and generate your first card in minutes.",
    primary: "Create my card",
    secondary: "Message us on WhatsApp",
  },
};

// ---------------------------------------------------------------------------
// Cryptocurrencies page
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
    eyebrow: "Cryptocurrencies",
    title: "Buy, hold and spend crypto",
    titleAccent: "straight from your wallet",
    subtitle:
      "Turn your Mobile Money into Bitcoin, Ethereum or stablecoins, and switch back to local currency whenever you want.",
  },
  market: {
    eyebrow: "Market",
    title: "Assets available on Reemite",
    subtitle: "Buy from $1, with no foreign bank account needed.",
    stableTitle: "Stablecoins",
    stableSubtitle:
      "Pegged to the US dollar: the value stays steady, even when the local currency moves.",
    pegLabel: "Pegged 1:1 to the dollar",
    othersTitle: "Other assets",
    priceLabel: "Price",
    change24h: "24h",
    liveLabel: "Live prices",
    updatedLabel: "Updated",
    sourceLabel: "Source: CoinGecko",
    offlineNote: "Reference prices shown: the price feed could not be reached.",
    note: "The exact rate, fees included, is shown before you confirm each order.",
  },
  features: {
    title: "A simple on-ramp to crypto",
    subtitle:
      "Everything happens in the same account: buy, sell, swap and cash out to Mobile Money.",
    items: [
      {
        icon: "ArrowLeftRight",
        title: "Instant buy & sell",
        desc: "Pay by Mobile Money or from your Reemite balance and get your crypto in seconds.",
      },
      {
        icon: "Repeat",
        title: "Swap between assets",
        desc: "Exchange BTC, ETH, USDT or USDC with each other, without leaving the app.",
      },
      {
        icon: "ShieldCheck",
        title: "Protective stablecoins",
        desc: "Shelter your savings from devaluation by converting them into USDT or USDC.",
      },
      {
        icon: "Smartphone",
        title: "Cash out to Mobile Money",
        desc: "Sell your crypto and get the money on M-Pesa, Orange Money, MTN or Airtel.",
      },
      {
        icon: "Send",
        title: "Send to someone",
        desc: "Transfer crypto to another Reemite wallet or to an external address.",
      },
      {
        icon: "CreditCard",
        title: "Spend by card",
        desc: "Convert to dollars and top up your virtual card to pay online.",
      },
    ],
  },
  steps: {
    eyebrow: "How it works",
    title: "Your first purchase in 3 steps",
    items: [
      {
        title: "Verify your identity",
        desc: "A quick KYC with your ID document, once and for all.",
      },
      {
        title: "Top up your wallet",
        desc: "Mobile Money, an agent deposit or a bank transfer: your balance is ready in minutes.",
      },
      {
        title: "Place your order",
        desc: "Pick the asset and the amount: the crypto lands in your wallet right away.",
      },
    ],
  },
  stablecoins: {
    eyebrow: "Stablecoins",
    title: "Protect your savings from devaluation",
    desc: "By converting part of your balance into USDT or USDC, you hold the value in dollars while staying free to switch back to local currency at any time.",
    items: [
      { title: "Pegged to the dollar", desc: "1 USDT or 1 USDC is worth roughly one US dollar." },
      { title: "Available any time", desc: "No lock-up period: convert back whenever you want." },
      { title: "Instant transfer", desc: "Send stablecoins to someone in seconds." },
      { title: "Accepted everywhere", desc: "Use them to pay suppliers or to fund a card." },
    ],
    photo:
      "/assets/images/phone-card-crypto.jpg",
  },
  security: {
    eyebrow: "Security",
    title: "Your funds, protected at every step",
    desc: "Secure custody, anti-fraud checks and confirmation on every sensitive operation.",
    items: [
      { icon: "Lock", title: "Secure custody", desc: "Most assets are kept offline, in cold storage." },
      { icon: "BadgeCheck", title: "KYC & compliance", desc: "Identity verification and AML checks on every account." },
      { icon: "Bell", title: "Real-time alerts", desc: "A notification on every order, withdrawal or login attempt." },
      { icon: "KeyRound", title: "Two-factor authentication", desc: "Confirm sensitive operations with a code before they run." },
    ],
  },
  fees: {
    eyebrow: "Fees",
    title: "Readable fees, shown before the order",
    rows: [
      { label: "Buying crypto", value: "1%" },
      { label: "Selling to Mobile Money", value: "1%" },
      { label: "Swap between assets", value: "0.5%" },
      { label: "Holding in the wallet", value: "$0" },
    ],
    note: "Network (blockchain) fees on external sends are added on top and shown before you confirm.",
    providersLabel: "Buy and cash out with",
  },
  risk: {
    title: "Investing carries risk",
    desc: "Cryptocurrencies are volatile: their value can fall sharply. Only invest what you can afford to lose. Stablecoins depend on their issuer.",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "What is the minimum amount?",
        a: "You can buy from $1 equivalent, paid by Mobile Money or from your Reemite balance.",
      },
      {
        q: "Can I cash out in local currency?",
        a: "Yes. Sell your crypto in the app and collect the money on your Mobile Money or at a Reemite agent.",
      },
      {
        q: "Who holds my crypto?",
        a: "Your assets are held by Reemite, mostly in cold storage, and stay available to sell or withdraw at any time.",
      },
      {
        q: "Can I send to an external wallet?",
        a: "Yes, to a compatible address. Network fees are shown before you confirm the send.",
      },
    ],
  },
  cta: {
    title: "Start with $1",
    desc: "Create your account, verify your identity and buy your first crypto today.",
    primary: "Create my account",
    secondary: "Message us on WhatsApp",
  },
};

// ---------------------------------------------------------------------------
// Merchant payments page
// ---------------------------------------------------------------------------
export const merchantPage = {
  hero: {
    eyebrow: "Merchant payments",
    title: "Take payments",
    titleAccent: "without a card terminal",
    subtitle:
      "QR code, payment link or shop page: your customers pay by Mobile Money, card or Reemite balance, and you are credited in real time.",
    photo: "/assets/images/merchant-hero.webp",
  },
  channels: {
    title: "Three ways to get paid, one till",
    subtitle:
      "Pick what fits your business: in store, over WhatsApp, or on your website.",
    items: [
      {
        icon: "QrCode",
        title: "In-store QR code",
        desc: "Display your QR by the till: the customer scans, enters the amount and you get a confirmation.",
      },
      {
        icon: "Link2",
        title: "Payment link",
        desc: "Send a link over WhatsApp or SMS to get paid remotely, with no website.",
      },
      {
        icon: "Store",
        title: "Shop page",
        desc: "Create a page with your products and prices, shareable as a single link.",
      },
      {
        icon: "FileText",
        title: "Invoices",
        desc: "Issue a professional invoice and track its payment in real time.",
      },
      {
        icon: "Repeat",
        title: "Subscriptions",
        desc: "Charge your recurring customers automatically each month, with no chasing.",
      },
      {
        icon: "Code",
        title: "API & plugins",
        desc: "Integrate payments into your site or app with our APIs.",
      },
    ],
  },
  qr: {
    eyebrow: "QR code",
    title: "The customer scans, you get paid",
    desc: "No terminal to rent, no paper to print every day: one QR covers all your sales.",
    items: [
      { title: "Display your QR", desc: "On the counter, in the window or on your phone screen." },
      { title: "The customer scans", desc: "From Reemite or their usual Mobile Money app." },
      { title: "Instant confirmation", desc: "You and your cashier get the notification at the same moment." },
      { title: "Balance credited", desc: "The money lands in your wallet, ready to withdraw or reuse." },
    ],
    photo: "/assets/images/merchant-qr.webp",
  },
  steps: {
    eyebrow: "Get started",
    title: "Your till ready in 3 steps",
    items: [
      {
        title: "Create your merchant account",
        desc: "Sign up with your number, then verify your business identity.",
      },
      {
        title: "Generate your QR and links",
        desc: "From the dashboard, in seconds and at no cost.",
      },
      {
        title: "Take payments and track",
        desc: "Every sale shows in your history, with the payment method used.",
      },
    ],
  },
  manage: {
    eyebrow: "Management",
    title: "Keep an eye on your till",
    desc: "A dashboard built for retail: what comes in, who took the payment, and what is left to withdraw.",
    items: [
      { icon: "BarChart3", title: "Today's sales", desc: "Follow your revenue live, by day, week or month." },
      { icon: "Users", title: "Cashiers", desc: "Give your staff access and see who took which payment." },
      { icon: "Download", title: "Exports", desc: "Export your transactions for your accounting." },
      { icon: "Bell", title: "Notifications", desc: "An alert on every payment, for you and your team." },
    ],
    photo: "/assets/images/merchant-shop.webp",
  },
  fees: {
    eyebrow: "Fees",
    title: "A clear commission per payment",
    rows: [
      { label: "QR / link payment", value: "1%" },
      { label: "Mobile Money payment", value: "1.5%" },
      { label: "Card payment", value: "2.5%" },
      { label: "Withdrawal to Mobile Money or agent", value: "1%" },
    ],
    note: "No subscription and no setup fee: you only pay when you get paid.",
    providersLabel: "Your customers pay with",
  },
  testimonial: {
    quote:
      "I used to write sales in a notebook and chase change all day. Now the customer scans the QR and I see the payment land straight away.",
    name: "M. Nsimba",
    role: "Shop owner, Kinshasa market",
    photo: "/assets/images/merchant-vendor.webp",
  },
  faq: {
    title: "Merchant questions",
    items: [
      {
        q: "Do I need a payment terminal?",
        a: "No. A phone is enough: the QR code and payment links replace the card terminal.",
      },
      {
        q: "When am I credited?",
        a: "Immediately. The amount lands on your merchant balance as soon as the customer confirms the payment.",
      },
      {
        q: "Do my customers need Reemite?",
        a: "No. They can pay from their usual Mobile Money app, by card, or from their Reemite wallet.",
      },
      {
        q: "Can I have several outlets?",
        a: "Yes. Create one QR per shop or per cashier and track payments separately in the dashboard.",
      },
    ],
  },
  cta: {
    title: "Open your merchant account",
    desc: "Create your account, generate your QR and take your first payment today.",
    primary: "Create my merchant account",
    secondary: "Message us on WhatsApp",
  },
};
