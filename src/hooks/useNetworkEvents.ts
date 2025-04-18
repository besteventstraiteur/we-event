
import { useEffect } from 'react';
import { NetworkError, formatNetworkError } from '@/utils/networkErrorTypes';

interface NetworkEventsProps {
  onOnline: () => void;
  onOffline: () => void;
  onError?: (error: unknown) => void;
}

export const useNetworkEvents = ({ onOnline, onOffline, onError }: NetworkEventsProps) => {
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
        const networkError = new NetworkError(
          'Failed to update network status',
          'CONNECTION_LOST',
          error
        );
        console.error('Error updating network status:', formatNetworkError(networkError));
        onError?.(networkError);
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
          const networkError = new NetworkError(
            'Failed to remove network event listeners',
            'UNKNOWN_ERROR',
            error
          );
          console.error('Error removing event listeners:', formatNetworkError(networkError));
          onError?.(networkError);
        }
      };
    } catch (error) {
      const networkError = new NetworkError(
        'Failed to set up network event listeners',
        'UNKNOWN_ERROR',
        error
      );
      console.error('Error setting up event listeners:', formatNetworkError(networkError));
      onError?.(networkError);
      onOffline();
      return () => {};
    }
  }, [onOnline, onOffline, onError]);
};

