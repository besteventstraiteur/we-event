
import { fabric } from 'fabric';
import { addObjectToCanvas, createRoomPlan } from '@/components/floor-planner/floorPlannerUtils';
import { useToast } from '@/hooks/use-toast';

interface UseCanvasOperationsProps {
  canvas: fabric.Canvas | null;
  roomWidth: number;
  roomHeight: number;
  readOnly?: boolean;
}

export const useCanvasOperations = ({
  canvas,
  roomWidth,
  roomHeight,
  readOnly = false
}: UseCanvasOperationsProps) => {
  const { toast } = useToast();

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

  // Reset room plan
  const resetRoomPlan = () => {
    if (canvas) {
      createRoomPlan(canvas, roomWidth, roomHeight, readOnly);
    }
  };

  return {
    updateRoomDimensions,
    addObject,
    deleteSelected,
    handleZoom,
    resetRoomPlan
  };
};
