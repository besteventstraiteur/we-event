
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
    <div className={`flex flex-col ${mobile ? 'w-full h-full' : 'hidden md:flex w-64'} border-r border-vip-gray-200 bg-gradient-to-b from-white to-gray-50 p-4 overflow-hidden`}>
      <div className="flex items-center justify-between mb-6 pl-3">
        <Logo asButton={true} />
        {mobile && onMenuClose && (
          <Button variant="ghost" size="sm" onClick={onMenuClose} className="p-0 h-8 w-8 text-vip-gray-500 hover:text-vip-gray-700">
            <X size={20} />
          </Button>
        )}
      </div>

      <div className="border-b border-vip-gray-200 w-full mb-4"></div>

      <nav className="space-y-1 flex-1 overflow-y-auto overflow-x-hidden px-1">
        {type === "client" && <ClientNavigation />}
        {type === "partner" && <PartnerNavigation />}
        {type === "admin" && <AdminNavigation />}
      </nav>

      <Button
        variant="outline"
        className="text-vip-gray-700 hover:text-vip-black hover:bg-vip-gray-100 w-full justify-start mt-auto border-vip-gray-200 h-11 transition-colors"
        onClick={onLogout}
      >
        <LogOut size={18} className="mr-2" />
        Déconnexion
      </Button>
    </div>
  );
};

export default Sidebar;
