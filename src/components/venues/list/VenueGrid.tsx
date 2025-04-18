
import React from 'react';
import { Venue } from '@/types/venueTypes';
import VenueCard from './VenueCard';

interface VenueGridProps {
  venues: Venue[];
  onViewFloorPlan: (venue: Venue) => void;
  onDownloadPlan: (venue: Venue) => void;
}

const VenueGrid: React.FC<VenueGridProps> = ({ venues, onViewFloorPlan, onDownloadPlan }) => {
  if (venues.length === 0) {
    return (
      <div className="col-span-full text-center py-10 text-vip-gray-400">
        Aucune salle trouvée
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {venues.map((venue) => (
        <VenueCard
          key={venue.id}
          venue={venue}
          onViewFloorPlan={onViewFloorPlan}
          onDownloadPlan={onDownloadPlan}
        />
      ))}
    </div>
  );
};

export default VenueGrid;
