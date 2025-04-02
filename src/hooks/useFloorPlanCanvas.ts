
import { RefObject } from 'react';
import { useCanvasInitialization } from './floor-planner/useCanvasInitialization';
import { useCanvasOperations } from './floor-planner/useCanvasOperations';
import { usePlanPersistence } from './floor-planner/usePlanPersistence';

interface UseFloorPlanCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  initialData?: string;
  readOnly?: boolean;
  isMobile: boolean;
  roomWidth: number;
  roomHeight: number;
}

export const useFloorPlanCanvas = (props: UseFloorPlanCanvasProps) => {
  const { canvas } = useCanvasInitialization(props);
  
  const operations = useCanvasOperations({
    canvas,
    roomWidth: props.roomWidth,
    roomHeight: props.roomHeight,
    readOnly: props.readOnly
  });
  
  const persistence = usePlanPersistence({ canvas });

  return {
    canvas,
    ...operations,
    ...persistence
  };
};
