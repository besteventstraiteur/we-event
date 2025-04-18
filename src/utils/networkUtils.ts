
import { useToast } from '@/hooks/use-toast';
import { NetworkError, formatNetworkError } from './networkErrorTypes';

export const useNetworkStatus = () => {
  const { toast } = useToast();
  
  const showToast = (title: string, description: string) => {
    try {
      toast({
        title,
        description,
        variant: 'default'
      });
    } catch (error) {
      console.error('Error showing toast notification:', formatNetworkError(error));
    }
  };

  const notifyOffline = () => {
    try {
      showToast(
        "Mode hors-ligne activé",
        "Vos modifications seront enregistrées localement"
      );
    } catch (error) {
      throw new NetworkError(
        'Failed to show offline notification',
        'CONNECTION_LOST',
        error
      );
    }
  };
  
  const notifyOnline = () => {
    try {
      showToast(
        "Reconnecté",
        "Synchronisation des modifications locales en cours"
      );
    } catch (error) {
      throw new NetworkError(
        'Failed to show online notification',
        'SYNC_FAILED',
        error
      );
    }
  };
  
  const notifySavedLocally = () => {
    try {
      showToast(
        "Enregistré localement",
        "Les modifications seront synchronisées lorsque vous serez en ligne"
      );
    } catch (error) {
      throw new NetworkError(
        'Failed to show local save notification',
        'STORAGE_ERROR',
        error
      );
    }
  };
  
  const notifyError = (error: unknown) => {
    showToast(
      "Erreur de synchronisation",
      formatNetworkError(error)
    );
  };
  
  return {
    notifyOffline,
    notifyOnline,
    notifySavedLocally,
    notifyError
  };
};

