
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LazyLoadingFallback } from "@/components/shared/LazyLoadingFallback";
import HomePage from "@/pages/HomePage";

// Lazy loading with descriptive chunk names
const LoginPage = React.lazy(() =>
  import("@/pages/LoginPage" /* webpackChunkName: "login-page" */)
);

const RegisterClientPage = React.lazy(() =>
  import("@/pages/RegisterClientPage" /* webpackChunkName: "register-client" */)
);

const RegisterPartnerPage = React.lazy(() =>
  import("@/pages/RegisterPartnerPage" /* webpackChunkName: "register-partner" */)
);

const PartnersPage = React.lazy(() =>
  import("@/pages/PartnersPage" /* webpackChunkName: "partners-page" */)
);

const PartnerCategoryPage = React.lazy(() =>
  import("@/pages/PartnerCategoryPage" /* webpackChunkName: "partner-category-page" */)
);

const PrivacyPage = React.lazy(() =>
  import("@/pages/PrivacyPage" /* webpackChunkName: "privacy-page" */)
);

const TermsPage = React.lazy(() =>
  import("@/pages/TermsPage" /* webpackChunkName: "terms-page" */)
);

const ContactPage = React.lazy(() =>
  import("@/pages/ContactPage" /* webpackChunkName: "contact-page" */)
);

const NotFound = React.lazy(() =>
  import("@/pages/NotFound" /* webpackChunkName: "not-found" */)
);

const AuthCallback = React.lazy(() =>
  import("@/pages/AuthCallback" /* webpackChunkName: "auth-callback" */)
);

interface PublicRoutesProps {
  isMobileInterface: boolean;
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({ isMobileInterface }) => {
  console.log('PublicRoutes rendering, isMobileInterface:', isMobileInterface);
  
  return (
    <Routes>
      <Route
        path="/home"
        element={<HomePage />}
      />

      <Route
        path="/login"
        element={
          <Suspense fallback={<LazyLoadingFallback />}>
            <LoginPage />
          </Suspense>
        }
      />

      <Route
        path="/register-client"
        element={
          <Suspense fallback={<LazyLoadingFallback />}>
            <RegisterClientPage />
          </Suspense>
        }
      />

      <Route
        path="/register-partner"
        element={
          <Suspense fallback={<LazyLoadingFallback />}>
            <RegisterPartnerPage />
          </Suspense>
        }
      />

      <Route
        path="/auth/callback"
        element={
          <Suspense fallback={<LazyLoadingFallback />}>
            <AuthCallback />
          </Suspense>
        }
      />

      <Route
        path="/partners"
        element={
          <Suspense fallback={<LazyLoadingFallback />}>
            <PartnersPage />
          </Suspense>
        }
      />
      
      <Route
        path="/partners/:categoryId"
        element={
          <Suspense fallback={<LazyLoadingFallback />}>
            <PartnerCategoryPage />
          </Suspense>
        }
      />

      <Route
        path="/privacy"
        element={
          <Suspense fallback={<LazyLoadingFallback />}>
            <PrivacyPage />
          </Suspense>
        }
      />

      <Route
        path="/terms"
        element={
          <Suspense fallback={<LazyLoadingFallback />}>
            <TermsPage />
          </Suspense>
        }
      />

      <Route
        path="/contact"
        element={
          <Suspense fallback={<LazyLoadingFallback />}>
            <ContactPage />
          </Suspense>
        }
      />

      <Route
        path="*"
        element={
          <Suspense fallback={<LazyLoadingFallback />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default PublicRoutes;
