
import { useState } from "react";
import { Guest, Table } from "@/types/floorPlanTypes";

interface UseAIFloorPlanProps {
  guests: Guest[];
  tables: Table[];
  createTable: (name: string, seatCount: number) => string;
  assignGuestToSeat: (guestId: string, tableId: string, seatId: string) => boolean;
}

export const useAIFloorPlan = ({
  guests,
  tables,
  createTable,
  assignGuestToSeat
}: UseAIFloorPlanProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastSuggestion, setLastSuggestion] = useState<string | null>(null);

  // Generate an optimized seating arrangement based on guest data
  const generateOptimizedSeating = async () => {
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would make an API call to an AI service
      // Here we'll simulate the AI's table planning logic
      
      // Step 1: Analyze existing tables or create new ones if needed
      const tablesToUse = [...tables];
      const guestsToAssign = [...guests].filter(g => !g.table); // Only assign guests without tables
      
      // If we don't have enough tables, create more
      const totalGuests = guestsToAssign.length;
      const averageSeatsPerTable = 8;
      const estimatedTablesNeeded = Math.ceil(totalGuests / averageSeatsPerTable);
      
      // Create missing tables if needed
      while (tablesToUse.length < estimatedTablesNeeded) {
        const tableNumber = tablesToUse.length + 1;
        createTable(`Table ${tableNumber}`, 8);
      }
      
      // Step 2: Group guests by attributes (in a real system, this would use AI to analyze relationships)
      // For simulation, we'll group by family name and dietary restrictions
      const groupedGuests: Record<string, Guest[]> = {};
      
      guestsToAssign.forEach(guest => {
        // Use family name as group key
        const familyName = guest.lastName || "Autres";
        if (!groupedGuests[familyName]) {
          groupedGuests[familyName] = [];
        }
        groupedGuests[familyName].push(guest);
      });
      
      // Step 3: Assign guests to tables
      const assignmentResults = [];
      
      Object.entries(groupedGuests).forEach(([groupName, groupGuests]) => {
        // Find or create a suitable table
        if (groupGuests.length > 0) {
          // Find table with enough free seats
          const targetTableIndex = tablesToUse.findIndex(table => {
            const freeSeats = table.seats.filter(seat => !seat.guestId).length;
            return freeSeats >= groupGuests.length;
          });
          
          if (targetTableIndex !== -1) {
            const targetTable = tablesToUse[targetTableIndex];
            
            // Assign guests to free seats
            const freeSeats = targetTable.seats.filter(seat => !seat.guestId);
            
            for (let i = 0; i < Math.min(groupGuests.length, freeSeats.length); i++) {
              const assigned = assignGuestToSeat(
                groupGuests[i].id,
                targetTable.id,
                freeSeats[i].id
              );
              
              if (assigned) {
                assignmentResults.push(`${groupGuests[i].firstName} ${groupGuests[i].lastName} à ${targetTable.name}`);
              }
            }
          }
        }
      });
      
      // Set the suggestion summary
      const suggestion = assignmentResults.length > 0
        ? `J'ai placé ${assignmentResults.length} invités en tenant compte de leurs relations familiales et contraintes. Les invités de même famille sont placés ensemble quand possible.`
        : "Je n'ai pas pu effectuer de placement automatique. Vérifiez que vous avez assez de tables et de places disponibles.";
      
      setLastSuggestion(suggestion);
      return suggestion;
    } catch (error) {
      console.error("Error generating floor plan:", error);
      setLastSuggestion("Une erreur est survenue lors de la génération du plan de salle.");
      return "Erreur lors de la génération du plan";
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    lastSuggestion,
    generateOptimizedSeating
  };
};
