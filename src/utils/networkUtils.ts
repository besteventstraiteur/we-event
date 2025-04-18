import { useToast } from '@/hooks/use-toast';
import { NetworkError, formatNetworkError, NetworkErrorContext } from './networkErrorTypes';

export const useNetworkStatus = () => {
  const { toast } = useToast();
  
  const showToast = (title: string, description: string, variant: 'default' | 'destructive' = 'default') => {
    try {
      toast({
        title,
        description,
        variant,
        duration: variant === 'destructive' ? 5000 : 3000
      });
    } catch (error) {
      console.error('Error showing toast notification:', formatNetworkError(error));
    }
  };

  const createErrorContext = (additionalContext: Partial<NetworkErrorContext> = {}): NetworkErrorContext => ({
    timestamp: Date.now(),
    ...additionalContext
  });

  const notifyOffline = (context: Partial<NetworkErrorContext> = {}) => {
    try {
      showToast(
        "Mode hors-ligne activé",
        "Vos modifications seront enregistrées localement",
        'destructive'
      );
    } catch (error) {
      throw new NetworkError(
        'Impossible d\'afficher la notification hors-ligne',
        'OFFLINE_MODE',
        createErrorContext(context),
        error
      );
    }
  };
  
  const notifyOnline = (context: Partial<NetworkErrorContext> = {}) => {
    try {
      showToast(
        "Reconnecté",
        "Synchronisation des modifications locales en cours"
      );
    } catch (error) {
      throw new NetworkError(
        'Impossible d\'afficher la notification de reconnexion',
        'SYNC_FAILED',
        createErrorContext(context),
        error
      );
    }
  };
  
  const notifySavedLocally = (context: Partial<NetworkErrorContext> = {}) => {
    try {
      showToast(
        "Enregistré localement",
        "Les modifications seront synchronisées lorsque vous serez en ligne"
      );
    } catch (error) {
      throw new NetworkError(
        'Impossible d\'afficher la notification de sauvegarde locale',
        'STORAGE_ERROR',
        createErrorContext(context),
        error
      );
    }
  };
  
  const notifyError = (error: unknown, context: Partial<NetworkErrorContext> = {}) => {
    if (error instanceof NetworkError) {
      error.context = { ...error.context, ...context };
    }
    const formattedError = formatNetworkError(error);
    showToast(
      "Erreur de synchronisation",
      formattedError,
      'destructive'
    );
  };
  
  return {
    notifyOffline,
    notifyOnline,
    notifySavedLocally,
    notifyError,
    createErrorContext
  };
};
