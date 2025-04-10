import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PartnerDashboard from '@/pages/partner/PartnerDashboard';
import { UserRole } from '@/utils/accessControl';
import PartnerTypeRoute from '@/components/security/PartnerTypeRoute';

const PartnerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PartnerTypeRoute requiredRole={UserRole.PARTNER} fallbackPath="/login" />}>
        <Route path="dashboard" element={<PartnerDashboard />} />
        {/* Add more partner routes here */}
      </Route>
    </Routes>
  );
};

export default PartnerRoutes;
