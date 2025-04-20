
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
            setSession({ user: adminUser });
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
          setIsLoading(false);
          return;
        }
        
        if (data.session) {
          setUser(data.session.user);
          setSession(data.session);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking session:', error);
        setIsLoading(false);
      }
    };

    checkSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth state changed:", event, newSession?.user?.id);
      
      // Ne pas appeler setUser si on est dans un état de chargement
      if (newSession) {
        setUser(newSession.user);
        setSession(newSession);
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
  }, []); // Retirer user des dépendances pour éviter la boucle infinie

  return { user, session, setUser, setSession, isLoading };
}
