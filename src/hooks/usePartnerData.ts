
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { PartnerProfile, PartnerImage } from '@/models/partnerProfile';

export function usePartnerData(partnerId?: string) {
  const [profile, setProfile] = useState<PartnerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPartnerData = async () => {
      if (!partnerId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch partner data
        const { data: partnerData, error: partnerError } = await supabase
          .from('partners')
          .select(`
            *,
            user:user_id (
              email,
              name,
              avatar_url,
              phone
            )
          `)
          .eq('id', partnerId)
          .single();

        if (partnerError) throw partnerError;
        if (!partnerData) {
          setProfile(null);
          setError('Partner not found');
          return;
        }

        // Fetch partner images
        const { data: images, error: imagesError } = await supabase
          .from('partner_images')
          .select('*')
          .eq('partner_id', partnerId)
          .order('order_index', { ascending: true });

        if (imagesError) throw imagesError;

        // Transform data into expected format
        const partnerProfile: PartnerProfile = {
          id: partnerData?.id || '',
          name: partnerData?.name || '',
          category: partnerData?.category || '',
          description: partnerData?.description || '',
          shortDescription: partnerData?.short_description || '',
          pricing: partnerData?.pricing || { basePrice: '', packages: [] },
          contact: partnerData?.contact || { 
            email: partnerData?.user?.email || '', 
            phone: partnerData?.user?.phone || '', 
            website: '', 
            address: '' 
          },
          images: images ? images.map(img => ({
            id: img?.id || '',
            url: img?.url || '',
            alt: img?.alt || '',
            type: img?.type || 'gallery',
            order: img?.order_index || 0,
            featured: img?.featured || false
          })) : [],
          discount: partnerData?.discount || '',
          services: partnerData?.services || [],
          availability: partnerData?.availability || []
        };

        setProfile(partnerProfile);
        setError(null);
      } catch (err) {
        console.error('Error fetching partner data:', err);
        setError(err instanceof Error ? err.message : 'Error fetching partner data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartnerData();
  }, [partnerId]);

  const updateProfile = async (updatedProfile: Partial<PartnerProfile>) => {
    if (!profile) return;
    
    try {
      const { error } = await supabase
        .from('partners')
        .update({
          name: updatedProfile.name,
          category: updatedProfile.category,
          description: updatedProfile.description,
          short_description: updatedProfile.shortDescription,
          pricing: updatedProfile.pricing,
          contact: updatedProfile.contact,
          discount: updatedProfile.discount,
          services: updatedProfile.services,
          availability: updatedProfile.availability
        })
        .eq('id', profile.id);
      
      if (error) throw error;
      
      // Update local state
      setProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès."
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err instanceof Error ? err.message : "Impossible de mettre à jour le profil"
      });
    }
  };

  const updateProfileImage = async (file: File, type: 'profile' | 'gallery' | 'logo' | 'background'): Promise<PartnerImage> => {
    if (!profile) throw new Error('No profile loaded');
    
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile.id}/${type}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('partner-images')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = await supabase.storage
        .from('partner-images')
        .getPublicUrl(uploadData.path);
      
      const url = urlData.publicUrl;
      
      // Handle existing featured image if applicable
      if (type !== 'gallery' && profile.images.some(img => img.type === type && img.featured)) {
        // If a featured image already exists for this type, we'll make it non-featured
        const oldImage = profile.images.find(img => img.type === type && img.featured);
        
        if (oldImage) {
          await supabase
            .from('partner_images')
            .update({ featured: false })
            .eq('id', oldImage.id);
        }
      }
      
      // Calculate order index for gallery images
      const orderIndex = type === 'gallery'
        ? Math.max(0, ...profile.images.filter(img => img.type === 'gallery').map(img => img.order || 0)) + 1
        : undefined;
      
      // Save image metadata to database
      const { data: image, error: imageError } = await supabase
        .from('partner_images')
        .insert({
          partner_id: profile.id,
          url,
          alt: file.name,
          type,
          order_index: orderIndex,
          featured: type !== 'gallery'
        })
        .select()
        .single();
      
      if (imageError) throw imageError;
      
      if (!image) throw new Error('Failed to insert image');
      
      // Create new image object
      const newImage: PartnerImage = {
        id: image.id || '',
        url,
        alt: file.name,
        type,
        order: image.order_index || 0,
        featured: image.featured || false
      };
      
      // Update local state
      setProfile(prev => {
        if (!prev) return null;
        
        // Filter out any existing featured image of the same type if this is a featured image
        let updatedImages = prev.images.filter(img => 
          !(img.type === type && newImage.featured && img.featured)
        );
        
        updatedImages = [...updatedImages, newImage];
        return { ...prev, images: updatedImages };
      });
      
      toast({
        title: "Image téléchargée",
        description: "Votre image a été optimisée et ajoutée à votre profil."
      });
      
      return newImage;
    } catch (err) {
      console.error('Error uploading image:', err);
      toast({
        variant: "destructive", 
        title: "Erreur",
        description: err instanceof Error ? err.message : "Impossible de télécharger l'image"
      });
      throw err;
    }
  };

  const removeProfileImage = async (imageId: string) => {
    if (!profile) return;
    
    try {
      const image = profile.images.find(img => img.id === imageId);
      if (!image) throw new Error('Image not found');
      
      // Delete from database
      const { error } = await supabase
        .from('partner_images')
        .delete()
        .eq('id', imageId);
        
      if (error) throw error;
      
      // Delete file from storage if possible
      // Note: This would require extracting the path from URL which depends on your storage setup
      
      // Update local state
      setProfile(prev => {
        if (!prev) return null;
        return { 
          ...prev, 
          images: prev.images.filter(img => img.id !== imageId) 
        };
      });
    } catch (err) {
      console.error('Error removing image:', err);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: err instanceof Error ? err.message : "Impossible de supprimer l'image"
      });
    }
  };

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    updateProfileImage,
    removeProfileImage
  };
}

// Hook to fetch all partners (useful for admin)
export function usePartners() {
  const [partners, setPartners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPartners = async (status?: string) => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('partners')
        .select(`
          *,
          user:user_id (
            email,
            name,
            avatar_url
          ),
          images:partner_images(*)
        `);
        
      if (status) {
        query = query.eq('status', status);
      }
      
      const { data, error: fetchError } = await query;
        
      if (fetchError) throw fetchError;
      setPartners(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching partners:', err);
      setError(err instanceof Error ? err.message : 'Error fetching partners');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const updatePartnerStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      // Refresh data
      fetchPartners();
      
      return true;
    } catch (err) {
      console.error('Error updating partner status:', err);
      return false;
    }
  };

  return {
    partners,
    isLoading,
    error,
    fetchPartners,
    updatePartnerStatus
  };
}
