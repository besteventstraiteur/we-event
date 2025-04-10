
import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import { authService, LoginCredentials, AuthResult } from "@/services/AuthService";
import { AccessControlUser, UserRole } from "@/utils/accessControl";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  user: AccessControlUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  loginWithProvider: (provider: string) => Promise<AuthResult>;
  logout: () => void;
  register: (userData: Partial<AccessControlUser> & { password: string }) => Promise<AuthResult>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  updateUser: (user: Partial<AccessControlUser>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AccessControlUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Charger l'utilisateur au démarrage
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Vérifier si le token est valide
        const isValid = await authService.verifyToken();
        if (!isValid) {
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        // Récupérer l'utilisateur
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Connexion
  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const result = await authService.login(credentials);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  // Connexion avec un fournisseur (Google, Facebook, etc.)
  const loginWithProvider = async (provider: string): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const result = await authService.loginWithProvider(provider);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  // Déconnexion
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    navigate("/login");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès"
    });
  }, [navigate]);

  // Inscription
  const register = async (userData: Partial<AccessControlUser> & { password: string }): Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const result = await authService.register(userData);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  // Vérifier les permissions
  const hasPermission = useCallback((permission: string): boolean => {
    return authService.hasPermission(permission as any);
  }, []);

  // Vérifier le rôle
  const hasRole = useCallback((role: UserRole): boolean => {
    return authService.hasRole(role);
  }, []);

  // Mettre à jour les informations utilisateur
  const updateUser = (updates: Partial<AccessControlUser>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Mise à jour dans le stockage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
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
