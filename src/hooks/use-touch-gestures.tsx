
import { useState, useEffect, MutableRefObject } from "react";

type SwipeDirection = 'left' | 'right' | 'up' | 'down' | null;

interface TouchGestureState {
  swiping: boolean;
  direction: SwipeDirection;
  startX: number;
  startY: number;
  moveX: number;
  moveY: number;
  velocity: number;
}

const initialState: TouchGestureState = {
  swiping: false,
  direction: null,
  startX: 0,
  startY: 0,
  moveX: 0,
  moveY: 0,
  velocity: 0,
};

export const useTouchGestures = (
  ref: MutableRefObject<HTMLElement | null>,
  options = { threshold: 50, preventScroll: false }
) => {
  const [gestureState, setGestureState] = useState<TouchGestureState>(initialState);
  const [startTime, setStartTime] = useState<number>(0);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      
      setStartTime(Date.now());
      setGestureState({
        ...initialState,
        startX: touch.clientX,
        startY: touch.clientY,
      });
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (options.preventScroll) {
        e.preventDefault();
      }
      
      const touch = e.touches[0];
      if (!touch) return;
      
      const moveX = touch.clientX - gestureState.startX;
      const moveY = touch.clientY - gestureState.startY;
      const absX = Math.abs(moveX);
      const absY = Math.abs(moveY);
      
      // Determine if we're swiping and in which direction
      if (absX > options.threshold || absY > options.threshold) {
        let direction: SwipeDirection = null;
        
        if (absX > absY) {
          direction = moveX > 0 ? 'right' : 'left';
        } else {
          direction = moveY > 0 ? 'down' : 'up';
        }
        
        const timeDiff = Date.now() - startTime;
        const distance = Math.sqrt(moveX * moveX + moveY * moveY);
        const velocity = distance / timeDiff;
        
        setGestureState({
          swiping: true,
          direction,
          startX: gestureState.startX,
          startY: gestureState.startY,
          moveX,
          moveY,
          velocity,
        });
      }
    };
    
    const handleTouchEnd = () => {
      setGestureState(prev => ({
        ...prev,
        swiping: false,
      }));
    };
    
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, gestureState.startX, gestureState.startY, options.threshold, options.preventScroll, startTime]);
  
  return gestureState;
};
