import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import RegisterClientPage from './pages/RegisterClientPage';
import RegisterPartnerPage from './pages/RegisterPartnerPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import Unauthorized from './pages/Unauthorized';
import GuestDashboard from './pages/GuestDashboard';
import GuestMenuSelection from './pages/GuestMenuSelection';
import PartnersPage from './pages/PartnersPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClients from './pages/admin/AdminClients';
import AdminPartners from './pages/admin/AdminPartners';
import AdminGuests from './pages/admin/AdminGuests';
import AdminVenues from './pages/admin/AdminVenues';
import AdminWeddingPackages from './pages/admin/AdminWeddingPackages';
import AdminRatings from './pages/admin/AdminRatings';
import AdminRecommendations from './pages/admin/AdminRecommendations';
import AdminTalkshows from './pages/admin/AdminTalkshows';
import AdminPodcasts from './pages/admin/AdminPodcasts';
import AdminKpiDashboard from './pages/admin/AdminKpiDashboard';
import AdminPartnerGamification from './pages/admin/AdminPartnerGamification';
import AdminBackup from './pages/admin/AdminBackup';
import AdminPresentationManagement from './pages/admin/AdminPresentationManagement';
import AdminPartnerTypes from './pages/admin/AdminPartnerTypes';

// Client Pages
import ClientDashboard from './pages/client/ClientDashboard';
import ClientBudget from './pages/client/ClientBudget';
import ClientGuests from './pages/client/ClientGuests';
import ClientTodoList from './pages/client/ClientTodoList';
import ClientPartners from './pages/client/ClientPartners';
import ClientRequests from './pages/client/ClientRequests';
import ClientPartnerRatings from './pages/client/ClientPartnerRatings';
import ClientFloorPlans from './pages/client/ClientFloorPlans';
import ClientPhotos from './pages/client/ClientPhotos';
import ClientTalkshows from './pages/client/ClientTalkshows';
import ClientPodcasts from './pages/client/ClientPodcasts';
import ClientMusicPlaylists from './pages/client/ClientMusicPlaylists';
import ClientWeddingPackages from './pages/client/ClientWeddingPackages';
import ClientPayments from './pages/client/ClientPayments';
import ClientLiveStreaming from './pages/client/ClientLiveStreaming';
import ClientDayOfCommunication from './pages/client/ClientDayOfCommunication';
import AdvancedSecurity from './pages/client/AdvancedSecurity';
import TwoFactorSetup from './pages/client/TwoFactorSetup';
import ClientPinterbest from './pages/client/ClientPinterbest';
import ClientMenus from './pages/client/ClientMenus';
import ClientMiniSite from './pages/client/ClientMiniSite';
import ClientAccount from './pages/client/ClientAccount';

// Partner Pages
import PartnerDashboard from './pages/partner/PartnerDashboard';
import PartnerRequests from './pages/partner/PartnerRequests';
import PartnerRecommendations from './pages/partner/PartnerRecommendations';
import PartnerTasks from './pages/partner/PartnerTasks';
import PartnerStats from './pages/partner/PartnerStats';
import PartnerPhotos from './pages/partner/PartnerPhotos';
import PartnerTalkshows from './pages/partner/PartnerTalkshows';
import PartnerPodcasts from './pages/partner/PartnerPodcasts';
import PartnerLiveStreaming from './pages/partner/PartnerLiveStreaming';
import PartnerMusicPlaylists from './pages/partner/PartnerMusicPlaylists';
import PartnerGamification from './pages/partner/PartnerGamification';
import PartnerBestAwards from './pages/partner/PartnerBestAwards';
import PartnerCalendar from './pages/partner/PartnerCalendar';

// Security Components
import AdminRoute from './components/security/AdminRoute';
import ProtectedRoute from './components/security/ProtectedRoute';
import PartnerTypeRoute from './components/security/PartnerTypeRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-client" element={<RegisterClientPage />} />
        <Route path="/register-partner" element={<RegisterPartnerPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Guest Pages */}
        <Route path="/guest/:eventId/:guestId" element={<GuestDashboard />} />
        <Route path="/guest/menu/:eventId/:guestId" element={<GuestMenuSelection />} />

        {/* Admin Pages - All wrapped with AdminRoute */}
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/clients" element={<AdminRoute><AdminClients /></AdminRoute>} />
        <Route path="/admin/partners" element={<AdminRoute><AdminPartners /></AdminRoute>} />
        <Route path="/admin/partner-types" element={<AdminRoute><AdminPartnerTypes /></AdminRoute>} />
        <Route path="/admin/guests" element={<AdminRoute><AdminGuests /></AdminRoute>} />
        <Route path="/admin/venues" element={<AdminRoute><AdminVenues /></AdminRoute>} />
        <Route path="/admin/wedding-packages" element={<AdminRoute><AdminWeddingPackages /></AdminRoute>} />
        <Route path="/admin/ratings" element={<AdminRoute><AdminRatings /></AdminRoute>} />
        <Route path="/admin/recommendations" element={<AdminRoute><AdminRecommendations /></AdminRoute>} />
        <Route path="/admin/talkshows" element={<AdminRoute><AdminTalkshows /></AdminRoute>} />
        <Route path="/admin/podcasts" element={<AdminRoute><AdminPodcasts /></AdminRoute>} />
        <Route path="/admin/kpi-dashboard" element={<AdminRoute><AdminKpiDashboard /></AdminRoute>} />
        <Route path="/admin/partner-gamification" element={<AdminRoute><AdminPartnerGamification /></AdminRoute>} />
        <Route path="/admin/backup" element={<AdminRoute><AdminBackup /></AdminRoute>} />
        <Route path="/admin/presentation" element={<AdminRoute><AdminPresentationManagement /></AdminRoute>} />

        {/* Client Pages */}
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/budget" element={<ClientBudget />} />
        <Route path="/client/guests" element={<ClientGuests />} />
        <Route path="/client/todo" element={<ClientTodoList />} />
        <Route path="/client/partners" element={<ClientPartners />} />
        <Route path="/client/requests" element={<ClientRequests />} />
        <Route path="/client/ratings" element={<ClientPartnerRatings />} />
        <Route path="/client/floor-plans" element={<ClientFloorPlans />} />
        <Route path="/client/photos" element={<ClientPhotos />} />
        <Route path="/client/talkshows" element={<ClientTalkshows />} />
        <Route path="/client/podcasts" element={<ClientPodcasts />} />
        <Route path="/client/music" element={<ClientMusicPlaylists />} />
        <Route path="/client/wedding-packages" element={<ClientWeddingPackages />} />
        <Route path="/client/payments" element={<ClientPayments />} />
        <Route path="/client/live-streaming" element={<ClientLiveStreaming />} />
        <Route path="/client/day-of-communication" element={<ClientDayOfCommunication />} />
        <Route path="/client/advanced-security" element={<AdvancedSecurity />} />
        <Route path="/client/two-factor-setup" element={<TwoFactorSetup />} />
        <Route path="/client/pinterbest" element={<ClientPinterbest />} />
        <Route path="/client/menus" element={<ClientMenus />} />
        <Route path="/client/mini-site" element={<ClientMiniSite />} />
        <Route path="/client/account" element={<ClientAccount />} />

        {/* Partner Pages */}
        <Route path="/partner/dashboard" element={<PartnerDashboard />} />
        <Route path="/partner/tasks" element={<PartnerTasks />} />
        <Route path="/partner/requests" element={<PartnerRequests />} />
        <Route path="/partner/stats" element={<PartnerStats />} />
        <Route path="/partner/photos" element={<PartnerPhotos />} />
        <Route path="/partner/playlists" element={<PartnerMusicPlaylists />} />
        <Route path="/partner/menus" element={<PartnerMenus />} />
        <Route path="/partner/recommendations" element={<PartnerRecommendations />} />
        <Route path="/partner/calendar" element={<PartnerCalendar />} />
        <Route path="/partner/gamification" element={<PartnerGamification />} />
        <Route path="/partner/best-awards" element={<PartnerBestAwards />} />
        <Route path="/partner/podcasts" element={<PartnerPodcasts />} />
        <Route path="/partner/talkshows" element={<PartnerTalkshows />} />

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
