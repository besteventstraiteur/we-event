
import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";

interface KeyboardState {
  isVisible: boolean;
  height: number;
}

export function useKeyboard() {
  const [keyboard, setKeyboard] = useState<KeyboardState>({
    isVisible: false,
    height: 0
  });
  
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      // Détecter le clavier sur le web mobile en observant les changements de taille de la fenêtre
      const detectKeyboard = () => {
        // Sur iOS, la hauteur de la fenêtre diminue lorsque le clavier est visible
        const isKeyboardVisible = window.innerHeight < window.outerHeight * 0.8;
        const keyboardHeight = isKeyboardVisible ? window.outerHeight - window.innerHeight : 0;
        
        setKeyboard({
          isVisible: isKeyboardVisible,
          height: keyboardHeight
        });
      };
      
      window.addEventListener('resize', detectKeyboard);
      return () => window.removeEventListener('resize', detectKeyboard);
    } else {
      // Pour une implémentation complète sur une vraie application native,
      // il faudrait utiliser les plugins Capacitor, comme:
      // import { Keyboard } from '@capacitor/keyboard';
      // 
      // Keyboard.addListener('keyboardWillShow', (info) => {
      //   setKeyboard({ isVisible: true, height: info.keyboardHeight });
      // });
      // 
      // Keyboard.addListener('keyboardWillHide', () => {
      //   setKeyboard({ isVisible: false, height: 0 });
      // });
      
      // Ici, nous simulons le comportement
      const detectNativeKeyboard = () => {
        const isPortrait = window.innerHeight > window.innerWidth;
        const estimatedKeyboardHeight = isPortrait ? window.innerHeight * 0.4 : window.innerHeight * 0.3;
        
        // Détection heuristique - si un élément de formulaire a le focus
        const hasFocus = document.activeElement && (
          document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA' || 
          document.activeElement.tagName === 'SELECT'
        );
        
        setKeyboard({
          isVisible: hasFocus,
          height: hasFocus ? estimatedKeyboardHeight : 0
        });
      };
      
      document.addEventListener('focusin', detectNativeKeyboard);
      document.addEventListener('focusout', detectNativeKeyboard);
      
      return () => {
        document.removeEventListener('focusin', detectNativeKeyboard);
        document.removeEventListener('focusout', detectNativeKeyboard);
      };
    }
  }, []);
  
  return keyboard;
}
