import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { notify } from '@/components/ui/notifications';
import { useNavigate } from 'react-router-dom';
import { User, UserCredentials } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
    };

    fetchSession();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user || null);
        notify.success('Connexion réussie', 'Bienvenue sur votre espace');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        notify.success('Déconnexion réussie', 'À bientôt!');
        navigate('/login');
      }
      setSession(session);
    });
  }, [navigate]);

  const isAuthenticated = !!user;

  const hasRole = useCallback((role: string) => {
    if (!user) return false;
    // Assurez-vous que user.role est défini et est une chaîne avant de le normaliser
    const userRole = typeof user.role === 'string' ? user.role.toLowerCase() : '';
    const requiredRole = role.toLowerCase();
    return userRole === requiredRole;
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
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

  const register = async (credentials: UserCredentials & { role: string, name: string }) => {
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
  
      // Auto sign-in after registration
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

  return {
    user,
    session,
    isAuthenticated,
    hasRole,
    isLoading,
    login,
    logout,
    register,
    resetPassword,
    updatePassword,
    signInWithSocialProvider
  };
};
