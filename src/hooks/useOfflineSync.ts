
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Guest } from '@/types/floorPlanTypes';

interface UseOfflineSyncProps {
  guests: Guest[];
  onSave: (guests: Guest[]) => void;
}

export const useOfflineSync = ({ guests, onSave }: UseOfflineSyncProps) => {
  const [isOnline, setIsOnline] = useState(true);
  const [localGuests, setLocalGuests] = useState<Guest[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        const cachedGuests = localStorage.getItem('cached_guests');
        if (cachedGuests) {
          try {
            setLocalGuests(JSON.parse(cachedGuests));
          } catch (e) {
            console.error('Error parsing cached guests:', e);
          }
        } else {
          setLocalGuests(guests);
          localStorage.setItem('cached_guests', JSON.stringify(guests));
        }
        
        toast({
          title: "Mode hors-ligne activé",
          description: "Vos modifications seront enregistrées localement"
        });
      } else if (localGuests.length > 0) {
        toast({
          title: "Reconnecté",
          description: "Synchronisation des modifications locales en cours"
        });
        onSave(localGuests);
        setLocalGuests([]);
      }
    };
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    setIsOnline(navigator.onLine);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [guests, localGuests, onSave, toast]);

  const handleSave = (updatedGuests: Guest[]) => {
    localStorage.setItem('cached_guests', JSON.stringify(updatedGuests));
    
    if (isOnline) {
      onSave(updatedGuests);
    } else {
      setLocalGuests(updatedGuests);
      toast({
        title: "Enregistré localement",
        description: "Les modifications seront synchronisées lorsque vous serez en ligne"
      });
    }
  };

  return {
    isOnline,
    localGuests,
    handleSave,
    currentGuests: isOnline ? guests : localGuests
  };
};
