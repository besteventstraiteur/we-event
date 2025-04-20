
import { Profile } from "@/lib/supabase";
import { Session, User } from '@supabase/supabase-js';
import { UserRole } from '@/utils/accessControl';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: any;
  data?: any;
}

export interface AuthContextType {
  user: any;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  loginWithProvider: (provider: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  register: (userData: { email: string; password: string; role?: UserRole; name?: string }) => Promise<AuthResult>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  hasPartnerType: (partnerType: string) => boolean;
  updateUser: (user: Partial<Profile>) => Promise<void>;
}
