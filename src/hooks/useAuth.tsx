import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import { supabase, getSession, getUserProfile, Profile, signOut as supabaseSignOut } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@/utils/accessControl";

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

interface AuthContextType {
  user: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  loginWithProvider: (provider: string) => Promise<AuthResult>;
  logout: () => void;
  register: (userData: { email: string; password: string; role?: UserRole; name?: string }) => Promise<AuthResult>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  updateUser: (user: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const { session, error: sessionError } = await getSession();
        
        if (sessionError || !session) {
          console.log("Session error or no session:", sessionError);
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        const { profile, error: profileError } = await getUserProfile(session.user.id);
        
        if (profileError || !profile) {
          console.log("Profile error or no profile:", profileError);
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        console.log("User loaded successfully:", profile);
        setUser(profile);
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      if (event === 'SIGNED_IN' && session) {
        const { profile } = await getUserProfile(session.user.id);
        console.log("Profile after sign in:", profile);
        setUser(profile);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      console.log("Attempting to log in with:", credentials.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) {
        console.error("Supabase login error:", error);
        return {
          success: false,
          message: error.message
        };
      }
      
      console.log("Login successful, getting profile for:", data.user.id);
      const { profile, error: profileError } = await getUserProfile(data.user.id);
      
      if (profileError || !profile) {
        console.error("Profile error after login:", profileError);
        return {
          success: false,
          message: "Could not load user profile"
        };
      }
      
      if (credentials.rememberMe) {
        localStorage.setItem("weddingPlannerEmail", credentials.email);
        localStorage.setItem("weddingPlannerRememberMe", "true");
      } else {
        localStorage.removeItem("weddingPlannerEmail");
        localStorage.removeItem("weddingPlannerRememberMe");
      }
      
      console.log("Login complete with profile:", profile);
      return {
        success: true,
        user: profile
      };
    } catch (error) {
      console.error("Unexpected login error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Login failed"
      };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithProvider = async (provider: string): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      console.log("Attempting to log in with provider:", provider);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error || !data) {
        console.error("Social login error:", error);
        return {
          success: false,
          message: error?.message || "Social login failed"
        };
      }
      
      console.log("Social auth initiated successfully");
      return {
        success: true
      };
    } catch (error) {
      console.error("Unexpected social login error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Social login failed"
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(async () => {
    console.log("Logging out...");
    const { error } = await supabaseSignOut();
    
    if (error) {
      console.error("Error signing out:", error);
    }
    
    setUser(null);
    navigate("/login");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès"
    });
  }, [navigate, toast]);

  const register = async (userData: { email: string; password: string; role?: UserRole; name?: string }): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      console.log("Registering new user:", userData.email);
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role || UserRole.CLIENT
          }
        }
      });
      
      if (error) {
        console.error("Registration error:", error);
        return {
          success: false,
          message: error.message
        };
      }
      
      if (!data.user) {
        console.error("Registration failed - no user returned");
        return {
          success: false,
          message: "Registration failed"
        };
      }

      if (data?.user && !data?.session) {
        console.log("Registration successful, email confirmation required");
        return {
          success: true,
          message: "Registration successful. Please check your email for confirmation."
        };
      }

      console.log("Registration with auto-confirmation successful");
      const { profile } = await getUserProfile(data.user.id);
      
      return {
        success: true,
        user: profile || undefined,
        message: "Registration successful. You are now logged in."
      };
    } catch (error) {
      console.error("Unexpected registration error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Registration failed"
      };
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = useCallback((permission: string): boolean => {
    if (!user) return false;
    
    if (user.role === UserRole.ADMIN) return true;
    
    return false;
  }, [user]);

  const hasRole = useCallback((role: UserRole): boolean => {
    if (!user) return false;
    
    const userRoleStr = String(user.role || '').toLowerCase();
    const checkRoleStr = String(role || '').toLowerCase();
    
    console.log("Comparing roles:", userRoleStr, checkRoleStr, userRoleStr === checkRoleStr);
    
    return userRoleStr === checkRoleStr;
  }, [user]);

  const updateUser = async (updates: Partial<Profile>): Promise<void> => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
        
      if (error) throw error;
      
      setUser({ ...user, ...updates });
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithProvider,
    logout,
    register,
    hasPermission,
    hasRole,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
