
import React from "react";
import { Routes, Route } from "react-router-dom";

// Public pages
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterClientPage from "@/pages/RegisterClientPage";
import RegisterPartnerPage from "@/pages/RegisterPartnerPage";
import PartnersPage from "@/pages/PartnersPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import ContactPage from "@/pages/ContactPage";
import GuestDashboard from "@/pages/GuestDashboard";
import GuestMenuSelection from "@/pages/GuestMenuSelection";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import MobileAppHome from "@/pages/MobileAppHome";
import PartnerProfilePage from "@/pages/PartnerProfilePage";
import AuthCallback from "@/pages/AuthCallback";

interface PublicRoutesProps {
  isMobileInterface: boolean;
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({ isMobileInterface }) => {
  return (
    <Routes>
      <Route path="/" element={isMobileInterface ? <MobileAppHome /> : <HomePage />} />
      
      {/* Routes d'authentification */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-client" element={<RegisterClientPage />} />
      <Route path="/register-partner" element={<RegisterPartnerPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      {/* Routes publiques */}
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/partner/profile/:id" element={<PartnerProfilePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      
      {/* Routes invités */}
      <Route path="/guest" element={<GuestDashboard />} />
      <Route path="/guest/menu" element={<GuestMenuSelection />} />
      
      {/* Page 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
