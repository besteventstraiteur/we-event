
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/security/ProtectedRoute";

// Partner pages
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

const PartnerRoutes = () => {
  return (
    <>
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
    </>
  );
};

export default PartnerRoutes;
