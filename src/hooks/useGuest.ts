
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Guest } from '@/types/guest';
import { useToast } from '@/hooks/use-toast';

export const useGuest = (token: string | null) => {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchGuest = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('guests')
          .select('*')
          .eq('token', token)
          .single();

        if (error) throw error;
        setGuest(data);
      } catch (error) {
        console.error('Error fetching guest:', error);
        toast({
          title: "Erreur",
          description: "Impossible de trouver l'invité avec ce token",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuest();
  }, [token, toast]);

  const updateGuest = async (updates: Partial<Guest>) => {
    if (!guest) return;

    try {
      const { data, error } = await supabase
        .from('guests')
        .update(updates)
        .eq('token', token)
        .select()
        .single();

      if (error) throw error;
      setGuest(data);
      
      toast({
        title: "Mise à jour réussie",
        description: "Vos informations ont été mises à jour"
      });

      return data;
    } catch (error) {
      console.error('Error updating guest:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour vos informations",
        variant: "destructive"
      });
    }
  };

  return {
    guest,
    isLoading,
    updateGuest
  };
};
