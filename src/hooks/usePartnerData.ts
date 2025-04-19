
import { useEffect, useState } from 'react';
import { useToast } from './use-toast';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase-db';

type Partner = Database['public']['Tables']['partners']['Row'];
type PartnerImage = Database['public']['Tables']['partner_images']['Row'];

export const usePartnerData = (partnerId: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [images, setImages] = useState<PartnerImage[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        setLoading(true);
        const { data: partnerData, error: partnerError } = await supabase
          .from('partners')
          .select('*')
          .eq('id', partnerId)
          .single();

        if (partnerError) throw partnerError;

        const { data: imageData, error: imagesError } = await supabase
          .from('partner_images')
          .select('*')
          .eq('partner_id', partnerId);

        if (imagesError) throw imagesError;

        setPartner(partnerData as Partner);
        setImages(imageData as PartnerImage[]);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error fetching partner data';
        setError(message);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: message
        });
      } finally {
        setLoading(false);
      }
    };

    if (partnerId) {
      fetchPartnerData();
    }
  }, [partnerId, toast]);

  return { partner, images, loading, error };
};
