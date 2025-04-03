
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Play, Pause, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PresentationSlides from "./PresentationSlides";
import PresentationProgress from "./PresentationProgress";
import { useIsMobile } from "@/hooks/use-mobile";

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
  
  const dialogContent = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={`sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[900px] p-0 overflow-hidden ${isMobile ? 'h-[90vh]' : 'max-h-[85vh]'}`}>
        <DialogHeader className="p-4 border-b border-gray-200 flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl text-vip-gold">Présentation des fonctionnalités</DialogTitle>
            <DialogDescription>
              Découvrez les principales fonctionnalités de Best Events VIP
            </DialogDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
            <X size={20} />
          </Button>
        </DialogHeader>
        
        <div className="relative overflow-hidden">
          {/* Slide content */}
          <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            {PresentationSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === currentSlide
                    ? "translate-x-0 opacity-100"
                    : index < currentSlide
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                }`}
              >
                <Card className="h-full border-0 rounded-none">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-vip-gold">{slide.title}</h2>
                      <span className="text-sm text-gray-500">
                        {currentSlide + 1} / {PresentationSlides.length}
                      </span>
                    </div>
                    
                    <div className="flex-1 overflow-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                        <div className="space-y-3">
                          <p className="text-gray-700">{slide.description}</p>
                          
                          {slide.keyFeatures && (
                            <div className="mt-4">
                              <h3 className="font-medium mb-2">Fonctionnalités clés :</h3>
                              <ul className="list-disc pl-5 space-y-1">
                                {slide.keyFeatures.map((feature, i) => (
                                  <li key={i} className="text-gray-700">{feature}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {slide.path && (
                            <Button 
                              onClick={navigateToFeature}
                              className="mt-4 bg-vip-gold hover:bg-amber-600 text-white"
                            >
                              Explorer cette fonctionnalité
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-center">
                          {slide.image ? (
                            <img 
                              src={slide.image} 
                              alt={slide.title}
                              className="max-h-full object-contain rounded-md shadow-md"
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-100 rounded-md flex items-center justify-center">
                              <p className="text-gray-400">Aperçu non disponible</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          {/* Navigation controls */}
          <div className="border-t border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={togglePlayPause}
                className="h-8 w-8"
              >
                {isPlaying ? (
                  <Pause size={16} />
                ) : (
                  <Play size={16} />
                )}
              </Button>
              
              <span className="text-sm text-gray-500 mx-2">
                {isPlaying ? "Lecture automatique" : "Lecture en pause"}
              </span>
            </div>
            
            <PresentationProgress
              totalSlides={PresentationSlides.length}
              currentSlide={currentSlide}
              goToSlide={goToSlide}
            />
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentSlide === 0}
                className="h-8 w-8"
              >
                <ChevronLeft size={16} />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="h-8 w-8"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
  
  return (
    <>
      {isMobile ? (
        dialogContent
      ) : (
        dialogContent
      )}
    </>
  );
};

export default PlatformPresentation;
