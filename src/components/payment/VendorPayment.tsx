
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CreditCard, ArrowRight } from 'lucide-react';
import PaymentForm from './PaymentForm';
import StripeProvider from './StripeProvider';
import PaymentMethodSelector from './PaymentMethodSelector';

// Mock vendor payment data
const vendorPayments = [
  {
    id: 'v1',
    vendor: 'DJ Mix Master',
    amount: 120000, // in cents (1200€)
    dueDate: '2024-06-15',
    status: 'pending',
    description: 'Acompte prestation DJ'
  },
  {
    id: 'v2',
    vendor: 'Fleurs Élégance',
    amount: 45000, // in cents (450€)
    dueDate: '2024-07-01',
    status: 'pending',
    description: 'Acompte décoration florale'
  },
  {
    id: 'v3',
    vendor: 'Traiteur Délice',
    amount: 250000, // in cents (2500€)
    dueDate: '2024-05-30',
    status: 'paid',
    description: 'Acompte menu et service'
  }
];

const VendorPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [usingExistingCard, setUsingExistingCard] = useState(false);
  
  // Mocked user ID for demonstration
  const userId = "user_123456";
  
  const handlePayClick = (payment) => {
    setSelectedPayment(payment);
    setPaymentOpen(true);
  };
  
  const handlePaymentSuccess = (paymentIntentId) => {
    console.log(`Payment successful with ID: ${paymentIntentId}`);
    setPaymentOpen(false);
    // In a real app, we would update the payment status in the database
  };
  
  const formatAmount = (amount) => {
    return (amount / 100).toFixed(2);
  };
  
  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Payé</Badge>;
    } else if (status === 'pending') {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">À payer</Badge>;
    } else {
      return <Badge variant="outline">Inconnu</Badge>;
    }
  };
  
  const handleSelectSavedMethod = (method) => {
    setUsingExistingCard(true);
    console.log('Selected saved payment method:', method);
    // In a real application, we would use this method for the payment
  };
  
  const handleSelectNewCard = () => {
    setUsingExistingCard(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Paiements prestataires</CardTitle>
          <CardDescription>Gérez les paiements pour vos prestataires de mariage</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prestataire</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead className="hidden md:table-cell">Échéance</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.vendor}</TableCell>
                  <TableCell>{formatAmount(payment.amount)} €</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-right">
                    {payment.status === 'pending' && (
                      <Button onClick={() => handlePayClick(payment)} className="hidden sm:inline-flex">
                        Payer <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {payment.status === 'pending' && (
                      <Button onClick={() => handlePayClick(payment)} size="icon" className="sm:hidden">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                    {payment.status === 'paid' && (
                      <span className="text-sm text-gray-500">Payé</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Paiement - {selectedPayment?.vendor}</DialogTitle>
            <DialogDescription>
              {selectedPayment?.description} - {selectedPayment ? formatAmount(selectedPayment.amount) : ''} €
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <PaymentMethodSelector 
              userId={userId}
              onSelectSaved={handleSelectSavedMethod}
              onSelectNew={handleSelectNewCard}
            />
            
            {!usingExistingCard && selectedPayment && (
              <StripeProvider>
                <PaymentForm 
                  amount={selectedPayment.amount}
                  description={`Paiement pour ${selectedPayment.vendor}: ${selectedPayment.description}`}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => setPaymentOpen(false)}
                  buttonText="Payer maintenant"
                />
              </StripeProvider>
            )}
            
            {usingExistingCard && selectedPayment && (
              <div className="pt-4">
                <Button 
                  className="w-full" 
                  onClick={() => handlePaymentSuccess('pm_simulated_payment')}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payer {formatAmount(selectedPayment.amount)} € avec la carte sélectionnée
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VendorPayment;
