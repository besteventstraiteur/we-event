
import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { shouldUseMobileInterface } from "@/utils/mobileDetection";
import { useLanguage } from "@/contexts/LanguageContext";
import LoadingFallback from "@/components/LoadingFallback";
import { MapProvider } from "@/components/venues/map/MapContext";

// Lazy loading des modules principaux
const PublicRoutes = React.lazy(() => import("@/routes/PublicRoutes"));
const ClientRoutes = React.lazy(() => import("@/routes/ClientRoutes"));
const PartnerRoutes = React.lazy(() => import("@/routes/PartnerRoutes"));
const AdminRoutes = React.lazy(() => import("@/routes/AdminRoutes"));

const AppRouter: React.FC = () => {
  const [isMobileInterface, setIsMobileInterface] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();
  
  useEffect(() => {
    const mobileInterface = shouldUseMobileInterface();
    setIsMobileInterface(mobileInterface);
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <MapProvider>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/*" element={<PublicRoutes isMobileInterface={isMobileInterface} />} />
          <Route path="/client/*" element={<ClientRoutes />} />
          <Route path="/partner/*" element={<PartnerRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Suspense>
    </MapProvider>
  );
};

export default AppRouter;
