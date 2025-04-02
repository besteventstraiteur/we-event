
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import GuestInvitationManager from "@/components/guests/GuestInvitationManager";

const ClientGuests = () => {
  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Invités</h1>
          <p className="text-gray-500">
            Invitez vos proches et suivez leurs réponses
          </p>
        </div>
        
        <GuestInvitationManager />
      </div>
    </DashboardLayout>
  );
};

export default ClientGuests;
