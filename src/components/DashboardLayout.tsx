
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

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
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar pour desktop */}
      {!isMobile && (
        <Sidebar type={type} onLogout={handleLogout} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Header 
          type={type} 
          isMobile={isMobile} 
          onMenuClick={isMobile ? () => setSidebarOpen(true) : undefined} 
        />
        
        {/* Menu mobile */}
        {isMobile && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-0 absolute top-4 left-4" onClick={() => setSidebarOpen(true)}>
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[80vw] sm:max-w-xs">
              <Sidebar type={type} onLogout={handleLogout} mobile={true} onMenuClose={() => setSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        )}
        
        <main className={`flex-1 overflow-auto ${isMobile ? 'p-3' : 'p-6'} bg-white`}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
