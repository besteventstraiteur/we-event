
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientKPIs from "./kpi-dashboard/ClientKPIs";
import PartnerKPIs from "./kpi-dashboard/PartnerKPIs";
import GuestKPIs from "./kpi-dashboard/GuestKPIs";
import PlatformKPIs from "./kpi-dashboard/PlatformKPIs";

const AdminKpiDashboard = () => {
  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord des KPIs</h1>
          <p className="text-vip-gray-400">Suivi des métriques clés pour tous les utilisateurs de la plateforme</p>
        </div>

        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="bg-vip-gray-900 border border-vip-gray-800 mb-4">
            <TabsTrigger value="clients" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Mariés
            </TabsTrigger>
            <TabsTrigger value="partners" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Prestataires
            </TabsTrigger>
            <TabsTrigger value="guests" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Invités
            </TabsTrigger>
            <TabsTrigger value="platform" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Plateforme
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="clients" className="mt-0">
            <ClientKPIs />
          </TabsContent>
          
          <TabsContent value="partners" className="mt-0">
            <PartnerKPIs />
          </TabsContent>
          
          <TabsContent value="guests" className="mt-0">
            <GuestKPIs />
          </TabsContent>
          
          <TabsContent value="platform" className="mt-0">
            <PlatformKPIs />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminKpiDashboard;
