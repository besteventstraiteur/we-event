
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  // Déterminer la taille du texte en fonction de la prop size
  const textSizeClass = size === "small" 
    ? "text-xl" 
    : size === "large" 
      ? "text-3xl" 
      : "text-2xl";
  
  const badgeSizeClass = size === "small"
    ? "text-[10px] px-1"
    : size === "large"
      ? "text-sm px-2 py-1"
      : "text-xs px-1.5 py-0.5";

  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center">
        <div className={`${textSizeClass} font-bold`}>
          <span className="text-vip-black">Best</span>
          <span className="text-vip-gold">Events</span>
        </div>
        <div className={`ml-1 ${badgeSizeClass} bg-vip-gold text-vip-black font-bold rounded-sm`}>
          VIP
        </div>
      </div>
    </Link>
  );
};

export default Logo;
