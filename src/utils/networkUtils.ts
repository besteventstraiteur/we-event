
import { useToast } from '@/hooks/use-toast';

export const useNetworkStatus = () => {
  const { toast } = useToast();
  
  const notifyOffline = () => {
    toast({
      title: "Mode hors-ligne activé",
      description: "Vos modifications seront enregistrées localement"
    });
  };
  
  const notifyOnline = () => {
    toast({
      title: "Reconnecté",
      description: "Synchronisation des modifications locales en cours"
    });
  };
  
  const notifySavedLocally = () => {
    toast({
      title: "Enregistré localement",
      description: "Les modifications seront synchronisées lorsque vous serez en ligne"
    });
  };
  
  return {
    notifyOffline,
    notifyOnline,
    notifySavedLocally
  };
};
