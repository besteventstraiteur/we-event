
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
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Supabase is configured properly
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Missing Supabase credentials:", { 
        url: supabaseUrl ? "✓" : "✗", 
        key: supabaseAnonKey ? "✓" : "✗"
      });
      setSupabaseError("Supabase credentials missing. Please check your environment variables.");
      setIsSupabaseReady(true); // Set to true anyway to allow app to load with limited functionality
      return;
    }
    
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
        }
        setIsSupabaseReady(true);
      } catch (err) {
        console.error("Failed to connect to Supabase:", err);
        setSupabaseError(`Failed to connect to Supabase: ${err instanceof Error ? err.message : String(err)}`);
        setIsSupabaseReady(true); // Set to true anyway to allow app to load with limited functionality
      }
    };
    
    checkConnection();
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

  if (supabaseError) {
    return (
      <div className="flex items-center justify-center h-screen bg-vip-gray-900">
        <div className="max-w-md mx-auto p-6 bg-vip-gray-800 rounded-lg shadow-lg">
          <h1 className="text-xl font-semibold text-red-400 mb-4">Erreur de configuration Supabase</h1>
          <p className="text-gray-300 mb-4">{supabaseError}</p>
          <div className="bg-gray-700 p-4 rounded text-sm text-gray-300 mb-4">
            <p className="font-semibold mb-2">Vérifiez que vos variables d'environnement sont correctement définies:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>VITE_SUPABASE_URL</li>
              <li>VITE_SUPABASE_ANON_KEY</li>
            </ul>
          </div>
          <p className="text-gray-400 text-sm">L'application fonctionnera avec des fonctionnalités limitées.</p>
          <button
            className="mt-4 w-full bg-vip-gold hover:bg-vip-gold/90 text-white px-4 py-2 rounded"
            onClick={() => setSupabaseError(null)}
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
