
import { useState, useEffect } from 'react';
import { Table, Guest } from '@/types/floorPlanTypes';

export const useTableManagement = (initialGuests: Guest[] = []) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  
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

  return {
    tables,
    setTables,
    createTable,
    updateTableName,
    deleteTable
  };
};
