import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type {
  KycBusinessType,
  KycDocumentField,
  KycStatusData,
  KycSubmitResult,
  KycVerificationType,
} from "../types/dashboard";

export function useKycStatus() {
  return useQuery({
    queryKey: ["dashboard", "kyc", "status"],
    queryFn: async () => {
      const { data } = await api.get<{ data: KycStatusData }>(
        "/business/dashboard/kyc/status",
      );
      return data.data;
    },
  });
}

export interface SubmitKycPayload {
  verification_type: KycVerificationType;
  provider?: string;
  business_name: string;
  business_type: KycBusinessType;
  documents: Partial<Record<KycDocumentField, File>>;
}

export function useSubmitKyc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SubmitKycPayload) => {
      const formData = new FormData();
      formData.append("verification_type", payload.verification_type);
      if (payload.provider) formData.append("provider", payload.provider);
      formData.append("business_name", payload.business_name);
      formData.append("business_type", payload.business_type);
      for (const [field, file] of Object.entries(payload.documents)) {
        if (file) formData.append(field, file);
      }
      // L'instance `api` force Content-Type: application/json par défaut ;
      // sans cet override, axios sérialise le FormData en JSON (les fichiers
      // sont perdus) au lieu de l'envoyer en multipart. En le fixant ici à
      // "multipart/form-data", axios laisse ensuite le navigateur remplacer
      // ce header par la vraie valeur avec boundary au moment de l'envoi.
      const { data } = await api.post<{ data: KycSubmitResult }>(
        "/business/dashboard/kyc/submit",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", "kyc"] });
    },
  });
}
