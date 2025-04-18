
import { useToast } from '@/hooks/use-toast';
import { formatErrorMessage } from '@/utils/errorHandling';

export const useNetworkStatus = () => {
  const { toast } = useToast();
  
  const notifyOffline = () => {
    try {
      toast({
        title: "Mode hors-ligne activé",
        description: "Vos modifications seront enregistrées localement"
      });
    } catch (error) {
      console.error('Error showing offline notification:', formatErrorMessage(error));
    }
  };
  
  const notifyOnline = () => {
    try {
      toast({
        title: "Reconnecté",
        description: "Synchronisation des modifications locales en cours"
      });
    } catch (error) {
      console.error('Error showing online notification:', formatErrorMessage(error));
    }
  };
  
  const notifySavedLocally = () => {
    try {
      toast({
        title: "Enregistré localement",
        description: "Les modifications seront synchronisées lorsque vous serez en ligne"
      });
    } catch (error) {
      console.error('Error showing local save notification:', formatErrorMessage(error));
    }
  };
  
  return {
    notifyOffline,
    notifyOnline,
    notifySavedLocally
  };
};

