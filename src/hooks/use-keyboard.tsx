
import { useState, useEffect } from 'react';
import { useDeviceType } from './use-mobile';

interface KeyboardState {
  isVisible: boolean;
  height: number;
}

export function useKeyboard(): KeyboardState {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    isVisible: false,
    height: 0
  });
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile' || deviceType === 'tablet';
  
  useEffect(() => {
    if (!isMobile) {
      return;
    }
    
    // Create a function to check visual viewport height changes
    // which is a reliable indicator of keyboard visibility
    const detectKeyboard = () => {
      const windowHeight = window.innerHeight;
      const visibleHeight = window.visualViewport?.height || windowHeight;
      const keyboardHeight = windowHeight - visibleHeight;
      const isKeyboardVisible = keyboardHeight > 150; // Threshold for keyboard visibility
      
      setKeyboardState({
        isVisible: isKeyboardVisible,
        height: isKeyboardVisible ? keyboardHeight : 0
      });
    };
    
    // Listen to visual viewport resize events
    window.visualViewport?.addEventListener('resize', detectKeyboard);
    window.addEventListener('resize', detectKeyboard);
    
    // Cleanup
    return () => {
      window.visualViewport?.removeEventListener('resize', detectKeyboard);
      window.removeEventListener('resize', detectKeyboard);
    };
  }, [isMobile]);
  
  return keyboardState;
}
