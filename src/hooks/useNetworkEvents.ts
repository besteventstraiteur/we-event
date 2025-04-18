
import { useEffect } from 'react';
import { formatErrorMessage } from '@/utils/errorHandling';

interface NetworkEventsProps {
  onOnline: () => void;
  onOffline: () => void;
}

export const useNetworkEvents = ({ onOnline, onOffline }: NetworkEventsProps) => {
  useEffect(() => {
    const updateOnlineStatus = () => {
      try {
        const online = navigator.onLine;
        if (online) {
          onOnline();
        } else {
          onOffline();
        }
      } catch (error) {
        console.error('Error updating network status:', formatErrorMessage(error));
        // Fall back to offline mode if we can't determine the status
        onOffline();
      }
    };
    
    try {
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
      
      // Initial check with error handling
      updateOnlineStatus();
      
      return () => {
        try {
          window.removeEventListener('online', updateOnlineStatus);
          window.removeEventListener('offline', updateOnlineStatus);
        } catch (error) {
          console.error('Error removing network event listeners:', formatErrorMessage(error));
        }
      };
    } catch (error) {
      console.error('Error setting up network event listeners:', formatErrorMessage(error));
      // Fall back to offline mode if we can't set up the listeners
      onOffline();
      return () => {};
    }
  }, [onOnline, onOffline]);
};

