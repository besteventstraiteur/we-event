
import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import LoadingFallback from "@/components/LoadingFallback";
import { useDeviceType } from "@/hooks/use-mobile";
import GuestAccess from "@/pages/GuestAccess";
import PublicRoutes from '@/routes/PublicRoutes';
import PrivateRoutes from '@/routes/PrivateRoutes';
import NotFound from '@/pages/NotFound';
import { useAuth } from "@/hooks/auth/useAuth";

const AppRouter: React.FC = () => {
  const deviceType = useDeviceType();
  const { isAuthenticated, user } = useAuth();
  const [isMobileInterface, setIsMobileInterface] = useState(
    deviceType === "mobile" || deviceType === "tablet"
  );

  useEffect(() => {
    setIsMobileInterface(deviceType === "mobile" || deviceType === "tablet");
  }, [deviceType]);

  // Debug auth state on router mount
  useEffect(() => {
    console.log("AppRouter - Auth state:", { isAuthenticated, user });
    
    // Listen for auth updates
    const handleAuthRefresh = () => {
      console.log("AppRouter - Auth refresh event detected");
    };
    
    window.addEventListener('auth-refresh', handleAuthRefresh);
    return () => {
      window.removeEventListener('auth-refresh', handleAuthRefresh);
    };
  }, [isAuthenticated, user]);

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

        {/* Debug route for unauthorized access */}
        <Route 
          path="/unauthorized" 
          element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
              <div className="p-8 bg-white rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Accès non autorisé</h1>
                <p className="mb-6">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
                <button 
                  onClick={() => window.history.back()} 
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Retour
                </button>
              </div>
            </div>
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
