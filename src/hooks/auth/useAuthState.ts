
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
          return;
        }
        
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
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      if (session) {
        setUser(session.user);
        setSession(session);
      } else {
        // Ne pas effacer l'utilisateur admin spécial
        const isAdminUser = user && user.email === "rdubois@best-events.fr";
        if (!isAdminUser) {
          setUser(null);
          setSession(null);
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [user]);

  return { user, session, setUser, setSession, isLoading };
}
