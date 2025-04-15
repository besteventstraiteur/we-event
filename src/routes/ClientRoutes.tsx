
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import { UserRole } from "@/utils/accessControl";
import NotFound from "@/pages/NotFound";

// Client Pages
import ClientDashboard from "@/pages/client/ClientDashboard";
import ClientTasks from "@/pages/client/ClientTasks";
import ClientGuests from "@/pages/client/ClientGuests";
import ClientBudget from "@/pages/client/ClientBudget";
import ClientPartners from "@/pages/client/ClientPartners";
import ClientAccount from "@/pages/client/ClientAccount";
import ClientPhotos from "@/pages/client/ClientPhotos";
import ClientMenus from "@/pages/client/ClientMenus";
import ClientFloorPlans from "@/pages/client/ClientFloorPlans";
import ClientMusicPlaylists from "@/pages/client/ClientMusicPlaylists";
import ClientMiniSite from "@/pages/client/ClientMiniSite";
import ClientPinterbest from "@/pages/client/ClientPinterbest";
import ClientTodoList from "@/pages/client/ClientTodoList";
import ClientRequests from "@/pages/client/ClientRequests";
import ClientProjectDashboard from "@/pages/client/ClientProjectDashboard";
import ClientPayments from "@/pages/client/ClientPayments";
import ClientWeddingPackages from "@/pages/client/ClientWeddingPackages";
import ClientLiveStreaming from "@/pages/client/ClientLiveStreaming";
import ClientPodcasts from "@/pages/client/ClientPodcasts";
import ClientTalkshows from "@/pages/client/ClientTalkshows";
import ClientPartnerRatings from "@/pages/client/ClientPartnerRatings";
import ClientDayOfCommunication from "@/pages/client/ClientDayOfCommunication";
import AdvancedSecurity from "@/pages/client/AdvancedSecurity";
import TwoFactorSetup from "@/pages/client/TwoFactorSetup";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute requiredRole={UserRole.CLIENT} />}>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="tasks" element={<ClientTasks />} />
        <Route path="guests" element={<ClientGuests />} />
        <Route path="budget" element={<ClientBudget />} />
        <Route path="partners" element={<ClientPartners />} />
        <Route path="account" element={<ClientAccount />} />
        <Route path="photos" element={<ClientPhotos />} />
        <Route path="menus" element={<ClientMenus />} />
        <Route path="floor-plans" element={<ClientFloorPlans />} />
        <Route path="music" element={<ClientMusicPlaylists />} />
        <Route path="mini-site" element={<ClientMiniSite />} />
        <Route path="pinterbest" element={<ClientPinterbest />} />
        <Route path="todo" element={<ClientTodoList />} />
        <Route path="requests" element={<ClientRequests />} />
        <Route path="project" element={<ClientProjectDashboard />} />
        <Route path="payments" element={<ClientPayments />} />
        <Route path="wedding-packages" element={<ClientWeddingPackages />} />
        <Route path="live" element={<ClientLiveStreaming />} />
        <Route path="podcasts" element={<ClientPodcasts />} />
        <Route path="talkshows" element={<ClientTalkshows />} />
        <Route path="ratings" element={<ClientPartnerRatings />} />
        <Route path="day-of" element={<ClientDayOfCommunication />} />
        <Route path="security" element={<AdvancedSecurity />} />
        <Route path="2fa" element={<TwoFactorSetup />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
