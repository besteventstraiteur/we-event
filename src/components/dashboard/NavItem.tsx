
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ href, icon, title, children, active: propActive }: NavItemProps) => {
  const location = useLocation();
  const isActive = propActive || location.pathname === href;
  
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
        isActive
          ? "bg-vip-gold/10 text-vip-gold font-medium"
          : "text-vip-gray-600 hover:text-vip-gray-900 hover:bg-vip-gray-100"
      }`}
    >
      <div className={`${isActive ? 'text-vip-gold' : 'text-vip-gray-500'}`}>
        {icon}
      </div>
      <span>{title || children}</span>
    </Link>
  );
};

export default NavItem;
