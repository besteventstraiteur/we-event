
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
import { Edit, MoreHorizontal, Trash2, PlusCircle, FileText, Calendar, User, Search, Filter, FileUp, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Quote {
  id: string;
  reference: string;
  clientName: string;
  totalAmount: number;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  issueDate: string;
  expiryDate: string;
}

// Données de démo pour l'interface
const mockQuotes: Quote[] = [];

const QuotesList = () => {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleDelete = (id: string) => {
    setQuotes(quotes.filter(quote => quote.id !== id));
  };
  
  const filteredQuotes = quotes.filter(quote => 
    quote.reference.toLowerCase().includes(searchQuery.toLowerCase()) || 
    quote.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadge = (status: Quote["status"]) => {
    const statusConfig = {
      draft: { label: "Brouillon", variant: "outline" as const },
      sent: { label: "Envoyé", variant: "default" as const },
      accepted: { label: "Accepté", variant: "success" as const },
      rejected: { label: "Refusé", variant: "destructive" as const },
      expired: { label: "Expiré", variant: "default" as const }, // Changed from "warning"
    };
    
    return <Badge variant={statusConfig[status].variant}>{statusConfig[status].label}</Badge>;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un devis..."
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
            Nouveau devis
          </Button>
        </div>
      </div>
      
      {filteredQuotes.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d'émission</TableHead>
              <TableHead>Date d'expiration</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    {quote.reference}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    {quote.clientName}
                  </div>
                </TableCell>
                <TableCell>{quote.totalAmount.toLocaleString()} €</TableCell>
                <TableCell>{getStatusBadge(quote.status)}</TableCell>
                <TableCell>{quote.issueDate}</TableCell>
                <TableCell>{quote.expiryDate}</TableCell>
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
                        <Printer className="h-4 w-4 mr-2" />
                        Imprimer
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileUp className="h-4 w-4 mr-2" />
                        Convertir en facture
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(quote.id)}>
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
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Aucun devis trouvé</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Aucun devis ne correspond à votre recherche" : "Commencez par créer votre premier devis"}
          </p>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Créer un devis
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuotesList;
