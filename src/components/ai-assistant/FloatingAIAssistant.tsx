
import React, { useState } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIAssistant from "./AIAssistant";

const FloatingAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-4">
      {isOpen && (
        <div className="w-80 md:w-96 transform transition-all duration-200 ease-in-out">
          <AIAssistant minimized={minimized} onToggleMinimize={() => setMinimized(!minimized)} />
        </div>
      )}
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-vip-gold hover:bg-vip-gold/90 text-white h-12 w-12 rounded-full shadow-lg"
      >
        <Bot className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default FloatingAIAssistant;
