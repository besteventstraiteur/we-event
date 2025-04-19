
import React, { useState, useEffect } from "react";
import { Search, Filter, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const AdminPartners = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('partners')
          .select(`
            *,
            user:user_id (
              email,
              name,
              role,
              avatar_url
            )
          `);
          
        if (error) throw error;
        
        const partnersList = data || [];
        setPartners(partnersList);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(partnersList.map(p => p.category))];
        setCategories(uniqueCategories);
        
        // Apply initial filters
        applyFilters(partnersList, searchTerm, statusFilter, categoryFilter);
      } catch (error) {
        console.error('Error fetching partners:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger la liste des partenaires"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPartners();
  }, [toast]);
  
  const applyFilters = (
    partnersList: any[], 
    search: string, 
    status: string, 
    category: string
  ) => {
    let filtered = partnersList;
    
    // Filter by status
    if (status !== 'all') {
      filtered = filtered.filter(partner => partner.status === status);
    }
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(partner => partner.category === category);
    }
    
    // Filter by search term
    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter(
        partner =>
          partner.name.toLowerCase().includes(lowerSearch) ||
          partner.user?.email.toLowerCase().includes(lowerSearch) ||
          partner.category.toLowerCase().includes(lowerSearch)
      );
    }
    
    setFilteredPartners(filtered);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(partners, value, statusFilter, categoryFilter);
  };
  
  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    applyFilters(partners, searchTerm, value, categoryFilter);
  };
  
  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
    applyFilters(partners, searchTerm, statusFilter, value);
  };
  
  const handleUpdateStatus = async (partnerId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ status } as any)
        .eq('id', partnerId as any);
        
      if (error) throw error;
      
      // Update local state
      const updatedPartners = partners.map(partner => 
        partner.id === partnerId ? { ...partner, status } : partner
      );
      
      setPartners(updatedPartners);
      applyFilters(updatedPartners, searchTerm, statusFilter, categoryFilter);
      
      toast({
        title: "Statut mis à jour",
        description: `Le partenaire a été ${status === 'approved' ? 'approuvé' : status === 'rejected' ? 'rejeté' : 'mis en attente'}`
      });
    } catch (error) {
      console.error('Error updating partner status:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le statut du partenaire"
      });
    }
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestion des Partenaires</h1>
            <p className="text-vip-gray-400">
              Tous les prestataires enregistrés sur la plateforme
            </p>
          </div>
          <Button className="bg-vip-gold hover:bg-amber-600 text-white" onClick={() => toast({ description: "Fonctionnalité à implémenter" })}>
            <Plus size={18} className="mr-2" />
            Ajouter un partenaire
          </Button>
        </div>

        {/* Filters */}
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-vip-white">Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-vip-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Rechercher un partenaire..."
                  className="pl-10 bg-vip-gray-800 border-vip-gray-700 text-vip-white"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="approved">Approuvé</SelectItem>
                  <SelectItem value="rejected">Rejeté</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent className="bg-vip-gray-800 border-vip-gray-700 text-vip-white max-h-60 overflow-y-auto">
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Partners List */}
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-vip-white">
              Partenaires {filteredPartners.length > 0 ? `(${filteredPartners.length})` : ''}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="py-10 text-center text-vip-gray-400">Chargement...</div>
            ) : filteredPartners.length > 0 ? (
              <div className="space-y-4">
                {filteredPartners.map((partner) => (
                  <Card
                    key={partner.id}
                    className="bg-vip-gray-800 border-vip-gray-700"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-vip-gray-700 border border-vip-gray-600 flex items-center justify-center text-vip-gold font-bold">
                          {partner.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-vip-white text-lg">
                            {partner.name}
                          </h3>
                          <p className="text-vip-gray-400 text-sm">
                            {partner.category} • {partner.user?.email || "Email non disponible"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {partner.status === "pending" ? (
                            <span className="px-3 py-1 text-xs rounded-full bg-amber-600/20 text-amber-400">
                              En attente
                            </span>
                          ) : partner.status === "approved" ? (
                            <span className="px-3 py-1 text-xs rounded-full bg-green-600/20 text-green-400">
                              Approuvé
                            </span>
                          ) : (
                            <span className="px-3 py-1 text-xs rounded-full bg-red-600/20 text-red-400">
                              Rejeté
                            </span>
                          )}
                          <Button
                            size="sm"
                            className="bg-vip-gray-700 hover:bg-vip-gray-600 text-vip-white"
                            onClick={() => toast({ description: "Fonctionnalité à implémenter" })}
                          >
                            Voir
                          </Button>
                          {partner.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleUpdateStatus(partner.id, "approved")}
                              >
                                Approuver
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-600 text-red-500 hover:bg-red-600/10"
                                onClick={() => handleUpdateStatus(partner.id, "rejected")}
                              >
                                Refuser
                              </Button>
                            </>
                          )}
                          {partner.status === "approved" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-amber-600 text-amber-500 hover:bg-amber-600/10"
                              onClick={() => handleUpdateStatus(partner.id, "pending")}
                            >
                              Mettre en attente
                            </Button>
                          )}
                          {partner.status === "rejected" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-600 text-green-500 hover:bg-green-600/10"
                              onClick={() => handleUpdateStatus(partner.id, "approved")}
                            >
                              Approuver
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-vip-gray-400">
                Aucun partenaire trouvé
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminPartners;
