
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

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const { session, error: sessionError } = await getSession();
        
        if (sessionError || !session) {
          console.error("Session error:", sessionError);
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        // Get user profile from profiles table
        const { profile, error: profileError } = await getUserProfile(session.user.id);
        
        if (profileError || !profile) {
          console.error("Profile error:", profileError);
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        setUser(profile);
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
    
    // Setup auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { profile } = await getUserProfile(session.user.id);
        setUser(profile);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Login with email and password
  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) {
        return {
          success: false,
          message: error.message
        };
      }
      
      const { profile, error: profileError } = await getUserProfile(data.user.id);
      
      if (profileError || !profile) {
        return {
          success: false,
          message: "Could not load user profile"
        };
      }
      
      return {
        success: true,
        user: profile
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Login failed"
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Login with social provider
  const loginWithProvider = async (provider: string): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error || !data) {
        return {
          success: false,
          message: error?.message || "Social login failed"
        };
      }
      
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Social login failed"
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = useCallback(async () => {
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

  // Register
  const register = async (userData: { email: string; password: string; role?: UserRole; name?: string }): Promise<AuthResult> => {
    setIsLoading(true);
    try {
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
        return {
          success: false,
          message: error.message
        };
      }
      
      if (!data.user) {
        return {
          success: false,
          message: "Registration failed"
        };
      }

      // If email confirmation is required
      if (data?.user && !data?.session) {
        return {
          success: true,
          message: "Registration successful. Please check your email for confirmation."
        };
      }

      // If auto-confirmed
      const { profile } = await getUserProfile(data.user.id);
      
      return {
        success: true,
        user: profile || undefined,
        message: "Registration successful. You are now logged in."
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Registration failed"
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Check permissions
  const hasPermission = useCallback((permission: string): boolean => {
    // TODO: Implement permission checking logic based on roles
    if (!user) return false;
    
    if (user.role === UserRole.ADMIN) return true;
    
    return false;
  }, [user]);

  // Check role
  const hasRole = useCallback((role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
  }, [user]);

  // Update user
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
