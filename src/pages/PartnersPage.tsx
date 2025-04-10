
import React from "react";
import PartnersHeader from "@/components/partners/PartnersHeader";
import PartnersFooter from "@/components/partners/PartnersFooter";
import PartnersList from "@/components/partners/PartnersList";
import VIPPromotion from "@/components/partners/VIPPromotion";
import { partnerCategories, allPartners } from "@/components/partners/partnersData";

const PartnersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PartnersHeader />

      <main className="flex-1 container py-8">
        <PartnersList partnerCategories={partnerCategories} allPartners={allPartners} />
        <VIPPromotion />
      </main>

      <PartnersFooter />
    </div>
  );
};

export default PartnersPage;
