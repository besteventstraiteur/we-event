
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientDashboard from '@/pages/client/ClientDashboard';
import ClientAccount from '@/pages/client/ClientAccount';
import ClientTodoList from '@/pages/client/ClientTodoList';
import ClientBudget from '@/pages/client/ClientBudget';
import ClientPayments from '@/pages/client/ClientPayments';
import ClientPartners from '@/pages/client/ClientPartners';
import ClientGuests from '@/pages/client/ClientGuests';
import ClientPhotos from '@/pages/client/ClientPhotos';
import ClientPinterbest from '@/pages/client/ClientPinterbest';
import ClientMusicPlaylists from '@/pages/client/ClientMusicPlaylists';
import ClientMenus from '@/pages/client/ClientMenus';
import ClientFloorPlans from '@/pages/client/ClientFloorPlans';
import ClientRequests from '@/pages/client/ClientRequests';
import ClientMiniSite from '@/pages/client/ClientMiniSite';
import ClientWeddingPackages from '@/pages/client/ClientWeddingPackages';
import ClientPodcasts from '@/pages/client/ClientPodcasts';
import ClientTalkshows from '@/pages/client/ClientTalkshows';
import AdvancedSecurity from '@/pages/client/AdvancedSecurity';
import ClientPartnerRatings from '@/pages/client/ClientPartnerRatings';
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
          <Route path="todo" element={<ClientTodoList />} />
          <Route path="todolist" element={<ClientTodoList />} /> {/* Keep compatibility with old route */}
          <Route path="budget" element={<ClientBudget />} />
          <Route path="payments" element={<ClientPayments />} />
          <Route path="partners" element={<ClientPartners />} />
          <Route path="guests" element={<ClientGuests />} />
          <Route path="photos" element={<ClientPhotos />} />
          <Route path="pinterbest" element={<ClientPinterbest />} />
          <Route path="music" element={<ClientMusicPlaylists />} />
          <Route path="menus" element={<ClientMenus />} />
          <Route path="floor-plans" element={<ClientFloorPlans />} />
          <Route path="requests" element={<ClientRequests />} />
          <Route path="mini-site" element={<ClientMiniSite />} />
          <Route path="wedding-packages" element={<ClientWeddingPackages />} />
          <Route path="podcasts" element={<ClientPodcasts />} />
          <Route path="talkshows" element={<ClientTalkshows />} />
          <Route path="security" element={<AdvancedSecurity />} />
          <Route path="ratings" element={<ClientPartnerRatings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
