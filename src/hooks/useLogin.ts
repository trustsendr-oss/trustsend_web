import { useMutation } from "@tanstack/react-query";
import type { TFunction } from "i18next";
import { api, ApiError } from "../lib/api";
import { storeSession } from "../lib/session";
import type { LoginResult, MemberLoginResponse } from "../types/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

export function loginErrorMessage(error: unknown, t: TFunction): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return t("login.errorInvalidCredentials");
      case 401:
        return t("login.errorInvalidCredentials");
      case 403:
        return error.code === "E_NOT_TEAM_MEMBER"
          ? t("login.errorNotMember")
          : t("login.errorPending");
      case 429:
        return t("login.errorLocked");
      default:
        return error.message;
    }
  }
  return t("login.errorGeneric");
}

export function useLogin() {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post<{ data: LoginResult }>(
        "/business/auth/login",
        payload,
      );
      return data.data;
    },
    onSuccess: (result) => {
      storeSession(result, "owner");
    },
  });
}

export interface MemberLoginPayload extends LoginPayload {
  business_id?: number;
}

/**
 * Connexion d'un membre d'équipe avec son compte Reemite personnel. S'il appartient à plusieurs
 * entreprises sans en avoir choisi une, la réponse liste ces entreprises et n'ouvre pas de session.
 */
export function useMemberLogin() {
  return useMutation({
    mutationFn: async (payload: MemberLoginPayload) => {
      const { data } = await api.post<{ data: MemberLoginResponse }>(
        "/business/auth/member/login",
        payload,
      );
      return data.data;
    },
    onSuccess: (result) => {
      if (result.requires_business) return;
      storeSession(
        { business: result.business, csrf_token: result.csrf_token, expires_in: result.expires_in },
        "member",
      );
    },
  });
}
