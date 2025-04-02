
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
    <header className="border-b border-vip-gray-200 py-3 px-3 sm:px-6 bg-white sticky top-0 z-10 w-full overflow-hidden">
      <div className="flex items-center justify-between max-w-full">
        {isMobile ? (
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 flex-shrink-0" onClick={onMenuClick}>
            <Menu size={22} />
          </Button>
        ) : (
          <div className="w-10 flex-shrink-0"></div>
        )}
        
        <div className="flex justify-center flex-1 overflow-hidden">
          <Logo asButton={true} />
        </div>
        
        <div className="flex items-center flex-shrink-0">
          <div className="text-sm text-vip-gray-600 hidden sm:block">
            {type === "client" && "Espace Client VIP"}
            {type === "partner" && "Espace Partenaire VIP"}
            {type === "admin" && "Administration"}
          </div>
          <div className="sm:hidden w-9"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
