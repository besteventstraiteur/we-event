
import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { shouldUseMobileInterface } from "@/utils/mobileDetection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

// Lazy loading des routes principales
const PublicRoutes = React.lazy(() => import("@/routes/PublicRoutes"));
const ClientRoutes = React.lazy(() => import("@/routes/ClientRoutes"));
const PartnerRoutes = React.lazy(() => import("@/routes/PartnerRoutes"));
const AdminRoutes = React.lazy(() => import("@/routes/AdminRoutes"));

// Contexte de carte pour les lieux
import { MapProvider } from "@/components/venues/map/MapContext";

// Composant de chargement
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <span className="ml-2 text-lg font-medium">Chargement...</span>
  </div>
);

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
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes - using path="/*" to properly handle all nested routes */}
          <Route path="/*" element={<PublicRoutes isMobileInterface={isMobileInterface} />} />
          
          {/* Client, Partner and Admin Routes */}
          <Route path="/client/*" element={<ClientRoutes />} />
          <Route path="/partner/*" element={<PartnerRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Suspense>
    </MapProvider>
  );
};

export default AppRouter;
