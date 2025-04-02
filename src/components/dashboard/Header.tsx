
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
    <header className="border-b border-vip-gray-200 py-4 px-4 sm:px-6 bg-white">
      <div className="flex items-center justify-between">
        {isMobile ? (
          <div className="w-10">
            {onMenuClick && (
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0" onClick={onMenuClick}>
                <Menu size={24} />
              </Button>
            )}
          </div>
        ) : (
          <div></div>
        )}
        
        <div className={`${isMobile ? 'flex justify-center flex-1' : 'hidden'} md:flex`}>
          <Logo />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-vip-gray-600">
            {type === "client" && "Espace Client VIP"}
            {type === "partner" && "Espace Partenaire VIP"}
            {type === "admin" && "Administration"}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
