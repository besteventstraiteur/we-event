
import React, { useState, useEffect, useRef } from "react";
import { useKeyboard } from "@/hooks/use-keyboard";
import { useDeviceType } from "@/hooks/use-mobile";

interface MobileFormOptimizerProps {
  children: React.ReactNode;
  className?: string;
}

const MobileFormOptimizer: React.FC<MobileFormOptimizerProps> = ({ 
  children,
  className = ""
}) => {
  const { isVisible: isKeyboardVisible, height: keyboardHeight } = useKeyboard();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile' || deviceType === 'tablet';
  const formRef = useRef<HTMLDivElement>(null);
  const [activeInput, setActiveInput] = useState<HTMLElement | null>(null);
  
  // Ne rien faire si ce n'est pas un appareil mobile
  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }
  
  useEffect(() => {
    if (!formRef.current) return;
    
    const handleFocus = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        setActiveInput(target);
      }
    };
    
    const handleBlur = () => {
      setActiveInput(null);
    };
    
    formRef.current.addEventListener('focusin', handleFocus);
    formRef.current.addEventListener('focusout', handleBlur);
    
    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener('focusin', handleFocus);
        formRef.current.removeEventListener('focusout', handleBlur);
      }
    };
  }, []);
  
  // Scroll to the active input when keyboard appears
  useEffect(() => {
    if (isKeyboardVisible && activeInput) {
      setTimeout(() => {
        activeInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [isKeyboardVisible, activeInput]);
  
  return (
    <div 
      ref={formRef}
      className={`${className} ${isKeyboardVisible ? 'pb-keyboard' : ''}`}
      style={{
        paddingBottom: isKeyboardVisible ? `${keyboardHeight}px` : undefined
      }}
    >
      {children}
      
      {/* Bouton de soumission flottant qui apparaît quand le clavier est visible */}
      {isKeyboardVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-end z-50">
          <button
            type="button"
            className="bg-vip-gold text-white px-4 py-2 rounded-md"
            onClick={() => {
              if (activeInput) {
                activeInput.blur();
              }
            }}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileFormOptimizer;
