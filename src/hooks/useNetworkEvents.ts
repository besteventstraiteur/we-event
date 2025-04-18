
import { useEffect } from 'react';
import { NetworkError, formatNetworkError } from '@/utils/networkErrorTypes';

interface NetworkEventsProps {
  onOnline: () => void;
  onOffline: () => void;
  onError?: (error: unknown) => void;
  retryDelay?: number;
}

export const useNetworkEvents = ({ 
  onOnline, 
  onOffline, 
  onError,
  retryDelay = 3000 
}: NetworkEventsProps) => {
  useEffect(() => {
    let retryTimeout: number;

    const updateOnlineStatus = () => {
      try {
        const online = navigator.onLine;
        if (online) {
          onOnline();
          if (retryTimeout) {
            window.clearTimeout(retryTimeout);
          }
        } else {
          onOffline();
          
          // Retry check after delay
          retryTimeout = window.setTimeout(() => {
            if (!navigator.onLine) {
              const networkError = new NetworkError(
                'La connexion n\'a pas pu être rétablie',
                'NETWORK_TIMEOUT',
                null,
                true
              );
              onError?.(networkError);
            }
          }, retryDelay);
        }
      } catch (error) {
        const networkError = new NetworkError(
          'Erreur lors de la mise à jour du statut réseau',
          'CONNECTION_LOST',
          error
        );
        console.error('Erreur de mise à jour du statut:', formatNetworkError(networkError));
        onError?.(networkError);
        onOffline();
      }
    };
    
    try {
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
      
      // Vérification initiale
      updateOnlineStatus();
      
      return () => {
        try {
          if (retryTimeout) {
            window.clearTimeout(retryTimeout);
          }
          window.removeEventListener('online', updateOnlineStatus);
          window.removeEventListener('offline', updateOnlineStatus);
        } catch (error) {
          const networkError = new NetworkError(
            'Erreur lors de la suppression des écouteurs d\'événements réseau',
            'UNKNOWN_ERROR',
            error
          );
          console.error('Erreur de nettoyage:', formatNetworkError(networkError));
          onError?.(networkError);
        }
      };
    } catch (error) {
      const networkError = new NetworkError(
        'Erreur lors de la configuration des écouteurs d\'événements réseau',
        'UNKNOWN_ERROR',
        error
      );
      console.error('Erreur de configuration:', formatNetworkError(networkError));
      onError?.(networkError);
      onOffline();
      return () => {};
    }
  }, [onOnline, onOffline, onError, retryDelay]);
};

