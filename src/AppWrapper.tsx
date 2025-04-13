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
import { supabase } from "@/integrations/supabase/client";

const AppWrapper: React.FC = () => {
  const [isSupabaseReady, setIsSupabaseReady] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  useEffect(() => {
    // Test Supabase connection
    const checkConnection = async () => {
      try {
        // Test a simple query
        const { error } = await supabase.from('profiles').select('id').limit(1);
        if (error) {
          console.error("Supabase connection error:", error);
          setSupabaseError(`Failed to connect to Supabase: ${error.message}`);
        } else {
          console.log("Successfully connected to Supabase");
          setIsSupabaseReady(true);
        }
      } catch (err) {
        console.error("Failed to connect to Supabase:", err);
        setSupabaseError(`Failed to connect to Supabase: ${err instanceof Error ? err.message : String(err)}`);
      }
    };
    
    checkConnection();
  }, []);

  if (!isSupabaseReady && !supabaseError) {
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

  if (supabaseError) {
    return (
      <div className="flex items-center justify-center h-screen bg-vip-gray-900">
        <div className="max-w-md mx-auto p-6 bg-vip-gray-800 rounded-lg shadow-lg">
          <h1 className="text-xl font-semibold text-red-400 mb-4">Erreur de configuration Supabase</h1>
          <p className="text-gray-300 mb-4">{supabaseError}</p>
          <p className="text-gray-400 text-sm">Vérifiez que votre projet Supabase est bien configuré et que vous avez les bonnes informations de connexion.</p>
          <button
            className="mt-4 w-full bg-vip-gold hover:bg-vip-gold/90 text-white px-4 py-2 rounded"
            onClick={() => {
              setSupabaseError(null);
              setIsSupabaseReady(true);
            }}
          >
            Continuer avec des fonctionnalités limitées
          </button>
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
