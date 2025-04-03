
import { useState, useEffect } from "react";
import { useDeviceType } from "./use-mobile";

interface KeyboardState {
  isVisible: boolean;
  height: number;
}

export function useKeyboard(): KeyboardState {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    isVisible: false,
    height: 0,
  });
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile' || deviceType === 'tablet';
  
  useEffect(() => {
    if (!isMobile) {
      return;
    }
    
    const detectKeyboard = () => {
      // iOS detection method
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      
      if (isIOS) {
        // On iOS, we can detect if the keyboard is visible by checking if the window height is significantly smaller than the screen height
        const visualViewport = window.visualViewport;
        if (!visualViewport) return;
        
        const windowHeight = visualViewport.height;
        const screenHeight = window.screen.height;
        
        // If the window height is significantly less than the screen height, the keyboard is likely open
        const keyboardVisible = screenHeight - windowHeight > 100;
        const keyboardHeight = keyboardVisible ? screenHeight - windowHeight : 0;
        
        setKeyboardState({
          isVisible: keyboardVisible,
          height: keyboardHeight,
        });
      } else {
        // Android detection method
        // On Android, we can detect if the keyboard is visible by checking if the window height is smaller than the window width (assuming portrait mode)
        const visualViewport = window.visualViewport;
        if (!visualViewport) return;
        
        const windowHeight = visualViewport.height;
        const windowWidth = visualViewport.width;
        
        const keyboardVisible = windowHeight < windowWidth * 0.8;
        const keyboardHeight = keyboardVisible ? window.innerHeight - windowHeight : 0;
        
        setKeyboardState({
          isVisible: keyboardVisible,
          height: keyboardHeight,
        });
      }
    };
    
    // Add event listeners
    window.addEventListener('resize', detectKeyboard);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', detectKeyboard);
    }
    
    // Initial detection
    detectKeyboard();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', detectKeyboard);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', detectKeyboard);
      }
    };
  }, [isMobile]);
  
  return keyboardState;
}
