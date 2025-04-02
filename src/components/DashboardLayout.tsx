
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "./ui/sheet";

interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "client" | "partner" | "admin";
}

const DashboardLayout = ({ children, type }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    // Logique de déconnexion ici
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full bg-white overflow-x-hidden">
      {/* Sidebar pour desktop */}
      {!isMobile && (
        <Sidebar type={type} onLogout={handleLogout} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <Header 
          type={type} 
          isMobile={isMobile} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        {/* Menu mobile */}
        {isMobile && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetContent side="left" className="p-0 w-[85vw] max-w-[290px]">
              <Sidebar type={type} onLogout={handleLogout} mobile={true} onMenuClose={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        )}
        
        <main className={`flex-1 overflow-hidden ${isMobile ? 'px-2 py-3' : 'p-6'} bg-white`}>
          <div className={`${isMobile ? 'mobile-view w-full overflow-x-hidden' : ''}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
