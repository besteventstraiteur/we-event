
import React, { useState } from "react";
import PresentationDialog from "./presentation-dialog/PresentationDialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface VideoPresentationProps {
  buttonText?: string;
  onClose?: () => void;
}

const VideoPresentation: React.FC<VideoPresentationProps> = ({
  buttonText = "Découvrir les fonctionnalités",
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 bg-vip-gold hover:bg-amber-600 text-white ${
          isMobile ? 'text-sm px-3 py-2' : ''
        }`}
      >
        <Play size={isMobile ? 16 : 18} />
        {buttonText}
      </Button>
      
      <PresentationDialog open={isOpen} onOpenChange={handleOpenChange} />
    </>
  );
};

export default VideoPresentation;
