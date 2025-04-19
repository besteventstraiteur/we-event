
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LazyLoadingFallback } from "@/components/shared/LazyLoadingFallback";
import { UserRole } from "@/utils/accessControl";
import ProtectedRoute from "@/components/security/ProtectedRoute";

// Lazy loading client routes
const ClientRoutes = React.lazy(() => 
  import("@/routes/ClientRoutes" /* webpackChunkName: "client-routes" */)
);

// Lazy loading partner routes
const PartnerRoutes = React.lazy(() => 
  import("@/routes/PartnerRoutes" /* webpackChunkName: "partner-routes" */)
);

// Lazy loading admin routes
const AdminRoutes = React.lazy(() => 
  import("@/routes/AdminRoutes" /* webpackChunkName: "admin-routes" */)
);

const PrivateRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Client routes */}
      <Route 
        path="/client/*" 
        element={
          <ProtectedRoute requiredRole={UserRole.CLIENT}>
            <Suspense fallback={<LazyLoadingFallback />}>
              <ClientRoutes />
            </Suspense>
          </ProtectedRoute>
        } 
      />
      
      {/* Partner routes */}
      <Route 
        path="/partner/*" 
        element={
          <ProtectedRoute requiredRole={UserRole.PARTNER}>
            <Suspense fallback={<LazyLoadingFallback />}>
              <PartnerRoutes />
            </Suspense>
          </ProtectedRoute>
        } 
      />
      
      {/* Admin routes */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute requiredRole={UserRole.ADMIN}>
            <Suspense fallback={<LazyLoadingFallback />}>
              <AdminRoutes />
            </Suspense>
          </ProtectedRoute>
        } 
      />
      
      {/* Default route redirects to client dashboard */}
      <Route path="/*" element={<ClientRoutes />} />
    </Routes>
  );
};

export default PrivateRoutes;
