
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PartnerTypeRoute from "@/components/security/PartnerTypeRoute";
import { PartnerType } from "@/components/dashboard/PartnerNavigation";

const PartnerPhotos = () => {
  return (
    <DashboardLayout type="partner">
      <div>
        <h1 className="text-2xl font-bold mb-6">Gestion des Photos</h1>
        {/* Contenu existant */}
      </div>
    </DashboardLayout>
  );
};

// Wrap the component to restrict access to photographers only
const ProtectedPartnerPhotos = () => (
  <PartnerTypeRoute allowedTypes={[PartnerType.PHOTOGRAPHER, PartnerType.GENERAL]}>
    <PartnerPhotos />
  </PartnerTypeRoute>
);

export default ProtectedPartnerPhotos;
