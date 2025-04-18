
import { supabase } from "@/lib/supabase";

// Type definitions for edge function requests
export interface EmailRequest {
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
}

// Helper function to send emails via Edge Function
export const sendEmail = async (emailData: EmailRequest) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: emailData,
    });
    
    if (error) {
      console.error('Error calling send-email function:', error);
      throw new Error(error.message || 'Failed to send email');
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Exception in sendEmail:', error);
    throw error;
  }
};

// Sample usage example
/*
import { sendEmail } from '@/utils/edgeFunctions';

// In your component:
const handleSendEmail = async () => {
  try {
    await sendEmail({
      to: 'client@example.com',
      subject: 'Your Wedding Planning Update',
      body: '<h1>Updates for your event</h1><p>New details are available...</p>',
      replyTo: 'support@weevent.app'
    });
    
    // Show success message
  } catch (error) {
    // Handle error
  }
};
*/
Je vais vous faire un récapitulatif de notre avancement sur la liste des actions et commencer la prochaine étape.

### Avancement des actions

#### Réalisé :
- **F. Sécurité & DevOps**
  - Amélioration de la gestion des erreurs réseau (ajout de codes d'erreur, contexte des erreurs)

#### En cours :
- Nous sommes principalement dans les ajustements préliminaires avec la gestion des erreurs réseau.

#### Prochain point à traiter :
- **A. Architecture générale** - Modulariser le code par domaine fonctionnel

Allons implémenter cette prochaine action :

<lov-code>
Pour modulariser le code par domaine fonctionnel, je vais transformer les imports statiques en React.lazy dans src/routes. L'objectif est de réduire le bundle initial et améliorer le temps de premier rendu.

Commençons par modifier les routes pour utiliser le chargement différé :

<lov-write file_path="src/routes/AdminRoutes.tsx">
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoute from "@/components/security/AdminRoute";
import LoadingFallback from "@/components/LoadingFallback";

// Chargement paresseux des composants administrateur
const AdminDashboard = React.lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminClients = React.lazy(() => import("@/pages/admin/AdminClients"));
const AdminPartners = React.lazy(() => import("@/pages/admin/AdminPartners"));
const AdminPartnerTypes = React.lazy(() => import("@/pages/admin/AdminPartnerTypes"));
const AdminGuests = React.lazy(() => import("@/pages/admin/AdminGuests"));
const AdminVenues = React.lazy(() => import("@/pages/admin/AdminVenues"));
const AdminPresentationManagement = React.lazy(() => import("@/pages/admin/AdminPresentationManagement"));
const AdminMLM = React.lazy(() => import("@/pages/admin/AdminMLM"));
const AdminStatistics = React.lazy(() => import("@/pages/admin/AdminStatistics"));
const AdminKpiDashboard = React.lazy(() => import("@/pages/admin/AdminKpiDashboard"));
const AdminRecommendations = React.lazy(() => import("@/pages/admin/AdminRecommendations"));
const AdminRatings = React.lazy(() => import("@/pages/admin/AdminRatings"));
const AdminTalkshows = React.lazy(() => import("@/pages/admin/AdminTalkshows"));
const AdminPodcasts = React.lazy(() => import("@/pages/admin/AdminPodcasts"));
const AdminWeddingPackages = React.lazy(() => import("@/pages/admin/AdminWeddingPackages"));
const AdminSubscriptions = React.lazy(() => import("@/pages/admin/AdminSubscriptions"));
const AdminBackup = React.lazy(() => import("@/pages/admin/AdminBackup"));
const AdminPartnerGamification = React.lazy(() => import("@/pages/admin/AdminPartnerGamification"));

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route path="dashboard" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminDashboard />
          </Suspense>
        } />
        <Route path="clients" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminClients />
          </Suspense>
        } />
        <Route path="partners" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminPartners />
          </Suspense>
        } />
        <Route path="partner-types" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminPartnerTypes />
          </Suspense>
        } />
        <Route path="guests" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminGuests />
          </Suspense>
        } />
        <Route path="venues" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminVenues />
          </Suspense>
        } />
        <Route path="presentations" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminPresentationManagement />
          </Suspense>
        } />
        <Route path="mlm" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminMLM />
          </Suspense>
        } />
        <Route path="statistics" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminStatistics />
          </Suspense>
        } />
        <Route path="kpi-dashboard" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminKpiDashboard />
          </Suspense>
        } />
        <Route path="recommendations" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminRecommendations />
          </Suspense>
        } />
        <Route path="ratings" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminRatings />
          </Suspense>
        } />
        <Route path="talkshows" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminTalkshows />
          </Suspense>
        } />
        <Route path="podcasts" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminPodcasts />
          </Suspense>
        } />
        <Route path="wedding-packages" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminWeddingPackages />
          </Suspense>
        } />
        <Route path="subscriptions" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminSubscriptions />
          </Suspense>
        } />
        <Route path="backup" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminBackup />
          </Suspense>
        } />
        <Route path="partner-gamification" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminPartnerGamification />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
