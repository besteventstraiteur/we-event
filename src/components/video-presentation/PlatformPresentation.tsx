
import React, { useState, useEffect } from 'react';
import PresentationDialog from './presentation-dialog/PresentationDialog';

interface PlatformPresentationProps {
  onClose?: () => void;
}

const PlatformPresentation: React.FC<PlatformPresentationProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    // Prevent scrolling on the background when dialog is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Call onClose callback if provided
      if (onClose) {
        onClose();
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <PresentationDialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    />
  );
};

export default PlatformPresentation;
