
import { useState, useEffect } from 'react';
import type { Guest } from '@/types/floorPlanTypes';
import { getCachedGuests, setCachedGuests } from '@/utils/localStorageUtils';
import { useNetworkStatus } from '@/utils/networkUtils';

interface UseOfflineSyncProps {
  guests: Guest[];
  onSave: (guests: Guest[]) => void;
}

export const useOfflineSync = ({ guests, onSave }: UseOfflineSyncProps) => {
  const [isOnline, setIsOnline] = useState(true);
  const [localGuests, setLocalGuests] = useState<Guest[]>([]);
  const { notifyOffline, notifyOnline, notifySavedLocally } = useNetworkStatus();

  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);
      const cached = getCachedGuests();
      
      if (cached) {
        setLocalGuests(cached);
      } else {
        setLocalGuests(guests);
        setCachedGuests(guests);
      }
      
      notifyOffline();
    };

    const handleOnline = () => {
      setIsOnline(true);
      if (localGuests.length > 0) {
        notifyOnline();
        onSave(localGuests);
        setLocalGuests([]);
      }
    };

    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        handleOffline();
      } else {
        handleOnline();
      }
    };
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    setIsOnline(navigator.onLine);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [guests, localGuests, onSave]);

  const handleSave = (updatedGuests: Guest[]) => {
    setCachedGuests(updatedGuests);
    
    if (isOnline) {
      onSave(updatedGuests);
    } else {
      setLocalGuests(updatedGuests);
      notifySavedLocally();
    }
  };

  return {
    isOnline,
    localGuests,
    handleSave,
    currentGuests: isOnline ? guests : localGuests
  };
};
