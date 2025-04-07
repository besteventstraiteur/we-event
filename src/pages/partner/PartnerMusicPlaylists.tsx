
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PartnerTypeRoute from "@/components/security/PartnerTypeRoute";
import { PartnerType } from "@/utils/accessControl";

// This component will be wrapped with PartnerTypeRoute later
const PartnerMusicPlaylistsContent = () => {
  return (
    <DashboardLayout type="partner">
      <div>
        <h1 className="text-2xl font-bold mb-6">Gestion des Playlists</h1>
        {/* Contenu existant */}
      </div>
    </DashboardLayout>
  );
};

// Wrap the component to restrict access to DJs only
const PartnerMusicPlaylists = () => (
  <PartnerTypeRoute allowedTypes={[PartnerType.DJ, PartnerType.GENERAL]}>
    <PartnerMusicPlaylistsContent />
  </PartnerTypeRoute>
);

export default PartnerMusicPlaylists;
