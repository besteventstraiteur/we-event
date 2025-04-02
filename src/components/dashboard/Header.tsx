
import React from "react";
import Logo from "../Logo";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  type: "client" | "partner" | "admin";
  isMobile?: boolean;
  onMenuClick?: () => void;
}

const Header = ({ type, isMobile = false, onMenuClick }: HeaderProps) => {
  return (
    <header className="border-b border-vip-gray-200 py-4 px-4 sm:px-6 bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {isMobile ? (
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0" onClick={onMenuClick}>
            <Menu size={24} />
          </Button>
        ) : (
          <div className="w-10"></div>
        )}
        
        <div className="flex justify-center flex-1">
          <Logo />
        </div>
        
        <div className="flex items-center">
          <div className="text-sm text-vip-gray-600 hidden sm:block">
            {type === "client" && "Espace Client VIP"}
            {type === "partner" && "Espace Partenaire VIP"}
            {type === "admin" && "Administration"}
          </div>
          <div className="sm:hidden w-10"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
