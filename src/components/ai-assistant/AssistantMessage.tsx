
import React from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIMessage } from "@/hooks/useAIAssistant";

interface AssistantMessageProps {
  message: AIMessage;
}

const AssistantMessage: React.FC<AssistantMessageProps> = ({ message }) => {
  return (
    <div 
      className={cn(
        "flex items-start gap-2.5 text-sm",
        message.isUser ? "flex-row-reverse" : ""
      )}
    >
      <div 
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          message.isUser ? "bg-primary text-primary-foreground" : "bg-vip-gold text-white"
        )}
      >
        {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div 
        className={cn(
          "rounded-lg px-3 py-2 max-w-[75%]",
          message.isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        )}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>
        
        {message.recommendations && message.recommendations.length > 0 && (
          <div className="mt-2 border-t border-muted-foreground/20 pt-2">
            <p className="font-medium mb-1">Recommandations:</p>
            <ul className="list-disc pl-4 space-y-1">
              {message.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistantMessage;
