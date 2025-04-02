
import React from 'react';
import VenuesList from '@/components/venues/VenuesList';

interface Venue {
  id: string;
  name: string;
  partner: string;
  location: string;
  capacity: number;
  floorPlan: string;
}

interface VenuesTabProps {
  venues: Venue[];
}

const VenuesTab: React.FC<VenuesTabProps> = ({ venues }) => {
  return <VenuesList venues={venues} />;
};

export default VenuesTab;
