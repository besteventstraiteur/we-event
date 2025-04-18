
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/security/ProtectedRoute";

// Chargement paresseux des composants partenaire
const PartnerDashboard = React.lazy(() => import("@/pages/partner/PartnerDashboard"));
const PartnerProfile = React.lazy(() => import("@/pages/partner/PartnerProfile"));
const PartnerTasks = React.lazy(() => import("@/pages/partner/PartnerTasks"));
const PartnerCalendar = React.lazy(() => import("@/pages/partner/PartnerCalendar"));
const PartnerPhotos = React.lazy(() => import("@/pages/partner/PartnerPhotos"));
const PartnerRequests = React.lazy(() => import("@/pages/partner/PartnerRequests"));
const PartnerStats = React.lazy(() => import("@/pages/partner/PartnerStats"));
const PartnerMenus = React.lazy(() => import("@/pages/partner/PartnerMenus"));
const PartnerBestAwards = React.lazy(() => import("@/pages/partner/PartnerBestAwards"));
const PartnerMusicPlaylists = React.lazy(() => import("@/pages/partner/PartnerMusicPlaylists"));
const PartnerPlaylists = React.lazy(() => import("@/pages/partner/PartnerPlaylists"));
const PartnerFloorPlans = React.lazy(() => import("@/pages/partner/PartnerFloorPlans"));
const PartnerLiveStreaming = React.lazy(() => import("@/pages/partner/PartnerLiveStreaming"));
const PartnerSubscription = React.lazy(() => import("@/pages/partner/PartnerSubscription"));
const PartnerRecommendations = React.lazy(() => import("@/pages/partner/PartnerRecommendations"));
const PartnerTraining = React.lazy(() => import("@/pages/partner/PartnerTraining"));
const PartnerGamification = React.lazy(() => import("@/pages/partner/PartnerGamification"));
const PartnerMLM = React.lazy(() => import("@/pages/partner/PartnerMLM"));
const PartnerTalkshows = React.lazy(() => import("@/pages/partner/PartnerTalkshows"));
const PartnerPodcasts = React.lazy(() => import("@/pages/partner/PartnerPodcasts"));
const CrmDashboard = React.lazy(() => import("@/pages/crm/CrmDashboard"));
const CrmOpportunities = React.lazy(() => import("@/pages/crm/opportunities/CrmOpportunities"));
const CrmContacts = React.lazy(() => import("@/pages/crm/contacts/CrmContacts"));
const CrmQuotes = React.lazy(() => import("@/pages/crm/quotes/CrmQuotes"));
const CrmInvoices = React.lazy(() => import("@/pages/crm/invoices/CrmInvoices"));
const CrmProducts = React.lazy(() => import("@/pages/crm/products/CrmProducts"));
const CrmReports = React.lazy(() => import("@/pages/crm/reports/CrmReports"));

// Composant de chargement
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <span className="ml-2 text-lg font-medium">Chargement...</span>
  </div>
);

const PartnerRoutes: React.FC = () => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="dashboard" element={<PartnerDashboard />} />
          <Route path="profile" element={<PartnerProfile />} />
          <Route path="tasks" element={<PartnerTasks />} />
          <Route path="calendar" element={<PartnerCalendar />} />
          <Route path="photos" element={<PartnerPhotos />} />
          <Route path="requests" element={<PartnerRequests />} />
          <Route path="stats" element={<PartnerStats />} />
          <Route path="menus" element={<PartnerMenus />} />
          <Route path="best-awards" element={<PartnerBestAwards />} />
          <Route path="music-playlists" element={<PartnerMusicPlaylists />} />
          <Route path="playlists" element={<PartnerPlaylists />} />
          <Route path="floor-plans" element={<PartnerFloorPlans />} />
          <Route path="livestream" element={<PartnerLiveStreaming />} />
          <Route path="subscription" element={<PartnerSubscription />} />
          <Route path="recommendations" element={<PartnerRecommendations />} />
          <Route path="training" element={<PartnerTraining />} />
          <Route path="gamification" element={<PartnerGamification />} />
          <Route path="mlm" element={<PartnerMLM />} />
          <Route path="talkshows" element={<PartnerTalkshows />} />
          <Route path="podcasts" element={<PartnerPodcasts />} />
          
          {/* Routes CRM */}
          <Route path="crm" element={<CrmDashboard />} />
          <Route path="crm/opportunities" element={<CrmOpportunities />} />
          <Route path="crm/contacts" element={<CrmContacts />} />
          <Route path="crm/quotes" element={<CrmQuotes />} />
          <Route path="crm/invoices" element={<CrmInvoices />} />
          <Route path="crm/products" element={<CrmProducts />} />
          <Route path="crm/reports" element={<CrmReports />} />
        </Routes>
      </Suspense>
    </ProtectedRoute>
  );
};

export default PartnerRoutes;
