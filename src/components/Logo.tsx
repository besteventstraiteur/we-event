
import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "h-6",
    medium: "h-8",
    large: "h-10"
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      <span className="text-amber-600 font-bold">VIP</span>
      <span className="text-gray-800 ml-1">Wedding</span>
    </div>
  );
};

export default Logo;
