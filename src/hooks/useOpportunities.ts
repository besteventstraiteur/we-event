
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface Opportunity {
  id: string;
  name: string;
  client_name: string;
  value: number;
  status: 'new' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  created_at: string;
  expected_close_date?: string;
  source?: string;
}

export const useOpportunities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Dans une vraie application, ceci serait un appel à Supabase ou une autre API
  const fetchOpportunities = async () => {
    // Simulons un délai pour le chargement
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Simulons des données
    return Array(50).fill(0).map((_, i) => ({
      id: `opp-${i + 1}`,
      name: `Opportunité ${i + 1}`,
      client_name: `Client ${i % 20 + 1}`,
      value: Math.floor(Math.random() * 50000) + 1000,
      status: ['new', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost'][Math.floor(Math.random() * 6)] as Opportunity['status'],
      created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      expected_close_date: new Date(Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
      source: ['Site Web', 'Recommandation', 'Salon', 'Contact direct'][Math.floor(Math.random() * 4)]
    }));
  };

  const { data = [], isLoading, error } = useQuery({
    queryKey: ['opportunities', sortColumn, sortOrder, statusFilter],
    queryFn: fetchOpportunities
  });

  // Filter based on search term
  const opportunities = data.filter(opp => {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    return opp.name.toLowerCase().includes(term) || 
           opp.client_name.toLowerCase().includes(term) ||
           (opp.source && opp.source.toLowerCase().includes(term));
  });

  return {
    opportunities,
    loading: isLoading,
    error,
    searchTerm,
    setSearchTerm,
    sortColumn,
    sortOrder,
    setSortColumn,
    setSortOrder,
    statusFilter,
    setStatusFilter
  };
};
