
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecommendationsList from "./recommendations/RecommendationsList";
import RecommendationsStats from "./recommendations/RecommendationsStats";
import { recommendations, categoryStats, monthlyStats, statusStats, topPartners } from "./recommendations/mockData";

const AdminRecommendations = () => {
  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Recommandations entre partenaires</h1>
          <p className="text-vip-gray-400">Suivez et analysez les recommandations entre les partenaires</p>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="bg-vip-gray-900 border border-vip-gray-800 mb-4">
            <TabsTrigger value="list" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Liste
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Statistiques
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-0">
            <RecommendationsList recommendations={recommendations} />
          </TabsContent>
          
          <TabsContent value="stats" className="mt-0">
            <RecommendationsStats 
              monthlyStats={monthlyStats}
              categoryStats={categoryStats}
              statusStats={statusStats}
              topPartners={topPartners}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminRecommendations;
