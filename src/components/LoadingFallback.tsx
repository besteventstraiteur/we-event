
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingFallbackProps {
  message?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = "Chargement..."
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="h-10 w-10 animate-spin text-vip-gold mb-2" />
      <span className="text-lg font-medium">{message}</span>
    </div>
  );
};

export default LoadingFallback;
