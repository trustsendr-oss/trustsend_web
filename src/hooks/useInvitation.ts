import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { storeSession } from "../lib/session";
import type { MemberLoginResponse, StaffRole } from "../types/auth";

export interface InvitationDetails {
  email: string;
  role: StaffRole;
  inviter_name: string | null;
  expires_at: string;
  has_account: boolean;
  business: { id: number; name: string; kind: string; logo_url: string | null };
}

type MemberSession = Exclude<MemberLoginResponse, { requires_business: true }>;

/** Ce que montre la page d'invitation, à partir du jeton du lien. */
export function useInvitationLookup(token: string | null) {
  return useQuery({
    queryKey: ["invitation", token],
    enabled: !!token,
    retry: false,
    queryFn: async () => {
      const { data } = await api.post<{ data: InvitationDetails }>("/business/invitations/lookup", {
        token,
      });
      return data.data;
    },
  });
}

function rememberSession(result: MemberSession) {
  storeSession(
    { business: result.business, csrf_token: result.csrf_token, expires_in: result.expires_in },
    "member",
  );
}

/** Rejoindre avec le compte Reemite déjà associé à l'adresse invitée. */
export function useAcceptInvitation() {
  return useMutation({
    mutationFn: async (payload: { token: string; password: string }) => {
      const { data } = await api.post<{ data: MemberSession }>(
        "/business/invitations/accept",
        payload,
      );
      return data.data;
    },
    onSuccess: rememberSession,
  });
}

/** Créer son compte Reemite depuis le lien, puis rejoindre. */
export function useRegisterFromInvitation() {
  return useMutation({
    mutationFn: async (payload: { token: string; full_name: string; password: string }) => {
      const { data } = await api.post<{ data: MemberSession }>(
        "/business/invitations/register",
        payload,
      );
      return data.data;
    },
    onSuccess: rememberSession,
  });
}
