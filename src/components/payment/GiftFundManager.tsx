
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Gift, Link, Share2, PiggyBank, Copy, Check, Edit, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import StripeProvider from './StripeProvider';
import PaymentForm from './PaymentForm';
import PaymentService, { GiftFundContribution } from '@/services/PaymentService';

interface Contribution {
  id: string;
  name: string;
  email: string;
  amount: number;
  message: string;
  date: string;
}

const GiftFundManager = () => {
  const { toast } = useToast();
  const [isEnabled, setIsEnabled] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [giftFundLink, setGiftFundLink] = useState('https://www.mariage-vip.com/gift-fund/julia-thomas-2024');
  const [linkCopied, setLinkCopied] = useState(false);
  const [amount, setAmount] = useState(5000); // 50€ in cents
  const [customAmount, setCustomAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fundTitle, setFundTitle] = useState('Cagnotte pour notre voyage de noces');
  const [fundDescription, setFundDescription] = useState(
    'Votre présence à notre mariage est le plus beau des cadeaux. Cependant, si vous souhaitez nous offrir quelque chose, nous serions heureux de recevoir une contribution pour notre voyage de noces.'
  );
  
  // Mock data for contributions with new interface
  const [contributions, setContributions] = useState<Contribution[]>([
    {
      id: 'cont_1',
      name: 'Marie Dupont',
      email: 'marie@example.com',
      amount: 5000, // 50€
      message: 'Félicitations pour votre mariage ! Tous mes vœux de bonheur.',
      date: '2023-05-15'
    },
    {
      id: 'cont_2',
      name: 'Pierre Martin',
      email: 'pierre@example.com',
      amount: 10000, // 100€
      message: 'Pour votre voyage de noces, profitez bien !',
      date: '2023-05-10'
    },
    {
      id: 'cont_3',
      name: 'Sophie Bernard',
      email: 'sophie@example.com',
      amount: 3000, // 30€
      message: 'Je vous souhaite beaucoup de bonheur !',
      date: '2023-05-05'
    }
  ]);
  
  const totalContributions = contributions.reduce((sum, contrib) => sum + contrib.amount, 0) / 100;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(giftFundLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
    
    toast({
      title: "Lien copié",
      description: "Le lien de votre cagnotte a été copié dans le presse-papier."
    });
  };
  
  const handleAmountSelection = (selected: number) => {
    setAmount(selected);
    setCustomAmount('');
  };
  
  const handleCustomAmount = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setCustomAmount(numericValue);
    if (numericValue) {
      setAmount(parseInt(numericValue) * 100);
    } else {
      setAmount(0);
    }
  };
  
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    try {
      setIsSubmitting(true);
      
      // Process the gift fund contribution
      const contribution = await PaymentService.processGiftFundContribution(
        amount,
        'Test de contribution',
        'Vous (test)'
      );
      
      // Add the new contribution to the list
      const newContribution: Contribution = {
        id: contribution.id,
        name: 'Vous (test)',
        email: 'vous@example.com',
        amount: amount,
        message: 'Test de contribution',
        date: new Date().toISOString().split('T')[0]
      };
      
      setContributions([newContribution, ...contributions]);
      setShowPaymentForm(false);
      
      toast({
        title: "Contribution ajoutée",
        description: `Votre contribution de ${(amount / 100).toFixed(2)} € a été ajoutée avec succès.`
      });
    } catch (error) {
      console.error('Erreur lors du traitement de la contribution:', error);
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement de votre contribution.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres enregistrés",
      description: "Les paramètres de la cagnotte ont été mis à jour avec succès."
    });
  };

  const handleDeleteContribution = (id: string) => {
    setContributions(contributions.filter(contribution => contribution.id !== id));
    toast({
      title: "Contribution supprimée",
      description: "La contribution a été supprimée avec succès."
    });
  };
  
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <PiggyBank className="mr-2" /> Cagnotte des mariés
        </CardTitle>
        <CardDescription>
          Gérez votre cagnotte en ligne et consultez les contributions de vos invités
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
            <TabsTrigger value="contributions">Contributions ({contributions.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <h3 className="text-2xl font-bold">{totalContributions.toFixed(2)} €</h3>
              <p className="text-gray-500">Total des contributions reçues</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Lien de votre cagnotte</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleCopyLink}>
                    {linkCopied ? <Check size={16} /> : <Copy size={16} />}
                    {linkCopied ? ' Copié' : ' Copier'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 size={16} className="mr-1" /> Partager
                  </Button>
                </div>
              </div>
              <div className="flex items-center rounded-md border px-3 py-2 text-sm">
                <Link size={16} className="mr-2 text-gray-400" />
                <span className="flex-1 truncate">{giftFundLink}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Partagez ce lien avec vos invités pour qu'ils puissent contribuer à votre cagnotte
              </p>
            </div>
            
            <div className="pt-2">
              <Button
                onClick={() => setShowPaymentForm(true)}
                className="w-full"
              >
                <Gift className="mr-2" /> Tester une contribution
              </Button>
            </div>
            
            {showPaymentForm && (
              <div className="mt-4">
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Choisissez un montant</h3>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <Button
                      variant={amount === 2000 ? "default" : "outline"}
                      onClick={() => handleAmountSelection(2000)}
                    >
                      20 €
                    </Button>
                    <Button
                      variant={amount === 5000 ? "default" : "outline"}
                      onClick={() => handleAmountSelection(5000)}
                    >
                      50 €
                    </Button>
                    <Button
                      variant={amount === 10000 ? "default" : "outline"}
                      onClick={() => handleAmountSelection(10000)}
                    >
                      100 €
                    </Button>
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="custom-amount">Montant personnalisé (€)</Label>
                    <Input
                      id="custom-amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmount(e.target.value)}
                      placeholder="Autre montant"
                    />
                  </div>
                </div>
                
                <StripeProvider>
                  <PaymentForm
                    amount={amount}
                    description="Contribution à la cagnotte de mariage"
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setShowPaymentForm(false)}
                    buttonText={isSubmitting ? "Traitement en cours..." : "Contribuer"}
                    isLoading={isSubmitting}
                  />
                </StripeProvider>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="gift-fund-enabled" className="font-medium">Activer la cagnotte</Label>
                  <p className="text-sm text-gray-500">Rendez votre cagnotte visible pour vos invités</p>
                </div>
                <Switch
                  id="gift-fund-enabled"
                  checked={isEnabled}
                  onCheckedChange={setIsEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fund-title">Titre de la cagnotte</Label>
                <Input 
                  id="fund-title" 
                  value={fundTitle}
                  onChange={(e) => setFundTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fund-description">Description</Label>
                <Textarea
                  id="fund-description"
                  value={fundDescription}
                  onChange={(e) => setFundDescription(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Options de paiement</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="option-card"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="option-card" className="text-sm">Carte bancaire</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="option-paypal"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <label htmlFor="option-paypal" className="text-sm">PayPal</label>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" onClick={handleSaveSettings}>Enregistrer les modifications</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="contributions">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contributions.map((contribution) => (
                    <TableRow key={contribution.id}>
                      <TableCell>{contribution.date}</TableCell>
                      <TableCell className="font-medium">{contribution.name}</TableCell>
                      <TableCell>{(contribution.amount / 100).toFixed(2)} €</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {contribution.message}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Modifier</span>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleDeleteContribution(contribution.id)}
                          >
                            <span className="sr-only">Supprimer</span>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {contributions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucune contribution n'a encore été reçue
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GiftFundManager;
