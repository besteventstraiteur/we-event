
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, CreditCard, BarChart, Download, FileDown } from "lucide-react";
import { Link } from "react-router-dom";
import GoldButton from "@/components/GoldButton";
import ExportBackupButton from "@/components/admin/ExportBackupButton";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPartners: 0,
    pendingPartners: 0,
    totalClients: 0,
    newClientsThisMonth: 0,
    revenue: 0,
    revenueThisMonth: 0,
    interactions: 0,
    interactionsGrowth: 0
  });
  
  const [pendingPartners, setPendingPartners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Get counts
        const [
          { count: totalPartners },
          { count: pendingPartnersCount },
          { count: totalClients },
          { data: recentPartners }
        ] = await Promise.all([
          supabase.from('partners').select('*', { count: 'exact', head: true }),
          supabase.from('partners').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'CLIENT'),
          supabase.from('partners')
            .select(`
              id, 
              name, 
              category, 
              created_at,
              user:user_id (
                email,
                name
              )
            `)
            .eq('status', 'pending')
            .order('created_at', { ascending: false })
            .limit(3)
        ]);
        
        // Get new clients this month
        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);
        
        const { count: newClientsThisMonth } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'CLIENT')
          .gte('created_at', thisMonth.toISOString());
        
        // Set mock revenue data for now (this would come from a payment integration)
        const revenue = 6870;
        const revenueThisMonth = 1075;
        
        // Mock interaction data (this would be tracked in a real app)
        const interactions = 248;
        const interactionsGrowth = 18;
        
        setStats({
          totalPartners: totalPartners || 0,
          pendingPartners: pendingPartnersCount || 0,
          totalClients: totalClients || 0,
          newClientsThisMonth: newClientsThisMonth || 0,
          revenue,
          revenueThisMonth,
          interactions,
          interactionsGrowth
        });
        
        setPendingPartners(recentPartners || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les données du tableau de bord"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [toast]);
  
  const handleApprovePartner = async (partnerId: string) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ status: 'approved' })
        .eq('id', partnerId);
        
      if (error) throw error;
      
      // Update local state
      setPendingPartners(prev => prev.filter(p => p.id !== partnerId));
      setStats(prev => ({
        ...prev,
        pendingPartners: prev.pendingPartners - 1,
        totalPartners: prev.totalPartners // The count stays the same, just the status changed
      }));
      
      toast({
        title: "Partenaire approuvé",
        description: "Le partenaire a été approuvé avec succès"
      });
    } catch (error) {
      console.error('Error approving partner:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'approuver le partenaire"
      });
    }
  };
  
  const handleRejectPartner = async (partnerId: string) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ status: 'rejected' })
        .eq('id', partnerId);
        
      if (error) throw error;
      
      // Update local state
      setPendingPartners(prev => prev.filter(p => p.id !== partnerId));
      setStats(prev => ({
        ...prev,
        pendingPartners: prev.pendingPartners - 1,
        totalPartners: prev.totalPartners - 1
      }));
      
      toast({
        title: "Partenaire rejeté",
        description: "Le partenaire a été rejeté avec succès"
      });
    } catch (error) {
      console.error('Error rejecting partner:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de rejeter le partenaire"
      });
    }
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Administration We Event</h1>
          <p className="text-vip-gray-400">Gérez les partenaires, clients et contenus de la plateforme</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <Users size={18} /> Partenaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">{stats.totalPartners}</p>
              <p className="text-sm text-vip-gray-400">Partenaires actifs</p>
              <p className="text-xs text-vip-gold mt-2">+{stats.pendingPartners} en attente de validation</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <User size={18} /> Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">{stats.totalClients}</p>
              <p className="text-sm text-vip-gray-400">Clients VIP inscrits</p>
              <p className="text-xs text-vip-gold mt-2">+{stats.newClientsThisMonth} ce mois-ci</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <CreditCard size={18} /> Revenus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">{stats.revenue} €</p>
              <p className="text-sm text-vip-gray-400">Revenus partenaires</p>
              <p className="text-xs text-vip-gold mt-2">+{stats.revenueThisMonth} € ce mois-ci</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <BarChart size={18} /> Interactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">{stats.interactions}</p>
              <p className="text-sm text-vip-gray-400">Demandes ce mois</p>
              <p className="text-xs text-vip-gold mt-2">+{stats.interactionsGrowth}% vs mois précédent</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle>Partenaires en attente</CardTitle>
              <CardDescription>Nouvelles inscriptions à valider</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-vip-gray-400 py-6">Chargement...</p>
              ) : pendingPartners.length > 0 ? (
                pendingPartners.map((partner, i) => (
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
                      <GoldButton size="sm" onClick={() => handleApprovePartner(partner.id)}>
                        Valider
                      </GoldButton>
                      <GoldButton variant="outline" size="sm" onClick={() => handleRejectPartner(partner.id)}>
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

          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle>Revenus mensuels</CardTitle>
              <CardDescription>Abonnements partenaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <div className="text-center text-vip-gray-400">
                  Graphique de revenus mensuels
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Gérez rapidement la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/admin/statistics">
                  <GoldButton className="w-full">
                    <BarChart className="h-4 w-4 mr-2" /> Voir statistiques
                  </GoldButton>
                </Link>
                <Link to="/admin/podcasts">
                  <GoldButton className="w-full">
                    Gérer les podcasts
                  </GoldButton>
                </Link>
                <Link to="/admin/partners">
                  <GoldButton className="w-full">
                    Gérer les partenaires
                  </GoldButton>
                </Link>
                <Link to="/admin/partner-types">
                  <GoldButton className="w-full">
                    Gestion des catégories
                  </GoldButton>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-vip-gray-900 border-vip-gray-800 border-2 border-vip-gold/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileDown className="h-5 w-5 text-vip-gold" />
                Sauvegarde complète
              </CardTitle>
              <CardDescription>
                Exportez une sauvegarde complète de l'application et de son contenu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-vip-gray-400">
                  Cette fonctionnalité vous permet d'exporter toutes les données de l'application dans un fichier JSON qui pourra être utilisé pour restaurer l'application en cas de besoin.
                </p>
                <div className="bg-vip-gray-800 p-3 rounded-md text-sm">
                  <p className="font-medium text-vip-white mb-1">La sauvegarde inclut :</p>
                  <ul className="list-disc list-inside text-vip-gray-400 space-y-1">
                    <li>Tous les partenaires et leurs informations</li>
                    <li>Tous les clients et leurs profils</li>
                    <li>Toutes les salles de réception</li>
                    <li>Toutes les recommandations</li>
                    <li>Tous les podcasts et talkshows</li>
                    <li>Les paramètres de l'application</li>
                  </ul>
                </div>
                <ExportBackupButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
