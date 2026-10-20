import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { PaymentMethodsData } from "../types/paymentMethods";

export function usePaymentMethods() {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const { data } = await api.get<{ data: PaymentMethodsData }>(
        "/business/dashboard/mobile-money/payment-methods/raw",
      );
      return data.data;
    },
    staleTime: 60 * 60_000,
  });
}

export interface OperatorInfo {
  name: string;
  logo: string;
  country: string;
  countryName: { fr: string; en: string };
  flag: string;
}

// Index code opérateur (ex. "MTN_MOMO_RWA", stocké dans metadata.provider_code des transactions)
// → nom, logo et pays, pour afficher le moyen de paiement réellement utilisé.
export function useOperators() {
  const methods = usePaymentMethods();
  const countries = methods.data?.active_configuration?.countries;
  return useMemo(() => {
    const map = new Map<string, OperatorInfo>();
    for (const c of countries ?? []) {
      for (const p of c.providers) {
        map.set(p.provider, {
          name: p.displayName,
          logo: p.logo,
          country: c.country,
          countryName: c.displayName,
          flag: c.flag,
        });
      }
    }
    return map;
  }, [countries]);
}
