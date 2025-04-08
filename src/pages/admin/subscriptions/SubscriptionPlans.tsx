
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SubscriptionPlan, subscriptionPlans, SubscriptionTier } from "@/models/subscription";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";
import GoldButton from "@/components/GoldButton";

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(subscriptionPlans);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fonction pour obtenir la couleur du badge selon le tier
  const getBadgeColor = (tier: SubscriptionTier) => {
    switch(tier) {
      case SubscriptionTier.PREMIUM:
        return "bg-amber-500/20 text-amber-500 border-amber-500/50";
      case SubscriptionTier.STANDARD:
        return "bg-blue-500/20 text-blue-500 border-blue-500/50";
      default:
        return "bg-vip-gray-700/20 text-vip-gray-400 border-vip-gray-700/50";
    }
  };

  // Dans une vraie application, ces fonctions effectueraient des modifications sur le serveur
  const openEditDialog = (plan: SubscriptionPlan) => {
    setEditingPlan({...plan});
    setIsDialogOpen(true);
  };

  const handleSavePlan = () => {
    if (!editingPlan) return;
    
    if (editingPlan.id) {
      // Mettre à jour un plan existant
      setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
    } else {
      // Créer un nouveau plan
      const newPlan = {
        ...editingPlan,
        id: `plan-${Date.now()}`,
      };
      setPlans([...plans, newPlan]);
    }
    
    setIsDialogOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (id: string) => {
    // Dans une vraie application, cela demanderait confirmation et effectuerait la suppression sur le serveur
    setPlans(plans.filter(p => p.id !== id));
  };

  return (
    <>
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium text-vip-white">Plans d'abonnement</h3>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <GoldButton
                  onClick={() => {
                    setEditingPlan({
                      id: "",
                      name: "",
                      tier: SubscriptionTier.STANDARD,
                      price: 0,
                      priceWithTax: 0,
                      features: [],
                      limitations: ""
                    });
                  }}
                >
                  <Plus size={16} className="mr-2" /> Nouveau plan
                </GoldButton>
              </DialogTrigger>
              <DialogContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white">
                <DialogHeader>
                  <DialogTitle>{editingPlan?.id ? "Modifier le plan" : "Créer un plan"}</DialogTitle>
                </DialogHeader>
                {editingPlan && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm font-medium text-vip-white mb-2 block">Nom du plan</label>
                      <Input 
                        value={editingPlan.name} 
                        onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})} 
                        className="bg-vip-gray-800 border-vip-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-vip-white mb-2 block">Niveau</label>
                      <select 
                        value={editingPlan.tier} 
                        onChange={(e) => setEditingPlan({...editingPlan, tier: e.target.value as SubscriptionTier})} 
                        className="w-full bg-vip-gray-800 border-vip-gray-700 rounded p-2 text-vip-white"
                      >
                        <option value={SubscriptionTier.FREE}>Gratuit</option>
                        <option value={SubscriptionTier.STANDARD}>Standard</option>
                        <option value={SubscriptionTier.PREMIUM}>Premium</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-vip-white mb-2 block">Prix HT</label>
                        <Input 
                          type="number" 
                          value={editingPlan.price} 
                          onChange={(e) => setEditingPlan({...editingPlan, price: Number(e.target.value)})} 
                          className="bg-vip-gray-800 border-vip-gray-700"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-vip-white mb-2 block">Prix TTC</label>
                        <Input 
                          type="number" 
                          value={editingPlan.priceWithTax} 
                          onChange={(e) => setEditingPlan({...editingPlan, priceWithTax: Number(e.target.value)})} 
                          className="bg-vip-gray-800 border-vip-gray-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-vip-white mb-2 block">Fonctionnalités (séparées par des virgules)</label>
                      <Textarea 
                        value={editingPlan.features.join(", ")} 
                        onChange={(e) => setEditingPlan({...editingPlan, features: e.target.value.split(", ")})} 
                        className="bg-vip-gray-800 border-vip-gray-700" 
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-vip-white mb-2 block">Limitations</label>
                      <Textarea 
                        value={editingPlan.limitations} 
                        onChange={(e) => setEditingPlan({...editingPlan, limitations: e.target.value})} 
                        className="bg-vip-gray-800 border-vip-gray-700"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button 
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="border-vip-gray-700"
                      >
                        Annuler
                      </Button>
                      <GoldButton onClick={handleSavePlan}>
                        Enregistrer
                      </GoldButton>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card key={plan.id} className="bg-vip-gray-800 border-vip-gray-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="outline" className={getBadgeColor(plan.tier)}>
                      {plan.tier}
                    </Badge>
                    <div className="flex gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-vip-gray-400 hover:text-vip-white"
                        onClick={() => openEditDialog(plan)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-vip-gray-400 hover:text-red-500"
                        onClick={() => handleDeletePlan(plan.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-vip-white mb-2">{plan.name}</h3>
                  <p className="text-2xl font-bold text-vip-gold mb-4">
                    {plan.price === 0 ? "Gratuit" : `${plan.price.toFixed(2)} €`}
                    <span className="text-sm text-vip-gray-400 ml-1">/ mois</span>
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-vip-gray-300 mb-2">Fonctionnalités:</h4>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Check size={16} className="mr-2 text-green-500" />
                          <span className="text-vip-white">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {plan.limitations && (
                    <div className="pt-2 border-t border-vip-gray-700">
                      <h4 className="text-sm font-medium text-vip-gray-300 mb-1">Limitations:</h4>
                      <p className="text-sm text-vip-gray-400">{plan.limitations}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SubscriptionPlans;
