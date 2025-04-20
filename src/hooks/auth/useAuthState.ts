
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        localStorage.removeItem("supabase.auth.token");
        
        // Vérification spéciale pour l'utilisateur admin prédéfini
        const savedAdmin = localStorage.getItem("weddingPlannerAdminUser");
        if (savedAdmin) {
          try {
            const adminUser = JSON.parse(savedAdmin);
            console.log("Using saved admin user from localStorage");
            setUser(adminUser);
            setSession({ user: adminUser });
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          } catch (e) {
            console.error("Error parsing saved admin user:", e);
            localStorage.removeItem("weddingPlannerAdminUser");
          }
        }
        
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session error or no session:', error);
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        
        if (data.session) {
          setUser(data.session.user);
          setSession(data.session);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth state changed:", event, newSession?.user?.id);
      
      if (newSession) {
        setUser(newSession.user);
        setSession(newSession);
        setIsAuthenticated(true);
      } else {
        // Ne pas effacer l'utilisateur admin spécial
        const adminUser = localStorage.getItem("weddingPlannerAdminUser");
        if (adminUser) {
          try {
            const admin = JSON.parse(adminUser);
            setUser(admin);
            setSession({ user: admin });
            setIsAuthenticated(true);
          } catch (e) {
            setUser(null);
            setSession(null);
            setIsAuthenticated(false);
          }
        } else {
          setUser(null);
          setSession(null);
          setIsAuthenticated(false);
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, session, setUser, setSession, isLoading, isAuthenticated };
}
