
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { DollarSign, Wallet, PiggyBank } from "lucide-react";
import GoldButton from "@/components/GoldButton";

interface VendorBudget {
  id: string;
  name: string;
  category: string;
  budget: number;
}

const BudgetPlanner = () => {
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [vendors, setVendors] = useState<VendorBudget[]>([
    { id: "v1", name: "Domaine des Roses", category: "Lieu", budget: 0 },
    { id: "v2", name: "Traiteur Deluxe", category: "Traiteur", budget: 0 },
    { id: "v3", name: "Fleurs & Merveilles", category: "Fleuriste", budget: 0 },
    { id: "v4", name: "DJ Platine", category: "Musique", budget: 0 },
    { id: "v5", name: "Studio Lumière", category: "Photographe", budget: 0 },
  ]);
  const [newVendorName, setNewVendorName] = useState("");
  const [newVendorCategory, setNewVendorCategory] = useState("");
  const [newVendorBudget, setNewVendorBudget] = useState<number>(0);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [allocatedBudget, setAllocatedBudget] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Calcul du budget alloué et des données du graphique
  useEffect(() => {
    const allocated = vendors.reduce((sum, vendor) => sum + vendor.budget, 0);
    setAllocatedBudget(allocated);
    
    const data = vendors
      .filter(vendor => vendor.budget > 0)
      .map(vendor => ({
        name: vendor.name,
        value: vendor.budget,
        category: vendor.category
      }));
    setChartData(data);
  }, [vendors]);
  
  // Pourcentage du budget total utilisé
  const budgetPercentage = totalBudget > 0 
    ? Math.min(Math.round((allocatedBudget / totalBudget) * 100), 100) 
    : 0;
  
  // Couleurs pour le graphique
  const COLORS = ['#F97316', '#8B5CF6', '#0EA5E9', '#22C55E', '#EAB308', '#EC4899'];
  
  const handleAddVendor = () => {
    if (newVendorName && newVendorCategory && newVendorBudget > 0) {
      const newVendor: VendorBudget = {
        id: `v${Date.now()}`,
        name: newVendorName,
        category: newVendorCategory,
        budget: newVendorBudget
      };
      
      setVendors([...vendors, newVendor]);
      setNewVendorName("");
      setNewVendorCategory("");
      setNewVendorBudget(0);
      setShowAddForm(false);
    }
  };
  
  const handleUpdateBudget = (id: string, budget: number) => {
    setVendors(vendors.map(vendor => 
      vendor.id === id ? { ...vendor, budget } : vendor
    ));
  };
  
  const handleRemoveVendor = (id: string) => {
    setVendors(vendors.filter(vendor => vendor.id !== id));
  };
  
  const remainingBudget = totalBudget - allocatedBudget;
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-vip-gold" />
          Planificateur de Budget
        </CardTitle>
        <CardDescription>
          Définissez votre budget global et répartissez-le entre vos prestataires
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="total-budget">Budget Total de l'Événement</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-vip-gray-400" />
              <Input 
                id="total-budget"
                type="number" 
                min="0"
                className="pl-9"
                value={totalBudget || ''}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                placeholder="Entrez votre budget total"
              />
            </div>
          </div>
        </div>
        
        {totalBudget > 0 && (
          <>
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span>Budget alloué: {allocatedBudget.toLocaleString()} €</span>
                <span className={remainingBudget < 0 ? "text-red-500 font-medium" : "text-green-600 font-medium"}>
                  {remainingBudget >= 0 ? `Restant: ${remainingBudget.toLocaleString()} €` : `Dépassement: ${Math.abs(remainingBudget).toLocaleString()} €`}
                </span>
              </div>
              <Progress value={budgetPercentage} className="h-2" 
                        color={remainingBudget < 0 ? "bg-red-500" : undefined} />
              <p className="text-xs text-vip-gray-500 text-right">{budgetPercentage}% de votre budget utilisé</p>
            </div>
            
            {chartData.length > 0 && (
              <div className="py-4">
                <h3 className="text-sm font-medium mb-2">Répartition du Budget</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${Number(value).toLocaleString()} €`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Prestataires</h3>
                <GoldButton 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAddForm(!showAddForm)}
                >
                  {showAddForm ? "Annuler" : "Ajouter un prestataire"}
                </GoldButton>
              </div>
              
              {showAddForm && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 border rounded-md">
                  <div>
                    <Label htmlFor="new-vendor-name" className="text-xs">Nom du prestataire</Label>
                    <Input
                      id="new-vendor-name"
                      value={newVendorName}
                      onChange={(e) => setNewVendorName(e.target.value)}
                      placeholder="Nom"
                      className="h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-vendor-category" className="text-xs">Catégorie</Label>
                    <Input
                      id="new-vendor-category"
                      value={newVendorCategory}
                      onChange={(e) => setNewVendorCategory(e.target.value)}
                      placeholder="Catégorie"
                      className="h-8 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-vendor-budget" className="text-xs">Budget (€)</Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-vip-gray-400" />
                      <Input
                        id="new-vendor-budget"
                        type="number"
                        min="0"
                        value={newVendorBudget || ''}
                        onChange={(e) => setNewVendorBudget(Number(e.target.value))}
                        placeholder="Montant"
                        className="h-8 pl-7"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3 flex justify-end mt-2">
                    <GoldButton size="sm" onClick={handleAddVendor}>
                      Ajouter
                    </GoldButton>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                {vendors.map((vendor) => (
                  <div 
                    key={vendor.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{vendor.name}</p>
                      <p className="text-xs text-vip-gray-500">{vendor.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative w-32">
                        <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-vip-gray-400" />
                        <Input
                          type="number"
                          min="0"
                          value={vendor.budget || ''}
                          onChange={(e) => handleUpdateBudget(vendor.id, Number(e.target.value))}
                          className="h-8 pl-7 text-right pr-2"
                        />
                      </div>
                      <button 
                        onClick={() => handleRemoveVendor(vendor.id)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        
        {totalBudget === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <PiggyBank className="h-12 w-12 text-vip-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-vip-gray-600">Commencez votre planification budgétaire</h3>
            <p className="text-sm text-vip-gray-500 max-w-md mt-1">
              Définissez votre budget total pour visualiser la répartition de vos dépenses entre les différents prestataires
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetPlanner;
