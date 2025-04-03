
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileAppWrapper from "@/components/mobile/MobileAppWrapper";

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "client" | "partner" | "admin";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, type }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    // Simulation de déconnexion - redirection vers la page de connexion
    navigate("/login");
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  // If mobile, use the mobile-optimized layout
  if (isMobile) {
    return (
      <MobileAppWrapper type={type}>
        <div className="flex h-screen overflow-hidden bg-white">
          {/* Menu latéral pour Mobile */}
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
          
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header 
              type={type} 
              isMobile={true} 
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
  }
  
  // Desktop layout
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar type={type} onLogout={handleLogout} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header type={type} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-vip-gray-100">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
