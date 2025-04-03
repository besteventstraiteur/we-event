
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import pages
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientTasks from "./pages/client/ClientTasks";
import ClientTodoList from "./pages/client/ClientTodoList";
import ClientBudget from "./pages/client/ClientBudget";
import ClientGuests from "./pages/client/ClientGuests";
import ClientFloorPlans from "./pages/client/ClientFloorPlans";
import ClientProjectDashboard from "./pages/client/ClientProjectDashboard";
import ClientMiniSite from "./pages/client/ClientMiniSite";
import ClientPartners from "./pages/client/ClientPartners";
import ClientPartnerRatings from "./pages/client/ClientPartnerRatings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGuests from "./pages/admin/AdminGuests";
import AdminVenues from "./pages/admin/AdminVenues";
import AdminClients from "./pages/admin/AdminClients";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminRatings from "./pages/admin/AdminRatings";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Client Routes */}
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/tasks" element={<ClientTasks />} />
        <Route path="/client/todo" element={<ClientTodoList />} />
        <Route path="/client/budget" element={<ClientBudget />} />
        <Route path="/client/guests" element={<ClientGuests />} />
        <Route path="/client/floor-plans" element={<ClientFloorPlans />} />
        <Route path="/client/project" element={<ClientProjectDashboard />} />
        <Route path="/client/mini-site" element={<ClientMiniSite />} />
        <Route path="/client/partners" element={<ClientPartners />} />
        <Route path="/client/partners/:partnerId/ratings" element={<ClientPartnerRatings />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/guests" element={<AdminGuests />} />
        <Route path="/admin/venues" element={<AdminVenues />} />
        <Route path="/admin/clients" element={<AdminClients />} />
        <Route path="/admin/partners" element={<AdminPartners />} />
        <Route path="/admin/ratings" element={<AdminRatings />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
