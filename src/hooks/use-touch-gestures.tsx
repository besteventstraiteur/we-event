
import { useState, useRef, useEffect } from "react";

interface SwipeState {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  swiping: boolean;
}

interface SwipeResult {
  direction: "left" | "right" | "up" | "down" | null;
  distance: number;
}

interface TouchGestureOptions {
  minDistance?: number;
  preventScrollOnHorizontal?: boolean;
}

const initialSwipeState = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  swiping: false
};

export function useTouchGestures(
  element: React.RefObject<HTMLElement> | null,
  options: TouchGestureOptions = {}
) {
  const { 
    minDistance = 50, 
    preventScrollOnHorizontal = true 
  } = options;
  
  const [swipeState, setSwipeState] = useState<SwipeState>(initialSwipeState);
  const [result, setResult] = useState<SwipeResult>({ direction: null, distance: 0 });
  const swipingRef = useRef(false);
  
  useEffect(() => {
    if (!element?.current) return;
    
    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      swipingRef.current = true;
      setSwipeState({
        ...initialSwipeState,
        startX: touch.clientX,
        startY: touch.clientY,
        swiping: true
      });
    };
    
    const onTouchMove = (e: TouchEvent) => {
      if (!swipingRef.current) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - swipeState.startX;
      const deltaY = touch.clientY - swipeState.startY;
      
      // Prevent scrolling when swiping horizontally
      if (preventScrollOnHorizontal && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        e.preventDefault();
      }
      
      setSwipeState(prevState => ({
        ...prevState,
        endX: touch.clientX,
        endY: touch.clientY
      }));
    };
    
    const onTouchEnd = () => {
      if (!swipingRef.current) return;
      
      swipingRef.current = false;
      const deltaX = swipeState.endX - swipeState.startX;
      const deltaY = swipeState.endY - swipeState.startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      
      let direction: "left" | "right" | "up" | "down" | null = null;
      let distance = 0;
      
      if (Math.max(absX, absY) > minDistance) {
        if (absX > absY) {
          direction = deltaX > 0 ? "right" : "left";
          distance = absX;
        } else {
          direction = deltaY > 0 ? "down" : "up";
          distance = absY;
        }
      }
      
      setResult({ direction, distance });
      setSwipeState(prevState => ({ ...prevState, swiping: false }));
    };
    
    const target = element.current;
    
    // Add passive: false to prevent default touch behavior when needed
    target.addEventListener("touchstart", onTouchStart, { passive: true });
    target.addEventListener("touchmove", onTouchMove, { passive: !preventScrollOnHorizontal });
    target.addEventListener("touchend", onTouchEnd, { passive: true });
    
    return () => {
      target.removeEventListener("touchstart", onTouchStart);
      target.removeEventListener("touchmove", onTouchMove);
      target.removeEventListener("touchend", onTouchEnd);
    };
  }, [element, minDistance, preventScrollOnHorizontal, swipeState.startX, swipeState.startY]);
  
  return {
    swiping: swipeState.swiping,
    direction: result.direction,
    distance: result.distance,
    reset: () => setResult({ direction: null, distance: 0 })
  };
}
