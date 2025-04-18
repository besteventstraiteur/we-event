
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { VirtualList, usePagination } from '@/components/ui/virtual-list';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, PhoneCall, Mail } from 'lucide-react';

// Type pour les données invité
interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  status: 'pending' | 'confirmed' | 'declined';
  role?: string;
  avatar_url?: string;
  table_number?: number;
  dietary_restrictions?: string;
}

// Composant pour une ligne d'invité
const GuestItem: React.FC<{ guest: Guest }> = ({ guest }) => {
  const statusColors = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-green-100 text-green-800",
    declined: "bg-red-100 text-red-800"
  };

  return (
    <div className="flex items-center justify-between p-3 border-b hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={guest.avatar_url} />
          <AvatarFallback>{guest.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{guest.name}</div>
          <div className="text-sm text-muted-foreground">{guest.email}</div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Badge className={statusColors[guest.status]}>{guest.status}</Badge>
        {guest.table_number && (
          <Badge variant="outline">Table {guest.table_number}</Badge>
        )}
        <div className="flex space-x-1">
          {guest.email && (
            <Button variant="ghost" size="icon" title="Envoyer un email">
              <Mail className="h-4 w-4" />
            </Button>
          )}
          {guest.phone && (
            <Button variant="ghost" size="icon" title="Appeler">
              <PhoneCall className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" title="Modifier">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Supprimer">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Skeleton pour le chargement
const GuestItemSkeleton = () => (
  <div className="flex items-center justify-between p-3 border-b">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div>
        <Skeleton className="h-4 w-[150px] mb-2" />
        <Skeleton className="h-3 w-[120px]" />
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
);

// Liste de squelettes pour le chargement
const GuestListSkeleton = () => (
  <div className="space-y-2">
    {Array(5).fill(0).map((_, i) => (
      <GuestItemSkeleton key={i} />
    ))}
  </div>
);

export interface VirtualizedGuestListProps {
  eventId: string;
  searchQuery?: string;
  statusFilter?: string;
  itemsPerPage?: number;
  className?: string;
}

export const VirtualizedGuestList: React.FC<VirtualizedGuestListProps> = ({
  eventId,
  searchQuery = "",
  statusFilter,
  itemsPerPage = 20,
  className
}) => {
  // Pagination côté client
  const [page, setPage] = useState(1);

  // Simuler une requête via React Query
  // Remplacez ceci par un appel Supabase réel dans votre application
  const fetchGuests = async () => {
    // Simulons un délai pour montrer le skeleton
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Récupérer les données depuis une API ou Supabase
    // Exemple: return await supabase.from('guests').select('*').eq('event_id', eventId);
    
    // Pour l'exemple, nous retournons des données fictives
    return Array(230).fill(0).map((_, i) => ({
      id: `guest-${i}`,
      name: `Invité ${i + 1}`,
      email: `invite${i + 1}@example.com`,
      phone: i % 3 === 0 ? `06${Math.floor(Math.random() * 100000000)}` : undefined,
      status: ['pending', 'confirmed', 'declined'][Math.floor(Math.random() * 3)] as 'pending' | 'confirmed' | 'declined',
      table_number: i % 5 === 0 ? Math.floor(Math.random() * 20) + 1 : undefined,
      role: i % 10 === 0 ? 'VIP' : undefined
    }));
  };

  const { data: allGuests = [], isLoading } = useQuery({
    queryKey: ['guests', eventId, searchQuery, statusFilter],
    queryFn: fetchGuests
  });

  // Filtrer les invités selon la recherche et le statut
  const filteredGuests = useMemo(() => {
    return allGuests.filter(guest => {
      const matchesSearch = !searchQuery || 
        guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        guest.email?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = !statusFilter || guest.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [allGuests, searchQuery, statusFilter]);

  // Utiliser notre hook de pagination
  const { pageItems, totalPages, currentPage, goToPage } = usePagination(
    filteredGuests.length,
    itemsPerPage
  );

  // Obtenir les éléments pour la page actuelle
  const currentPageGuests = useMemo(() => {
    return filteredGuests.slice(pageItems.start, pageItems.end);
  }, [filteredGuests, pageItems]);

  if (isLoading) {
    return <GuestListSkeleton />;
  }

  return (
    <div className={className}>
      <div className="mb-2 text-sm text-muted-foreground">
        {filteredGuests.length} invités trouvés
      </div>

      <VirtualList
        items={currentPageGuests}
        itemSize={72} // Hauteur approximative d'une ligne d'invité
        height={500} // Hauteur de la liste visible
        renderItem={(guest) => <GuestItem guest={guest} />}
        emptyMessage="Aucun invité ne correspond aux critères de recherche"
      />

      <div className="mt-4">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};
