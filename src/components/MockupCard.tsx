import type { ReactNode } from "react";
import type { MockupVariant } from "../data/content";

function DashboardChrome({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-3xl bg-white shadow-pop border border-surface-2 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-2">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-md bg-brand flex items-center justify-center text-white text-[10px] font-display font-bold">
            T+
          </span>
          <span className="font-display font-bold text-sm text-ink">
            Reemite
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Live Mode
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface p-3">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="text-base font-display font-bold text-ink mt-0.5">
        {value}
      </p>
    </div>
  );
}

function Sparkline({ color = "#305eff" }: { color?: string }) {
  return (
    <svg viewBox="0 0 200 48" className="w-full h-12" preserveAspectRatio="none">
      <polyline
        points="0,40 20,32 40,36 60,18 80,26 100,10 120,22 140,14 160,28 180,20 200,30"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InsightBar({
  segments,
}: {
  segments: { label: string; value: string; pct: number; color: string }[];
}) {
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {segments.map((s) => (
          <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {segments.map((s) => (
          <div key={s.label}>
            <p className="text-sm font-semibold text-ink">{s.value}</p>
            <p className="text-[11px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsMockup() {
  return (
    <DashboardChrome>
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <StatTile label="Volume encaissé" value="$ 73 400" />
        <StatTile label="Nombre de paiements" value="15 760" />
        <StatTile label="Remboursements" value="129" />
        <StatTile label="Taux de réussite" value="98,6%" />
      </div>
      <Sparkline />
      <div className="mt-4 pt-4 border-t border-surface-2">
        <p className="text-xs font-semibold text-ink mb-2">Aperçu des paiements</p>
        <InsightBar
          segments={[
            { label: "Cartes", value: "45%", pct: 45, color: "#305eff" },
            { label: "Mobile Money", value: "29%", pct: 29, color: "#1e46d1" },
            { label: "Portefeuille", value: "26%", pct: 26, color: "#0099ff" },
          ]}
        />
      </div>
    </DashboardChrome>
  );
}

function BankingMockup() {
  return (
    <DashboardChrome>
      <div className="rounded-xl bg-surface p-4 mb-3">
        <p className="text-xs text-muted">Solde du portefeuille</p>
        <p className="text-2xl font-display font-bold text-ink">
          $ 1 240,85
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <StatTile label="Dépôts (agents)" value="+ $ 320,00" />
        <StatTile label="Retraits (Mobile Money)" value="- $ 110,40" />
      </div>
      <Sparkline color="#009e5c" />
    </DashboardChrome>
  );
}

function PayrollMockup() {
  const rows = [
    { name: "A. Kimani", amount: "$ 50,00" },
    { name: "B. Otieno", amount: "$ 50,00" },
    { name: "C. Wanjiru", amount: "$ 75,00" },
    { name: "D. Mbeki", amount: "$ 50,00" },
  ];
  return (
    <DashboardChrome>
      <div className="flex items-center justify-between mb-3">
        <p className="font-display font-semibold text-ink text-sm">
          Likelemba — Cotisations d'août
        </p>
        <span className="text-[11px] font-semibold bg-accent-light/50 text-accent px-2 py-1 rounded-full">
          En cours
        </span>
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.name}
            className="flex items-center gap-3 bg-surface rounded-xl px-3 py-2.5"
          >
            <div className="h-7 w-7 rounded-full bg-brand-light flex items-center justify-center text-[10px] font-bold text-brand">
              {r.name[0]}
            </div>
            <span className="text-sm text-ink flex-1">{r.name}</span>
            <span className="text-sm font-semibold text-ink">{r.amount}</span>
          </div>
        ))}
      </div>
    </DashboardChrome>
  );
}

function PayoutsMockup() {
  const vendors = [
    { name: "Vers Kinshasa", amount: "120,00" },
    { name: "Vers Bruxelles", amount: "85,00" },
    { name: "Vers Paris", amount: "200,00" },
    { name: "Vers Dakar", amount: "60,00" },
  ];
  return (
    <DashboardChrome>
      <p className="font-display font-semibold text-ink text-sm mb-3">
        Transferts en cours
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {vendors.map((v) => (
          <div key={v.name} className="rounded-xl bg-surface p-3">
            <div className="h-7 w-7 rounded-full bg-link/15 flex items-center justify-center text-[10px] font-bold text-link mb-2">
              {v.name.split(" ")[1][0]}
            </div>
            <p className="text-xs text-muted">{v.name}</p>
            <p className="text-sm font-semibold text-ink">$ {v.amount}</p>
          </div>
        ))}
      </div>
    </DashboardChrome>
  );
}

function CheckoutMockup() {
  return (
    <div className="rounded-3xl bg-white shadow-pop border border-surface-2 overflow-hidden">
      <img
        src="/assets/checkout/all-payments.png"
        alt="Payment method selection: netbanking, wallet, UPI, cards, EMI"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}

const variants: Record<MockupVariant, () => React.ReactElement> = {
  payments: PaymentsMockup,
  banking: BankingMockup,
  payroll: PayrollMockup,
  payouts: PayoutsMockup,
  checkout: CheckoutMockup,
};

export function MockupCard({
  variant,
  className = "",
}: {
  variant: MockupVariant;
  className?: string;
}) {
  const Body = variants[variant];
  return (
    <div className={className}>
      <Body />
    </div>
  );
}
