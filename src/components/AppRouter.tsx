import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "@/components/security/ProtectedRoute";
import LoadingFallback from "@/components/shared/LazyLoadingFallback";
import { useDeviceType } from "@/hooks/use-mobile";
import GuestAccess from "@/pages/GuestAccess";
import PublicRoutes from '@/routes/PublicRoutes';
import PrivateRoutes from '@/routes/PrivateRoutes';

const AppRouter: React.FC = () => {
  const deviceType = useDeviceType();
  const [isMobileInterface, setIsMobileInterface] = useState(
    deviceType === "mobile" || deviceType === "tablet"
  );

  useEffect(() => {
    setIsMobileInterface(deviceType === "mobile" || deviceType === "tablet");
  }, [deviceType]);

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public guest access route */}
          <Route 
            path="/guest" 
            element={
              <GuestAccess />
            } 
          />

          <Route path="/*" element={<PublicRoutes isMobileInterface={isMobileInterface} />} />
          <Route element={<RequireAuth />}>
            <Route path="/app/*" element={<PrivateRoutes />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
