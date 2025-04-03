
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import PlatformPresentation from './PlatformPresentation';

interface VideoPresentationProps {
  buttonText?: string;
  className?: string;
}

const VideoPresentation: React.FC<VideoPresentationProps> = ({ 
  buttonText = "Voir la présentation des fonctionnalités",
  className = ""
}) => {
  const [showPresentation, setShowPresentation] = useState(false);
  
  return (
    <div>
      <Button 
        onClick={() => setShowPresentation(true)}
        className={`flex items-center gap-2 bg-vip-gold hover:bg-amber-600 text-white ${className}`}
      >
        <Play size={18} />
        {buttonText}
      </Button>
      
      {showPresentation && <PlatformPresentation />}
    </div>
  );
};

export default VideoPresentation;
