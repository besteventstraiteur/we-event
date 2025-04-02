
import React from "react";
import { LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import ClientNavigation from "./ClientNavigation";
import PartnerNavigation from "./PartnerNavigation";
import AdminNavigation from "./AdminNavigation";

interface SidebarProps {
  type: "client" | "partner" | "admin";
  onLogout: () => void;
  mobile?: boolean;
  onMenuClose?: () => void;
}

const Sidebar = ({ type, onLogout, mobile = false, onMenuClose }: SidebarProps) => {
  return (
    <div className={`flex flex-col ${mobile ? 'w-full h-full' : 'hidden md:flex w-64'} border-r border-vip-gray-200 bg-white p-4 overflow-hidden`}>
      <div className="flex items-center justify-between mb-8 pl-3">
        <Logo />
        {mobile && onMenuClose && (
          <Button variant="ghost" size="sm" onClick={onMenuClose} className="p-0 h-8 w-8">
            <X size={20} />
          </Button>
        )}
      </div>

      <nav className="space-y-1 flex-1 overflow-y-auto overflow-x-hidden">
        {type === "client" && <ClientNavigation />}
        {type === "partner" && <PartnerNavigation />}
        {type === "admin" && <AdminNavigation />}
      </nav>

      <Button
        variant="outline"
        className="text-vip-gray-700 hover:text-vip-black hover:bg-vip-gray-100 w-full justify-start mt-auto border-vip-gray-200 h-11"
        onClick={onLogout}
      >
        <LogOut size={18} className="mr-2" />
        Déconnexion
      </Button>
    </div>
  );
};

export default Sidebar;
