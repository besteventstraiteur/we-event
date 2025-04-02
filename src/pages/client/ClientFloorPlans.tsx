
import React from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { useIsMobile } from '@/hooks/use-mobile';
import { useGuestAssignment } from '@/hooks/useGuestAssignment';
import MainTabs from '@/components/client-floor-plans/MainTabs';
import { initialGuests } from '@/data/mockGuestsData';
import { partnerVenues } from '@/data/mockVenuesData';

const ClientFloorPlans: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Utiliser notre hook pour la gestion des tables et des invités
  const {
    guests,
    setGuests,
    tables,
    createTable,
    updateTableName,
    deleteTable,
    assignGuestToSeat,
    unassignGuestFromSeat,
    getGuestsForTable,
    findSeatByGuestId
  } = useGuestAssignment(initialGuests);

  return (
    <DashboardLayout type="client">
      <div className="space-y-4">
        <div>
          <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-xl' : 'text-3xl'}`}>Organisation de votre événement</h1>
          <p className="text-gray-500 text-sm sm:text-base">Planifiez votre salle de réception et gérez vos invités</p>
        </div>

        <MainTabs 
          guests={guests}
          setGuests={setGuests}
          tables={tables}
          createTable={createTable}
          updateTableName={updateTableName}
          deleteTable={deleteTable}
          assignGuestToSeat={assignGuestToSeat}
          unassignGuestFromSeat={unassignGuestFromSeat}
          getGuestsForTable={getGuestsForTable}
          findSeatByGuestId={findSeatByGuestId}
          partnerVenues={partnerVenues}
        />
      </div>
    </DashboardLayout>
  );
};

export default ClientFloorPlans;
