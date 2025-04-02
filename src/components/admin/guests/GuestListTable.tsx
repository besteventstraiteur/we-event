
import React from "react";
import { Check, Mail, MoreHorizontal, Phone, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Guest } from "@/types/floorPlanTypes";

interface GuestListTableProps {
  guests: Guest[];
  onEdit: (guest: Guest) => void;
  onDelete: (guestId: string) => void;
  onSendInvitation: (guestId: string) => void;
  onSendReminder: (guestId: string) => void;
}

const GuestListTable: React.FC<GuestListTableProps> = ({
  guests,
  onEdit,
  onDelete,
  onSendInvitation,
  onSendReminder,
}) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Cérémonie</TableHead>
            <TableHead>Vin d'honneur</TableHead>
            <TableHead>Repas</TableHead>
            <TableHead>Conjoint</TableHead>
            <TableHead>Enfants</TableHead>
            <TableHead>Table</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-10 text-gray-500">
                Aucun invité trouvé
              </TableCell>
            </TableRow>
          ) : (
            guests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">
                  {guest.prenom} {guest.nom}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center text-sm">
                      <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                      {guest.email}
                    </div>
                    {guest.telephone && (
                      <div className="flex items-center text-sm mt-1">
                        <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                        {guest.telephone}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {guest.ceremonie ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300" />
                  )}
                </TableCell>
                <TableCell>
                  {guest.vin ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300" />
                  )}
                </TableCell>
                <TableCell>
                  {guest.repas ? (
                    <Badge>
                      {guest.menuChoice || "Menu choisi"}
                    </Badge>
                  ) : (
                    <X className="h-5 w-5 text-gray-300" />
                  )}
                </TableCell>
                <TableCell>
                  {guest.conjoint ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-gray-300" />
                  )}
                </TableCell>
                <TableCell>{guest.enfants}</TableCell>
                <TableCell>
                  {guest.table ? (
                    <Badge variant="outline">{guest.table}</Badge>
                  ) : (
                    <span className="text-gray-400 text-sm">Non assigné</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(guest)}>
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSendInvitation(guest.id)}>
                        Envoyer invitation
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onSendReminder(guest.id)}>
                        Envoyer rappel
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(guest.id)}
                      >
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GuestListTable;
