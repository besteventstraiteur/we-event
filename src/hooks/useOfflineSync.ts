
import { useState } from 'react';
import type { Guest } from '@/types/floorPlanTypes';
import { getCachedGuests, setCachedGuests } from '@/utils/localStorageUtils';
import { useNetworkStatus } from '@/utils/networkUtils';
import { useNetworkEvents } from './useNetworkEvents';

interface UseOfflineSyncProps {
  guests: Guest[];
  onSave: (guests: Guest[]) => void;
}

export const useOfflineSync = ({ guests, onSave }: UseOfflineSyncProps) => {
  const [isOnline, setIsOnline] = useState(true);
  const [localGuests, setLocalGuests] = useState<Guest[]>([]);
  const { notifyOffline, notifyOnline, notifySavedLocally } = useNetworkStatus();

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

  useNetworkEvents({
    onOnline: handleOnline,
    onOffline: handleOffline
  });

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
