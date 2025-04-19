
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { ServiceRequest } from '@/types/requests';
import { useAuth } from '@/hooks/useAuth';

export const useClientRequests = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('requests')
          .select(`
            *,
            request_messages (
              id,
              sender_id,
              content,
              created_at
            )
          `)
          .eq('client_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setRequests(data || []);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();

    // Set up realtime subscription
    const channel = supabase
      .channel('public:requests')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'requests',
          filter: `client_id=eq.${user.id}`
        }, 
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    requests,
    isLoading
  };
};
