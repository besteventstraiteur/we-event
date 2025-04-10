
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import { UserRole } from "@/utils/accessControl";

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
      <Route path="/partner/dashboard" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerDashboard /></ProtectedRoute>} />
      <Route path="/partner/requests" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerRequests /></ProtectedRoute>} />
      <Route path="/partner/calendar" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerCalendar /></ProtectedRoute>} />
      <Route path="/partner/best-awards" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerBestAwards /></ProtectedRoute>} />
      <Route path="/partner/gamification" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerGamification /></ProtectedRoute>} />
      <Route path="/partner/stats" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerStats /></ProtectedRoute>} />
      <Route path="/partner/menus" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerMenus /></ProtectedRoute>} />
      <Route path="/partner/playlists" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerPlaylists /></ProtectedRoute>} />
      <Route path="/partner/podcasts" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerPodcasts /></ProtectedRoute>} />
      <Route path="/partner/talkshows" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerTalkshows /></ProtectedRoute>} />
      <Route path="/partner/recommendations" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerRecommendations /></ProtectedRoute>} />
      <Route path="/partner/floor-plans" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerFloorPlans /></ProtectedRoute>} />
      <Route path="/partner/live-streaming" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerLiveStreaming /></ProtectedRoute>} />
      <Route path="/partner/music-playlists" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerMusicPlaylists /></ProtectedRoute>} />
      <Route path="/partner/photos" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerPhotos /></ProtectedRoute>} />
      <Route path="/partner/subscription" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerSubscription /></ProtectedRoute>} />
      <Route path="/partner/tasks" element={<ProtectedRoute role={UserRole.PARTNER}><PartnerTasks /></ProtectedRoute>} />
    </>
  );
};

export default PartnerRoutes;
