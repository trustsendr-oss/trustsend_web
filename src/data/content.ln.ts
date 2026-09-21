import * as en from "./content.en";
import type { NavMegaMenu } from "./content.fr";

export * from "./content.en";

export const navLinks = [
  { label: "Kofuta", href: "#payments" },
  { label: "Kotinda mbongo", href: "/transferts-internationaux" },
  { label: "Baninga", href: "#partners" },
  { label: "Ntalo", href: "/pricing" },
];

export const navMegaMenus: Record<string, NavMegaMenu> = {
  Kofuta: en.navMegaMenus.Payments,
  "Kotinda mbongo": en.navMegaMenus.Transfers,
  Baninga: en.navMegaMenus.Partners,
};

export const heroCapabilities = [
  { label: "Futa abonnements na yo", variant: "payments" as const },
  { label: "Bomba na Likelemba", variant: "payroll" as const },
  { label: "Tinda mbongo na mboka mpe na libanda", variant: "payouts" as const },
  { label: "Yangela carte virtuelle na yo", variant: "checkout" as const },
  { label: "Bimisa mbongo epai ya agent", variant: "banking" as const },
];

export const heroSpotlight = {
  ...en.heroSpotlight,
  eyebrow: "API ya mombongo oyo ekangisaka nyonso",
  heading: "bakarte, cash, mobile money mpe crypto",
  subline: "Bakarte ya virtuel | Kotinda mbongo | Agent | Likelemba | BGame",
};

export const platformStandards = [
  { icon: "Wallet", label: "Compte ezangi mbongo ya dépôt to retrait" },
  { icon: "Percent", label: "Kotinda mbongo na 1% kaka" },
  { icon: "Receipt", label: "Kofuta factures ezangi frais" },
  { icon: "Smartphone", label: "Kozwa crédit noki na réseau nyonso" },
  { icon: "Phone", label: "Numéro moko ya ofele" },
  { icon: "ShieldCheck", label: "Bobateli na standard ya mokili" },
];
