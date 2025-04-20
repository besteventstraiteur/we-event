
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import LoadingFallback from "@/components/LoadingFallback";
import { useDeviceType } from "@/hooks/use-mobile";
import GuestAccess from "@/pages/GuestAccess";
import PublicRoutes from '@/routes/PublicRoutes';
import PrivateRoutes from '@/routes/PrivateRoutes';
import NotFound from '@/pages/NotFound';
import RegisterPage from '@/pages/RegisterPage';

const AppRouter: React.FC = () => {
  const deviceType = useDeviceType();
  console.log('AppRouter rendering, deviceType:', deviceType);
  const isMobileInterface = deviceType === "mobile" || deviceType === "tablet";

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Default redirect to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
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
            <ProtectedRoute>
              <PrivateRoutes />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/partner/*" 
          element={
            <ProtectedRoute>
              <PrivateRoutes />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/client/*" 
          element={
            <ProtectedRoute>
              <PrivateRoutes />
            </ProtectedRoute>
          } 
        />

        {/* Public routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<PublicRoutes isMobileInterface={isMobileInterface} />} />
        
        {/* Catch any unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
