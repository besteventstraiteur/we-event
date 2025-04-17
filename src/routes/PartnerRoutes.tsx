
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PartnerDashboard from '@/pages/partner/PartnerDashboard';
import PartnerProfile from '@/pages/partner/PartnerProfile';
import PartnerSubscription from '@/pages/partner/PartnerSubscription';
import PartnerTasks from '@/pages/partner/PartnerTasks';
import PartnerRequests from '@/pages/partner/PartnerRequests';
import PartnerStats from '@/pages/partner/PartnerStats';
import PartnerRecommendations from '@/pages/partner/PartnerRecommendations';
import PartnerGamification from '@/pages/partner/PartnerGamification';
import PartnerBestAwards from '@/pages/partner/PartnerBestAwards';
import PartnerCalendar from '@/pages/partner/PartnerCalendar';
import PartnerPhotos from '@/pages/partner/PartnerPhotos';
import PartnerPlaylists from '@/pages/partner/PartnerPlaylists';
import PartnerMenus from '@/pages/partner/PartnerMenus';
import PartnerFloorPlans from '@/pages/partner/PartnerFloorPlans';
import PartnerPodcasts from '@/pages/partner/PartnerPodcasts';
import PartnerTalkshows from '@/pages/partner/PartnerTalkshows';
import PartnerMusicPlaylists from '@/pages/partner/PartnerMusicPlaylists';
import PartnerTraining from '@/pages/partner/PartnerTraining';
import PartnerMLM from '@/pages/partner/PartnerMLM';
import { UserRole } from '@/utils/accessControl';
import PartnerTypeRoute from '@/components/security/PartnerTypeRoute';
import CrmDashboard from '@/pages/crm/CrmDashboard';
import CrmContacts from '@/pages/crm/contacts/CrmContacts';
import CrmOpportunities from '@/pages/crm/opportunities/CrmOpportunities';
import CrmQuotes from '@/pages/crm/quotes/CrmQuotes';
import CrmInvoices from '@/pages/crm/invoices/CrmInvoices';
import CrmProducts from '@/pages/crm/products/CrmProducts';
import CrmReports from '@/pages/crm/reports/CrmReports';

const PartnerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PartnerTypeRoute requiredRole={UserRole.PARTNER} fallbackPath="/login" />}>
        <Route path="dashboard" element={<PartnerDashboard />} />
        <Route path="profile" element={<PartnerProfile />} />
        <Route path="subscription" element={<PartnerSubscription />} />
        <Route path="tasks" element={<PartnerTasks />} />
        <Route path="requests" element={<PartnerRequests />} />
        <Route path="stats" element={<PartnerStats />} />
        <Route path="recommendations" element={<PartnerRecommendations />} />
        <Route path="gamification" element={<PartnerGamification />} />
        <Route path="best-awards" element={<PartnerBestAwards />} />
        <Route path="calendar" element={<PartnerCalendar />} />
        <Route path="photos" element={<PartnerPhotos />} />
        <Route path="playlists" element={<PartnerPlaylists />} />
        <Route path="menus" element={<PartnerMenus />} />
        <Route path="floor-plans" element={<PartnerFloorPlans />} />
        <Route path="podcasts" element={<PartnerPodcasts />} />
        <Route path="talkshows" element={<PartnerTalkshows />} />
        <Route path="training" element={<PartnerTraining />} />
        <Route path="mlm" element={<PartnerMLM />} />
        
        {/* Routes CRM */}
        <Route path="crm" element={<CrmDashboard />} />
        <Route path="crm/contacts" element={<CrmContacts />} />
        <Route path="crm/opportunities" element={<CrmOpportunities />} />
        <Route path="crm/quotes" element={<CrmQuotes />} />
        <Route path="crm/invoices" element={<CrmInvoices />} />
        <Route path="crm/products" element={<CrmProducts />} />
        <Route path="crm/reports" element={<CrmReports />} />
      </Route>
    </Routes>
  );
};

export default PartnerRoutes;
