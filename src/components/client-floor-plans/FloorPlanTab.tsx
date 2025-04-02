
import React from 'react';
import { Card } from "@/components/ui/card";
import FloorPlanner from '@/components/floor-planner/FloorPlanner';

interface FloorPlanTabProps {
  savedFloorPlan: string | null;
  onSave: (data: string) => void;
}

const FloorPlanTab: React.FC<FloorPlanTabProps> = ({ savedFloorPlan, onSave }) => {
  return (
    <FloorPlanner 
      initialData={savedFloorPlan || undefined} 
      onSave={onSave} 
    />
  );
};

export default FloorPlanTab;
