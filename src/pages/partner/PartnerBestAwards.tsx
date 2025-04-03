
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BestAwardsBadgeSection from "@/components/partners/BestAwardsBadgeSection";

const PartnerBestAwards = () => {
  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Badge Best Awards 2025</h1>
          <p className="text-gray-500">
            Valorisez votre expertise avec notre label d'excellence et augmentez votre visibilité auprès des futurs mariés.
          </p>
        </div>

        <BestAwardsBadgeSection />
      </div>
    </DashboardLayout>
  );
};

export default PartnerBestAwards;
