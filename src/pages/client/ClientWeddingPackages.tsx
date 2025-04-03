
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WeddingPackagesMarketplace from "@/components/wedding-packages/WeddingPackagesMarketplace";
import VideoPresentation from "@/components/video-presentation/VideoPresentation";

const ClientWeddingPackages = () => {
  return (
    <DashboardLayout type="client">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <VideoPresentation buttonText="Voir toutes les fonctionnalités" />
      </div>
      <WeddingPackagesMarketplace />
    </DashboardLayout>
  );
};

export default ClientWeddingPackages;
