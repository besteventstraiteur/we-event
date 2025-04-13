
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import AppRouter from "@/components/AppRouter";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import TokenRefresher from "@/components/security/TokenRefresher";
import SessionTimeout from "@/components/security/SessionTimeout";
import { supabase } from "@/lib/supabase";

const AppWrapper: React.FC = () => {
  const [isSupabaseReady, setIsSupabaseReady] = useState(false);

  useEffect(() => {
    // Check if Supabase is configured properly
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      // Test Supabase connection
      const checkConnection = async () => {
        try {
          // Test a simple query
          const { error } = await supabase.from('profiles').select('id').limit(1);
          if (error) {
            console.error("Supabase connection error:", error);
          }
          setIsSupabaseReady(true);
        } catch (err) {
          console.error("Failed to connect to Supabase:", err);
          setIsSupabaseReady(true); // Set to true anyway to allow app to load
        }
      };
      
      checkConnection();
    } else {
      console.warn("Supabase credentials not found in environment variables");
      setIsSupabaseReady(true); // Set to true anyway to allow app to load
    }
  }, []);

  if (!isSupabaseReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-vip-gray-900">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-t-vip-gold border-r-vip-gold border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-white mb-2">Initialisation de l'application</h1>
          <p className="text-gray-400">Connexion à la base de données en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <LanguageProvider>
          <AuthProvider>
            <TokenRefresher>
              <SessionTimeout>
                <CartProvider>
                  <AppRouter />
                  <Toaster />
                </CartProvider>
              </SessionTimeout>
            </TokenRefresher>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default AppWrapper;
