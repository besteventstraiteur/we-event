
import { useState, useEffect } from "react";
import { supabase, getSession, getUserProfile, Profile } from "@/lib/supabase";
import { Session } from '@supabase/supabase-js';

export function useAuthState() {
  const [user, setUser] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const { session, error: sessionError } = await getSession();
        
        if (sessionError || !session) {
          console.log("Session error or no session:", sessionError);
          setUser(null);
          setSession(null);
          setIsLoading(false);
          return;
        }
        
        const { profile, error: profileError } = await getUserProfile(session.user.id);
        
        if (profileError || !profile) {
          console.log("Profile error or no profile:", profileError);
          setUser(null);
          setSession(null);
          setIsLoading(false);
          return;
        }
        
        console.log("User loaded successfully:", profile);
        setUser(profile);
        setSession(session);
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(null);
        setSession(null);
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
        setSession(session);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { user, session, setUser, setSession, isLoading };
}
