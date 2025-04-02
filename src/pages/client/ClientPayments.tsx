
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/DashboardLayout';
import GiftFundManager from '@/components/payment/GiftFundManager';
import VendorPayment from '@/components/payment/VendorPayment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, PiggyBank, CreditCard, BanknoteIcon, TrendingUp, ArrowDownToLine, ArrowUpToLine } from 'lucide-react';

const ClientPayments = () => {
  // Mock payment data
  const totalSpent = 5820;
  const totalBudget = 15000;
  const giftFundTotal = 850;
  const pendingPayments = 4200;
  
  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Paiements</h1>
          <p className="text-gray-500">Gérez les paiements pour votre événement</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Budget total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalBudget} €</div>
                <Wallet className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">Budget défini pour l'événement</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Dépenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{totalSpent} €</div>
                <BanknoteIcon className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">{Math.round((totalSpent/totalBudget)*100)}% du budget utilisé</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Cagnotte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{giftFundTotal} €</div>
                <PiggyBank className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">Montant reçu via la cagnotte</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Paiements en attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{pendingPayments} €</div>
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">Factures à payer prochainement</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="rounded-md bg-gray-50 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Activité récente</span>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
            <span className="flex items-center"><ArrowUpToLine className="h-4 w-4 mr-1 text-red-500" /> Paiement DJ Mix Master : 1200 €</span>
            <span className="flex items-center"><ArrowDownToLine className="h-4 w-4 mr-1 text-green-500" /> Contribution de Sophie : 30 €</span>
          </div>
        </div>
        
        <Tabs defaultValue="gift-fund">
          <TabsList className="w-full">
            <TabsTrigger value="gift-fund" className="flex-1">Cagnotte</TabsTrigger>
            <TabsTrigger value="vendor-payments" className="flex-1">Paiements prestataires</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gift-fund">
            <GiftFundManager />
          </TabsContent>
          
          <TabsContent value="vendor-payments">
            <VendorPayment />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientPayments;
