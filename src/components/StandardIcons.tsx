import type { ReactNode } from "react";

// Jeu d'icônes sur mesure aux couleurs Reemite (brand, accent, accent-light)
const NAVY = "#020D30";
const BLUE = "#2563EB";
const LIME = "#c6f076";

function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke={NAVY}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

type IconProps = { className?: string };

export function WalletIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M11 14 31 7.6a3 3 0 0 1 3.8 2L36 14" />
      <rect x="7" y="14" width="34" height="26" rx="5" fill={BLUE} />
      <path d="M41 22h-7.5a5 5 0 0 0 0 10H41z" fill="#fff" />
      <circle cx="33.5" cy="27" r="2" fill={LIME} />
    </Frame>
  );
}

export function TransferIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M7.5 21A17 17 0 0 1 36 11.5" />
      <path d="M36.5 5.5v6.5H30" />
      <path d="M40.5 27A17 17 0 0 1 12 36.5" />
      <path d="M11.5 42.5V36H18" />
      <circle cx="24" cy="24" r="10.5" fill={BLUE} />
      <path d="M28 20l-8 8" stroke="#fff" />
      <circle cx="20.5" cy="20.5" r="1.6" fill={LIME} stroke="none" />
      <circle cx="27.5" cy="27.5" r="1.6" fill={LIME} stroke="none" />
    </Frame>
  );
}

export function ReceiptIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M11 5h24v37l-4-3-4 3-4-3-4 3-4-3-4 3z" fill="#fff" />
      <path d="M17 13h12M17 19h12M17 25h7" stroke={BLUE} />
      <circle cx="34" cy="34" r="8" fill={LIME} />
      <path d="m30.5 34 2.5 2.5 4.5-5" />
    </Frame>
  );
}

export function CardIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <rect x="5" y="11" width="38" height="26" rx="4.5" fill={BLUE} />
      <path d="M5 18.5h38" stroke={NAVY} strokeWidth={4} />
      <rect x="10" y="25" width="8" height="6" rx="1.5" fill={LIME} strokeWidth={1.5} />
      <path d="M28 30h9" stroke="#fff" />
    </Frame>
  );
}

export function SavingsIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <circle cx="16" cy="12" r="4.5" fill={LIME} />
      <circle cx="32" cy="12" r="4.5" fill={LIME} />
      <rect x="7" y="22" width="34" height="20" rx="5" fill={BLUE} />
      <path d="M18 22v-2.5a6 6 0 0 1 12 0V22" />
      <circle cx="24" cy="32" r="3.5" fill="#fff" />
    </Frame>
  );
}

export function SecurityIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M24 4.5 39 10v11.5c0 9.5-6.4 17.4-15 21.5-8.6-4.1-15-12-15-21.5V10z" fill={BLUE} />
      <path d="M24 9.5v28.3c-6-3.5-10-9.4-10-16.3v-8z" fill="#fff" fillOpacity={0.18} stroke="none" />
      <path d="m17.5 23.5 4.5 4.5 8.5-9" stroke={LIME} strokeWidth={3} />
    </Frame>
  );
}
