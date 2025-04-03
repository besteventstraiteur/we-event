
import { useState, useEffect } from 'react';

// Define the message type
export interface AIMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
  recommendations?: string[];
}

// Define the hook
export const useAIAssistant = () => {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to simulate AI response
  const generateAIResponse = (userMessage: string): Promise<AIMessage> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const lowerCaseMessage = userMessage.toLowerCase();
        
        // Basic pattern matching for different types of questions
        if (lowerCaseMessage.includes('budget') || lowerCaseMessage.includes('prestataire')) {
          resolve({
            text: "Voici quelques recommandations de prestataires qui correspondent à votre budget:",
            isUser: false,
            timestamp: new Date(),
            recommendations: [
              "DJ Mix Master - À partir de 800€, excellentes critiques",
              "Fleurs Élégance - Formules à partir de 500€ pour les compositions florales",
              "Domaine des Roses - Offres spéciales hors saison à -15%"
            ]
          });
        } else if (lowerCaseMessage.includes('plan') || lowerCaseMessage.includes('salle') || lowerCaseMessage.includes('table')) {
          resolve({
            text: "J'ai analysé votre liste d'invités et voici mes suggestions pour l'organisation des tables:",
            isUser: false,
            timestamp: new Date(),
            recommendations: [
              "Placez les familles des mariés à proximité de la table d'honneur",
              "Regroupez les amis selon leurs affinités indiquées",
              "J'ai identifié 3 invités avec des allergies alimentaires qui pourraient être placés près du buffet"
            ]
          });
        } else if (lowerCaseMessage.includes('menu') || lowerCaseMessage.includes('nourriture') || lowerCaseMessage.includes('aliment')) {
          resolve({
            text: "Pour vos menus, en tenant compte des restrictions alimentaires de vos invités:",
            isUser: false,
            timestamp: new Date(),
            recommendations: [
              "Prévoyez une option végétarienne pour 15% de vos invités",
              "Le traiteur Gastronomie Délice propose des menus personnalisés adaptés aux allergies",
              "Pour respecter votre budget, optez pour un buffet d'entrées et des plats servis"
            ]
          });
        } else {
          resolve({
            text: "Je suis votre assistant IA pour vous aider à planifier votre événement. Je peux vous suggérer des prestataires, optimiser votre plan de salle ou vous aider à gérer votre budget. Comment puis-je vous aider aujourd'hui?",
            isUser: false,
            timestamp: new Date()
          });
        }
      }, 1000); // Simulate delay
    });
  };

  // Function to handle user messages
  const sendMessage = async (text: string) => {
    if (isLoading) return;
    
    // Add user message
    const userMessage: AIMessage = {
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setIsLoading(true);
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // Get AI response
      const aiResponse = await generateAIResponse(text);
      setMessages(prev => [...prev, aiResponse]);
      
      // Generate new suggestions based on context
      const newSuggestions = getContextualSuggestions(text);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get vendor recommendations
  const getRecommendation = async (category: string, budget?: number) => {
    setIsLoading(true);
    
    try {
      // This would be replaced with an actual API call in a real application
      const text = `Voici des recommandations de ${category} adaptées à votre budget${budget ? ' de ' + budget + '€' : ''}:`;
      
      const recommendations = [
        category === 'photographes' 
          ? "Studio Photo Elite - Style reportage naturel, à partir de 1200€"
          : category === 'traiteurs'
          ? "Gastronomie Délice - Menu personnalisé à 65€/personne"
          : "DJ Mix Master - Animation complète à partir de 800€",
        "Prix négociés de -10% pour les clients VIP Wedding",
        "Disponibilités confirmées pour votre date"
      ];
      
      const aiMessage: AIMessage = {
        text,
        isUser: false,
        timestamp: new Date(),
        recommendations
      };
      
      setMessages(prev => [...prev, aiMessage]);
      return recommendations;
    } catch (error) {
      console.error("Error getting recommendations:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get floor plan suggestions
  const getFloorPlanSuggestions = async () => {
    setIsLoading(true);
    
    try {
      const aiMessage: AIMessage = {
        text: "Voici mes suggestions pour l'optimisation de votre plan de salle:",
        isUser: false,
        timestamp: new Date(),
        recommendations: [
          "Disposition en U pour la table d'honneur pour mieux interagir avec les invités",
          "Tables rondes de 8 personnes maximum pour favoriser les conversations",
          "Placement des familles séparées par des tables d'amis pour éviter les tensions"
        ]
      };
      
      setMessages(prev => [...prev, aiMessage]);
      return aiMessage.recommendations;
    } catch (error) {
      console.error("Error getting floor plan suggestions:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Generate contextual suggestions based on conversation
  const getContextualSuggestions = (lastMessage: string): string[] => {
    const lowercaseMessage = lastMessage.toLowerCase();
    
    if (lowercaseMessage.includes('budget') || lowercaseMessage.includes('prix') || lowercaseMessage.includes('coût')) {
      return [
        "Comment optimiser mon budget déco?",
        "Quels postes peut-on réduire sans impact?",
        "Recommande-moi des prestataires abordables"
      ];
    } else if (lowercaseMessage.includes('salle') || lowercaseMessage.includes('plan') || lowercaseMessage.includes('table')) {
      return [
        "Comment gérer les tensions familiales au placement?",
        "Quelle disposition pour 80 personnes?",
        "Combien de personnes par table idéalement?"
      ];
    } else if (lowercaseMessage.includes('menu') || lowercaseMessage.includes('repas') || lowercaseMessage.includes('nourriture')) {
      return [
        "Menus enfants recommandés?",
        "Comment gérer les régimes spéciaux?",
        "Tendances actuelles pour le dessert?"
      ];
    }
    
    // Default suggestions
    return [
      "Comment réduire mon stress avant le jour J?",
      "Idées de thèmes tendance cette saison",
      "Conseils pour la coordination des couleurs"
    ];
  };

  // Function to get all kinds of suggestions
  const getSuggestions = async (type: string) => {
    setIsLoading(true);
    
    try {
      let response: AIMessage;
      
      switch (type) {
        case 'budget':
          response = {
            text: "Voici mes conseils pour la gestion de votre budget:",
            isUser: false,
            timestamp: new Date(),
            recommendations: [
              "Allouez 50% du budget total au lieu et à la restauration",
              "Prévoyez une réserve de 10% pour les dépenses imprévues",
              "Les économies sont possibles sur la papeterie et les cadeaux d'invités"
            ]
          };
          break;
        case 'decor':
          response = {
            text: "Pour votre décoration, voici mes suggestions:",
            isUser: false,
            timestamp: new Date(),
            recommendations: [
              "Les compositions florales suspendues sont tendance et économiques",
              "Optez pour des bougies LED pour l'ambiance sans risque d'incendie",
              "Réutilisez les éléments de la cérémonie pour la réception"
            ]
          };
          break;
        default:
          response = {
            text: "Je peux vous aider sur différents aspects de votre événement:",
            isUser: false,
            timestamp: new Date(),
            recommendations: [
              "Budget et gestion des dépenses",
              "Décoration et thématiques",
              "Organisation et planning"
            ]
          };
      }
      
      setMessages(prev => [...prev, response]);
      return response.recommendations;
    } catch (error) {
      console.error("Error getting suggestions:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    messages,
    suggestions,
    isLoading,
    sendMessage,
    getRecommendation,
    getFloorPlanSuggestions,
    getSuggestions
  };
};
