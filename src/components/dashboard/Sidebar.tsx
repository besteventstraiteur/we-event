
import React from "react";
import { LogOut, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import WeEventLogo from "../WeEventLogo";
import ClientNavigation from "./ClientNavigation";
import PartnerNavigation from "./PartnerNavigation";
import AdminNavigation from "./AdminNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import LogoutButton from "../auth/LogoutButton";
import NavItem from "./NavItem";

interface SidebarProps {
  type: "client" | "partner" | "admin" | "guest";
  onLogout: () => void;
  mobile?: boolean;
  onMenuClose?: () => void;
}

const Sidebar = ({ type, onLogout, mobile = false, onMenuClose }: SidebarProps) => {
  const { t } = useLanguage();
  
  const getHomeRoute = () => {
    switch (type) {
      case "client":
        return "/client/dashboard";
      case "partner":
        return "/partner/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };
  
  return (
    <div className={`flex flex-col ${mobile ? 'w-full h-full' : 'hidden md:flex w-64'} border-r border-we-beige bg-gradient-to-b from-white to-we-gray-100 overflow-hidden`}>
      <div className="flex items-center justify-between p-4 border-b border-we-beige">
        <WeEventLogo asButton={true} />
        {mobile && onMenuClose && (
          <Button variant="ghost" size="sm" onClick={onMenuClose} className="p-0 h-8 w-8 text-we-gray-500 hover:text-we-gray-700">
            <X size={20} />
          </Button>
        )}
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto py-4">
        <NavItem
          href={getHomeRoute()}
          icon={<Home size={20} />}
          title={t('common.home')}
        />

        <div className="mt-4 mb-2">
          <div className="px-4 text-xs font-medium text-we-gray-500 uppercase tracking-wider">
            {t('common.navigation')}
          </div>
        </div>

        <nav className="space-y-1 flex-1 px-2">
          {type === "client" && <ClientNavigation />}
          {type === "partner" && <PartnerNavigation />}
          {type === "admin" && <AdminNavigation />}
        </nav>
      </div>

      <div className="p-4 border-t border-we-beige mt-auto">
        <LogoutButton 
          variant="outline"
          className="w-full justify-start h-11 text-we-gray-700 hover:text-we-green hover:bg-we-beige/50 border-we-beige transition-colors"
          showIcon={true}
        />
      </div>
    </div>
  );
};

export default Sidebar;
