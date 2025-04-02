
import { useState } from 'react';
import type { Guest } from '@/types/floorPlanTypes';
import { useTableManagement } from './useTableManagement';
import { useSeatAssignment } from './useSeatAssignment';

// Use 'export type' instead of 'export' for re-exporting types
export type { Guest } from '@/types/floorPlanTypes';

export const useGuestAssignment = (initialGuests: Guest[] = []) => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  
  // Use the table management hook
  const tableManagement = useTableManagement(initialGuests);
  
  // Use the seat assignment hook
  const seatAssignment = useSeatAssignment({
    guests,
    setGuests,
    tables: tableManagement.tables,
    setTables: tableManagement.setTables
  });
  
  return {
    guests,
    setGuests,
    tables: tableManagement.tables,
    setTables: tableManagement.setTables,
    createTable: tableManagement.createTable,
    updateTableName: tableManagement.updateTableName,
    deleteTable: tableManagement.deleteTable,
    assignGuestToSeat: seatAssignment.assignGuestToSeat,
    unassignGuestFromSeat: seatAssignment.unassignGuestFromSeat,
    getGuestsForTable: seatAssignment.getGuestsForTable,
    findSeatByGuestId: seatAssignment.findSeatByGuestId
  };
};
