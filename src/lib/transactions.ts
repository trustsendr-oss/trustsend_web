import type { Transaction, TransactionType } from "../types/dashboard";
import { formatMinorUnits } from "./format";

export type TxDirection = "in" | "out" | "swap";

const directions: Record<TransactionType, TxDirection> = {
  mobile_money_deposit: "in",
  sandbox_funding: "in",
  mobile_money_payout: "out",
  business_plan_subscription: "out",
  business_plan_maintenance_fee: "out",
  fx_swap: "swap",
};

export function txDirection(tx: Transaction): TxDirection {
  return directions[tx.type] ?? "out";
}

/** Lit une valeur texte de metadata (les montants arrivent en string ou en number). */
export function metaString(tx: Transaction, key: string): string | null {
  const value = tx.metadata[key];
  if (typeof value === "string" && value !== "") return value;
  if (typeof value === "number") return String(value);
  return null;
}

export function txCurrency(tx: Transaction): string | null {
  return metaString(tx, "currency_code");
}

/** Montant principal de la transaction (l'abonnement de plan stocke son prix sous `price`). */
export function txAmount(tx: Transaction): string | null {
  const currency = txCurrency(tx);
  const amount = metaString(tx, "amount") ?? metaString(tx, "price");
  return amount && currency ? formatMinorUnits(amount, currency) : null;
}

/** Formate un champ montant de metadata dans la devise donnée (ou celle de la transaction). */
export function metaAmount(tx: Transaction, key: string, currency?: string | null): string | null {
  const amount = metaString(tx, key);
  const code = currency ?? txCurrency(tx);
  return amount && code ? formatMinorUnits(amount, code) : null;
}
