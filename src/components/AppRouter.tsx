
import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import LoadingFallback from "@/components/LoadingFallback";
import { useDeviceType } from "@/hooks/use-mobile";
import GuestAccess from "@/pages/GuestAccess";
import PublicRoutes from '@/routes/PublicRoutes';
import PrivateRoutes from '@/routes/PrivateRoutes';
import NotFound from '@/pages/NotFound';

const AppRouter: React.FC = () => {
  const deviceType = useDeviceType();
  const [isMobileInterface, setIsMobileInterface] = useState(
    deviceType === "mobile" || deviceType === "tablet"
  );

  useEffect(() => {
    setIsMobileInterface(deviceType === "mobile" || deviceType === "tablet");
  }, [deviceType]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public guest access route */}
        <Route 
          path="/guest" 
          element={
            <GuestAccess />
          } 
        />

        {/* Handle all private routes */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute requiredRole="admin">
              <PrivateRoutes />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/partner/*" 
          element={
            <ProtectedRoute requiredRole="partner">
              <PrivateRoutes />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/client/*" 
          element={
            <ProtectedRoute requiredRole="client">
              <PrivateRoutes />
            </ProtectedRoute>
          } 
        />

        {/* Public routes */}
        <Route path="/*" element={<PublicRoutes isMobileInterface={isMobileInterface} />} />
        
        {/* Catch any unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
