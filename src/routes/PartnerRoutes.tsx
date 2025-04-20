
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import ProtectedRoute from "@/components/security/ProtectedRoute";
import LoadingFallback from "@/components/LoadingFallback";

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

const PartnerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerDashboard />
          </Suspense>
        } />
        <Route path="profile" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerProfile />
          </Suspense>
        } />
        <Route path="tasks" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerTasks />
          </Suspense>
        } />
        <Route path="calendar" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerCalendar />
          </Suspense>
        } />
        <Route path="photos" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerPhotos />
          </Suspense>
        } />
        <Route path="requests" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerRequests />
          </Suspense>
        } />
        <Route path="stats" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerStats />
          </Suspense>
        } />
        <Route path="menus" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerMenus />
          </Suspense>
        } />
        <Route path="best-awards" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerBestAwards />
          </Suspense>
        } />
        <Route path="playlists" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerPlaylists />
          </Suspense>
        } />
        <Route path="floor-plans" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerFloorPlans />
          </Suspense>
        } />
        <Route path="livestream" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerLiveStreaming />
          </Suspense>
        } />
        <Route path="subscription" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerSubscription />
          </Suspense>
        } />
        <Route path="recommendations" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerRecommendations />
          </Suspense>
        } />
        <Route path="training" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerTraining />
          </Suspense>
        } />
        <Route path="gamification" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerGamification />
          </Suspense>
        } />
        <Route path="mlm" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerMLM />
          </Suspense>
        } />
        <Route path="talkshows" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerTalkshows />
          </Suspense>
        } />
        <Route path="podcasts" element={
          <Suspense fallback={<LoadingFallback />}>
            <PartnerPodcasts />
          </Suspense>
        } />
        
        {/* Routes CRM */}
        <Route path="crm" element={
          <Suspense fallback={<LoadingFallback />}>
            <CrmDashboard />
          </Suspense>
        } />
        <Route path="crm/opportunities" element={
          <Suspense fallback={<LoadingFallback />}>
            <CrmOpportunities />
          </Suspense>
        } />
        <Route path="crm/contacts" element={
          <Suspense fallback={<LoadingFallback />}>
            <CrmContacts />
          </Suspense>
        } />
        <Route path="crm/quotes" element={
          <Suspense fallback={<LoadingFallback />}>
            <CrmQuotes />
          </Suspense>
        } />
        <Route path="crm/invoices" element={
          <Suspense fallback={<LoadingFallback />}>
            <CrmInvoices />
          </Suspense>
        } />
        <Route path="crm/products" element={
          <Suspense fallback={<LoadingFallback />}>
            <CrmProducts />
          </Suspense>
        } />
        <Route path="crm/reports" element={
          <Suspense fallback={<LoadingFallback />}>
            <CrmReports />
          </Suspense>
        } />
        
        {/* Default route redirect */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default PartnerRoutes;
