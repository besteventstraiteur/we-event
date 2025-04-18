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
import { supabase, testDatabaseConnection } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AppWrapper: React.FC = () => {
  const [isSupabaseReady, setIsSupabaseReady] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [isTryingAgain, setIsTryingAgain] = useState(false);
  const [connectionLatency, setConnectionLatency] = useState<number | null>(null);

  const checkConnection = async () => {
    try {
      const result = await testDatabaseConnection();
      
      if (!result.success) {
        console.error("Supabase connection error:", result);
        
        // Gestion spéciale pour les erreurs de tables non créées
        if (result.errorCode === '42P01') {
          setSupabaseError(`Les tables Supabase n'ont pas encore été créées. Veuillez exécuter les instructions SQL avant de continuer.`);
        } else {
          setSupabaseError(`Échec de la connexion à Supabase: ${result.error}`);
        }
        return;
      }
      
      console.log("Successfully connected to Supabase:", result);
      setIsSupabaseReady(true);
      setSupabaseError(null);
      if (result.latency) {
        setConnectionLatency(result.latency);
      }
    } catch (err) {
      console.error("Failed to connect to Supabase:", err);
      setSupabaseError(`Échec de la connexion à Supabase: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsTryingAgain(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const handleTryAgain = () => {
    setIsTryingAgain(true);
    setSupabaseError(null);
    setTimeout(() => {
      checkConnection();
    }, 1000);
  };

  const handleContinueAnyway = () => {
    toast({
      variant: "default", 
      title: "Fonctionnalités limitées",
      description: "Certaines fonctionnalités ne seront pas disponibles sans une connexion Supabase opérationnelle.",
      className: "bg-amber-100 border-amber-300 text-amber-800"
    });
    setSupabaseError(null);
    setIsSupabaseReady(true);
  };

  if (!isSupabaseReady && !supabaseError) {
    return (
      <div className="flex items-center justify-center h-screen bg-vip-gray-900">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-t-vip-gold border-r-vip-gold border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-white mb-2">Initialisation de l'application</h1>
          <p className="text-gray-400">Connexion à la base de données en cours...</p>
          {connectionLatency && (
            <p className="text-gray-500 text-sm mt-2">Latence: {Math.round(connectionLatency)}ms</p>
          )}
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
          <div className="text-gray-400 text-sm mb-6">
            <p className="mb-2">Vérifiez que:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Votre projet Supabase est bien configuré</li>
              <li>Les tables ont été créées avec les instructions SQL fournies</li>
              <li>Vous avez les bonnes informations de connexion</li>
            </ol>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              className="w-full bg-vip-gold hover:bg-vip-gold/90 text-white"
              onClick={handleTryAgain}
              disabled={isTryingAgain}
            >
              {isTryingAgain ? (
                <>
                  <span className="mr-2 h-4 w-4 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></span>
                  Tentative de reconnexion...
                </>
              ) : (
                "Réessayer la connexion"
              )}
            </Button>
            <Button
              className="w-full border border-vip-gold text-vip-gold hover:bg-vip-gold/10"
              variant="outline"
              onClick={handleContinueAnyway}
            >
              Continuer avec des fonctionnalités limitées
            </Button>
          </div>
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
