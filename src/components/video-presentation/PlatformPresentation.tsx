
import React, { useState, useEffect } from 'react';
import PresentationDialog from './presentation-dialog/PresentationDialog';
import SlidesContainer from './presentation-dialog/SlidesContainer';
import NavigationControls from './presentation-dialog/NavigationControls';
import PresentationSlides from './presentation-slides';

interface PlatformPresentationProps {
  onClose?: () => void;
}

const PlatformPresentation: React.FC<PlatformPresentationProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
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

  const handleNext = () => {
    if (currentSlide < PresentationSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const navigateToFeature = () => {
    // Implement navigation to feature based on current slide
    const currentPath = PresentationSlides[currentSlide].path;
    if (currentPath) {
      // Close dialog before navigating
      setIsOpen(false);
      // Could integrate with router for navigation if needed
      console.log(`Navigate to: ${currentPath}`);
    }
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
        <SlidesContainer 
          slides={PresentationSlides} 
          currentSlide={currentSlide} 
          navigateToFeature={navigateToFeature}
        />
        <NavigationControls 
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          currentSlide={currentSlide}
          totalSlides={PresentationSlides.length}
          goToSlide={goToSlide}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      </div>
    </PresentationDialog>
  );
};

export default PlatformPresentation;
