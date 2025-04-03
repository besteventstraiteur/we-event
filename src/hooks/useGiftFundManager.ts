
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import PaymentService, { GiftFundContribution } from '@/services/PaymentService';

export interface Contribution {
  id: string;
  name: string;
  email: string;
  amount: number;
  message: string;
  date: string;
}

export function useGiftFundManager() {
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
  
  // Mock data for contributions
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

  return {
    isEnabled,
    setIsEnabled,
    showPaymentForm,
    setShowPaymentForm,
    giftFundLink,
    linkCopied,
    amount,
    customAmount,
    isSubmitting,
    fundTitle,
    setFundTitle,
    fundDescription,
    setFundDescription,
    contributions,
    totalContributions,
    handleCopyLink,
    handleAmountSelection,
    handleCustomAmount,
    handlePaymentSuccess,
    handleSaveSettings,
    handleDeleteContribution
  };
}
