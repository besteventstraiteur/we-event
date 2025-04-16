
import { createContext, useContext, ReactNode } from "react";
import { Profile } from "@/lib/supabase";
import { AuthContextType } from "./types";
import { useAuthState } from "./useAuthState";
import { useAuthMethods } from "./useAuthMethods";
import { usePermissions } from "./usePermissions";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, setUser, isLoading } = useAuthState();
  const { login, loginWithProvider, logout, register } = useAuthMethods(setUser);
  const { hasRole, hasPermission } = usePermissions(user);

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
