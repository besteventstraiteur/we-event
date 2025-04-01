
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Request {
  id: number;
  title: string;
  description: string;
  category: string;
  budget: string;
  deadline: string;
  status: string;
  createdAt: string;
  messages: {
    id: number;
    sender: string;
    content: string;
    date: string;
  }[];
}

export const useClientRequests = () => {
  const { toast } = useToast();
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  // Simulation des demandes existantes
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      title: "Recherche d'un château pour mariage",
      description: "Nous cherchons un château pouvant accueillir 150 personnes pour notre mariage en août 2023.",
      category: "Lieu",
      budget: "15000",
      deadline: "2023-06-30",
      status: "pending",
      createdAt: "2023-01-15",
      messages: [
        { id: 1, sender: "system", content: "Votre demande a été envoyée à 3 partenaires.", date: "2023-01-15" }
      ]
    },
    {
      id: 2,
      title: "DJ pour soirée d'entreprise",
      description: "Recherche DJ expérimenté pour soirée d'entreprise de 100 personnes.",
      category: "Animation",
      budget: "1200",
      deadline: "2023-04-15",
      status: "completed",
      createdAt: "2023-01-10",
      messages: [
        { id: 1, sender: "system", content: "Votre demande a été envoyée à 2 partenaires.", date: "2023-01-10" },
        { id: 2, sender: "partner", content: "Bonjour, je suis disponible pour votre événement. Puis-je avoir plus de détails?", date: "2023-01-11" },
        { id: 3, sender: "client", content: "Bonjour, la soirée aura lieu au Palais des Congrès à partir de 19h.", date: "2023-01-12" }
      ]
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation de l'envoi d'une nouvelle demande
    setTimeout(() => {
      const newId = requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1;
      const request = {
        id: newId,
        ...newRequest,
        status: "pending",
        createdAt: new Date().toISOString().split('T')[0],
        messages: [
          { id: 1, sender: "system", content: "Votre demande a été envoyée aux partenaires concernés.", date: new Date().toISOString().split('T')[0] }
        ]
      };
      
      setRequests(prev => [request, ...prev]);
      setNewRequest({
        title: "",
        description: "",
        category: "",
        budget: "",
        deadline: ""
      });
      
      toast({
        title: "Demande envoyée",
        description: "Votre demande a été envoyée avec succès aux partenaires."
      });
      
      setIsLoading(false);
    }, 1500);
  };

  // Fonction pour naviguer vers l'onglet "new"
  const navigateToNewTab = () => {
    const newTabTrigger = document.querySelector('[data-value="new"]') as HTMLElement;
    if (newTabTrigger) {
      newTabTrigger.click();
    }
  };

  return {
    requests,
    newRequest,
    setNewRequest,
    isLoading,
    handleSubmit,
    navigateToNewTab
  };
};
