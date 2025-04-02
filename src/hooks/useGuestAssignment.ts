
import { useState, useEffect } from 'react';

interface Guest {
  id: string;
  nom: string;
  prenom: string;
  table: string;
  seat?: string;
}

interface Table {
  id: string;
  name: string;
  seats: Seat[];
}

interface Seat {
  id: string;
  number: string;
  guestId?: string;
}

export const useGuestAssignment = (initialGuests: Guest[] = []) => {
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [tables, setTables] = useState<Table[]>([]);
  
  // Load tables from localStorage if available
  useEffect(() => {
    const savedTables = localStorage.getItem('floorPlanTables');
    if (savedTables) {
      try {
        setTables(JSON.parse(savedTables));
      } catch (e) {
        console.error('Error loading tables from localStorage:', e);
      }
    }
  }, []);
  
  // Save tables to localStorage when they change
  useEffect(() => {
    if (tables.length > 0) {
      localStorage.setItem('floorPlanTables', JSON.stringify(tables));
    }
  }, [tables]);
  
  // Create a new table
  const createTable = (name: string, seatCount: number = 8) => {
    const newTable: Table = {
      id: `table-${Date.now()}`,
      name,
      seats: Array.from({ length: seatCount }, (_, i) => ({
        id: `seat-${Date.now()}-${i}`,
        number: (i + 1).toString(),
      }))
    };
    
    setTables([...tables, newTable]);
    return newTable.id;
  };
  
  // Update a table name
  const updateTableName = (tableId: string, newName: string) => {
    setTables(tables.map(table => 
      table.id === tableId ? { ...table, name: newName } : table
    ));
    
    // Update all guests assigned to this table
    setGuests(guests.map(guest => 
      guest.table === tables.find(t => t.id === tableId)?.name 
        ? { ...guest, table: newName } 
        : guest
    ));
  };
  
  // Delete a table
  const deleteTable = (tableId: string) => {
    const tableToDelete = tables.find(t => t.id === tableId);
    if (!tableToDelete) return;
    
    // Unassign all guests from this table
    setGuests(guests.map(guest => 
      guest.table === tableToDelete.name 
        ? { ...guest, table: '', seat: undefined } 
        : guest
    ));
    
    // Remove the table
    setTables(tables.filter(table => table.id !== tableId));
  };
  
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
    guests,
    setGuests,
    tables,
    setTables,
    createTable,
    updateTableName,
    deleteTable,
    assignGuestToSeat,
    unassignGuestFromSeat,
    getGuestsForTable,
    findSeatByGuestId
  };
};
