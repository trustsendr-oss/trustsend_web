import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { storeSession } from "../lib/session";
import type { Membership, MemberLoginResponse, StaffRole } from "../types/auth";

export type StaffStatus = "active" | "suspended" | "terminated";

export interface TeamMember {
  id: number;
  business_id: number;
  user_id: number;
  agent_id: number | null;
  role: StaffRole;
  status: StaffStatus;
  user: {
    id: number;
    code: string | null;
    full_name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
  agent: { id: number; code: string; name?: string | null } | null;
}

export function useTeam() {
  return useQuery({
    queryKey: ["dashboard", "team"],
    queryFn: async () => {
      const { data } = await api.get<{ data: TeamMember[] }>("/business/dashboard/staff");
      return data.data;
    },
  });
}

export interface TeamInvitation {
  id: number;
  email: string;
  role: StaffRole;
  status: "pending" | "expired";
  inviter_name: string | null;
  expires_at: string;
  created_at: string;
}

export function useInvitations() {
  return useQuery({
    queryKey: ["dashboard", "team", "invitations"],
    queryFn: async () => {
      const { data } = await api.get<{ data: TeamInvitation[] }>(
        "/business/dashboard/staff/invitations",
      );
      return data.data;
    },
  });
}

/** Envoie un e-mail d'invitation : la personne rejoint l'équipe avec son propre compte. */
export function useInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { email: string; role: StaffRole }) => {
      const { data } = await api.post<{ data: TeamInvitation }>(
        "/business/dashboard/staff/invitations",
        payload,
      );
      return data.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["dashboard", "team", "invitations"] }),
  });
}

export function useResendInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.post(`/business/dashboard/staff/invitations/${id}/resend`);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["dashboard", "team", "invitations"] }),
  });
}

export function useCancelInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/business/dashboard/staff/invitations/${id}`);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["dashboard", "team", "invitations"] }),
  });
}

export function useUpdateMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...changes
    }: {
      id: number;
      role?: StaffRole;
      status?: StaffStatus;
    }) => {
      const { data } = await api.patch<{ data: TeamMember }>(
        `/business/dashboard/staff/${id}`,
        changes,
      );
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dashboard", "team"] }),
  });
}

/** Entreprises vers lesquelles un membre peut basculer (vide pour le propriétaire). */
export function useMyBusinesses(enabled: boolean) {
  return useQuery({
    queryKey: ["dashboard", "my-businesses"],
    enabled,
    queryFn: async () => {
      const { data } = await api.get<{ data: Membership[] }>("/business/auth/member/businesses");
      return data.data;
    },
  });
}

/** Ouvre une session sur une autre entreprise du membre, sans redemander le mot de passe. */
export function useSwitchBusiness() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (businessId: number) => {
      const { data } = await api.post<{ data: Exclude<MemberLoginResponse, { requires_business: true }> }>(
        "/business/auth/member/switch",
        { business_id: businessId },
      );
      return data.data;
    },
    onSuccess: (result) => {
      storeSession(
        { business: result.business, csrf_token: result.csrf_token, expires_in: result.expires_in },
        "member",
      );
      // Tout ce qui est en cache appartient à l'entreprise précédente.
      queryClient.clear();
    },
  });
}
