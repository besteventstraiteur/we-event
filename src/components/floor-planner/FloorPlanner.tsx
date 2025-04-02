
import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
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
import { createRoomPlan, addObjectToCanvas } from './floorPlannerUtils';

interface FloorPlannerProps {
  onSave?: (data: string) => void;
  initialData?: string;
  readOnly?: boolean;
}

const FloorPlanner: React.FC<FloorPlannerProps> = ({ onSave, initialData, readOnly = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [planName, setPlanName] = useState<string>('Nouveau plan');
  const [planMode, setPlanMode] = useState<'2d' | '2d'>('2d');
  const [roomWidth, setRoomWidth] = useState<number>(700);
  const [roomHeight, setRoomHeight] = useState<number>(500);
  const { toast } = useToast();

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#f5f5f5',
        selection: !readOnly,
        preserveObjectStacking: true,
      });
      
      setCanvas(fabricCanvas);
      
      // Load initial data if it exists
      if (initialData) {
        try {
          fabricCanvas.loadFromJSON(initialData, fabricCanvas.renderAll.bind(fabricCanvas));
        } catch (error) {
          console.error("Erreur lors du chargement du plan:", error);
          toast({
            title: "Erreur",
            description: "Impossible de charger le plan",
            variant: "destructive"
          });
        }
      } else {
        // Create default room plan
        createRoomPlan(fabricCanvas, roomWidth, roomHeight, readOnly);
      }

      // Configure limitations in read-only mode
      if (readOnly) {
        fabricCanvas.selection = false;
        fabricCanvas.forEachObject(obj => {
          obj.selectable = false;
        });
      }

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [initialData, readOnly, toast]);

  // Update room dimensions
  const updateRoomDimensions = () => {
    if (!canvas) return;
    
    createRoomPlan(canvas, roomWidth, roomHeight, readOnly);
    
    toast({
      description: "Dimensions de la salle mises à jour",
    });
  };

  // Add object to canvas
  const addObject = (type: string) => {
    if (!canvas) return;

    const object = addObjectToCanvas(canvas, type);
    
    if (object) {
      toast({
        description: `Élément ajouté, déplacez-le à l'endroit souhaité`,
      });
    }
  };

  // Delete selected object
  const deleteSelected = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      toast({
        description: "Élément supprimé",
      });
    } else {
      toast({
        description: "Sélectionnez un élément à supprimer",
        variant: "destructive"
      });
    }
  };

  // Zoom in/out
  const handleZoom = (zoomIn: boolean) => {
    if (!canvas) return;

    const currentZoom = canvas.getZoom();
    const newZoom = zoomIn ? currentZoom * 1.1 : currentZoom / 1.1;
    
    if (newZoom > 0.2 && newZoom < 3) {
      canvas.zoomToPoint({ x: canvas.width! / 2, y: canvas.height! / 2 }, newZoom);
      canvas.renderAll();
    }
  };

  // Save plan
  const savePlan = () => {
    if (!canvas) return;

    try {
      const jsonData = JSON.stringify(canvas.toJSON(['type', 'capacity']));
      if (onSave) {
        onSave(jsonData);
      }
      
      toast({
        title: "Plan sauvegardé",
        description: "Votre plan a été enregistré avec succès"
      });
      
      // Option to download plan
      const link = document.createElement('a');
      link.download = `${planName.replace(/\s+/g, '_').toLowerCase()}.json`;
      const blob = new Blob([jsonData], { type: 'application/json' });
      link.href = URL.createObjectURL(blob);
      link.click();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le plan",
        variant: "destructive"
      });
    }
  };

  // Import plan
  const importPlan = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const jsonData = e.target?.result as string;
        canvas.loadFromJSON(jsonData, canvas.renderAll.bind(canvas));
        toast({
          title: "Plan importé",
          description: "Le plan a été importé avec succès"
        });
      } catch (error) {
        console.error("Erreur lors de l'importation:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'importer le plan",
          variant: "destructive"
        });
      }
    };

    reader.readAsText(file);
  };

  // Reset room plan
  const resetRoomPlan = () => {
    if (canvas) {
      createRoomPlan(canvas, roomWidth, roomHeight, readOnly);
    }
  };

  return (
    <div className="flex flex-col">
      <Card className="bg-white border-gray-200 mb-4">
        <CardHeader className="pb-3">
          <FloorPlanHeader handleZoom={handleZoom} readOnly={readOnly} />
        </CardHeader>
        <CardContent>
          {!readOnly && (
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
            />
          )}

          <div className="canvas-container border border-gray-200 rounded-md overflow-hidden">
            <canvas ref={canvasRef} />
          </div>

          {!readOnly && (
            <FloorPlanActions
              createRoomPlan={resetRoomPlan}
              savePlan={savePlan}
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
