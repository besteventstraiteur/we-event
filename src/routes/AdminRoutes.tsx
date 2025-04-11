
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminStatistics from '@/pages/admin/AdminStatistics';
import AdminClients from '@/pages/admin/AdminClients';
import AdminPartners from '@/pages/admin/AdminPartners';
import AdminPartnerTypes from '@/pages/admin/AdminPartnerTypes';
import AdminSubscriptions from '@/pages/admin/AdminSubscriptions';
import AdminGuests from '@/pages/admin/AdminGuests';
import AdminVenues from '@/pages/admin/AdminVenues';
import AdminWeddingPackages from '@/pages/admin/AdminWeddingPackages';
import AdminRatings from '@/pages/admin/AdminRatings';
import AdminRecommendations from '@/pages/admin/AdminRecommendations';
import AdminTalkshows from '@/pages/admin/AdminTalkshows';
import AdminPodcasts from '@/pages/admin/AdminPodcasts';
import AdminPresentationManagement from '@/pages/admin/AdminPresentationManagement';
import AdminRoute from '@/components/security/AdminRoute';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AdminRoute fallbackPath="/login" />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="statistics" element={<AdminStatistics />} />
        <Route path="clients" element={<AdminClients />} />
        <Route path="partners" element={<AdminPartners />} />
        <Route path="partner-types" element={<AdminPartnerTypes />} />
        <Route path="subscriptions" element={<AdminSubscriptions />} />
        <Route path="guests" element={<AdminGuests />} />
        <Route path="venues" element={<AdminVenues />} />
        <Route path="wedding-packages" element={<AdminWeddingPackages />} />
        <Route path="ratings" element={<AdminRatings />} />
        <Route path="recommendations" element={<AdminRecommendations />} />
        <Route path="talkshows" element={<AdminTalkshows />} />
        <Route path="podcasts" element={<AdminPodcasts />} />
        <Route path="presentation" element={<AdminPresentationManagement />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
