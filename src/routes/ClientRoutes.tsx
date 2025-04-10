
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import { UserRole } from "@/utils/accessControl";

// Client pages
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

const ClientRoutes = () => {
  return (
    <>
      <Route path="/client/dashboard" element={<ProtectedRoute role={UserRole.CLIENT}><ClientDashboard /></ProtectedRoute>} />
      <Route path="/client/guests" element={<ProtectedRoute role={UserRole.CLIENT}><ClientGuests /></ProtectedRoute>} />
      <Route path="/client/partners" element={<ProtectedRoute role={UserRole.CLIENT}><ClientPartners /></ProtectedRoute>} />
      <Route path="/client/requests" element={<ProtectedRoute role={UserRole.CLIENT}><ClientRequests /></ProtectedRoute>} />
      <Route path="/client/todo" element={<ProtectedRoute role={UserRole.CLIENT}><ClientTodoList /></ProtectedRoute>} />
      <Route path="/client/account" element={<ProtectedRoute role={UserRole.CLIENT}><ClientAccount /></ProtectedRoute>} />
      <Route path="/client/budget" element={<ProtectedRoute role={UserRole.CLIENT}><ClientBudget /></ProtectedRoute>} />
      <Route path="/client/floor-plans" element={<ProtectedRoute role={UserRole.CLIENT}><ClientFloorPlans /></ProtectedRoute>} />
      <Route path="/client/menus" element={<ProtectedRoute role={UserRole.CLIENT}><ClientMenus /></ProtectedRoute>} />
      <Route path="/client/payments" element={<ProtectedRoute role={UserRole.CLIENT}><ClientPayments /></ProtectedRoute>} />
      <Route path="/client/tasks" element={<ProtectedRoute role={UserRole.CLIENT}><ClientTasks /></ProtectedRoute>} />
      <Route path="/client/photos" element={<ProtectedRoute role={UserRole.CLIENT}><ClientPhotos /></ProtectedRoute>} />
      <Route path="/client/pinterbest" element={<ProtectedRoute role={UserRole.CLIENT}><ClientPinterbest /></ProtectedRoute>} />
      <Route path="/client/playlists" element={<ProtectedRoute role={UserRole.CLIENT}><ClientMusicPlaylists /></ProtectedRoute>} />
      <Route path="/client/wedding-packages" element={<ProtectedRoute role={UserRole.CLIENT}><ClientWeddingPackages /></ProtectedRoute>} />
      <Route path="/client/live-streaming" element={<ProtectedRoute role={UserRole.CLIENT}><ClientLiveStreaming /></ProtectedRoute>} />
      <Route path="/client/mini-site" element={<ProtectedRoute role={UserRole.CLIENT}><ClientMiniSite /></ProtectedRoute>} />
      <Route path="/client/day-of" element={<ProtectedRoute role={UserRole.CLIENT}><ClientDayOfCommunication /></ProtectedRoute>} />
      <Route path="/client/podcasts" element={<ProtectedRoute role={UserRole.CLIENT}><ClientPodcasts /></ProtectedRoute>} />
      <Route path="/client/project-dashboard" element={<ProtectedRoute role={UserRole.CLIENT}><ClientProjectDashboard /></ProtectedRoute>} />
      <Route path="/client/talkshows" element={<ProtectedRoute role={UserRole.CLIENT}><ClientTalkshows /></ProtectedRoute>} />
      <Route path="/client/ratings" element={<ProtectedRoute role={UserRole.CLIENT}><ClientPartnerRatings /></ProtectedRoute>} />
      <Route path="/client/security/two-factor" element={<ProtectedRoute role={UserRole.CLIENT}><TwoFactorSetup /></ProtectedRoute>} />
      <Route path="/client/security" element={<ProtectedRoute role={UserRole.CLIENT}><AdvancedSecurity /></ProtectedRoute>} />
    </>
  );
};

export default ClientRoutes;
