export interface OverviewBucket {
  deposits: { completed: number; failed: number; pending: number; total: number };
  payouts: { completed: number; failed: number; pending: number; total: number };
  deposit_success_rate_percent: number | null;
  payout_success_rate_percent: number | null;
}

export interface Overview {
  all_time: OverviewBucket;
  last_30_days: OverviewBucket;
}

export interface Currency {
  code: string;
  numeric_code: string | null;
  name: string;
  symbol: string | null;
  decimals: number;
  country_code: string | null;
  logo_url: string;
  is_active: boolean;
}

export interface Wallet {
  id: number;
  currency_code: string;
  logo_url?: string;
  currency?: Currency;
  /** Ancien nom de logo_url, conservé par l'API pour compatibilité. */
  flag_url?: string;
  balance: string;
  status: string;
  per_transaction_limit?: string;
  daily_limit?: string;
  monthly_limit?: string;
  created_at: string;
  updated_at: string;
}

export type TransactionType = "mobile_money_deposit" | "mobile_money_payout" | "fx_swap";
export type TransactionStatus = "initiated" | "pending" | "completed" | "failed";

export interface Transaction {
  transaction_id: number;
  type: TransactionType;
  status: TransactionStatus;
  provider: string;
  metadata: Record<string, unknown>;
  created_at: string;
  completed_at: string | null;
}

export interface Paginated<T> {
  data: T[];
  meta: { total: number; page: number; limit: number };
}

export interface MobileMoneyOperationResult {
  deposit_id?: number;
  payout_id?: number;
  status: string;
  created_at: string;
}

export type CardBrand = "VISA" | "MASTERCARD";
export type CardStatus = "pending" | "active" | "frozen" | "terminated" | "failed";

export interface Card {
  id: number;
  provider_card_id: string | null;
  brand: CardBrand;
  card_type: string;
  currency_code: string;
  status: CardStatus;
  first_six: string | null;
  last_four: string | null;
  masked: string | null;
  balance: string;
  created_at: string;
}

export interface CardTransaction {
  transactionId: string;
  amount: string;
  description: string;
  createdAt: string;
}

export interface ApiKey {
  id: number;
  key_prefix: string;
  status: string;
  last_used_at: string | null;
  created_at: string;
  revoked_at: string | null;
}

export interface Profile {
  id: number;
  code: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  webhook_url: string | null;
  pin_set: boolean;
  /** Environnement de l'API qui a répondu ; absent sur une API antérieure à la sandbox. */
  environment?: "sandbox" | "production";
  created_at: string;
}

export const WEBHOOK_EVENTS = [
  "mobile_money_deposit.completed",
  "mobile_money_deposit.failed",
  "mobile_money_payout.completed",
  "mobile_money_payout.failed",
] as const;

export type WebhookEvent = (typeof WEBHOOK_EVENTS)[number];

export type KycVerificationType =
  | "identity"
  | "address"
  | "liveness"
  | "document"
  | "pep_screening";

export type KycDocumentField =
  | "id_card_front"
  | "id_card_back"
  | "passport"
  | "driver_license_front"
  | "driver_license_back"
  | "selfie"
  | "proof_of_address"
  | "business_registration_certificate"
  | "tax_identification_certificate"
  | "representative_id_front"
  | "representative_id_back"
  | "other";

export type KycBusinessType = "company" | "startup";

export interface KycNotStarted {
  status: "not_started";
  message: string;
}

export interface KycRecord {
  kyc_id: string;
  status: "pending" | "approved" | "rejected";
  verification_type: string;
  provider: string | null;
  business_name?: string | null;
  business_type?: KycBusinessType | null;
  documents: string[];
  submitted_at: string;
  decided_at: string | null;
  decision_reason: string | null;
  created_at: string;
}

export type KycStatusData = KycNotStarted | KycRecord;

export interface KycSubmitResult {
  kyc_id: string;
  status: string;
  verification_type: string;
  documents: string[];
  submitted_at: string;
}

// Clé de feature -> `true` (sans restriction) ou limitée à des pays (ISO alpha-3) et/ou des
// devises. Une clé absente = fonctionnalité non incluse. Même forme que app/models/plan.ts côté API.
export type PlanFeatureRestriction = true | { currencies?: string[]; countries?: string[] };
export type PlanFeatures = Record<string, PlanFeatureRestriction>;

export interface Plan {
  id: number;
  code: string;
  name: string;
  description: string | null;
  features: PlanFeatures;
  price: string;
  maintenance_price: string;
  currency_code: string;
}

// Réponse (aplatie, pas de champ `plan` imbriqué) de GET /business/dashboard/plan.
export interface ActivePlan {
  id: number;
  code: string;
  name: string;
  description: string | null;
  features: PlanFeatures;
  price: string;
  maintenance_price: string;
  currency_code: string;
  subscribed_at: string | null;
  next_maintenance_billing_at: string | null;
  payment_status: "current" | "past_due";
}

// Réponse de POST /business/dashboard/plan/subscribe — forme différente de ActivePlan
// (id = id du business, plan imbriqué avec price_charged au lieu de price).
export interface PlanSubscription {
  id: number;
  plan: {
    id: number;
    code: string;
    name: string;
    price_charged: string;
    currency_code: string;
  };
  subscribed_at: string | null;
  next_maintenance_billing_at: string | null;
}

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  data: Record<string, unknown>;
  read: boolean;
  created_at: string;
}

export interface NotificationsMeta {
  total: number;
  page: number;
  limit: number;
  unread_count: number;
}

export interface NotificationsResponse {
  data: Notification[];
  meta: NotificationsMeta;
}

export interface Webhook {
  id: number;
  url: string;
  events: WebhookEvent[];
  active: boolean;
  created_at: string;
}

export interface WebhookDelivery {
  id: number;
  event_type: string;
  status: string;
  retry_count: number;
  last_error: string | null;
  created_at: string;
  updated_at: string;
}

export interface SwapQuote {
  quote_id: string;
  from_currency: string;
  to_currency: string;
  amount_in: string;
  amount_out: string;
  fee: string;
  fee_currency: string;
  rate: string;
  mid_rate: string;
  margin_bps: number;
  expires_at: string;
}

export interface SwapResult extends Omit<SwapQuote, "expires_at"> {
  transaction_id: string;
  transaction_uuid: string;
  status: string;
  created_at: string;
}
