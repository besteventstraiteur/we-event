
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import PresentationSlides from "./PresentationSlides";
import PresentationDialog from "./presentation-dialog/PresentationDialog";
import SlidesContainer from "./presentation-dialog/SlidesContainer";
import NavigationControls from "./presentation-dialog/NavigationControls";

const PlatformPresentation: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplaySpeed] = useState(8000); // 8 secondes par slide
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Arrêter la présentation automatique quand la dialog est fermée
  useEffect(() => {
    if (!open) {
      setIsPlaying(false);
    }
  }, [open]);
  
  // Autoplay logic
  useEffect(() => {
    let timer: number | null = null;
    
    if (isPlaying) {
      timer = window.setTimeout(() => {
        if (currentSlide < PresentationSlides.length - 1) {
          setCurrentSlide(currentSlide + 1);
        } else {
          // Arrêter l'autoplay à la fin
          setIsPlaying(false);
          toast({
            title: "Présentation terminée",
            description: "Vous pouvez maintenant explorer la plateforme"
          });
        }
      }, autoplaySpeed);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentSlide, autoplaySpeed, toast]);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const handleNext = () => {
    if (currentSlide < PresentationSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setOpen(false);
      toast({
        title: "Présentation terminée",
        description: "Vous pouvez maintenant explorer la plateforme"
      });
    }
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const navigateToFeature = () => {
    const slide = PresentationSlides[currentSlide];
    if (slide.path) {
      setOpen(false);
      navigate(slide.path);
    }
  };
  
  return (
    <PresentationDialog
      open={open}
      setOpen={setOpen}
      title="Présentation des fonctionnalités"
      description="Découvrez les principales fonctionnalités de Best Events VIP"
      onClose={handleClose}
    >
      <div className="relative overflow-hidden">
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
