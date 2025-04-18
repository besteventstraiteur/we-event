
import React from 'react';
import { toast } from '@/components/ui/toast';

export const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = React.useState(true);

  React.useEffect(() => {
    const handleOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        toast({
          variant: "destructive",
          title: "Hors ligne",
          description: "Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent être limitées."
        });
      } else {
        toast({
          title: "En ligne",
          description: "Votre connexion a été rétablie."
        });
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="fixed bottom-4 left-0 right-0 mx-auto w-max z-50">
        <div className="bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center">
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
          Mode hors-ligne - Certaines fonctionnalités peuvent être limitées
        </div>
      </div>
    );
  }

  return null;
};
