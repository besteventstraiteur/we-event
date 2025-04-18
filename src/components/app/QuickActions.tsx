
import React from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MobileQuickAction } from './MobileQuickAction';
import { QuickMenuItem } from './QuickMenuItem';
import { toast } from '@/components/ui/toast';
import { User, Lock, LifeBuoy, Settings } from 'lucide-react';

interface QuickActionsProps {
  isInstallable: boolean;
  installPrompt: any;
  setInstallPrompt: (prompt: any) => void;
  setIsInstallable: (isInstallable: boolean) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  isInstallable,
  installPrompt,
  setInstallPrompt,
  setIsInstallable
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    
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
