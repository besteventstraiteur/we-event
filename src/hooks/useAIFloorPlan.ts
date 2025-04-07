
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
  const [affinity, setAffinity] = useState<Record<string, string[]>>({});

  // Analyser les affinités entre invités basées sur différents critères
  const analyzeGuestAffinities = () => {
    const affinityMap: Record<string, string[]> = {};
    
    // Regrouper par famille (nom de famille)
    const familyGroups: Record<string, Guest[]> = {};
    guests.forEach(guest => {
      const familyName = guest.lastName || guest.nom || '';
      if (familyName) {
        if (!familyGroups[familyName]) {
          familyGroups[familyName] = [];
        }
        familyGroups[familyName].push(guest);
      }
    });
    
    // Créer des affinités basées sur la famille
    Object.values(familyGroups).forEach(group => {
      if (group.length >= 2) {
        group.forEach(guest => {
          if (!affinityMap[guest.id]) {
            affinityMap[guest.id] = [];
          }
          
          group
            .filter(g => g.id !== guest.id)
            .forEach(relative => {
              if (!affinityMap[guest.id].includes(relative.id)) {
                affinityMap[guest.id].push(relative.id);
              }
            });
        });
      }
    });
    
    // Analyser d'autres critères d'affinité (âge, restrictions alimentaires, etc.)
    const ageGroups: Record<string, Guest[]> = {
      'enfants': [],
      'adultes': [],
      'seniors': []
    };
    
    guests.forEach(guest => {
      // Vérifier si la propriété age existe avant de l'utiliser
      const guestAge = typeof guest.age === 'number' ? guest.age : 
                      guest.enfants !== undefined ? (guest.enfants > 0 ? 10 : 30) : 30;
      
      if (guestAge < 18) {
        ageGroups['enfants'].push(guest);
      } else if (guestAge > 65) {
        ageGroups['seniors'].push(guest);
      } else {
        ageGroups['adultes'].push(guest);
      }
    });
    
    // Affinités basées sur restrictions alimentaires similaires
    const dietaryGroups: Record<string, Guest[]> = {};
    guests.forEach(guest => {
      const diet = guest.dietaryRestrictions || 'standard';
      if (!dietaryGroups[diet]) {
        dietaryGroups[diet] = [];
      }
      dietaryGroups[diet].push(guest);
    });
    
    setAffinity(affinityMap);
    return affinityMap;
  };

  // Generate an optimized seating arrangement based on guest data
  const generateOptimizedSeating = async () => {
    setIsGenerating(true);
    
    try {
      // Analyser les affinités entre invités
      const affinityMap = analyzeGuestAffinities();
      
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
        // Use family name as group key - fallback to nom if lastName is not available
        const familyName = guest.lastName || guest.nom || "Autres";
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
                // Use firstName/lastName if available, otherwise fallback to prenom/nom
                const firstName = groupGuests[i].firstName || groupGuests[i].prenom;
                const lastName = groupGuests[i].lastName || groupGuests[i].nom;
                assignmentResults.push(`${firstName} ${lastName} à ${targetTable.name}`);
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
