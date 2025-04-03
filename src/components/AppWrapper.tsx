
import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { useIsMobile, useDeviceType, useOrientation } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Bell, Search, User, Lock, Settings, LifeBuoy, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isNative, setIsNative] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const isMobile = useIsMobile();
  const deviceType = useDeviceType();
  const orientation = useOrientation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  
  useEffect(() => {
    // Check if app is running as native application
    setIsNative(Capacitor.isNativePlatform());
    
    // Disable zoom on mobile
    if (isMobile) {
      const metaViewport = document.querySelector('meta[name=viewport]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }
      
      // Disable horizontal scrolling at the document level
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
    }

    // Online/offline detection
    const handleOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        toast({
          variant: "destructive",
          title: "Hors ligne",
          description: "Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent être limitées."
        });
      } else if (online) {
        toast({
          title: "En ligne",
          description: "Votre connexion a été rétablie."
        });
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    // Check for PWA installability
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setInstallPrompt(e);
      // Update UI to notify the user they can install the PWA
      setIsInstallable(true);
    });
    
    // Set initial online status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      window.removeEventListener('beforeinstallprompt', () => {});
    };
  }, [isMobile]);

  // Show offline notification
  const renderOfflineNotification = () => {
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

  // Install PWA handler
  const handleInstallClick = () => {
    if (!installPrompt) return;
    
    // Show the install prompt
    installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    installPrompt.userChoice.then((choiceResult: {outcome: string}) => {
      if (choiceResult.outcome === 'accepted') {
        toast({
          title: "Installation réussie",
          description: "L'application a été installée sur votre appareil."
        });
      }
      setInstallPrompt(null);
    });
    
    setIsInstallable(false);
  };

  // Create quick actions menu for mobile
  const renderQuickActions = () => {
    if (!isMobile) return null;
    
    return (
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg h-12 w-12 bg-white"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-xl max-h-[80vh]">
          <div className="py-4">
            <h3 className="font-medium text-lg mb-4">Menu rapide</h3>
            
            {isInstallable && (
              <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Installer l'application</h4>
                    <p className="text-sm text-gray-500">Accès rapide depuis votre écran d'accueil</p>
                  </div>
                  <Button onClick={handleInstallClick} size="sm">
                    Installer
                  </Button>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <MobileQuickAction icon="home" label="Accueil" href="/client/dashboard" />
              <MobileQuickAction icon="users" label="Invités" href="/client/guests" />
              <MobileQuickAction icon="layout-grid" label="Plan de table" href="/client/floor-plans" />
              <MobileQuickAction icon="check-square" label="Tâches" href="/client/tasks" />
              <MobileQuickAction icon="shopping-cart" label="Budget" href="/client/budget" />
              <MobileQuickAction icon="calendar" label="Planning" href="/client/todo" />
              <MobileQuickAction icon="message-square" label="Messages" href="/client/requests" />
              <MobileQuickAction icon="image" label="Photos" href="/client/photos" />
              <MobileQuickAction icon="settings" label="Paramètres" href="/client/security" />
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Compte</h4>
              <QuickMenuItem icon={<User size={18} />} label="Mon profil" href="/client/profile" />
              <QuickMenuItem icon={<Lock size={18} />} label="Sécurité" href="/client/security" />
              <QuickMenuItem icon={<LifeBuoy size={18} />} label="Assistance" href="/help" />
              <QuickMenuItem icon={<Settings size={18} />} label="Paramètres" href="/settings" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <div className={`app-container ${isNative ? 'native-app' : 'web-app'} ${isMobile ? 'mobile-view' : ''} ${orientation === 'portrait' ? 'portrait' : 'landscape'} w-full max-w-full overflow-x-hidden`}>
      {/* Status bar spacer for native apps */}
      {isNative && (
        <div className="status-bar-spacer h-6 bg-white w-full"></div>
      )}
      
      {renderOfflineNotification()}
      {renderQuickActions()}
      {children}
    </div>
  );
};

// Helper component for quick action buttons
const MobileQuickAction = ({ icon, label, href }: { icon: string, label: string, href: string }) => {
  let IconComponent;
  
  // Import the right icon based on name
  switch (icon) {
    case 'home': 
      IconComponent = () => <Home size={20} />;
      break;
    case 'users': 
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
      break;
    case 'layout-grid':
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
      break;
    case 'check-square':
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>;
      break;
    case 'shopping-cart':
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
      break;
    case 'calendar':
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
      break;
    case 'message-square':
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
      break;
    case 'image':
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>;
      break;
    case 'settings':
      IconComponent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
      break;
    default:
      IconComponent = () => <Home size={20} />;
  }

  return (
    <a href={href} className="flex flex-col items-center justify-center space-y-2 p-3 hover:bg-gray-100 rounded-lg">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
        <IconComponent />
      </div>
      <span className="text-xs text-center font-medium">{label}</span>
    </a>
  );
};

// Quick menu item component with chevron
const QuickMenuItem = ({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) => {
  return (
    <a href={href} className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight size={16} className="text-gray-400" />
    </a>
  );
};

export default AppWrapper;
