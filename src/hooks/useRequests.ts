import { useState } from 'react';
import { notify } from '@/components/ui/notifications';
import { supabase } from '@/lib/supabase';
import type { ServiceRequest, RequestMessage } from '@/types/requests';

export const useRequests = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createRequest = async (data: Omit<ServiceRequest, 'id' | 'client_id' | 'status' | 'created_at' | 'updated_at'>) => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('requests')
        .insert([
          {
            ...data,
            client_id: user.id,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      notify.success(
        "Demande envoyée",
        "Votre demande a été envoyée avec succès"
      );

    } catch (error) {
      console.error('Error creating request:', error);
      notify.error(
        "Erreur",
        "Une erreur est survenue lors de l'envoi de votre demande"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (requestId: string, content: string) => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('request_messages')
        .insert([
          {
            request_id: requestId,
            sender_id: user.id,
            content
          }
        ]);

      if (error) throw error;

    } catch (error) {
      console.error('Error sending message:', error);
      notify.error(
        "Erreur",
        "Une erreur est survenue lors de l'envoi du message"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, status: ServiceRequest['status']) => {
    try {
      setIsLoading(true);

      const { error } = await supabase
        .from('requests')
        .update({ status })
        .eq('id', requestId);

      if (error) throw error;

      notify.success(
        "Statut mis à jour",
        "Le statut de la demande a été mis à jour"
      );

    } catch (error) {
      console.error('Error updating request status:', error);
      notify.error(
        "Erreur",
        "Une erreur est survenue lors de la mise à jour du statut"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createRequest,
    sendMessage,
    updateRequestStatus
  };
};
