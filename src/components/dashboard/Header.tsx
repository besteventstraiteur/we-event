
import React from "react";
import Logo from "../Logo";

interface HeaderProps {
  type: "client" | "partner" | "admin";
}

const Header = ({ type }: HeaderProps) => {
  return (
    <header className="border-b border-vip-gray-200 py-4 px-6 bg-white">
      <div className="flex items-center justify-between">
        <div className="md:hidden">
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
