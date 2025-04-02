
import { useState } from 'react';
import { Guest, Table } from '@/types/floorPlanTypes';

interface UseSeatAssignmentProps {
  guests: Guest[];
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
}

export const useSeatAssignment = ({
  guests,
  setGuests,
  tables,
  setTables
}: UseSeatAssignmentProps) => {
  // Assign a guest to a table and seat
  const assignGuestToSeat = (guestId: string, tableId: string, seatId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return false;
    
    const seat = table.seats.find(s => s.id === seatId);
    if (!seat) return false;
    
    // Remove the guest from any previous seat assignments
    const updatedTables = tables.map(t => ({
      ...t,
      seats: t.seats.map(s => 
        s.guestId === guestId ? { ...s, guestId: undefined } : s
      )
    }));
    
    // Assign the guest to the new seat
    const finalTables = updatedTables.map(t => 
      t.id === tableId 
        ? {
            ...t,
            seats: t.seats.map(s => 
              s.id === seatId ? { ...s, guestId } : s
            )
          }
        : t
    );
    
    setTables(finalTables);
    
    // Update the guest's table and seat information
    setGuests(guests.map(guest => 
      guest.id === guestId 
        ? { 
            ...guest, 
            table: table.name,
            seat: seat.number
          } 
        : guest
    ));
    
    return true;
  };
  
  // Unassign a guest from a seat
  const unassignGuestFromSeat = (guestId: string) => {
    // Remove the guest from any seat assignments
    setTables(tables.map(t => ({
      ...t,
      seats: t.seats.map(s => 
        s.guestId === guestId ? { ...s, guestId: undefined } : s
      )
    })));
    
    // Clear the guest's table and seat information
    setGuests(guests.map(guest => 
      guest.id === guestId 
        ? { ...guest, table: '', seat: undefined } 
        : guest
    ));
  };
  
  // Get all assigned guests for a specific table
  const getGuestsForTable = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (!table) return [];
    
    const assignedGuestIds = table.seats
      .filter(seat => seat.guestId)
      .map(seat => seat.guestId);
    
    return guests.filter(guest => assignedGuestIds.includes(guest.id));
  };
  
  // Find a seat by guest ID
  const findSeatByGuestId = (guestId: string) => {
    for (const table of tables) {
      const seat = table.seats.find(s => s.guestId === guestId);
      if (seat) {
        return { table, seat };
      }
    }
    return null;
  };

  return {
    assignGuestToSeat,
    unassignGuestFromSeat,
    getGuestsForTable,
    findSeatByGuestId
  };
};
