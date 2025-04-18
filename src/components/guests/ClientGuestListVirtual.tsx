
import React, { useState } from 'react';
import { VirtualizedGuestList } from './VirtualizedGuestList';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export const ClientGuestListVirtual: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Dans une application réelle, l'ID de l'événement serait récupéré du contexte ou des paramètres d'URL
  const eventId = 'current-event-id';

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/3">
          <Label htmlFor="search">Rechercher un invité</Label>
          <Input
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nom ou email..."
            className="mt-1"
          />
        </div>
        <div className="w-full md:w-1/4">
          <Label htmlFor="status">Statut</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status" className="mt-1">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="confirmed">Confirmé</SelectItem>
              <SelectItem value="declined">Refusé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <VirtualizedGuestList 
        eventId={eventId}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        className="mt-6"
      />
    </div>
  );
};
