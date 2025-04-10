
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  asButton?: boolean;
  size?: "small" | "medium" | "large";
  withText?: boolean;
}

const WeEventLogo: React.FC<LogoProps> = ({ 
  asButton = false,
  size = "medium",
  withText = true
}) => {
  // Définir les dimensions en fonction de la taille (doublées)
  const dimensions = {
    small: { logo: "h-12", text: "text-base" },
    medium: { logo: "h-16", text: "text-xl" },
    large: { logo: "h-20", text: "text-2xl" },
  };

  const LogoContent = (
    <div className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/b9084086-687c-4556-8914-cc674205a61c.png" 
        alt="We Event Logo" 
        className={`${dimensions[size].logo}`}
      />
    </div>
  );

  if (asButton) {
    return (
      <Link to="/" className="no-underline flex items-center">
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
};

export default WeEventLogo;
