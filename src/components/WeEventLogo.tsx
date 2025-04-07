
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
  // Définir les dimensions en fonction de la taille
  const dimensions = {
    small: { logo: "h-6 w-6", text: "text-base" },
    medium: { logo: "h-8 w-8", text: "text-xl" },
    large: { logo: "h-10 w-10", text: "text-2xl" },
  };

  const LogoContent = (
    <div className="flex items-center gap-2">
      <div className={`${dimensions[size].logo} relative flex items-center justify-center rounded-full border-2 border-we-gold bg-we-white`}>
        <div className="absolute">
          <svg className={`${dimensions[size].logo} text-we-gold`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              fill="none"
            />
            <path 
              d="M7 9L9 15M9 9L11 15M13 9C13 9 15 9 15 11C15 13 13 13 13 13C13 13 15 13 15 15C15 17 13 17 13 17M17 9V17" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" 
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
            />
          </svg>
        </div>
      </div>
      
      {withText && (
        <span className={`font-display font-medium ${dimensions[size].text} tracking-wide text-we-green`}>
          We <span className="text-we-gold">Event</span>
        </span>
      )}
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
