
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { notify } from '@/components/ui/notifications';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

interface AuthCredentials {
  email: string;
  password: string;
  role?: string; 
  name?: string;
}

// Create a type for our demo user that extends the base User type
type DemoUser = Partial<User> & {
  id: string;
  email: string;
  user_metadata: {
    email: string;
    name: string;
    role: string;
  };
  role?: string;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | DemoUser | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Load user from session or localStorage on mount
  useEffect(() => {
    const checkUserSession = async () => {
      // First check Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setSession(session);
        setUser(session.user || null);
        return;
      }
      
      // If no Supabase session, check for demo user in localStorage
      try {
        const localStorageAuth = localStorage.getItem("supabase.auth.token");
        if (localStorageAuth) {
          const authData = JSON.parse(localStorageAuth);
          if (authData && authData.currentSession && authData.currentSession.user) {
            console.log("Found demo user in localStorage:", authData.currentSession.user);
            // Cast as DemoUser which is compatible with our state type
            setUser(authData.currentSession.user as DemoUser);
          }
        }
      } catch (error) {
        console.error("Error checking for demo user:", error);
      }
    };

    checkUserSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user);
      if (event === 'SIGNED_IN') {
        setUser(session?.user || null);
        setSession(session);
        notify.success('Connexion réussie', 'Bienvenue sur votre espace');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
        notify.success('Déconnexion réussie', 'À bientôt!');
        navigate('/login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const isAuthenticated = !!user;

  const hasRole = useCallback((role: string) => {
    if (!user) return false;
    const userRole = typeof user.user_metadata?.role === 'string' ? user.user_metadata.role.toLowerCase() : '';
    const requiredRole = role.toLowerCase();
    return userRole === requiredRole;
  }, [user]);

  const hasPartnerType = useCallback((partnerType: string) => {
    if (!user) return false;
    if (!hasRole('partner')) return false;
    
    const userPartnerType = user.user_metadata?.partner_type;
    return userPartnerType === partnerType;
  }, [user, hasRole]);

  const login = async (credentials: { email: string; password: string; rememberMe?: boolean }) => {
    try {
      const { email, password, rememberMe } = credentials;
      
      // Handle demo accounts directly
      if ((email.includes("admin@") || email.includes("partner@") || email.includes("client@")) && 
          password === "password123") {
        
        console.log("Using demo account for:", email);
        let role = "client";
        if (email.includes("admin")) {
          role = "admin";
        } else if (email.includes("partner")) {
          role = "partner";
        }
        
        // Create a demo user with the DemoUser type
        const demoUser: DemoUser = {
          id: `demo-${Date.now()}`,
          user_metadata: {
            email: email,
            name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            role: role
          },
          email: email,
          role: role
        };
        
        // Store demo user information
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
        
        // Dispatch the auth-refresh event to notify components
        window.dispatchEvent(new Event('auth-refresh'));
        
        notify.success('Connexion réussie', 'Bienvenue sur votre espace');
        return { success: true, user: demoUser };
      }
      
      // If not a demo account, proceed with regular authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      notify.success('Connexion réussie', 'Bienvenue sur votre espace');
      return { success: true, user: data.user };
    } catch (error) {
      notify.error(
        'Erreur de connexion',
        error instanceof Error ? error.message : 'Vérifiez vos identifiants'
      );
      return { success: false, message: 'Erreur de connexion' };
    }
  };

  const logout = async () => {
    try {
      // Clear demo user data if present
      localStorage.removeItem("supabase.auth.token");
      
      await supabase.auth.signOut();
      notify.success('Déconnexion réussie', 'À bientôt!');
      navigate('/login');
    } catch (error) {
      notify.error(
        'Erreur de déconnexion',
        'Une erreur est survenue lors de la déconnexion'
      );
    }
  };

  const register = async (credentials: AuthCredentials) => {
    try {
      setIsLoading(true);
      const { email, password, role, name } = credentials;
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            name
          }
        }
      });
  
      if (authError) {
        throw authError;
      }
  
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (signInError) {
        throw signInError;
      }
  
      notify.success('Inscription réussie', 'Bienvenue !');
      return { success: true, user: authData.user, message: 'Inscription réussie' };
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      notify.error(
        'Erreur d\'inscription',
        error.message || 'Une erreur est survenue lors de l\'inscription'
      );
      return { success: false, message: error.message || 'Erreur lors de l\'inscription' };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) throw error;
      notify.success('Réinitialisation demandée', 'Un email vous a été envoyé pour réinitialiser votre mot de passe.');
      return { success: true };
    } catch (error: any) {
      notify.error('Erreur', error.message);
      return { success: false, message: error.message };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      notify.success('Mot de passe mis à jour', 'Votre mot de passe a été mis à jour avec succès.');
      return { success: true, user: data.user };
    } catch (error: any) {
      notify.error('Erreur', error.message);
      return { success: false, message: error.message };
    }
  };

  const signInWithSocialProvider = async (provider: "google" | "facebook" | "github") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth-callback`,
        }
      });
  
      if (error) {
        throw error;
      }
  
      return { success: true, data };
    } catch (error: any) {
      notify.error('Erreur de connexion', error.message || 'Erreur lors de la connexion avec le provider social');
      return { success: false, message: error.message };
    }
  };

  const loginWithProvider = async (provider: "google" | "facebook" | "github") => {
    return signInWithSocialProvider(provider);
  };

  return {
    user,
    session,
    isAuthenticated,
    hasRole,
    hasPartnerType,
    isLoading,
    login,
    logout,
    register,
    resetPassword,
    updatePassword,
    signInWithSocialProvider,
    loginWithProvider
  };
};
