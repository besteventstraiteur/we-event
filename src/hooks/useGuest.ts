
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import type { Guest } from '@/types/supabase';

export const useGuest = (token: string) => {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (token) {
      fetchGuest();
    }
  }, [token]);

  const fetchGuest = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('guests')
        .select('*')
        .eq('token', token)
        .single();

      if (error) {
        console.error('Error fetching guest:', error);
        setError('Invité non trouvé');
        return;
      }

      const mappedGuest: Guest = {
        ...data,
        rsvp_status: data.rsvp_status as 'pending' | 'confirmed' | 'declined'
      };

      setGuest(mappedGuest);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setIsLoading(false);
    }
  };

  const updateRSVP = async (status: 'confirmed' | 'declined', menuChoice?: string, dietaryRestrictions?: string) => {
    if (!guest) return false;

    try {
      const { error } = await supabase
        .from('guests')
        .update({
          rsvp_status: status,
          menu_choice: menuChoice || guest.menu_choice,
          dietary_restrictions: dietaryRestrictions || guest.dietary_restrictions
        })
        .eq('id', guest.id);

      if (error) throw error;

      const updatedGuest: Guest = {
        ...guest,
        rsvp_status: status,
        menu_choice: menuChoice || guest.menu_choice,
        dietary_restrictions: dietaryRestrictions || guest.dietary_restrictions
      };

      setGuest(updatedGuest);

      toast({
        title: "RSVP mis à jour",
        description: `Votre réponse a été enregistrée: ${status === 'confirmed' ? 'Confirmé' : 'Décliné'}`
      });

      return true;
    } catch (error) {
      console.error('Error updating RSVP:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour votre RSVP"
      });
      return false;
    }
  };

  return {
    guest,
    isLoading,
    error,
    updateRSVP,
    refetch: fetchGuest
  };
};
