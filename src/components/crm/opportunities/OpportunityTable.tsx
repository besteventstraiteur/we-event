
import React from "react";
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
import { Briefcase, Calendar, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { type Opportunity } from "./OpportunityFormDialog";
import OpportunityStatusBadge from "./OpportunityStatusBadge";

interface OpportunityTableProps {
  opportunities: Opportunity[];
  onEdit: (opportunity: Opportunity) => void;
  onDelete: (id: string) => void;
}

const OpportunityTable = ({ opportunities, onEdit, onDelete }: OpportunityTableProps) => {
  return (
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
        {opportunities.map((opportunity) => (
          <TableRow key={opportunity.id}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                {opportunity.name}
              </div>
            </TableCell>
            <TableCell>{opportunity.company}</TableCell>
            <TableCell>{opportunity.value.toLocaleString()} €</TableCell>
            <TableCell>
              <OpportunityStatusBadge stage={opportunity.stage} />
            </TableCell>
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
                  <DropdownMenuItem onClick={() => onEdit(opportunity)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => onDelete(opportunity.id)}
                  >
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
  );
};

export default OpportunityTable;
