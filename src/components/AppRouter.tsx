
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { shouldUseMobileInterface } from "@/utils/mobileDetection";
import { useLanguage } from "@/contexts/LanguageContext";

// Route components
import PublicRoutes from "@/routes/PublicRoutes";
import ClientRoutes from "@/routes/ClientRoutes";
import PartnerRoutes from "@/routes/PartnerRoutes";
import AdminRoutes from "@/routes/AdminRoutes";

// Contexte de carte pour les lieux
import { MapProvider } from "@/components/venues/map/MapContext";

interface AppRouterProps {}

const AppRouter: React.FC<AppRouterProps> = () => {
  const [isMobileInterface, setIsMobileInterface] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();
  
  useEffect(() => {
    // Détermine si nous devons afficher l'interface mobile
    const mobileInterface = shouldUseMobileInterface();
    setIsMobileInterface(mobileInterface);
  }, []);
  
  // Force le scroll en haut de la page lors des changements de route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <MapProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoutes isMobileInterface={isMobileInterface} />}>
          {/* The child routes are defined within PublicRoutes component */}
        </Route>
        
        {/* Client, Partner and Admin Routes */}
        <Route path="/client/*" element={<ClientRoutes />} />
        <Route path="/partner/*" element={<PartnerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </MapProvider>
  );
};

export default AppRouter;
