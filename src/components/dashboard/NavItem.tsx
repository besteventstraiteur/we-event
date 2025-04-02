
import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ href, icon, children, active }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        active
          ? "bg-vip-gray-100 text-vip-black font-medium"
          : "text-vip-gray-600 hover:text-vip-black hover:bg-vip-gray-100"
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default NavItem;
