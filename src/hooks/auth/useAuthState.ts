
import { useState, useEffect } from "react";
import { supabase, getSession, getUserProfile, Profile } from "@/lib/supabase";

export function useAuthState() {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const { session, error: sessionError } = await getSession();
        
        if (sessionError || !session) {
          console.log("Session error or no session:", sessionError);
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        const { profile, error: profileError } = await getUserProfile(session.user.id);
        
        if (profileError || !profile) {
          console.log("Profile error or no profile:", profileError);
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        console.log("User loaded successfully:", profile);
        setUser(profile);
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      if (event === 'SIGNED_IN' && session) {
        const { profile } = await getUserProfile(session.user.id);
        console.log("Profile after sign in:", profile);
        setUser(profile);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, setUser, isLoading };
}
