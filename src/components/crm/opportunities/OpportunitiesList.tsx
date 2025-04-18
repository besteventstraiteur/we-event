
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, MoreHorizontal, Trash2, PlusCircle, Briefcase, Calendar, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import OpportunityFormDialog, { type Opportunity } from "./OpportunityFormDialog";

// Données de démo pour l'interface
const mockOpportunities: Opportunity[] = [
  {
    id: "opp1",
    name: "Mariage Dupont",
    company: "Famille Dupont",
    value: 15000,
    stage: "proposal",
    source: "Salon du mariage",
    nextStep: "Présentation du devis",
    expectedCloseDate: "15/06/2025"
  },
  {
    id: "opp2",
    name: "Anniversaire 40 ans",
    company: "Entreprise Martin",
    value: 8000,
    stage: "qualified",
    source: "Recommandation",
    nextStep: "Visite du lieu",
    expectedCloseDate: "30/05/2025"
  },
  {
    id: "opp3",
    name: "Séminaire annuel",
    company: "Tech Solutions",
    value: 25000,
    stage: "negotiation",
    source: "LinkedIn",
    nextStep: "Négociation budget",
    expectedCloseDate: "10/07/2025"
  },
  {
    id: "opp4",
    name: "Gala de charité",
    company: "Association Espoir",
    value: 12000,
    stage: "closed_won",
    source: "Contact direct",
    nextStep: "Signature du contrat",
    expectedCloseDate: "01/09/2025"
  },
  {
    id: "opp5",
    name: "Conférence startup",
    company: "Incubateur Future",
    value: 18000,
    stage: "new",
    source: "Site web",
    nextStep: "Premier contact",
    expectedCloseDate: "20/08/2025"
  },
  {
    id: "opp6",
    name: "Soirée corporate",
    company: "Finance Plus",
    value: 30000,
    stage: "closed_lost",
    source: "Réseau professionnel",
    nextStep: "Archivé",
    expectedCloseDate: "25/04/2025"
  }
];

const OpportunitiesList = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | undefined>(undefined);
  const { toast } = useToast();
  
  const handleDelete = (id: string) => {
    setOpportunities(opportunities.filter(opportunity => opportunity.id !== id));
    toast({
      title: "Opportunité supprimée",
      description: "L'opportunité a été supprimée avec succès",
    });
  };

  const handleEdit = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setIsFormOpen(true);
  };

  const handleNewOpportunity = () => {
    setEditingOpportunity(undefined);
    setIsFormOpen(true);
  };
  
  const handleSaveOpportunity = (opportunityData: Omit<Opportunity, "id">) => {
    if (editingOpportunity) {
      // Updating existing opportunity
      setOpportunities(opportunities.map(opp => 
        opp.id === editingOpportunity.id 
          ? { ...opportunityData, id: editingOpportunity.id } 
          : opp
      ));
      toast({
        title: "Opportunité mise à jour",
        description: `L'opportunité ${opportunityData.name} a été mise à jour`,
      });
    } else {
      // Creating new opportunity
      const newOpportunity: Opportunity = {
        ...opportunityData,
        id: `opp${opportunities.length + 1}`,
      };
      setOpportunities([...opportunities, newOpportunity]);
      toast({
        title: "Opportunité créée",
        description: `L'opportunité ${newOpportunity.name} a été créée avec succès`,
      });
    }
    setIsFormOpen(false);
  };
  
  const filteredOpportunities = opportunities.filter(opportunity => 
    opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    opportunity.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadge = (stage: Opportunity["stage"]) => {
    const stageConfig = {
      new: { label: "Nouveau", variant: "default" as const },
      qualified: { label: "Qualifié", variant: "secondary" as const },
      proposal: { label: "Proposition", variant: "info" as const },
      negotiation: { label: "Négociation", variant: "warning" as const },
      closed_won: { label: "Gagné", variant: "success" as const },
      closed_lost: { label: "Perdu", variant: "destructive" as const },
    };
    
    return <Badge variant={stageConfig[stage].variant}>{stageConfig[stage].label}</Badge>;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une opportunité..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer
          </Button>
          <Button size="sm" onClick={handleNewOpportunity}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nouvelle opportunité
          </Button>
        </div>
      </div>
      
      {filteredOpportunities.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Entreprise/Client</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Étape</TableHead>
              <TableHead>Date de clôture</TableHead>
              <TableHead>Prochaine étape</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOpportunities.map((opportunity) => (
              <TableRow key={opportunity.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                    {opportunity.name}
                  </div>
                </TableCell>
                <TableCell>{opportunity.company}</TableCell>
                <TableCell>{opportunity.value.toLocaleString()} €</TableCell>
                <TableCell>{getStatusBadge(opportunity.stage)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    {opportunity.expectedCloseDate}
                  </div>
                </TableCell>
                <TableCell>{opportunity.nextStep}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Ouvrir le menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEdit(opportunity)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(opportunity.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="border rounded-md p-8 text-center">
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Aucune opportunité trouvée</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Aucune opportunité ne correspond à votre recherche" : "Commencez par ajouter des opportunités à votre pipeline"}
          </p>
          <Button onClick={handleNewOpportunity}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Créer une opportunité
          </Button>
        </div>
      )}

      <OpportunityFormDialog 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        opportunity={editingOpportunity}
        onSave={handleSaveOpportunity}
      />
    </div>
  );
};

export default OpportunitiesList;
