
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PackageManagement from "./wedding-packages/PackageManagement";
import PackageAnalytics from "./wedding-packages/PackageAnalytics";

const AdminWeddingPackages = () => {
  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-vip-gray-400">Gérez les formules groupées proposées aux clients</p>
        </div>

        <Tabs defaultValue="management" className="w-full">
          <TabsList className="bg-vip-gray-900 border border-vip-gray-800 mb-4">
            <TabsTrigger value="management" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Gestion des packs
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Analyses et ventes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="management" className="mt-0">
            <PackageManagement />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-0">
            <PackageAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminWeddingPackages;
