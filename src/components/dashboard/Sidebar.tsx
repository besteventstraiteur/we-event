
import React from "react";
import { LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import WeEventLogo from "../WeEventLogo";
import ClientNavigation from "./ClientNavigation";
import PartnerNavigation from "./PartnerNavigation";
import AdminNavigation from "./AdminNavigation";
import { useLanguage } from "@/contexts/LanguageContext";

interface SidebarProps {
  type: "client" | "partner" | "admin";
  onLogout: () => void;
  mobile?: boolean;
  onMenuClose?: () => void;
}

const Sidebar = ({ type, onLogout, mobile = false, onMenuClose }: SidebarProps) => {
  const { t } = useLanguage();
  
  return (
    <div className={`flex flex-col ${mobile ? 'w-full h-full' : 'hidden md:flex w-64'} border-r border-we-beige bg-gradient-to-b from-white to-we-gray-100 p-4 overflow-hidden`}>
      <div className="flex items-center justify-between mb-6 pl-3">
        <WeEventLogo asButton={true} />
        {mobile && onMenuClose && (
          <Button variant="ghost" size="sm" onClick={onMenuClose} className="p-0 h-8 w-8 text-we-gray-500 hover:text-we-gray-700">
            <X size={20} />
          </Button>
        )}
      </div>

      <div className="border-b border-we-beige w-full mb-4"></div>

      <nav className="space-y-1 flex-1 overflow-y-auto overflow-x-hidden px-1">
        {type === "client" && <ClientNavigation />}
        {type === "partner" && <PartnerNavigation />}
        {type === "admin" && <AdminNavigation />}
      </nav>

      <Button
        variant="outline"
        className="text-we-gray-700 hover:text-we-green hover:bg-we-beige/50 w-full justify-start mt-auto border-we-beige h-11 transition-colors"
        onClick={onLogout}
      >
        <LogOut size={18} className="mr-2" />
        {t('common.logout')}
      </Button>
    </div>
  );
};

export default Sidebar;
