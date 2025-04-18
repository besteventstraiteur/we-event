
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import GoldButton from "@/components/GoldButton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface Partner {
  id: string;
  name: string;
  category: string;
  created_at: string;
  user: {
    email: string;
    name: string;
  };
}

interface PendingPartnersProps {
  partners: Partner[];
  onPartnerStatusChange: (partnerId: string, approved: boolean) => void;
  isLoading: boolean;
}

const PendingPartners: React.FC<PendingPartnersProps> = ({ 
  partners, 
  onPartnerStatusChange,
  isLoading 
}) => {
  const { toast } = useToast();

  const handlePartnerAction = async (partnerId: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ status: approved ? 'approved' : 'rejected' })
        .eq('id', partnerId);
        
      if (error) throw error;
      
      onPartnerStatusChange(partnerId, approved);
      
      toast({
        title: approved ? "Partenaire approuvé" : "Partenaire rejeté",
        description: `Le partenaire a été ${approved ? 'approuvé' : 'rejeté'} avec succès`
      });
    } catch (error) {
      console.error('Error updating partner status:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Impossible de ${approved ? 'approuver' : 'rejeter'} le partenaire`
      });
    }
  };

  return (
    <Card className="bg-vip-gray-900 border-vip-gray-800">
      <CardHeader>
        <CardTitle>Partenaires en attente</CardTitle>
        <CardDescription>Nouvelles inscriptions à valider</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center text-vip-gray-400 py-6">Chargement...</p>
        ) : partners.length > 0 ? (
          partners.map((partner) => (
            <div key={partner.id} className="flex items-center gap-4 p-3 rounded-md hover:bg-vip-gray-800 transition-colors border-b border-vip-gray-800 last:border-b-0">
              <div className="w-10 h-10 bg-vip-gray-800 rounded-full flex items-center justify-center text-vip-white border border-vip-gray-700">
                {partner.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-vip-white">{partner.name}</h4>
                <p className="text-sm text-vip-gray-400">
                  {partner.category} • Inscrit le {
                    new Date(partner.created_at).toLocaleDateString('fr-FR', { 
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })
                  }
                </p>
              </div>
              <div className="flex gap-2">
                <GoldButton size="sm" onClick={() => handlePartnerAction(partner.id, true)}>
                  Valider
                </GoldButton>
                <GoldButton variant="outline" size="sm" onClick={() => handlePartnerAction(partner.id, false)}>
                  Refuser
                </GoldButton>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-vip-gray-400 py-6">Aucun partenaire en attente</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingPartners;
