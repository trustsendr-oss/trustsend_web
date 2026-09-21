import * as en from "./content.en";
import type { NavMegaMenu } from "./content.fr";

export * from "./content.en";

export const navLinks = [
  { label: "Malipo", href: "#payments" },
  { label: "Uhamisho", href: "/transferts-internationaux" },
  { label: "Washirika", href: "#partners" },
  { label: "Bei", href: "/pricing" },
];

export const navMegaMenus: Record<string, NavMegaMenu> = {
  Malipo: en.navMegaMenus.Payments,
  Uhamisho: en.navMegaMenus.Transfers,
  Washirika: en.navMegaMenus.Partners,
};

export const heroCapabilities = [
  { label: "Lipa usajili wako", variant: "payments" as const },
  { label: "Weka akiba kwa Likelemba", variant: "payroll" as const },
  { label: "Tuma pesa ndani na kimataifa", variant: "payouts" as const },
  { label: "Dhibiti kadi yako pepe", variant: "checkout" as const },
  { label: "Toa pesa kwa wakala", variant: "banking" as const },
];

export const heroSpotlight = {
  ...en.heroSpotlight,
  eyebrow: "API ya biashara inayounganisha kila kitu",
  heading: "kadi, pesa taslimu, mobile money na crypto",
  subline: "Kadi pepe | Uhamisho | Wakala | Likelemba | BGame",
};

export const platformStandards = [
  { icon: "Wallet", label: "Akaunti isiyo na ada za kuweka au kutoa" },
  { icon: "Percent", label: "Uhamisho wa pesa kwa 1% tu" },
  { icon: "Receipt", label: "Malipo ya bili bila ada" },
  { icon: "Smartphone", label: "Nunua muda wa maongezi papo hapo kwenye mtandao wowote" },
  { icon: "Phone", label: "Namba moja ya mawasiliano bila malipo" },
  { icon: "ShieldCheck", label: "Usalama wa viwango vya kimataifa" },
];
