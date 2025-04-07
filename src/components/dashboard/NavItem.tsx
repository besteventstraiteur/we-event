
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
          ? "bg-we-beige/50 text-we-green font-medium"
          : "text-we-gray-600 hover:text-we-green hover:bg-we-beige/30"
      }`}
    >
      <div className={`${isActive ? 'text-we-gold' : 'text-we-gray-500'}`}>
        {icon}
      </div>
      <span>{title || children}</span>
    </Link>
  );
};

export default NavItem;
