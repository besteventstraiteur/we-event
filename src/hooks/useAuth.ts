
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
        
        // Vérifier s'il y a un utilisateur de démo dans localStorage
        const localStorageAuth = localStorage.getItem("supabase.auth.token");
        if (localStorageAuth) {
          try {
            const authData = JSON.parse(localStorageAuth);
            if (authData && authData.currentSession && authData.currentSession.user) {
              console.log("Found demo user in localStorage:", authData.currentSession.user);
              setUser(authData.currentSession.user);
              setSession(authData.currentSession);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            console.error("Error parsing auth data:", e);
          }
        }
        
        // Sinon, vérifier la session Supabase
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
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
    
    // Vérifier dans user ou user.user_metadata selon la structure
    const userRole = user.role || (user.user_metadata?.role);
    
    if (!userRole) return false;
    
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
      const { email, password, rememberMe } = credentials;
      
      // Vérification des comptes de démonstration
      if ((email.includes("admin@") || email.includes("partner@") || email.includes("client@")) && 
          password === "password123") {
        
        console.log("Using demo account for:", email);
        let role = email.includes("admin") ? "admin" : email.includes("partner") ? "partner" : "client";
        
        const demoUser = {
          id: `demo-${Date.now()}`,
          user_metadata: {
            email: email,
            name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            role: role
          },
          email: email,
          role: role
        };
        
        // Enregistrer l'utilisateur démo (simuler une connexion)
        localStorage.setItem("supabase.auth.token", JSON.stringify({
          currentSession: {
            user: demoUser
          }
        }));
        
        if (rememberMe) {
          localStorage.setItem("weddingPlannerEmail", email);
          localStorage.setItem("weddingPlannerRememberMe", "true");
        }
        
        setUser(demoUser);
        
        return { success: true, user: demoUser };
      }
      
      // Connexion Supabase normale
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return { success: true, user: data.user };
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, message: error.message || 'Erreur de connexion' };
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      // Suppression des données de démonstration stockées
      localStorage.removeItem("weddingPlannerEmail");
      localStorage.removeItem("weddingPlannerRememberMe");
      localStorage.removeItem("supabase.auth.token");
      
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
    register
  };
};

export default useAuth;
