
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "small" | "medium" | "large";
  asButton?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", asButton = true }) => {
  const sizeClasses = {
    small: "h-6",
    medium: "h-8",
    large: "h-10"
  };

  const LogoContent = (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      <span className="text-amber-600 font-bold">VIP</span>
      <span className="text-gray-800 ml-1">Wedding</span>
    </div>
  );

  if (asButton) {
    return (
      <Link to="/" className="inline-flex hover:opacity-80 transition-opacity">
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
};

export default Logo;
