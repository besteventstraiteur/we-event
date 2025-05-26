import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import type { ServiceRequest } from '@/types/supabase';

export const useClientRequests = (clientId?: string) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (clientId) {
      fetchRequests();
    }
  }, [clientId]);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('requests')
        .select(`
          *,
          request_messages (
            id,
            content,
            sender_id,
            created_at
          )
        `)
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedRequests: ServiceRequest[] = (data || []).map(item => ({
        ...item,
        status: item.status as 'pending' | 'completed' | 'accepted' | 'rejected'
      }));

      setRequests(mappedRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les demandes"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createRequest = async (newRequest: Omit<ServiceRequest, 'id' | 'created_at' | 'updated_at' | 'request_messages'>) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('requests')
        .insert([newRequest])
        .select(`
          *,
          request_messages (
            id,
            content,
            sender_id,
            created_at
          )
        `)
        .single();

      if (error) throw error;

      const mappedRequest: ServiceRequest = {
        ...data,
        status: data.status as 'pending' | 'completed' | 'accepted' | 'rejected'
      };

      setRequests([mappedRequest, ...requests]);
      toast({
        title: "Demande créée",
        description: "Votre demande a été créée avec succès"
      });
    } catch (error) {
      console.error('Error creating request:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer la demande"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequest = async (id: string, updates: Partial<Omit<ServiceRequest, 'id' | 'created_at' | 'updated_at' | 'request_messages' | 'client_id'>>) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('requests')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          request_messages (
            id,
            content,
            sender_id,
            created_at
          )
        `)
        .single();

      if (error) throw error;

      const mappedRequest: ServiceRequest = {
        ...data,
        status: data.status as 'pending' | 'completed' | 'accepted' | 'rejected'
      };

      setRequests(requests.map(request => (request.id === id ? mappedRequest : request)));
      toast({
        title: "Demande mise à jour",
        description: "Votre demande a été mise à jour avec succès"
      });
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour la demande"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRequest = async (id: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setRequests(requests.filter(request => request.id !== id));
      toast({
        title: "Demande supprimée",
        description: "Votre demande a été supprimée avec succès"
      });
    } catch (error) {
      console.error('Error deleting request:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer la demande"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    requests,
    isLoading,
    createRequest,
    updateRequest,
    deleteRequest
  };
};
