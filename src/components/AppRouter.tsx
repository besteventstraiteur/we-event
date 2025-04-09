
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { shouldUseMobileInterface } from "@/utils/mobileDetection";
import { useLanguage } from "@/contexts/LanguageContext";
import MobileAppHome from "@/pages/MobileAppHome";

// Importations des pages existantes
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import RegisterClientPage from "@/pages/RegisterClientPage";
import RegisterPartnerPage from "@/pages/RegisterPartnerPage";
import PartnersPage from "@/pages/PartnersPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import ContactPage from "@/pages/ContactPage";
import GuestDashboard from "@/pages/GuestDashboard";
import GuestMenuSelection from "@/pages/GuestMenuSelection";

// Importations des pages client
import ClientDashboard from "@/pages/client/ClientDashboard";
import ClientGuests from "@/pages/client/ClientGuests";
import ClientPartners from "@/pages/client/ClientPartners";
import ClientRequests from "@/pages/client/ClientRequests";
import ClientTodoList from "@/pages/client/ClientTodoList";
import ClientAccount from "@/pages/client/ClientAccount";
import ClientBudget from "@/pages/client/ClientBudget";
import ClientFloorPlans from "@/pages/client/ClientFloorPlans";
import ClientMenus from "@/pages/client/ClientMenus";
import ClientPayments from "@/pages/client/ClientPayments";
import ClientTasks from "@/pages/client/ClientTasks";
import ClientPhotos from "@/pages/client/ClientPhotos";
import ClientPinterbest from "@/pages/client/ClientPinterbest";
import ClientMusicPlaylists from "@/pages/client/ClientMusicPlaylists";
import ClientWeddingPackages from "@/pages/client/ClientWeddingPackages";
import ClientLiveStreaming from "@/pages/client/ClientLiveStreaming";
import ClientMiniSite from "@/pages/client/ClientMiniSite";
import ClientDayOfCommunication from "@/pages/client/ClientDayOfCommunication";
import ClientPodcasts from "@/pages/client/ClientPodcasts";
import ClientProjectDashboard from "@/pages/client/ClientProjectDashboard";
import ClientTalkshows from "@/pages/client/ClientTalkshows";
import ClientPartnerRatings from "@/pages/client/ClientPartnerRatings";
import TwoFactorSetup from "@/pages/client/TwoFactorSetup";
import AdvancedSecurity from "@/pages/client/AdvancedSecurity";

// Importation des pages partenaire
import PartnerDashboard from "@/pages/partner/PartnerDashboard";
import PartnerRequests from "@/pages/partner/PartnerRequests";
import PartnerCalendar from "@/pages/partner/PartnerCalendar";
import PartnerBestAwards from "@/pages/partner/PartnerBestAwards";
import PartnerGamification from "@/pages/partner/PartnerGamification";
import PartnerStats from "@/pages/partner/PartnerStats";
import PartnerMenus from "@/pages/partner/PartnerMenus";
import PartnerPlaylists from "@/pages/partner/PartnerPlaylists";
import PartnerPodcasts from "@/pages/partner/PartnerPodcasts";
import PartnerTalkshows from "@/pages/partner/PartnerTalkshows";
import PartnerRecommendations from "@/pages/partner/PartnerRecommendations";
import PartnerFloorPlans from "@/pages/partner/PartnerFloorPlans";
import PartnerLiveStreaming from "@/pages/partner/PartnerLiveStreaming";
import PartnerMusicPlaylists from "@/pages/partner/PartnerMusicPlaylists";
import PartnerPhotos from "@/pages/partner/PartnerPhotos";
import PartnerSubscription from "@/pages/partner/PartnerSubscription";
import PartnerTasks from "@/pages/partner/PartnerTasks";

// Importation des pages admin
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminClients from "@/pages/admin/AdminClients";
import AdminPartners from "@/pages/admin/AdminPartners";
import AdminGuests from "@/pages/admin/AdminGuests";
import AdminVenues from "@/pages/admin/AdminVenues";
import AdminKpiDashboard from "@/pages/admin/AdminKpiDashboard";
import AdminRatings from "@/pages/admin/AdminRatings";
import AdminRecommendations from "@/pages/admin/AdminRecommendations";
import AdminStatistics from "@/pages/admin/AdminStatistics";
import AdminSubscriptions from "@/pages/admin/AdminSubscriptions";
import AdminTalkshows from "@/pages/admin/AdminTalkshows";
import AdminPodcasts from "@/pages/admin/AdminPodcasts";
import AdminWeddingPackages from "@/pages/admin/AdminWeddingPackages";
import AdminPresentationManagement from "@/pages/admin/AdminPresentationManagement";
import AdminPartnerTypes from "@/pages/admin/AdminPartnerTypes";
import AdminPartnerGamification from "@/pages/admin/AdminPartnerGamification";
import AdminBackup from "@/pages/admin/AdminBackup";

// Composants de protection des routes
import ProtectedRoute from "@/components/security/ProtectedRoute";
import AdminRoute from "@/components/security/AdminRoute";
import PartnerTypeRoute from "@/components/security/PartnerTypeRoute";

// Contexte de carte pour les lieux
import { MapProvider } from "@/components/venues/map/MapContext";
import { UserRole } from "@/utils/accessControl";

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
      <Routes>
        {/* Page d'accueil - redirige vers la version mobile si nécessaire */}
        <Route 
          path="/" 
          element={isMobileInterface ? <MobileAppHome /> : <HomePage />} 
        />
        
        {/* Routes d'authentification */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-client" element={<RegisterClientPage />} />
        <Route path="/register-partner" element={<RegisterPartnerPage />} />
        
        {/* Routes publiques */}
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Routes invités */}
        <Route path="/guest" element={<GuestDashboard />} />
        <Route path="/guest/menu" element={<GuestMenuSelection />} />
        
        {/* Routes client protégées - Fix: properly protecting individual routes */}
        <Route path="/client/dashboard" element={<ProtectedRoute role="client"><ClientDashboard /></ProtectedRoute>} />
        <Route path="/client/guests" element={<ProtectedRoute role="client"><ClientGuests /></ProtectedRoute>} />
        <Route path="/client/partners" element={<ProtectedRoute role="client"><ClientPartners /></ProtectedRoute>} />
        <Route path="/client/requests" element={<ProtectedRoute role="client"><ClientRequests /></ProtectedRoute>} />
        <Route path="/client/todo" element={<ProtectedRoute role="client"><ClientTodoList /></ProtectedRoute>} />
        <Route path="/client/account" element={<ProtectedRoute role="client"><ClientAccount /></ProtectedRoute>} />
        <Route path="/client/budget" element={<ProtectedRoute role="client"><ClientBudget /></ProtectedRoute>} />
        <Route path="/client/floor-plans" element={<ProtectedRoute role="client"><ClientFloorPlans /></ProtectedRoute>} />
        <Route path="/client/menus" element={<ProtectedRoute role="client"><ClientMenus /></ProtectedRoute>} />
        <Route path="/client/payments" element={<ProtectedRoute role="client"><ClientPayments /></ProtectedRoute>} />
        <Route path="/client/tasks" element={<ProtectedRoute role="client"><ClientTasks /></ProtectedRoute>} />
        <Route path="/client/photos" element={<ProtectedRoute role="client"><ClientPhotos /></ProtectedRoute>} />
        <Route path="/client/pinterbest" element={<ProtectedRoute role="client"><ClientPinterbest /></ProtectedRoute>} />
        <Route path="/client/playlists" element={<ProtectedRoute role="client"><ClientMusicPlaylists /></ProtectedRoute>} />
        <Route path="/client/wedding-packages" element={<ProtectedRoute role="client"><ClientWeddingPackages /></ProtectedRoute>} />
        <Route path="/client/live-streaming" element={<ProtectedRoute role="client"><ClientLiveStreaming /></ProtectedRoute>} />
        <Route path="/client/mini-site" element={<ProtectedRoute role="client"><ClientMiniSite /></ProtectedRoute>} />
        <Route path="/client/day-of" element={<ProtectedRoute role="client"><ClientDayOfCommunication /></ProtectedRoute>} />
        <Route path="/client/podcasts" element={<ProtectedRoute role="client"><ClientPodcasts /></ProtectedRoute>} />
        <Route path="/client/project-dashboard" element={<ProtectedRoute role="client"><ClientProjectDashboard /></ProtectedRoute>} />
        <Route path="/client/talkshows" element={<ProtectedRoute role="client"><ClientTalkshows /></ProtectedRoute>} />
        <Route path="/client/ratings" element={<ProtectedRoute role="client"><ClientPartnerRatings /></ProtectedRoute>} />
        <Route path="/client/security/two-factor" element={<ProtectedRoute role="client"><TwoFactorSetup /></ProtectedRoute>} />
        <Route path="/client/security" element={<ProtectedRoute role="client"><AdvancedSecurity /></ProtectedRoute>} />
        
        {/* Routes partenaire protégées - Fix: properly protecting individual routes */}
        <Route path="/partner/dashboard" element={<ProtectedRoute role="partner"><PartnerDashboard /></ProtectedRoute>} />
        <Route path="/partner/requests" element={<ProtectedRoute role="partner"><PartnerRequests /></ProtectedRoute>} />
        <Route path="/partner/calendar" element={<ProtectedRoute role="partner"><PartnerCalendar /></ProtectedRoute>} />
        <Route path="/partner/best-awards" element={<ProtectedRoute role="partner"><PartnerBestAwards /></ProtectedRoute>} />
        <Route path="/partner/gamification" element={<ProtectedRoute role="partner"><PartnerGamification /></ProtectedRoute>} />
        <Route path="/partner/stats" element={<ProtectedRoute role="partner"><PartnerStats /></ProtectedRoute>} />
        <Route path="/partner/menus" element={<ProtectedRoute role="partner"><PartnerMenus /></ProtectedRoute>} />
        <Route path="/partner/playlists" element={<ProtectedRoute role="partner"><PartnerPlaylists /></ProtectedRoute>} />
        <Route path="/partner/podcasts" element={<ProtectedRoute role="partner"><PartnerPodcasts /></ProtectedRoute>} />
        <Route path="/partner/talkshows" element={<ProtectedRoute role="partner"><PartnerTalkshows /></ProtectedRoute>} />
        <Route path="/partner/recommendations" element={<ProtectedRoute role="partner"><PartnerRecommendations /></ProtectedRoute>} />
        <Route path="/partner/floor-plans" element={<ProtectedRoute role="partner"><PartnerFloorPlans /></ProtectedRoute>} />
        <Route path="/partner/live-streaming" element={<ProtectedRoute role="partner"><PartnerLiveStreaming /></ProtectedRoute>} />
        <Route path="/partner/music-playlists" element={<ProtectedRoute role="partner"><PartnerMusicPlaylists /></ProtectedRoute>} />
        <Route path="/partner/photos" element={<ProtectedRoute role="partner"><PartnerPhotos /></ProtectedRoute>} />
        <Route path="/partner/subscription" element={<ProtectedRoute role="partner"><PartnerSubscription /></ProtectedRoute>} />
        <Route path="/partner/tasks" element={<ProtectedRoute role="partner"><PartnerTasks /></ProtectedRoute>} />
        
        {/* Routes admin protégées - Fix: properly protecting individual routes */}
        <Route path="/admin/dashboard" element={<AdminRoute fallbackPath="/login"><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/clients" element={<AdminRoute fallbackPath="/login"><AdminClients /></AdminRoute>} />
        <Route path="/admin/partners" element={<AdminRoute fallbackPath="/login"><AdminPartners /></AdminRoute>} />
        <Route path="/admin/guests" element={<AdminRoute fallbackPath="/login"><AdminGuests /></AdminRoute>} />
        <Route path="/admin/venues" element={<AdminRoute fallbackPath="/login"><AdminVenues /></AdminRoute>} />
        <Route path="/admin/kpi-dashboard" element={<AdminRoute fallbackPath="/login"><AdminKpiDashboard /></AdminRoute>} />
        <Route path="/admin/ratings" element={<AdminRoute fallbackPath="/login"><AdminRatings /></AdminRoute>} />
        <Route path="/admin/recommendations" element={<AdminRoute fallbackPath="/login"><AdminRecommendations /></AdminRoute>} />
        <Route path="/admin/statistics" element={<AdminRoute fallbackPath="/login"><AdminStatistics /></AdminRoute>} />
        <Route path="/admin/subscriptions" element={<AdminRoute fallbackPath="/login"><AdminSubscriptions /></AdminRoute>} />
        <Route path="/admin/talkshows" element={<AdminRoute fallbackPath="/login"><AdminTalkshows /></AdminRoute>} />
        <Route path="/admin/podcasts" element={<AdminRoute fallbackPath="/login"><AdminPodcasts /></AdminRoute>} />
        <Route path="/admin/wedding-packages" element={<AdminRoute fallbackPath="/login"><AdminWeddingPackages /></AdminRoute>} />
        <Route path="/admin/presentation" element={<AdminRoute fallbackPath="/login"><AdminPresentationManagement /></AdminRoute>} />
        <Route path="/admin/partner-types" element={<AdminRoute fallbackPath="/login"><AdminPartnerTypes /></AdminRoute>} />
        <Route path="/admin/partner-gamification" element={<AdminRoute fallbackPath="/login"><AdminPartnerGamification /></AdminRoute>} />
        <Route path="/admin/backup" element={<AdminRoute fallbackPath="/login"><AdminBackup /></AdminRoute>} />
        
        {/* Page 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MapProvider>
  );
};

export default AppRouter;
