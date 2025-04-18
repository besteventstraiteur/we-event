
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import StatisticsCards from "@/components/admin/dashboard/StatisticsCards";
import PendingPartners from "@/components/admin/dashboard/PendingPartners";
import QuickActions from "@/components/admin/dashboard/QuickActions";
import BackupSection from "@/components/admin/dashboard/BackupSection";

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
        
        // Mock revenue data for now
        const revenue = 6870;
        const revenueThisMonth = 1075;
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

  const handlePartnerStatusChange = (partnerId: string, approved: boolean) => {
    setPendingPartners(prev => prev.filter(p => p.id !== partnerId));
    setStats(prev => ({
      ...prev,
      pendingPartners: prev.pendingPartners - 1,
      totalPartners: prev.totalPartners + (approved ? 0 : -1)
    }));
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-8">
        <DashboardHeader />
        <StatisticsCards stats={stats} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PendingPartners 
            partners={pendingPartners}
            onPartnerStatusChange={handlePartnerStatusChange}
            isLoading={isLoading}
          />
          
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

        <QuickActions />
        <BackupSection />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
