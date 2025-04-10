import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientDashboard from '@/pages/client/ClientDashboard';
import ClientAccount from '@/pages/client/ClientAccount';
import ClientTodoList from '@/pages/client/ClientTodoList';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/security/ProtectedRoute';
import { UserRole } from '@/utils/accessControl';
import ClientAppWrapper from '@/components/client/ClientAppWrapper';

const ClientRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute requiredRole={UserRole.CLIENT} fallbackPath="/login" />}>
        <Route element={<ClientAppWrapper />}>
          <Route path="dashboard" element={<ClientDashboard />} />
          <Route path="account" element={<ClientAccount />} />
          <Route path="todolist" element={<ClientTodoList />} />
          {/* Add more client routes here */}
        </Route>
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
