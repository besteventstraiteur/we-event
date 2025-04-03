
import React, { useState } from "react";
import { Bot, Sparkles, MessageSquare, X, ChevronUp, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import AssistantMessage from "./AssistantMessage";
import AssistantSuggestions from "./AssistantSuggestions";
import { useAIAssistant } from "@/hooks/useAIAssistant";

interface AIAssistantProps {
  minimized?: boolean;
  onToggleMinimize?: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ 
  minimized = false,
  onToggleMinimize 
}) => {
  const [userInput, setUserInput] = useState("");
  const { 
    messages, 
    suggestions, 
    isLoading, 
    sendMessage,
    getRecommendation,
    getSuggestions
  } = useAIAssistant();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() && !isLoading) {
      sendMessage(userInput);
      setUserInput("");
    }
  };

  return (
    <Card className="border-2 border-vip-gold/30 shadow-lg">
      <CardHeader className="p-3 pb-2 flex flex-row items-center justify-between space-y-0 bg-vip-gold/10">
        <CardTitle className="text-base flex items-center gap-2 font-medium">
          <Bot className="h-5 w-5 text-vip-gold" />
          Assistant IA
        </CardTitle>
        <div className="flex gap-1">
          {onToggleMinimize && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7" 
              onClick={onToggleMinimize}
            >
              {minimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardHeader>

      {!minimized && (
        <CardContent className="p-0">
          <div className="h-64 overflow-y-auto p-3 space-y-3 bg-muted/30">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 text-muted-foreground">
                <Sparkles className="h-12 w-12 text-vip-gold opacity-50" />
                <div>
                  <p className="font-medium">Comment puis-je vous aider aujourd'hui ?</p>
                  <p className="text-sm">Posez une question ou essayez une suggestion ci-dessous.</p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <AssistantMessage key={index} message={message} />
              ))
            )}
          </div>

          <AssistantSuggestions 
            suggestions={suggestions} 
            onSelectSuggestion={(text) => sendMessage(text)} 
            isLoading={isLoading}
          />

          <Separator />

          <form onSubmit={handleSendMessage} className="p-3">
            <div className="flex space-x-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Posez votre question..."
                className="min-h-[60px] resize-none"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!userInput.trim() || isLoading}
                className="h-auto bg-vip-gold hover:bg-vip-gold/90 text-white"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
};

export default AIAssistant;
