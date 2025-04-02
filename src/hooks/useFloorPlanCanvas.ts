
import { useState, useEffect, RefObject } from 'react';
import { fabric } from 'fabric';
import { addObjectToCanvas, createRoomPlan } from '@/components/floor-planner/floorPlannerUtils';
import { useToast } from '@/hooks/use-toast';

interface UseFloorPlanCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  initialData?: string;
  readOnly?: boolean;
  isMobile: boolean;
  roomWidth: number;
  roomHeight: number;
}

export const useFloorPlanCanvas = ({
  canvasRef,
  initialData,
  readOnly = false,
  isMobile,
  roomWidth,
  roomHeight
}: UseFloorPlanCanvasProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const { toast } = useToast();

  // Initialize canvas with responsive dimensions
  useEffect(() => {
    if (canvasRef.current) {
      // Determine canvas size based on device
      const containerWidth = isMobile ? window.innerWidth - 40 : 800;
      const containerHeight = isMobile ? 400 : 600;
      
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: containerWidth,
        height: containerHeight,
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

      // Handle window resize for responsiveness
      const handleResize = () => {
        if (isMobile) {
          const newWidth = window.innerWidth - 40;
          fabricCanvas.setWidth(newWidth);
          fabricCanvas.setHeight(400);
          fabricCanvas.renderAll();
        }
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        fabricCanvas.dispose();
      };
    }
  }, [initialData, readOnly, toast, isMobile, roomWidth, roomHeight]);

  // Update room dimensions
  const updateRoomDimensions = (width: number, height: number) => {
    if (!canvas) return;
    
    createRoomPlan(canvas, width, height, readOnly);
    
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

  // Zoom in/out with touch friendly controls
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
  const savePlan = (planName: string) => {
    if (!canvas) return null;

    try {
      const jsonData = JSON.stringify(canvas.toJSON(['type', 'capacity']));
      
      // Option to download plan
      const link = document.createElement('a');
      link.download = `${planName.replace(/\s+/g, '_').toLowerCase()}.json`;
      const blob = new Blob([jsonData], { type: 'application/json' });
      link.href = URL.createObjectURL(blob);
      link.click();

      return jsonData;
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le plan",
        variant: "destructive"
      });
      return null;
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

  return {
    canvas,
    updateRoomDimensions,
    addObject,
    deleteSelected,
    handleZoom,
    savePlan,
    importPlan,
    resetRoomPlan
  };
};
