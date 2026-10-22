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

export function AirtimeIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <rect x="13" y="4" width="22" height="40" rx="4.5" fill={BLUE} />
      <rect x="16.5" y="9" width="15" height="26" rx="2" fill="#fff" strokeWidth={1.5} />
      <path d="M22 39.5h4" stroke="#fff" />
      <path d="M25.5 12.5 19 23h5l-1.5 8.5L29 21h-5z" fill={LIME} strokeWidth={1.5} />
    </Frame>
  );
}

export function SupportIcon({ className }: IconProps) {
  return (
    <Frame className={className}>
      <path d="M23 5h16a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-5l-5 4.5V22h-6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4z" fill={LIME} />
      <circle cx="26" cy="13.5" r="1.3" fill={NAVY} stroke="none" />
      <circle cx="31" cy="13.5" r="1.3" fill={NAVY} stroke="none" />
      <circle cx="36" cy="13.5" r="1.3" fill={NAVY} stroke="none" />
      <path
        d="M31 37.1v3.7a2.5 2.5 0 0 1-2.7 2.5 24.5 24.5 0 0 1-10.7-3.8 24 24 0 0 1-7.4-7.4 24.5 24.5 0 0 1-3.8-10.8A2.5 2.5 0 0 1 8.9 18.6h3.7a2.5 2.5 0 0 1 2.5 2.1 15.9 15.9 0 0 0 .9 3.5 2.5 2.5 0 0 1-.6 2.6l-1.6 1.6a19.8 19.8 0 0 0 7.4 7.4l1.6-1.6a2.5 2.5 0 0 1 2.6-.6 15.9 15.9 0 0 0 3.5.9 2.5 2.5 0 0 1 2.1 2.5z"
        fill={BLUE}
      />
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
