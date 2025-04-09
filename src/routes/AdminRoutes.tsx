
import React from "react";
import { Route } from "react-router-dom";
import AdminRoute from "@/components/security/AdminRoute";

// Admin pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminClients from "@/pages/admin/AdminClients";
import AdminPartners from "@/pages/admin/AdminPartners";
import AdminGuests from "@/pages/admin/AdminGuests";
import AdminVenues from "@/pages/admin/AdminVenues";
import AdminKpiDashboard from "@/pages/admin/AdminKpiDashboard";
import AdminRatings from "@/pages/admin/AdminRatings";
import AdminRecommendations from "@/pages/admin/AdminRecommendations";
import AdminStatistics from "@/pages/admin/AdminStatistics";
import AdminSubscriptions from "@/pages/admin/AdminSubscriptions";
import AdminTalkshows from "@/pages/admin/AdminTalkshows";
import AdminPodcasts from "@/pages/admin/AdminPodcasts";
import AdminWeddingPackages from "@/pages/admin/AdminWeddingPackages";
import AdminPresentationManagement from "@/pages/admin/AdminPresentationManagement";
import AdminPartnerTypes from "@/pages/admin/AdminPartnerTypes";
import AdminPartnerGamification from "@/pages/admin/AdminPartnerGamification";
import AdminBackup from "@/pages/admin/AdminBackup";

const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin/dashboard" element={<AdminRoute fallbackPath="/login"><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/clients" element={<AdminRoute fallbackPath="/login"><AdminClients /></AdminRoute>} />
      <Route path="/admin/partners" element={<AdminRoute fallbackPath="/login"><AdminPartners /></AdminRoute>} />
      <Route path="/admin/guests" element={<AdminRoute fallbackPath="/login"><AdminGuests /></AdminRoute>} />
      <Route path="/admin/venues" element={<AdminRoute fallbackPath="/login"><AdminVenues /></AdminRoute>} />
      <Route path="/admin/kpi-dashboard" element={<AdminRoute fallbackPath="/login"><AdminKpiDashboard /></AdminRoute>} />
      <Route path="/admin/ratings" element={<AdminRoute fallbackPath="/login"><AdminRatings /></AdminRoute>} />
      <Route path="/admin/recommendations" element={<AdminRoute fallbackPath="/login"><AdminRecommendations /></AdminRoute>} />
      <Route path="/admin/statistics" element={<AdminRoute fallbackPath="/login"><AdminStatistics /></AdminRoute>} />
      <Route path="/admin/subscriptions" element={<AdminRoute fallbackPath="/login"><AdminSubscriptions /></AdminRoute>} />
      <Route path="/admin/talkshows" element={<AdminRoute fallbackPath="/login"><AdminTalkshows /></AdminRoute>} />
      <Route path="/admin/podcasts" element={<AdminRoute fallbackPath="/login"><AdminPodcasts /></AdminRoute>} />
      <Route path="/admin/wedding-packages" element={<AdminRoute fallbackPath="/login"><AdminWeddingPackages /></AdminRoute>} />
      <Route path="/admin/presentation" element={<AdminRoute fallbackPath="/login"><AdminPresentationManagement /></AdminRoute>} />
      <Route path="/admin/partner-types" element={<AdminRoute fallbackPath="/login"><AdminPartnerTypes /></AdminRoute>} />
      <Route path="/admin/partner-gamification" element={<AdminRoute fallbackPath="/login"><AdminPartnerGamification /></AdminRoute>} />
      <Route path="/admin/backup" element={<AdminRoute fallbackPath="/login"><AdminBackup /></AdminRoute>} />
    </>
  );
};

export default AdminRoutes;
