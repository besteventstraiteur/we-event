
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import ClientAppWrapper from "@/components/client/ClientAppWrapper";

// Chargement paresseux des composants client
const ClientDashboard = React.lazy(() => import("@/pages/client/ClientDashboard"));
const ClientTasks = React.lazy(() => import("@/pages/client/ClientTasks"));
const ClientTodoList = React.lazy(() => import("@/pages/client/ClientTodoList"));
const ClientGuests = React.lazy(() => import("@/pages/client/ClientGuests"));
const ClientBudget = React.lazy(() => import("@/pages/client/ClientBudget"));
const ClientPartners = React.lazy(() => import("@/pages/client/ClientPartners"));
const ClientMusicPlaylists = React.lazy(() => import("@/pages/client/ClientMusicPlaylists"));
const ClientFloorPlans = React.lazy(() => import("@/pages/client/ClientFloorPlans"));
const ClientMenus = React.lazy(() => import("@/pages/client/ClientMenus"));
const ClientProjectDashboard = React.lazy(() => import("@/pages/client/ClientProjectDashboard"));
const ClientMiniSite = React.lazy(() => import("@/pages/client/ClientMiniSite"));
const ClientDayOfCommunication = React.lazy(() => import("@/pages/client/ClientDayOfCommunication"));
const ClientPinterbest = React.lazy(() => import("@/pages/client/ClientPinterbest"));
const ClientLiveStreaming = React.lazy(() => import("@/pages/client/ClientLiveStreaming"));
const ClientPhotos = React.lazy(() => import("@/pages/client/ClientPhotos"));
const ClientRequests = React.lazy(() => import("@/pages/client/ClientRequests"));
const ClientAccount = React.lazy(() => import("@/pages/client/ClientAccount"));
const ClientPartnerRatings = React.lazy(() => import("@/pages/client/ClientPartnerRatings"));
const ClientWeddingPackages = React.lazy(() => import("@/pages/client/ClientWeddingPackages"));
const ClientPayments = React.lazy(() => import("@/pages/client/ClientPayments"));
const TwoFactorSetup = React.lazy(() => import("@/pages/client/TwoFactorSetup"));
const AdvancedSecurity = React.lazy(() => import("@/pages/client/AdvancedSecurity"));
const ClientTalkshows = React.lazy(() => import("@/pages/client/ClientTalkshows"));
const ClientPodcasts = React.lazy(() => import("@/pages/client/ClientPodcasts"));

// Composant de chargement
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <span className="ml-2 text-lg font-medium">Chargement...</span>
  </div>
);

const ClientRoutes: React.FC = () => {
  return (
    <ProtectedRoute>
      <ClientAppWrapper>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="tasks" element={<ClientTasks />} />
            <Route path="todo" element={<ClientTodoList />} />
            <Route path="guests" element={<ClientGuests />} />
            <Route path="budget" element={<ClientBudget />} />
            <Route path="partners" element={<ClientPartners />} />
            <Route path="music-playlists" element={<ClientMusicPlaylists />} />
            <Route path="floor-plans" element={<ClientFloorPlans />} />
            <Route path="menus" element={<ClientMenus />} />
            <Route path="project" element={<ClientProjectDashboard />} />
            <Route path="mini-site" element={<ClientMiniSite />} />
            <Route path="day-of-communication" element={<ClientDayOfCommunication />} />
            <Route path="pinterbest" element={<ClientPinterbest />} />
            <Route path="livestream" element={<ClientLiveStreaming />} />
            <Route path="photos" element={<ClientPhotos />} />
            <Route path="requests" element={<ClientRequests />} />
            <Route path="account" element={<ClientAccount />} />
            <Route path="ratings" element={<ClientPartnerRatings />} />
            <Route path="wedding-packages" element={<ClientWeddingPackages />} />
            <Route path="payments" element={<ClientPayments />} />
            <Route path="2fa-setup" element={<TwoFactorSetup />} />
            <Route path="security" element={<AdvancedSecurity />} />
            <Route path="talkshows" element={<ClientTalkshows />} />
            <Route path="podcasts" element={<ClientPodcasts />} />
          </Routes>
        </Suspense>
      </ClientAppWrapper>
    </ProtectedRoute>
  );
};

export default ClientRoutes;
