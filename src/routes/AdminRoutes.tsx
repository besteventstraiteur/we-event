
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import AdminRoute from "@/components/security/AdminRoute";

// Chargement paresseux des composants administrateur
const AdminDashboard = React.lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminClients = React.lazy(() => import("@/pages/admin/AdminClients"));
const AdminPartners = React.lazy(() => import("@/pages/admin/AdminPartners"));
const AdminPartnerTypes = React.lazy(() => import("@/pages/admin/AdminPartnerTypes"));
const AdminGuests = React.lazy(() => import("@/pages/admin/AdminGuests"));
const AdminVenues = React.lazy(() => import("@/pages/admin/AdminVenues"));
const AdminPresentationManagement = React.lazy(() => import("@/pages/admin/AdminPresentationManagement"));
const AdminMLM = React.lazy(() => import("@/pages/admin/AdminMLM"));
const AdminStatistics = React.lazy(() => import("@/pages/admin/AdminStatistics"));
const AdminKpiDashboard = React.lazy(() => import("@/pages/admin/AdminKpiDashboard"));
const AdminRecommendations = React.lazy(() => import("@/pages/admin/AdminRecommendations"));
const AdminRatings = React.lazy(() => import("@/pages/admin/AdminRatings"));
const AdminTalkshows = React.lazy(() => import("@/pages/admin/AdminTalkshows"));
const AdminPodcasts = React.lazy(() => import("@/pages/admin/AdminPodcasts"));
const AdminWeddingPackages = React.lazy(() => import("@/pages/admin/AdminWeddingPackages"));
const AdminSubscriptions = React.lazy(() => import("@/pages/admin/AdminSubscriptions"));
const AdminBackup = React.lazy(() => import("@/pages/admin/AdminBackup"));
const AdminPartnerGamification = React.lazy(() => import("@/pages/admin/AdminPartnerGamification"));

// Composant de chargement
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
    <span className="ml-2 text-lg font-medium">Chargement...</span>
  </div>
);

const AdminRoutes: React.FC = () => {
  return (
    <AdminRoute>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="partners" element={<AdminPartners />} />
          <Route path="partner-types" element={<AdminPartnerTypes />} />
          <Route path="guests" element={<AdminGuests />} />
          <Route path="venues" element={<AdminVenues />} />
          <Route path="presentations" element={<AdminPresentationManagement />} />
          <Route path="mlm" element={<AdminMLM />} />
          <Route path="statistics" element={<AdminStatistics />} />
          <Route path="kpi-dashboard" element={<AdminKpiDashboard />} />
          <Route path="recommendations" element={<AdminRecommendations />} />
          <Route path="ratings" element={<AdminRatings />} />
          <Route path="talkshows" element={<AdminTalkshows />} />
          <Route path="podcasts" element={<AdminPodcasts />} />
          <Route path="wedding-packages" element={<AdminWeddingPackages />} />
          <Route path="subscriptions" element={<AdminSubscriptions />} />
          <Route path="backup" element={<AdminBackup />} />
          <Route path="partner-gamification" element={<AdminPartnerGamification />} />
        </Routes>
      </Suspense>
    </AdminRoute>
  );
};

export default AdminRoutes;
