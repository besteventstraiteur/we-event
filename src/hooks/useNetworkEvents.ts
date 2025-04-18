
import { useEffect } from 'react';

interface NetworkEventsProps {
  onOnline: () => void;
  onOffline: () => void;
}

export const useNetworkEvents = ({ onOnline, onOffline }: NetworkEventsProps) => {
  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      if (online) {
        onOnline();
      } else {
        onOffline();
      }
    };
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Initial check
    updateOnlineStatus();
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [onOnline, onOffline]);
};
