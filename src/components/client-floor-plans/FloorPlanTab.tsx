
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FloorPlanner from '@/components/floor-planner/FloorPlanner';
import TableAssignment from '@/components/floor-planner/TableAssignment';
import { useIsMobile } from '@/hooks/use-mobile';
import AISeatingAssistant from './AISeatingAssistant';
import { Guest, Table } from '@/types/floorPlanTypes';

interface FloorPlanTabProps {
  guests: Guest[];
  tables: Table[];
  createTable: (name: string, seatCount: number) => string;
  assignGuestToSeat: (guestId: string, tableId: string, seatId: string) => boolean;
  unassignGuestFromSeat: (guestId: string) => void;
  getGuestsForTable: (tableId: string) => Guest[];
  findSeatByGuestId: (guestId: string) => any;
  savedFloorPlan?: string | null;
  onSave?: (data: string) => void;
}

const FloorPlanTab: React.FC<FloorPlanTabProps> = ({
  guests,
  tables,
  createTable,
  assignGuestToSeat,
  unassignGuestFromSeat,
  getGuestsForTable,
  findSeatByGuestId,
  savedFloorPlan,
  onSave
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <FloorPlanner 
                initialData={savedFloorPlan || undefined}
                onSave={onSave}
              />
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
            onUpdateTableName={() => {}}
            onDeleteTable={() => {}}
            onAssignGuest={assignGuestToSeat}
            onUnassignGuest={unassignGuestFromSeat}
            getGuestsForTable={getGuestsForTable}
            findSeatByGuestId={findSeatByGuestId}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FloorPlanTab;
