
import React from "react";
import { CircleHelp, DollarSign, Layout, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface AssistantSuggestionsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
  isLoading: boolean;
}

const defaultSuggestions = [
  {
    text: "Suggérer des prestataires de qualité pour mon budget",
    icon: <DollarSign className="h-3 w-3" />
  },
  {
    text: "Optimiser le plan de ma salle selon mes invités",
    icon: <Layout className="h-3 w-3" />
  },
  {
    text: "Comment gérer les contraintes alimentaires des invités ?",
    icon: <Users className="h-3 w-3" />
  }
];

const AssistantSuggestions: React.FC<AssistantSuggestionsProps> = ({
  suggestions,
  onSelectSuggestion,
  isLoading
}) => {
  const suggestionsToShow = suggestions.length > 0 ? 
    suggestions.map(text => ({ text, icon: <CircleHelp className="h-3 w-3" /> })) :
    defaultSuggestions;

  return (
    <div className="p-3 pt-0 flex flex-wrap gap-2">
      {isLoading ? (
        Array(3).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-8 w-32" />
        ))
      ) : (
        suggestionsToShow.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs h-auto py-1.5 flex items-center gap-1.5 bg-muted/50"
            onClick={() => onSelectSuggestion(suggestion.text)}
          >
            {suggestion.icon}
            {suggestion.text}
          </Button>
        ))
      )}
    </div>
  );
};

export default AssistantSuggestions;
