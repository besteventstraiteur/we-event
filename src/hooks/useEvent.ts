
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer_id: string;
  created_at: string;
  updated_at: string;
}

export const useEvent = (eventId: string | undefined) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // In a real application, this would fetch from a real events table
        // For now, we'll create mock data
        
        // Mock data for demonstration
        const mockEvent: Event = {
          id: eventId,
          title: "Mariage de Jean & Marie",
          description: "Célébration du mariage de Jean et Marie",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
          location: "Domaine des Fleurs, Paris",
          organizer_id: "mock-organizer-id",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setEvent(mockEvent);
        
        // In a real app with Supabase:
        /*
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', eventId)
          .single();

        if (error) throw error;
        setEvent(data);
        */
      } catch (error) {
        console.error('Error fetching event:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de l'événement",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, toast]);

  return {
    event,
    isLoading
  };
};
