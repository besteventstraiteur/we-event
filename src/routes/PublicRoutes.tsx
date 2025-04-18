
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingFallback from "@/components/LoadingFallback";

// Lazy loading des composants publics
const HomePage = React.lazy(() => import("@/pages/HomePage"));
const LoginPage = React.lazy(() => import("@/pages/LoginPage"));
const RegisterClientPage = React.lazy(() => import("@/pages/RegisterClientPage"));
const RegisterPartnerPage = React.lazy(() => import("@/pages/RegisterPartnerPage"));
const PartnersPage = React.lazy(() => import("@/pages/PartnersPage"));
const PrivacyPage = React.lazy(() => import("@/pages/PrivacyPage"));
const TermsPage = React.lazy(() => import("@/pages/TermsPage"));
const ContactPage = React.lazy(() => import("@/pages/ContactPage"));
const GuestDashboard = React.lazy(() => import("@/pages/GuestDashboard"));
const GuestMenuSelection = React.lazy(() => import("@/pages/GuestMenuSelection"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const Unauthorized = React.lazy(() => import("@/pages/Unauthorized"));
const MobileAppHome = React.lazy(() => import("@/pages/MobileAppHome"));
const PartnerProfilePage = React.lazy(() => import("@/pages/PartnerProfilePage"));
const AuthCallback = React.lazy(() => import("@/pages/AuthCallback"));

interface PublicRoutesProps {
  isMobileInterface: boolean;
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({ isMobileInterface }) => {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<LoadingFallback />}>
          {isMobileInterface ? <MobileAppHome /> : <HomePage />}
        </Suspense>
      } />
      
      <Route path="/login" element={
        <Suspense fallback={<LoadingFallback />}>
          <LoginPage />
        </Suspense>
      } />
      <Route path="/register-client" element={
        <Suspense fallback={<LoadingFallback />}>
          <RegisterClientPage />
        </Suspense>
      } />
      <Route path="/register-partner" element={
        <Suspense fallback={<LoadingFallback />}>
          <RegisterPartnerPage />
        </Suspense>
      } />
      <Route path="/auth/callback" element={
        <Suspense fallback={<LoadingFallback />}>
          <AuthCallback />
        </Suspense>
      } />
      
      <Route path="/partners" element={
        <Suspense fallback={<LoadingFallback />}>
          <PartnersPage />
        </Suspense>
      } />
      <Route path="/partner/profile/:id" element={
        <Suspense fallback={<LoadingFallback />}>
          <PartnerProfilePage />
        </Suspense>
      } />
      <Route path="/privacy" element={
        <Suspense fallback={<LoadingFallback />}>
          <PrivacyPage />
        </Suspense>
      } />
      <Route path="/terms" element={
        <Suspense fallback={<LoadingFallback />}>
          <TermsPage />
        </Suspense>
      } />
      <Route path="/contact" element={
        <Suspense fallback={<LoadingFallback />}>
          <ContactPage />
        </Suspense>
      } />
      <Route path="/unauthorized" element={
        <Suspense fallback={<LoadingFallback />}>
          <Unauthorized />
        </Suspense>
      } />
      
      <Route path="/guest" element={
        <Suspense fallback={<LoadingFallback />}>
          <GuestDashboard />
        </Suspense>
      } />
      <Route path="/guest/menu" element={
        <Suspense fallback={<LoadingFallback />}>
          <GuestMenuSelection />
        </Suspense>
      } />
      
      <Route path="*" element={
        <Suspense fallback={<LoadingFallback />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  );
};

export default PublicRoutes;
