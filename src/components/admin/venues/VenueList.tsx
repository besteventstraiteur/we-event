
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminVenuesList from '@/components/venues/AdminVenuesList';
import { Venue } from '@/types/venueTypes';

interface VenueListProps {
  venues: Venue[];
  onViewFloorPlan: (venue: Venue) => void;
  onEditFloorPlan: (venue: Venue) => void;
  onEditVenue: (venue: Venue) => void;
  onRemoveVenue: (id: string) => void;
}

const VenueList: React.FC<VenueListProps> = ({
  venues,
  onViewFloorPlan,
  onEditFloorPlan,
  onEditVenue,
  onRemoveVenue
}) => {
  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader>
        <CardTitle>Liste des salles</CardTitle>
        <CardDescription>Gérez les salles de réception disponibles pour vos clients VIP</CardDescription>
      </CardHeader>
      <CardContent>
        <AdminVenuesList
          venues={venues}
          onViewFloorPlan={onViewFloorPlan}
          onEditFloorPlan={onEditFloorPlan}
          onEditVenue={onEditVenue}
          onRemoveVenue={onRemoveVenue}
        />
      </CardContent>
    </Card>
  );
};

export default VenueList;
