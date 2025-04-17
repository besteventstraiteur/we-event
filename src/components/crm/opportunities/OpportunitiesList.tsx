
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
import { Edit, MoreHorizontal, Trash2, PlusCircle, DollarSign, Calendar, Tag, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Opportunity {
  id: string;
  name: string;
  client: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  tags: string[];
}

// Données de démo pour l'interface
const mockOpportunities: Opportunity[] = [];

const OpportunitiesList = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleDelete = (id: string) => {
    setOpportunities(opportunities.filter(opportunity => opportunity.id !== id));
  };
  
  const filteredOpportunities = opportunities.filter(opportunity => 
    opportunity.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    opportunity.client.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const stageBadgeVariant = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "prospection": return "outline";
      case "qualification": return "secondary";
      case "proposition": return "default";
      case "négociation": return "warning";
      case "gagné": return "success";
      case "perdu": return "destructive";
      default: return "outline";
    }
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
          <Button size="sm">
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
              <TableHead>Client</TableHead>
              <TableHead>Valeur</TableHead>
              <TableHead>Étape</TableHead>
              <TableHead>Probabilité</TableHead>
              <TableHead>Date prévue</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOpportunities.map((opportunity) => (
              <TableRow key={opportunity.id}>
                <TableCell className="font-medium">{opportunity.name}</TableCell>
                <TableCell>{opportunity.client}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                    {opportunity.value.toLocaleString()} €
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={stageBadgeVariant(opportunity.stage)}>
                    {opportunity.stage}
                  </Badge>
                </TableCell>
                <TableCell>{opportunity.probability}%</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    {opportunity.expectedCloseDate}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </TableCell>
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
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <DollarSign className="h-4 w-4 mr-2" />
                        Faire une proposition
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
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
          <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Aucune opportunité trouvée</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Aucune opportunité ne correspond à votre recherche" : "Commencez par ajouter des opportunités à votre pipeline commercial"}
          </p>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter une opportunité
          </Button>
        </div>
      )}
    </div>
  );
};

export default OpportunitiesList;
