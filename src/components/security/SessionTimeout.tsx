
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

interface SessionTimeoutProps {
  timeoutMinutes?: number;
  warningMinutes?: number;
  children?: React.ReactNode;
}

/**
 * Composant qui gère la déconnexion automatique après une période d'inactivité
 */
const SessionTimeout: React.FC<SessionTimeoutProps> = ({
  timeoutMinutes = 30, // 30 minutes d'inactivité par défaut
  warningMinutes = 5, // Avertir 5 minutes avant la déconnexion
  children
}) => {
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [showWarning, setShowWarning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(warningMinutes * 60);
  const timeoutRef = useRef<number | null>(null);
  const warningRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  
  const resetTimers = () => {
    // Nettoyer les timers existants
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (warningRef.current) window.clearTimeout(warningRef.current);
    if (countdownRef.current) window.clearInterval(countdownRef.current);
    
    // Ne pas configurer de nouveaux timers si l'utilisateur n'est pas connecté
    if (!isAuthenticated) return;
    
    // Configurer le timer d'avertissement
    const warningTime = (timeoutMinutes - warningMinutes) * 60 * 1000;
    warningRef.current = window.setTimeout(() => {
      setShowWarning(true);
      setRemainingSeconds(warningMinutes * 60);
      
      // Configurer le compte à rebours
      countdownRef.current = window.setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            // Temps écoulé, nettoyer le compteur
            if (countdownRef.current) window.clearInterval(countdownRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    }, warningTime);
    
    // Configurer le timer de déconnexion
    timeoutRef.current = window.setTimeout(() => {
      logout();
      toast({
        variant: "destructive",
        title: "Session expirée",
        description: "Vous avez été déconnecté en raison d'une inactivité prolongée."
      });
    }, timeoutMinutes * 60 * 1000);
  };
  
  // Réinitialiser les timers lorsque l'état d'authentification change
  useEffect(() => {
    resetTimers();
    
    return () => {
      // Nettoyer tous les timers lors du démontage
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (warningRef.current) window.clearTimeout(warningRef.current);
      if (countdownRef.current) window.clearInterval(countdownRef.current);
    };
  }, [isAuthenticated]);
  
  // Réinitialiser les timers sur les événements utilisateur
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    
    const resetTimersOnActivity = () => {
      if (showWarning) {
        // Si l'avertissement est déjà affiché, ne pas réinitialiser les timers
        // L'utilisateur doit explicitement cliquer sur "Rester connecté"
        return;
      }
      resetTimers();
    };
    
    events.forEach(event => {
      window.addEventListener(event, resetTimersOnActivity);
    });
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimersOnActivity);
      });
    };
  }, [isAuthenticated, showWarning]);
  
  // Formater le temps restant
  const formatRemainingTime = () => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Gérer le clic sur "Rester connecté"
  const handleStayConnected = () => {
    setShowWarning(false);
    resetTimers();
  };
  
  return (
    <>
      {children}
      
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Votre session va expirer</AlertDialogTitle>
            <AlertDialogDescription>
              Vous serez déconnecté dans {formatRemainingTime()} en raison d'inactivité.
              Souhaitez-vous rester connecté?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => logout()}>
              Se déconnecter
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleStayConnected}>
              Rester connecté
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SessionTimeout;
