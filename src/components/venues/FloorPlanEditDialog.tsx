
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FloorPlanner from '@/components/floor-planner/FloorPlanner';

interface Venue {
  id: string;
  name: string;
  partner: string;
  location: string;
  capacity: number;
  description: string;
  floorPlan?: string;
}

interface FloorPlanEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  venue: Venue | null;
  onSave: (data: string) => void;
}

const FloorPlanEditDialog: React.FC<FloorPlanEditDialogProps> = ({
  open,
  onOpenChange,
  venue,
  onSave
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white max-w-6xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>Éditer le plan: {venue?.name}</DialogTitle>
          <DialogDescription className="text-vip-gray-400">
            Créez ou modifiez le plan de cette salle
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 h-full overflow-auto">
          {venue && (
            <FloorPlanner 
              initialData={venue.floorPlan} 
              onSave={onSave} 
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FloorPlanEditDialog;
