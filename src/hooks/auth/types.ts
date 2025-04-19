
import { Profile } from "@/lib/supabase";
import { UserRole } from "@/utils/accessControl";
import { Session } from '@supabase/supabase-js';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: Profile;
}

export interface AuthContextType {
  user: Profile | null;
  session: Session | null;  // Ajout de la session
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;  // Modification du type de login
  loginWithProvider: (provider: string) => Promise<AuthResult>;  // Ajout de loginWithProvider
  logout: () => void;
  register: (userData: { email: string; password: string; role?: UserRole; name?: string }) => Promise<AuthResult>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  hasPartnerType: (partnerType: string) => boolean;
  updateUser: (user: Partial<Profile>) => Promise<void>;
}
