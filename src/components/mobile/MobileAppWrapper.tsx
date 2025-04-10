
import React from "react";

interface MobileAppWrapperProps {
  children: React.ReactNode;
  type: "client" | "partner" | "admin";
}

const MobileAppWrapper: React.FC<MobileAppWrapperProps> = ({ children, type }) => {
  // Add any mobile-specific setup here
  return (
    <div className="mobile-app-wrapper" data-app-type={type}>
      {children}
    </div>
  );
};

export default MobileAppWrapper;
