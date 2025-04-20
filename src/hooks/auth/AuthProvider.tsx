
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuthState } from "./useAuthState";
import { useAuthMethods } from "./useAuthMethods";
import { usePermissions } from "./usePermissions";
import { UserRole } from "@/utils/accessControl";

interface AuthContextType {
  user: any;
  session: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string; rememberMe?: boolean }) => Promise<any>;
  logout: () => Promise<void>;
  loginWithProvider: (provider: "google" | "facebook" | "github") => Promise<any>;
  register: (userData: { email: string; password: string; role?: string; name?: string }) => Promise<any>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
  hasPartnerType: (type: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, session, isLoading, isAuthenticated, setUser } = useAuthState();
  const { login, logout, loginWithProvider, register } = useAuthMethods();
  const { hasPermission, hasRole, hasPartnerType } = usePermissions(user);

  // Vérifier si un utilisateur de démo existe dans le localStorage au chargement
  useEffect(() => {
    const checkDemoUser = () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser && !user) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.id && parsedUser.id.startsWith("demo-")) {
            console.log("Restoring demo user from localStorage", parsedUser);
            setUser(parsedUser);
          }
        } catch (error) {
          console.error("Error parsing stored demo user:", error);
        }
      }
    };
    
    checkDemoUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated,
        login,
        logout,
        loginWithProvider,
        register,
        hasPermission,
        hasRole,
        hasPartnerType
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
