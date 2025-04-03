
import React, { useState } from "react";
import Logo from "../Logo";
import { Home, Menu, Bell, Search, ChevronLeft, User } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  type: "client" | "partner" | "admin";
  isMobile?: boolean;
  onMenuClick?: () => void;
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header = ({ 
  type, 
  isMobile = false, 
  onMenuClick, 
  title,
  showBackButton = false,
  onBackClick
}: HeaderProps) => {
  const actualIsMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Determine if we're on a native mobile platform
  const isNativeLike = actualIsMobile || isMobile;
  
  return (
    <header className="border-b border-vip-gray-200 py-3 px-3 sm:px-6 bg-white sticky top-0 z-10 w-full overflow-hidden shadow-sm">
      <div className="flex items-center justify-between max-w-full">
        {showBackButton && isNativeLike ? (
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 flex-shrink-0 text-vip-gray-700" onClick={onBackClick}>
            <ChevronLeft size={22} />
          </Button>
        ) : isNativeLike ? (
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 flex-shrink-0 text-vip-gray-700" onClick={onMenuClick}>
            <Menu size={22} />
          </Button>
        ) : (
          <div className="w-10 flex-shrink-0"></div>
        )}
        
        <div className="flex justify-center flex-1 overflow-hidden">
          {title && isNativeLike ? (
            <h1 className="text-lg font-medium truncate text-vip-gray-900">{title}</h1>
          ) : (
            <Logo asButton={true} />
          )}
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {isNativeLike && (
            <>
              <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-vip-gray-700 hover:bg-vip-gray-100">
                    <Search size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="pt-6 pb-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Rechercher..." 
                      className="w-full pl-9 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-vip-gold/50"
                      autoFocus
                    />
                  </div>
                </SheetContent>
              </Sheet>
              
              <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 relative text-vip-gray-700 hover:bg-vip-gray-100">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                </SheetTrigger>
                <SheetContent className="pt-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-vip-gray-900">Notifications</h2>
                    <div className="space-y-4">
                      <div className="p-3 bg-vip-gray-100 rounded-lg hover:bg-vip-gray-200 transition-colors cursor-pointer">
                        <div className="font-medium text-vip-gray-900">Nouvelle demande</div>
                        <div className="text-sm text-vip-gray-600">Vous avez reçu une demande de prix.</div>
                        <div className="text-xs text-vip-gray-500 mt-1">Il y a 2 heures</div>
                      </div>
                      <div className="p-3 bg-vip-gray-100 rounded-lg hover:bg-vip-gray-200 transition-colors cursor-pointer">
                        <div className="font-medium text-vip-gray-900">Rappel: Rendez-vous</div>
                        <div className="text-sm text-vip-gray-600">Visite du lieu de réception demain.</div>
                        <div className="text-xs text-vip-gray-500 mt-1">Il y a 1 jour</div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 text-vip-gray-700 hover:bg-vip-gray-100">
                <User size={20} />
              </Button>
            </>
          )}
          
          <div className="text-sm text-vip-gray-600 hidden sm:block">
            {type === "client" && "Espace Client VIP"}
            {type === "partner" && "Espace Partenaire VIP"}
            {type === "admin" && "Administration"}
          </div>
          {isNativeLike && <div className="sm:hidden w-1"></div>}
        </div>
      </div>
      
      {isNativeLike && (
        <div className="bottom-tabs fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 px-1 z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <TabButton icon={<Home size={20} />} label="Accueil" isActive={false} href="/client/dashboard" />
          <TabButton icon={<Bell size={20} />} label="Notifications" isActive={false} href="/client/notifications" />
          <TabButton icon={<Search size={20} />} label="Explorer" isActive={false} href="/client/explore" />
          <TabButton icon={<User size={20} />} label="Profil" isActive={false} href="/client/profile" />
        </div>
      )}
    </header>
  );
};

// Tab button component for mobile navigation
const TabButton = ({ icon, label, isActive, href }: { icon: React.ReactNode, label: string, isActive: boolean, href: string }) => {
  return (
    <a 
      href={href} 
      className={`flex flex-col items-center justify-center px-2 transition-colors ${isActive ? 'text-vip-gold' : 'text-vip-gray-500 hover:text-vip-gray-700'}`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </a>
  );
};

export default Header;
