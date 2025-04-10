
import React, { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileAppWrapper from "@/components/mobile/MobileAppWrapper";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "client" | "partner" | "admin";
}

const MobileDashboardLayout: React.FC<DashboardLayoutProps> = ({ children, type }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    // Utiliser notre service d'authentification
    logout();
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  return (
    <MobileAppWrapper type={type}>
      <div className="flex h-screen overflow-hidden bg-white">
        {/* Sidebar pour Desktop */}
        {!isMobile && (
          <Sidebar type={type} onLogout={handleLogout} />
        )}
        
        {/* Menu latéral pour Mobile */}
        {isMobile && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="p-0 w-[280px]">
              <Sidebar 
                type={type} 
                onLogout={handleLogout} 
                mobile={true} 
                onMenuClose={() => setSidebarOpen(false)}
              />
            </SheetContent>
          </Sheet>
        )}
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header 
            type={type} 
            isMobile={isMobile} 
            onMenuClick={toggleSidebar}
          />
          
          <main className="flex-1 overflow-y-auto p-4 bg-white">
            <div className="container mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </MobileAppWrapper>
  );
};

export default MobileDashboardLayout;
