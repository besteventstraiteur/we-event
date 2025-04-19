
import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { LazyLoadingFallback } from "@/components/shared/LazyLoadingFallback";
import { UserRole } from "@/utils/accessControl";
import LoadingFallback from "@/components/LoadingFallback";
import NotFound from "@/pages/NotFound";

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
  const location = useLocation();
  const path = location.pathname;
  
  // Determine which route type to render based on the path
  if (path.startsWith('/admin')) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <AdminRoutes />
      </Suspense>
    );
  } else if (path.startsWith('/partner')) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <PartnerRoutes />
      </Suspense>
    );
  } else if (path.startsWith('/client')) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <ClientRoutes />
      </Suspense>
    );
  }
  
  // Fallback for any other paths
  return <NotFound />;
};

export default PrivateRoutes;
