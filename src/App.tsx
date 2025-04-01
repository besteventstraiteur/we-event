
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterClientPage from "./pages/RegisterClientPage";
import RegisterPartnerPage from "./pages/RegisterPartnerPage";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientPartners from "./pages/client/ClientPartners";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminClients from "./pages/admin/AdminClients";
import AdminPodcasts from "./pages/admin/AdminPodcasts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pages publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-client" element={<RegisterClientPage />} />
          <Route path="/register-partner" element={<RegisterPartnerPage />} />
          
          {/* Dashboard Client */}
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/partners" element={<ClientPartners />} />
          
          {/* Dashboard Partenaire */}
          <Route path="/partner/dashboard" element={<PartnerDashboard />} />
          
          {/* Dashboard Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/partners" element={<AdminPartners />} />
          <Route path="/admin/clients" element={<AdminClients />} />
          <Route path="/admin/podcasts" element={<AdminPodcasts />} />
          
          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
