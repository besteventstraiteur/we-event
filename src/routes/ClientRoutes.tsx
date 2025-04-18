
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import ClientAppWrapper from "@/components/client/ClientAppWrapper";
import LoadingFallback from "@/components/LoadingFallback";

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

const ClientRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<ClientAppWrapper />}>
          <Route path="dashboard" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientDashboard />
            </Suspense>
          } />
          <Route path="tasks" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientTasks />
            </Suspense>
          } />
          <Route path="todo" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientTodoList />
            </Suspense>
          } />
          <Route path="guests" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientGuests />
            </Suspense>
          } />
          <Route path="budget" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientBudget />
            </Suspense>
          } />
          <Route path="partners" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientPartners />
            </Suspense>
          } />
          <Route path="music-playlists" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientMusicPlaylists />
            </Suspense>
          } />
          <Route path="floor-plans" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientFloorPlans />
            </Suspense>
          } />
          <Route path="menus" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientMenus />
            </Suspense>
          } />
          <Route path="project" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientProjectDashboard />
            </Suspense>
          } />
          <Route path="mini-site" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientMiniSite />
            </Suspense>
          } />
          <Route path="day-of-communication" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientDayOfCommunication />
            </Suspense>
          } />
          <Route path="pinterbest" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientPinterbest />
            </Suspense>
          } />
          <Route path="livestream" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientLiveStreaming />
            </Suspense>
          } />
          <Route path="photos" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientPhotos />
            </Suspense>
          } />
          <Route path="requests" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientRequests />
            </Suspense>
          } />
          <Route path="account" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientAccount />
            </Suspense>
          } />
          <Route path="ratings" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientPartnerRatings />
            </Suspense>
          } />
          <Route path="wedding-packages" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientWeddingPackages />
            </Suspense>
          } />
          <Route path="payments" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientPayments />
            </Suspense>
          } />
          <Route path="2fa-setup" element={
            <Suspense fallback={<LoadingFallback />}>
              <TwoFactorSetup />
            </Suspense>
          } />
          <Route path="security" element={
            <Suspense fallback={<LoadingFallback />}>
              <AdvancedSecurity />
            </Suspense>
          } />
          <Route path="talkshows" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientTalkshows />
            </Suspense>
          } />
          <Route path="podcasts" element={
            <Suspense fallback={<LoadingFallback />}>
              <ClientPodcasts />
            </Suspense>
          } />
        </Route>
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
