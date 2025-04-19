import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileAppWrapper from "@/components/mobile/MobileAppWrapper";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "client" | "partner" | "admin" | "guest";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, type }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { logout } = useAuth();
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  // If mobile, use the mobile-optimized layout
  if (isMobile) {
    return (
      <MobileAppWrapper type={type}>
        <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-gray-50">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="p-0 w-[280px] border-r shadow-lg">
              <Sidebar 
                type={type} 
                onLogout={logout} 
                mobile={true} 
                onMenuClose={() => setSidebarOpen(false)}
              />
            </SheetContent>
          </Sheet>
          
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header 
              type={type === "guest" ? "client" : type} 
              isMobile={true} 
              onMenuClick={toggleSidebar}
            />
            
            <main className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-gray-50">
              <div className="container mx-auto px-4 py-6">
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
      <Sidebar type={type} onLogout={logout} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header type={type === "guest" ? "client" : type} />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-white to-gray-50">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
