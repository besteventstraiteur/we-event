
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, AlertCircle, CheckCircle2, Clock, Search, FileText } from 'lucide-react';
import StripeProvider from './StripeProvider';
import PaymentForm from './PaymentForm';

interface Invoice {
  id: string;
  vendorId: string;
  vendorName: string;
  amount: number;
  description: string;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  invoiceNumber: string;
}

const VendorPayment = () => {
  const { toast } = useToast();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock invoices data
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'inv_1',
      vendorId: 'v1',
      vendorName: 'Fleurs Élégance',
      amount: 75000, // 750€
      description: 'Décoration florale cérémonie et réception',
      status: 'pending',
      dueDate: '2023-07-15',
      invoiceNumber: 'FE-2023-1245'
    },
    {
      id: 'inv_2',
      vendorId: 'v2',
      vendorName: 'DJ Mix Master',
      amount: 120000, // 1200€
      description: 'Animation DJ soirée mariage',
      status: 'paid',
      dueDate: '2023-06-30',
      invoiceNumber: 'DMM-2023-078'
    },
    {
      id: 'inv_3',
      vendorId: 'v3',
      vendorName: 'Traiteur Délices',
      amount: 350000, // 3500€
      description: 'Menu cocktail et dîner pour 80 personnes',
      status: 'overdue',
      dueDate: '2023-06-01',
      invoiceNumber: 'TD-2023-452'
    }
  ]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Payée
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" /> En attente
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" /> En retard
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const handlePayInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };
  
  const handlePaymentSuccess = (paymentIntentId: string) => {
    // Update the invoice status
    const updatedInvoices = invoices.map(inv => 
      inv.id === selectedInvoice?.id ? { ...inv, status: 'paid' as const } : inv
    );
    setInvoices(updatedInvoices);
    setSelectedInvoice(null);
    
    toast({
      title: "Paiement réussi",
      description: `Le paiement de ${selectedInvoice ? (selectedInvoice.amount / 100).toFixed(2) : 0} € à ${selectedInvoice?.vendorName} a été effectué avec succès.`,
    });
  };
  
  const filteredInvoices = invoices.filter(invoice => 
    invoice.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2" /> Paiement des prestataires
        </CardTitle>
        <CardDescription>
          Gérez et effectuez les paiements pour vos prestataires de mariage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Rechercher une facture..."
            className="w-full pl-9 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prestataire</TableHead>
                <TableHead>Référence</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.vendorName}</TableCell>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{(invoice.amount / 100).toFixed(2)} €</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Détails
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Détails de la facture</DialogTitle>
                          <DialogDescription>
                            Facture {invoice.invoiceNumber} de {invoice.vendorName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Prestataire</p>
                              <p>{invoice.vendorName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Référence</p>
                              <p>{invoice.invoiceNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Montant</p>
                              <p className="font-medium">{(invoice.amount / 100).toFixed(2)} €</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Échéance</p>
                              <p>{invoice.dueDate}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Description</p>
                            <p>{invoice.description}</p>
                          </div>
                          <div className="pt-2">
                            {invoice.status !== 'paid' && (
                              <Button className="w-full" onClick={() => handlePayInvoice(invoice)}>
                                Payer cette facture
                              </Button>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {invoice.status !== 'paid' && (
                      <Button size="sm" onClick={() => handlePayInvoice(invoice)}>
                        Payer
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredInvoices.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune facture trouvée
          </div>
        )}
      </CardContent>
      
      {selectedInvoice && (
        <Dialog open={!!selectedInvoice} onOpenChange={(open) => !open && setSelectedInvoice(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Payer la facture</DialogTitle>
              <DialogDescription>
                Paiement de {(selectedInvoice.amount / 100).toFixed(2)} € à {selectedInvoice.vendorName}
              </DialogDescription>
            </DialogHeader>
            <StripeProvider>
              <PaymentForm
                amount={selectedInvoice.amount}
                description={`Facture ${selectedInvoice.invoiceNumber} - ${selectedInvoice.description}`}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setSelectedInvoice(null)}
              />
            </StripeProvider>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default VendorPayment;
