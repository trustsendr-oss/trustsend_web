import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { MerchantPayment, Paginated } from "../types/dashboard";

/** Paiements reçus des clients par code marchand ou QR, les plus récents d'abord. */
export function useMerchantPayments(page = 1, limit = 20) {
  return useQuery({
    queryKey: ["dashboard", "merchant-payments", page, limit],
    queryFn: async () => {
      const { data } = await api.get<Paginated<MerchantPayment>>(
        "/business/dashboard/merchant-payments",
        { params: { page, limit } },
      );
      return data;
    },
    placeholderData: (prev) => prev,
  });
}
