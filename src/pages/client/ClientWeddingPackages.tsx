
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import WeddingPackagesMarketplace from "@/components/wedding-packages/WeddingPackagesMarketplace";

const ClientWeddingPackages = () => {
  return (
    <DashboardLayout type="client">
      <WeddingPackagesMarketplace />
    </DashboardLayout>
  );
};

export default ClientWeddingPackages;
