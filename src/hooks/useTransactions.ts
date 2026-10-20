import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Paginated, Transaction, TransactionStatus, TransactionType } from "../types/dashboard";

export interface TransactionFilters {
  q?: string;
  type?: TransactionType | "";
  status?: TransactionStatus | "";
  currency_code?: string;
  date_from?: string;
  date_to?: string;
}

export function useTransactions(page = 1, limit = 20, filters: TransactionFilters = {}) {
  // Les filtres vides ne sont pas envoyés à l'API.
  const params = Object.fromEntries(
    Object.entries({ page, limit, ...filters }).filter(([, v]) => v !== "" && v !== undefined),
  );
  return useQuery({
    queryKey: ["dashboard", "transactions", params],
    queryFn: async () => {
      const { data } = await api.get<Paginated<Transaction>>(
        "/business/dashboard/transactions",
        { params },
      );
      return data;
    },
    placeholderData: (prev) => prev,
  });
}
