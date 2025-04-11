
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PartnerDashboard from '@/pages/partner/PartnerDashboard';
import PartnerProfile from '@/pages/partner/PartnerProfile';
import { UserRole } from '@/utils/accessControl';
import PartnerTypeRoute from '@/components/security/PartnerTypeRoute';

const PartnerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PartnerTypeRoute requiredRole={UserRole.PARTNER} fallbackPath="/login" />}>
        <Route path="dashboard" element={<PartnerDashboard />} />
        <Route path="profile" element={<PartnerProfile />} />
        {/* Add more partner routes here */}
      </Route>
    </Routes>
  );
};

export default PartnerRoutes;
