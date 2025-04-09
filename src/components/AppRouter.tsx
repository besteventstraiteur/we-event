
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
        
        {/* Routes client protégées */}
        <Route path="/client" element={<ProtectedRoute type="client" />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="guests" element={<ClientGuests />} />
          <Route path="partners" element={<ClientPartners />} />
          <Route path="requests" element={<ClientRequests />} />
          <Route path="todo" element={<ClientTodoList />} />
          <Route path="account" element={<ClientAccount />} />
          <Route path="budget" element={<ClientBudget />} />
          <Route path="floor-plans" element={<ClientFloorPlans />} />
          <Route path="menus" element={<ClientMenus />} />
          <Route path="payments" element={<ClientPayments />} />
          <Route path="tasks" element={<ClientTasks />} />
          <Route path="photos" element={<ClientPhotos />} />
          <Route path="pinterbest" element={<ClientPinterbest />} />
          <Route path="playlists" element={<ClientMusicPlaylists />} />
          <Route path="wedding-packages" element={<ClientWeddingPackages />} />
          <Route path="live-streaming" element={<ClientLiveStreaming />} />
          <Route path="mini-site" element={<ClientMiniSite />} />
          <Route path="day-of" element={<ClientDayOfCommunication />} />
          <Route path="podcasts" element={<ClientPodcasts />} />
          <Route path="project-dashboard" element={<ClientProjectDashboard />} />
          <Route path="talkshows" element={<ClientTalkshows />} />
          <Route path="ratings" element={<ClientPartnerRatings />} />
          <Route path="security/two-factor" element={<TwoFactorSetup />} />
          <Route path="security" element={<AdvancedSecurity />} />
        </Route>
        
        {/* Routes partenaire protégées */}
        <Route path="/partner" element={<ProtectedRoute type="partner" />}>
          <Route path="dashboard" element={<PartnerDashboard />} />
          <Route path="requests" element={<PartnerRequests />} />
          <Route path="calendar" element={<PartnerCalendar />} />
          <Route path="best-awards" element={<PartnerBestAwards />} />
          <Route path="gamification" element={<PartnerGamification />} />
          <Route path="stats" element={<PartnerStats />} />
          <Route path="menus" element={<PartnerMenus />} />
          <Route path="playlists" element={<PartnerPlaylists />} />
          <Route path="podcasts" element={<PartnerPodcasts />} />
          <Route path="talkshows" element={<PartnerTalkshows />} />
          <Route path="recommendations" element={<PartnerRecommendations />} />
          <Route path="floor-plans" element={<PartnerFloorPlans />} />
          <Route path="live-streaming" element={<PartnerLiveStreaming />} />
          <Route path="music-playlists" element={<PartnerMusicPlaylists />} />
          <Route path="photos" element={<PartnerPhotos />} />
          <Route path="subscription" element={<PartnerSubscription />} />
          <Route path="tasks" element={<PartnerTasks />} />
        </Route>
        
        {/* Routes admin protégées */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="partners" element={<AdminPartners />} />
          <Route path="guests" element={<AdminGuests />} />
          <Route path="venues" element={<AdminVenues />} />
          <Route path="kpi-dashboard" element={<AdminKpiDashboard />} />
          <Route path="ratings" element={<AdminRatings />} />
          <Route path="recommendations" element={<AdminRecommendations />} />
          <Route path="statistics" element={<AdminStatistics />} />
          <Route path="subscriptions" element={<AdminSubscriptions />} />
          <Route path="talkshows" element={<AdminTalkshows />} />
          <Route path="podcasts" element={<AdminPodcasts />} />
          <Route path="wedding-packages" element={<AdminWeddingPackages />} />
          <Route path="presentation" element={<AdminPresentationManagement />} />
          <Route path="partner-types" element={<AdminPartnerTypes />} />
          <Route path="partner-gamification" element={<AdminPartnerGamification />} />
          <Route path="backup" element={<AdminBackup />} />
        </Route>
        
        {/* Page 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MapProvider>
  );
};

export default AppRouter;
