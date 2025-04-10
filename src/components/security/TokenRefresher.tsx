
import { useEffect, useRef, useState } from "react";
import { authService } from "@/services/AuthService";
import { useAuth } from "@/hooks/useAuth";

interface TokenRefresherProps {
  refreshInterval?: number; // En millisecondes
  children?: React.ReactNode;
}

/**
 * Composant qui gère le rafraîchissement automatique du token JWT
 * Pour éviter les déconnexions pendant l'utilisation de l'application
 */
const TokenRefresher: React.FC<TokenRefresherProps> = ({
  refreshInterval = 15 * 60 * 1000, // 15 minutes par défaut
  children
}) => {
  const { isAuthenticated, logout } = useAuth();
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const refreshTimerRef = useRef<number | null>(null);

  // Configurer un timer pour rafraîchir le token
  useEffect(() => {
    const setupRefreshTimer = () => {
      if (!isAuthenticated) return;

      // Nettoyer tout timer existant
      if (refreshTimerRef.current) {
        window.clearInterval(refreshTimerRef.current);
      }

      // Configurer un nouveau timer
      refreshTimerRef.current = window.setInterval(async () => {
        try {
          const success = await authService.refreshToken();
          if (success) {
            console.log("Token rafraîchi avec succès");
            setLastRefresh(new Date());
          } else {
            console.warn("Échec du rafraîchissement du token");
            logout(); // Déconnecter l'utilisateur si le rafraîchissement échoue
          }
        } catch (error) {
          console.error("Erreur lors du rafraîchissement du token:", error);
          logout();
        }
      }, refreshInterval);
    };

    setupRefreshTimer();

    // Nettoyer le timer lors du démontage
    return () => {
      if (refreshTimerRef.current) {
        window.clearInterval(refreshTimerRef.current);
      }
    };
  }, [isAuthenticated, refreshInterval, logout]);

  // Renvoyer les enfants sans ajouter d'éléments DOM
  return <>{children}</>;
};

export default TokenRefresher;
