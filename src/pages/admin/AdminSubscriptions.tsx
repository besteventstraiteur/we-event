
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionKPIs from "./subscriptions/SubscriptionKPIs";
import SubscriptionsList from "./subscriptions/SubscriptionsList";
import SubscriptionPlans from "./subscriptions/SubscriptionPlans";

const AdminSubscriptions = () => {
  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Abonnements</h1>
          <p className="text-vip-gray-400">
            Gérez les abonnements des partenaires et consultez les performances
          </p>
        </div>

        <SubscriptionKPIs />

        <Tabs defaultValue="subscriptions" className="w-full">
          <TabsList className="bg-vip-gray-900 border border-vip-gray-800 mb-4">
            <TabsTrigger 
              value="subscriptions" 
              className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
            >
              Abonnements actifs
            </TabsTrigger>
            <TabsTrigger 
              value="plans" 
              className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
            >
              Configuration des plans
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscriptions" className="mt-0">
            <SubscriptionsList />
          </TabsContent>
          
          <TabsContent value="plans" className="mt-0">
            <SubscriptionPlans />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSubscriptions;
