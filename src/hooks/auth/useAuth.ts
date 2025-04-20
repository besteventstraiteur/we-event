
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/utils/accessControl';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Charger l'utilisateur au démarrage et écouter les changements d'auth
  useEffect(() => {
    // Vérifier s'il y a une session active
    const checkSession = async () => {
      try {
        setIsLoading(true);
        
        // Nettoyer les données de démo potentiellement conflictuelles
        localStorage.removeItem("supabase.auth.token");
        
        // Vérifier la session Supabase
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        console.log("Session check result:", data.session ? "Session found" : "No session");
        
        if (data.session) {
          setUser(data.session.user);
          setSession(data.session);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
    
    // Écouter les changements d'authentification
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      if (session) {
        console.log("Setting user from auth event:", session.user);
        setUser(session.user);
        setSession(session);
      } else {
        setUser(null);
        setSession(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = !!user;
  
  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = useCallback((role: UserRole) => {
    if (!user) return false;
    
    // Vérifier d'abord dans les métadonnées de l'utilisateur
    const userRole = user.user_metadata?.role || user.role;
    
    // Si pas de rôle trouvé, vérifier dans la base de données (via le profil)
    if (!userRole) {
      console.log("No role found in user metadata, defaulting to CLIENT");
      return role === UserRole.CLIENT; // Par défaut, on considère l'utilisateur comme client
    }
    
    return String(userRole).toLowerCase() === String(role).toLowerCase();
  }, [user]);

  // Vérifier si le partenaire a un type spécifique
  const hasPartnerType = useCallback((partnerType: string) => {
    if (!user || !hasRole(UserRole.PARTNER)) return false;
    
    const userPartnerType = user.partner_type || user.user_metadata?.partner_type;
    return userPartnerType === partnerType;
  }, [user, hasRole]);

  // Vérifier si l'utilisateur a une permission spécifique
  const hasPermission = useCallback((permission: string) => {
    if (!user) return false;
    
    // Admin a toutes les permissions
    if (hasRole(UserRole.ADMIN)) return true;
    
    // Trouver les permissions dans la structure appropriée
    const permissions = user.permissions || user.user_metadata?.permissions;
    
    if (!permissions) return false;
    
    return Array.isArray(permissions) && permissions.includes(permission);
  }, [user, hasRole]);

  // Connexion avec email/password
  const login = async (credentials: { email: string; password: string; rememberMe?: boolean }) => {
    try {
      const { email, password } = credentials;
      
      console.log("Login attempt with:", email);
      
      // Connexion Supabase normale
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      console.log("Login successful with email:", email);

      // Stocker les préférences de connexion si demandé
      if (credentials.rememberMe) {
        localStorage.setItem("weddingPlannerEmail", email);
        localStorage.setItem("weddingPlannerRememberMe", "true");
      } else {
        localStorage.removeItem("weddingPlannerEmail");
        localStorage.removeItem("weddingPlannerRememberMe");
      }

      return { success: true, user: data.user };
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, message: error.message || 'Erreur de connexion' };
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      // Suppression des données stockées
      localStorage.removeItem("weddingPlannerEmail");
      localStorage.removeItem("weddingPlannerRememberMe");
      
      // Déconnexion Supabase
      await supabase.auth.signOut();
      
      // Mise à jour de l'état utilisateur
      setUser(null);
      setSession(null);
      
      // Rediriger vers la page de connexion
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Connexion avec provider social
  const loginWithProvider = async (provider: "google" | "facebook" | "github") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
  
      if (error) {
        throw error;
      }
  
      return { success: true, data };
    } catch (error: any) {
      console.error("Social login error:", error);
      return { success: false, message: error.message || 'Erreur de connexion sociale' };
    }
  };

  // Inscription
  const register = async (userData: { 
    email: string; 
    password: string; 
    role?: UserRole; 
    name?: string 
  }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            role: userData.role || UserRole.CLIENT,
            name: userData.name
          }
        }
      });
      
      if (error) throw error;
      
      return { success: true, user: data.user };
    } catch (error: any) {
      console.error("Registration error:", error);
      return { success: false, message: error.message || 'Erreur d\'inscription' };
    }
  };

  // Mettre à jour le rôle d'un utilisateur
  const updateUserRole = async (userId: string, role: UserRole) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ role: role })
        .eq('id', userId);
      
      if (error) throw error;
      
      return { success: true, data };
    } catch (error: any) {
      console.error("Update role error:", error);
      return { success: false, message: error.message || 'Erreur lors de la mise à jour du rôle' };
    }
  };

  return {
    user,
    session,
    isAuthenticated,
    isLoading,
    hasRole,
    hasPartnerType,
    hasPermission,
    login,
    logout,
    loginWithProvider,
    register,
    updateUserRole
  };
};

export default useAuth;
