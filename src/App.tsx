
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppWrapper from "./components/AppWrapper";
import HomePage from "./pages/HomePage";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterClientPage from "./pages/RegisterClientPage";
import RegisterPartnerPage from "./pages/RegisterPartnerPage";
import PartnersPage from "./pages/PartnersPage";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientPartners from "./pages/client/ClientPartners";
import ClientRequests from "./pages/client/ClientRequests";
import ClientPodcasts from "./pages/client/ClientPodcasts";
import ClientTalkshows from "./pages/client/ClientTalkshows";
import ClientFloorPlans from "./pages/client/ClientFloorPlans";
import ClientPhotos from "./pages/client/ClientPhotos";
import ClientPinterbest from "./pages/client/ClientPinterbest";
import ClientMenus from "./pages/client/ClientMenus";
import ClientTodoList from "./pages/client/ClientTodoList";
import ClientMusicPlaylists from "./pages/client/ClientMusicPlaylists";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import PartnerRequests from "./pages/partner/PartnerRequests";
import PartnerStats from "./pages/partner/PartnerStats";
import PartnerPodcasts from "./pages/partner/PartnerPodcasts";
import PartnerTalkshows from "./pages/partner/PartnerTalkshows";
import PartnerRecommendations from "./pages/partner/PartnerRecommendations";
import PartnerPhotos from "./pages/partner/PartnerPhotos";
import PartnerMusicPlaylists from "./pages/partner/PartnerMusicPlaylists";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminClients from "./pages/admin/AdminClients";
import AdminPodcasts from "./pages/admin/AdminPodcasts";
import AdminTalkshows from "./pages/admin/AdminTalkshows";
import AdminVenues from "./pages/admin/AdminVenues";
import AdminRecommendations from "./pages/admin/AdminRecommendations";
import AdminBackup from "./pages/admin/AdminBackup";
import GuestMenuSelection from "./pages/GuestMenuSelection";
import NotFound from "./pages/NotFound";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppWrapper>
        <BrowserRouter>
          <Routes>
            {/* Pages publiques */}
            <Route path="/" element={<HomePage />} />
            <Route path="/index" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register-client" element={<RegisterClientPage />} />
            <Route path="/register-partner" element={<RegisterPartnerPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/guest-menu-selection" element={<GuestMenuSelection />} />
            
            {/* Dashboard Client */}
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/partners" element={<ClientPartners />} />
            <Route path="/client/requests" element={<ClientRequests />} />
            <Route path="/client/podcasts" element={<ClientPodcasts />} />
            <Route path="/client/talkshows" element={<ClientTalkshows />} />
            <Route path="/client/floorplans" element={<ClientFloorPlans />} />
            <Route path="/client/photos" element={<ClientPhotos />} />
            <Route path="/client/pinterbest" element={<ClientPinterbest />} />
            <Route path="/client/menus" element={<ClientMenus />} />
            <Route path="/client/todolist" element={<ClientTodoList />} />
            <Route path="/client/music" element={<ClientMusicPlaylists />} />
            
            {/* Dashboard Prestataire */}
            <Route path="/partner/dashboard" element={<PartnerDashboard />} />
            <Route path="/partner/requests" element={<PartnerRequests />} />
            <Route path="/partner/stats" element={<PartnerStats />} />
            <Route path="/partner/podcasts" element={<PartnerPodcasts />} />
            <Route path="/partner/talkshows" element={<PartnerTalkshows />} />
            <Route path="/partner/recommendations" element={<PartnerRecommendations />} />
            <Route path="/partner/photos" element={<PartnerPhotos />} />
            <Route path="/partner/music" element={<PartnerMusicPlaylists />} />
            
            {/* Dashboard Admin */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/partners" element={<AdminPartners />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            <Route path="/admin/podcasts" element={<AdminPodcasts />} />
            <Route path="/admin/talkshows" element={<AdminTalkshows />} />
            <Route path="/admin/venues" element={<AdminVenues />} />
            <Route path="/admin/recommendations" element={<AdminRecommendations />} />
            <Route path="/admin/backup" element={<AdminBackup />} />
            
            {/* Page 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppWrapper>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
