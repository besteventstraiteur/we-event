
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import CrmStatsSection from "@/components/crm/dashboard/CrmStatsSection";
import CrmTabsSection from "@/components/crm/dashboard/CrmTabsSection";
import CrmNotificationsSection from "@/components/crm/dashboard/CrmNotificationsSection";

const CrmDashboard = () => {
  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase();
  const location = useLocation();
  
  // Déterminer le préfixe d'URL basé sur le chemin actuel
  const isPartnerPath = location.pathname.includes('/partner/');
  const urlPrefix = isPartnerPath ? '/partner' : '';
  
  return (
    <DashboardLayout type={userRole === "admin" ? "admin" : "partner"}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">CRM Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenue dans votre espace de gestion de la relation client
          </p>
        </div>
        
        <CrmStatsSection />
        <CrmTabsSection urlPrefix={urlPrefix} />
        <CrmNotificationsSection />
      </div>
    </DashboardLayout>
  );
};

export default CrmDashboard;
