
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/security/ProtectedRoute";

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
    </>
  );
};

export default ClientRoutes;
