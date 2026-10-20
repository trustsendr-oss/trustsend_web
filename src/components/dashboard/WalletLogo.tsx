import { useState } from "react";
import { Wallet as WalletIcon } from "lucide-react";
import type { Wallet } from "../../types/dashboard";

// Logo servi par l'API (drapeau du pays émetteur ou badge de la devise), avec l'icône
// générique en secours si l'image ne charge pas.
export function WalletLogo({ wallet, className = "h-10 w-10" }: { wallet: Wallet; className?: string }) {
  const [failed, setFailed] = useState(false);
  const src = wallet.logo_url ?? wallet.flag_url;

  if (!src || failed) {
    return (
      <span className={`flex shrink-0 items-center justify-center rounded-full bg-brand-light text-brand ${className}`}>
        <WalletIcon size={16} />
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={wallet.currency_code}
      onError={() => setFailed(true)}
      className={`aspect-square shrink-0 rounded-full border border-surface-2 object-cover ${className}`}
    />
  );
}
