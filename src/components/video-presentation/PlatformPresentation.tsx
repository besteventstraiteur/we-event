
import React, { useState, useEffect } from 'react';
import PresentationDialog from './presentation-dialog/PresentationDialog';
import { SlidesContainer } from './presentation-dialog/SlidesContainer';
import { NavigationControls } from './presentation-dialog/NavigationControls';

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

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  return (
    <PresentationDialog 
      open={isOpen} 
      setOpen={setIsOpen}
      title="Bienvenue sur We Event"
      description="Découvrez nos fonctionnalités principales"
      onClose={handleDialogClose}
    >
      <div className="presentation-content">
        <SlidesContainer />
        <NavigationControls />
      </div>
    </PresentationDialog>
  );
};

export default PlatformPresentation;
