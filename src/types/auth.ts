export interface Business {
  id: number;
  code: string;
  name: string;
  /** Absent pour une session de membre : l'e-mail de connexion est celui de la personne. */
  email?: string;
}

export interface LoginResult {
  business: Business;
  expires_in: number;
  /** Jeton CSRF à renvoyer en en-tête X-CSRF-Token sur les requêtes mutantes. */
  csrf_token?: string;
}

/** Qui est connecté : le login de l'entreprise (propriétaire) ou un membre de l'équipe. */
export type SessionKind = "owner" | "member";

export type DashboardPermission =
  | "dashboard.read"
  | "finance.read"
  | "money.move"
  | "developers.manage"
  | "team.manage"
  | "settings.manage"
  | "institution.manage";

export type StaffRole =
  | "owner"
  | "admin"
  | "finance"
  | "developer"
  | "viewer"
  | "branch_manager"
  | "teller"
  | "credit_officer";

export interface MembershipBusiness {
  id: number;
  code: string;
  name: string;
  kind: string;
  status: string;
}

/** GET /business/dashboard/me */
export interface DashboardMe {
  kind: SessionKind;
  role: "owner" | StaffRole;
  permissions: DashboardPermission[];
  /** PIN qui confirme les opérations d'argent : celui de l'entreprise, ou le PIN personnel du membre. */
  pin_set: boolean;
  member: {
    id: number;
    user: { id: number; code: string | null; full_name: string | null; email: string | null };
  } | null;
  business: MembershipBusiness;
}

export interface Membership {
  membership_id: number;
  role: StaffRole;
  business: MembershipBusiness;
}

/** POST /business/auth/member/login : une session, ou la liste des entreprises à choisir. */
export type MemberLoginResponse =
  | {
      requires_business: true;
      businesses: Membership[];
    }
  | {
      requires_business?: undefined;
      member: {
        id: number;
        role: StaffRole;
        user: { id: number; code: string | null; full_name: string | null; email: string | null };
      };
      business: MembershipBusiness;
      csrf_token?: string;
      expires_in: number;
    };
