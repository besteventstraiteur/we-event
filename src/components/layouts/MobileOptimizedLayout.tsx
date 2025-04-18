
import React, { ReactNode } from "react";
import { useDeviceType } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MobileOptimizedLayoutProps {
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({
  children,
  className,
  fullHeight = false,
}) => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  
  return (
    <div 
      role="main"
      aria-label="Contenu principal"
      className={cn(
        "w-full max-w-full overflow-x-hidden",
        isMobile && "mobile-view px-3",
        fullHeight && "min-h-screen",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MobileOptimizedLayout;
