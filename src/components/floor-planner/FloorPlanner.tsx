
import React, { useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import FloorPlanHeader from './FloorPlanHeader';
import FloorPlanSettings from './FloorPlanSettings';
import FloorPlanToolbar from './FloorPlanToolbar';
import FloorPlanActions from './FloorPlanActions';
import FloorPlanCanvas from './FloorPlanCanvas';
import { useIsMobile } from '@/hooks/use-mobile';
import { useFloorPlanCanvas } from '@/hooks/useFloorPlanCanvas';

interface FloorPlannerProps {
  onSave?: (data: string) => void;
  initialData?: string;
  readOnly?: boolean;
}

const FloorPlanner: React.FC<FloorPlannerProps> = ({ onSave, initialData, readOnly = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [planName, setPlanName] = useState<string>('Nouveau plan');
  const [planMode, setPlanMode] = useState<'2d' | '2d'>('2d');
  const [roomWidth, setRoomWidth] = useState<number>(700);
  const [roomHeight, setRoomHeight] = useState<number>(500);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Use our custom hook for canvas operations
  const {
    handleZoom,
    addObject,
    deleteSelected,
    updateRoomDimensions: updateCanvasDimensions,
    savePlan,
    importPlan,
    resetRoomPlan
  } = useFloorPlanCanvas({
    canvasRef,
    initialData,
    readOnly,
    isMobile,
    roomWidth,
    roomHeight
  });

  // Update room dimensions
  const updateRoomDimensions = () => {
    updateCanvasDimensions(roomWidth, roomHeight);
  };

  // Save plan handler
  const handleSavePlan = () => {
    const jsonData = savePlan(planName);
    
    if (jsonData && onSave) {
      onSave(jsonData);
      toast({
        title: "Plan sauvegardé",
        description: "Votre plan a été enregistré avec succès"
      });
    }
  };

  return (
    <div className="flex flex-col">
      <Card className="bg-white border-gray-200 mb-4">
        <CardHeader className="pb-3">
          <FloorPlanHeader handleZoom={handleZoom} readOnly={readOnly} />
        </CardHeader>
        <CardContent>
          {!readOnly && !isMobile && (
            <FloorPlanSettings
              planName={planName}
              setPlanName={setPlanName}
              planMode={planMode}
              setPlanMode={setPlanMode}
              roomWidth={roomWidth}
              setRoomWidth={setRoomWidth}
              roomHeight={roomHeight}
              setRoomHeight={setRoomHeight}
              updateRoomDimensions={updateRoomDimensions}
            />
          )}
          
          {!readOnly && (
            <FloorPlanToolbar
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
              addObject={addObject}
              deleteSelected={deleteSelected}
              isMobile={isMobile}
            />
          )}

          <FloorPlanCanvas ref={canvasRef} />

          {!readOnly && (
            <FloorPlanActions
              createRoomPlan={resetRoomPlan}
              savePlan={handleSavePlan}
              isMobile={isMobile}
            />
          )}
          
          {/* Hidden file input for import functionality */}
          <input
            id="import-plan"
            type="file"
            accept=".json"
            className="hidden"
            onChange={importPlan}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FloorPlanner;
