
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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

interface FloorPlanViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  venue: Venue | null;
}

const FloorPlanViewDialog: React.FC<FloorPlanViewDialogProps> = ({
  open,
  onOpenChange,
  venue
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white max-w-5xl">
        <DialogHeader>
          <DialogTitle>Plan de salle: {venue?.name}</DialogTitle>
          <DialogDescription className="text-vip-gray-400">
            Capacité: {venue?.capacity} personnes | Partenaire: {venue?.partner}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {venue?.floorPlan ? (
            <FloorPlanner initialData={venue.floorPlan} readOnly={true} />
          ) : (
            <div className="text-center py-10 text-vip-gray-400">
              Plan non disponible pour cette salle
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
            onClick={() => onOpenChange(false)}
          >
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FloorPlanViewDialog;
