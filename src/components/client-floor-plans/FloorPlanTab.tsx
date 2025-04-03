
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FloorPlanner from '@/components/floor-planner/FloorPlanner';
import TableAssignment from '@/components/floor-planner/TableAssignment';
import { useIsMobile } from '@/hooks/use-mobile';
import AISeatingAssistant from './AISeatingAssistant';

interface FloorPlanTabProps {
  guests: any[];
  tables: any[];
  createTable: (name: string, seatCount: number) => string;
  assignGuestToSeat: (guestId: string, tableId: string, seatId: string) => boolean;
  unassignGuestFromSeat: (guestId: string) => void;
  getGuestsForTable: (tableId: string) => any[];
  findSeatByGuestId: (guestId: string) => any;
}

const FloorPlanTab: React.FC<FloorPlanTabProps> = ({
  guests,
  tables,
  createTable,
  assignGuestToSeat,
  unassignGuestFromSeat,
  getGuestsForTable,
  findSeatByGuestId
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <FloorPlanner />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <AISeatingAssistant 
            guests={guests}
            tables={tables}
            createTable={createTable}
            assignGuestToSeat={assignGuestToSeat}
          />
        </div>
      </div>
      
      <Card>
        <CardContent className={isMobile ? "p-3" : "p-6"}>
          <TableAssignment 
            guests={guests}
            tables={tables}
            assignGuestToSeat={assignGuestToSeat}
            unassignGuestFromSeat={unassignGuestFromSeat}
            getGuestsForTable={getGuestsForTable}
            findSeatByGuestId={findSeatByGuestId}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FloorPlanTab;
