
import { useEffect, useState, RefObject } from 'react';
import { fabric } from 'fabric';
import { createRoomPlan } from '@/components/floor-planner/floorPlannerUtils';
import { useToast } from '@/hooks/use-toast';

interface UseCanvasInitializationProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  initialData?: string;
  readOnly?: boolean;
  isMobile: boolean;
  roomWidth: number;
  roomHeight: number;
}

export const useCanvasInitialization = ({
  canvasRef,
  initialData,
  readOnly = false,
  isMobile,
  roomWidth,
  roomHeight
}: UseCanvasInitializationProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const { toast } = useToast();

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

  return { canvas };
};
