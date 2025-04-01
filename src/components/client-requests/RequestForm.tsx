
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GoldButton from "@/components/GoldButton";

interface RequestFormProps {
  newRequest: {
    title: string;
    description: string;
    category: string;
    budget: string;
    deadline: string;
  };
  setNewRequest: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    category: string;
    budget: string;
    deadline: string;
  }>>;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const RequestForm: React.FC<RequestFormProps> = ({
  newRequest,
  setNewRequest,
  handleSubmit,
  isLoading
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewRequest(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewRequest(prev => ({ ...prev, category: value }));
  };

  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader>
        <CardTitle className="text-vip-white">Nouvelle demande</CardTitle>
        <CardDescription className="text-vip-gray-400">
          Décrivez votre besoin pour recevoir des propositions de nos partenaires VIP
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-vip-gray-300 mb-1">
              Titre de votre demande
            </label>
            <Input 
              id="title"
              placeholder="Ex: Recherche DJ pour mariage"
              className="bg-vip-gray-800 border-vip-gray-700"
              value={newRequest.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-vip-gray-300 mb-1">
                Catégorie
              </label>
              <Select 
                value={newRequest.category} 
                onValueChange={handleSelectChange}
                required
              >
                <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent className="bg-vip-gray-800 border-vip-gray-700">
                  <SelectItem value="Lieu">Lieu</SelectItem>
                  <SelectItem value="Traiteur">Traiteur</SelectItem>
                  <SelectItem value="Animation">Animation</SelectItem>
                  <SelectItem value="Photographie">Photographie</SelectItem>
                  <SelectItem value="Décoration">Décoration</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-vip-gray-300 mb-1">
                Budget (€)
              </label>
              <Input 
                id="budget"
                type="number"
                placeholder="Votre budget"
                className="bg-vip-gray-800 border-vip-gray-700"
                value={newRequest.budget}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-vip-gray-300 mb-1">
                Date limite
              </label>
              <Input 
                id="deadline"
                type="date"
                className="bg-vip-gray-800 border-vip-gray-700"
                value={newRequest.deadline}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-vip-gray-300 mb-1">
              Description détaillée
            </label>
            <Textarea 
              id="description"
              placeholder="Décrivez votre besoin en détail..."
              className="bg-vip-gray-800 border-vip-gray-700 min-h-[150px]"
              value={newRequest.description}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <GoldButton type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Envoyer ma demande"}
          </GoldButton>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RequestForm;
