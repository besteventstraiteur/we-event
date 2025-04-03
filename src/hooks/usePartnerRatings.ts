
import { useState } from "react";
import { Rating, RatingSummary } from "@/types/ratingTypes";
import { useToast } from "@/hooks/use-toast";

export const usePartnerRatings = (initialRatings: Rating[] = []) => {
  const [ratings, setRatings] = useState<Rating[]>(initialRatings);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Calculate summary statistics from ratings
  const calculateSummary = (ratingsData: Rating[]): RatingSummary => {
    const approvedRatings = ratingsData.filter(r => r.status === 'approved');
    const totalRatings = approvedRatings.length;
    
    if (totalRatings === 0) {
      return {
        averageScore: 0,
        totalRatings: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }

    // Calculate average score
    const averageScore = approvedRatings.reduce((sum, r) => sum + r.score, 0) / totalRatings;
    
    // Calculate distribution
    const distribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
    
    approvedRatings.forEach(r => {
      distribution[r.score as keyof typeof distribution]++;
    });
    
    // Calculate category averages if available
    let categoryAverages = undefined;
    
    if (approvedRatings.length > 0 && approvedRatings[0].categories) {
      const categories = [
        'communication',
        'quality',
        'value',
        'professionalism',
        'reliability'
      ] as const;
      
      const categoryTotals = {
        communication: 0,
        quality: 0,
        value: 0,
        professionalism: 0,
        reliability: 0
      };
      
      let categoryCount = 0;
      
      approvedRatings.forEach(r => {
        if (r.categories) {
          categories.forEach(category => {
            categoryTotals[category] += r.categories![category];
          });
          categoryCount++;
        }
      });
      
      if (categoryCount > 0) {
        categoryAverages = {
          communication: categoryTotals.communication / categoryCount,
          quality: categoryTotals.quality / categoryCount,
          value: categoryTotals.value / categoryCount,
          professionalism: categoryTotals.professionalism / categoryCount,
          reliability: categoryTotals.reliability / categoryCount
        };
      }
    }
    
    return {
      averageScore,
      totalRatings,
      distribution,
      categoryAverages
    };
  };

  const ratingSummary = calculateSummary(ratings);

  // Add a new rating
  const addRating = async (partnerId: string, clientId: string, ratingData: {
    score: number;
    comment: string;
    categories?: {
      communication: number;
      quality: number;
      value: number;
      professionalism: number;
      reliability: number;
    };
  }): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      const newRating: Rating = {
        id: `rating_${Date.now()}`,
        partnerId,
        clientId,
        score: ratingData.score,
        comment: ratingData.comment,
        date: new Date(),
        status: 'pending', // New ratings start as pending
        categories: ratingData.categories
      };
      
      // Add the new rating to state
      setRatings(prev => [newRating, ...prev]);
      
      toast({
        title: "Avis soumis avec succès",
        description: "Votre avis a été soumis et sera visible après modération."
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de la soumission de votre avis."
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Approve a rating (admin function)
  const approveRating = async (ratingId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      setRatings(prev => 
        prev.map(rating => 
          rating.id === ratingId 
            ? { ...rating, status: 'approved' } 
            : rating
        )
      );
      
      toast({
        title: "Avis approuvé",
        description: "L'avis a été publié avec succès."
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'approbation de l'avis."
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Reject a rating (admin function)
  const rejectRating = async (ratingId: string, reason: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      setRatings(prev => 
        prev.map(rating => 
          rating.id === ratingId 
            ? { ...rating, status: 'rejected' } 
            : rating
        )
      );
      
      toast({
        title: "Avis rejeté",
        description: "L'avis a été rejeté."
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors du rejet de l'avis."
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Add a reply to a rating (partner function)
  const addReplyToRating = async (ratingId: string, reply: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      setRatings(prev => 
        prev.map(rating => 
          rating.id === ratingId 
            ? { ...rating, response: reply } 
            : rating
        )
      );
      
      toast({
        title: "Réponse ajoutée",
        description: "Votre réponse a été publiée avec succès."
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout de votre réponse."
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Report a rating (client function)
  const reportRating = async (ratingId: string, reason: string): Promise<boolean> => {
    try {
      // In a real app, this would be an API call
      toast({
        title: "Avis signalé",
        description: "Merci pour votre signalement. Notre équipe va l'examiner."
      });
      
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur s'est produite lors du signalement de l'avis."
      });
      return false;
    }
  };

  return {
    ratings,
    ratingSummary,
    isLoading,
    addRating,
    approveRating,
    rejectRating,
    addReplyToRating,
    reportRating
  };
};
