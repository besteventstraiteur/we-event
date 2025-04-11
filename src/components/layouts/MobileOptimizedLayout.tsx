
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
      className={cn(
        "w-full max-w-full overflow-x-hidden",
        isMobile && "mobile-view px-3",
        fullHeight && "min-h-[calc(100vh-4rem)]", // Reduce height to account for bottom nav
        className
      )}
    >
      {children}
    </div>
  );
};

export default MobileOptimizedLayout;
