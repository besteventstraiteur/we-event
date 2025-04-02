
import React from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import VenueSearch from '@/components/admin/venues/VenueSearch';
import AddVenueButton from '@/components/admin/venues/AddVenueButton';
import VenueList from '@/components/admin/venues/VenueList';
import VenueFormDialog from '@/components/venues/VenueFormDialog';
import FloorPlanViewDialog from '@/components/venues/FloorPlanViewDialog';
import FloorPlanEditDialog from '@/components/venues/FloorPlanEditDialog';
import { useVenues } from '@/hooks/useVenues';

const AdminVenues: React.FC = () => {
  const {
    venues,
    searchTerm,
    setSearchTerm,
    selectedVenue,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditingFloorPlan,
    setIsEditingFloorPlan,
    viewFloorPlan,
    setViewFloorPlan,
    handleSaveVenue,
    handleEditFloorPlan,
    handleViewFloorPlan,
    handleEditVenue,
    handleSaveFloorPlan,
    handleRemoveVenue
  } = useVenues();

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des salles de réception</h1>
          <p className="text-vip-gray-400">Gérez les salles de réception de vos partenaires</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <VenueSearch 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          
          <VenueFormDialog
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            selectedVenue={selectedVenue}
            onSave={handleSaveVenue}
          />
          
          <AddVenueButton 
            onClick={() => {
              setIsAddDialogOpen(true);
            }} 
          />
        </div>

        <VenueList
          venues={venues}
          onViewFloorPlan={handleViewFloorPlan}
          onEditFloorPlan={handleEditFloorPlan}
          onEditVenue={handleEditVenue}
          onRemoveVenue={handleRemoveVenue}
        />
      </div>

      {/* Dialogs for viewing and editing floor plans */}
      <FloorPlanViewDialog
        open={viewFloorPlan}
        onOpenChange={setViewFloorPlan}
        venue={selectedVenue}
      />

      <FloorPlanEditDialog
        open={isEditingFloorPlan}
        onOpenChange={setIsEditingFloorPlan}
        venue={selectedVenue}
        onSave={handleSaveFloorPlan}
      />
    </DashboardLayout>
  );
};

export default AdminVenues;
