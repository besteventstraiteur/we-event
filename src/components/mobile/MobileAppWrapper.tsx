
import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";
import { useDeviceType } from "@/hooks/use-mobile";
import { useTouchGestures } from "@/hooks/use-touch-gestures";
import MobileFormOptimizer from "./MobileFormOptimizer";

interface MobileAppWrapperProps {
  children: React.ReactNode;
  type: "client" | "partner" | "admin" | "guest";
  hasBottomNav?: boolean;
}

const MobileAppWrapper: React.FC<MobileAppWrapperProps> = ({ 
  children, 
  type,
  hasBottomNav = true
}) => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile' || deviceType === 'tablet';
  const containerRef = useRef<HTMLDivElement>(null);
  const { swiping, direction } = useTouchGestures(containerRef);
  const location = useLocation();
  
  // Si ce n'est pas un appareil mobile, simplement retourner les enfants
  if (!isMobile) {
    return <>{children}</>;
  }
  
  return (
    <div 
      ref={containerRef}
      className="mobile-view min-h-screen bg-white overflow-x-hidden"
    >
      <div className={`${hasBottomNav ? 'pb-16' : ''}`}>
        {/* Applique l'optimisateur de formulaire à tout le contenu */}
        <MobileFormOptimizer className="min-h-screen">
          {children}
        </MobileFormOptimizer>
        
        {/* Ajoute la navigation mobile */}
        {hasBottomNav && <MobileNavigation type={type} />}
      </div>
    </div>
  );
};

export default MobileAppWrapper;
