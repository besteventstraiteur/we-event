
import React from 'react';
import GuestList from '@/components/guests/GuestList';
import type { Guest, Table } from '@/types/floorPlanTypes';

interface GuestsTabProps {
  guests: Guest[];
  onSave: (guests: Guest[]) => void;
  tables: Table[];
}

const GuestsTab: React.FC<GuestsTabProps> = ({ guests, onSave, tables }) => {
  return (
    <GuestList 
      initialGuests={guests} 
      onSave={onSave}
      tables={tables.map(table => ({ id: table.id, name: table.name }))}
      menuOptions={[
        { id: "1-1", name: "Bœuf Wellington", menuName: "Menu Standard" },
        { id: "1-2", name: "Saumon en croûte d'herbes", menuName: "Menu Standard" },
        { id: "2-1", name: "Risotto aux champignons", menuName: "Menu Végétarien" },
        { id: "2-2", name: "Wellington végétarien", menuName: "Menu Végétarien" },
      ]}
    />
  );
};

export default GuestsTab;
