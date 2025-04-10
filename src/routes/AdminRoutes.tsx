import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminRoute from '@/components/security/AdminRoute';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AdminRoute fallbackPath="/login" />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* Add more admin routes here */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
