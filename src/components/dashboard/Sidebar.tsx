
import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import ClientNavigation from "./ClientNavigation";
import PartnerNavigation from "./PartnerNavigation";
import AdminNavigation from "./AdminNavigation";

interface SidebarProps {
  type: "client" | "partner" | "admin";
  onLogout: () => void;
}

const Sidebar = ({ type, onLogout }: SidebarProps) => {
  return (
    <div className="hidden md:flex flex-col w-64 border-r border-vip-gray-200 bg-white p-4">
      <div className="mb-8 pl-3">
        <Logo />
      </div>

      <nav className="space-y-1 flex-1">
        {type === "client" && <ClientNavigation />}
        {type === "partner" && <PartnerNavigation />}
        {type === "admin" && <AdminNavigation />}
      </nav>

      <Button
        variant="outline"
        className="text-vip-gray-700 hover:text-vip-black hover:bg-vip-gray-100 w-full justify-start mt-auto border-vip-gray-200"
        onClick={onLogout}
      >
        <LogOut size={18} className="mr-2" />
        Déconnexion
      </Button>
    </div>
  );
};

export default Sidebar;
