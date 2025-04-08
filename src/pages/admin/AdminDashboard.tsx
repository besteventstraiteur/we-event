
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, CreditCard, BarChart, Download, FileDown } from "lucide-react";
import { Link } from "react-router-dom";
import GoldButton from "@/components/GoldButton";
import ExportBackupButton from "@/components/admin/ExportBackupButton";

const AdminDashboard = () => {
  return (
    <DashboardLayout type="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Administration We Event</h1>
          <p className="text-vip-gray-400">Gérez les partenaires, clients et contenus de la plateforme</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <Users size={18} /> Partenaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">23</p>
              <p className="text-sm text-vip-gray-400">Partenaires actifs</p>
              <p className="text-xs text-vip-gold mt-2">+3 en attente de validation</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <User size={18} /> Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">156</p>
              <p className="text-sm text-vip-gray-400">Clients VIP inscrits</p>
              <p className="text-xs text-vip-gold mt-2">+12 ce mois-ci</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <CreditCard size={18} /> Revenus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">6 870 €</p>
              <p className="text-sm text-vip-gray-400">Revenus partenaires</p>
              <p className="text-xs text-vip-gold mt-2">+1 075 € ce mois-ci</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <BarChart size={18} /> Interactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">248</p>
              <p className="text-sm text-vip-gray-400">Demandes ce mois</p>
              <p className="text-xs text-vip-gold mt-2">+18% vs mois précédent</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle>Partenaires en attente</CardTitle>
              <CardDescription>Nouvelles inscriptions à valider</CardDescription>
            </CardHeader>
            <CardContent>
              {[
                { name: "Studio Photo Elite", category: "Photographe", date: "21/06/2023" },
                { name: "Domaine du Château", category: "Domaine", date: "20/06/2023" },
                { name: "DJ Mix Master", category: "DJ", date: "19/06/2023" },
              ].map((partner, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-md hover:bg-vip-gray-800 transition-colors border-b border-vip-gray-800 last:border-b-0">
                  <div className="w-10 h-10 bg-vip-gray-800 rounded-full flex items-center justify-center text-vip-white border border-vip-gray-700">
                    {partner.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-vip-white">{partner.name}</h4>
                    <p className="text-sm text-vip-gray-400">{partner.category} • Inscrit le {partner.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <GoldButton size="sm">
                      Valider
                    </GoldButton>
                    <GoldButton variant="outline" size="sm">
                      Refuser
                    </GoldButton>
                  </div>
                </div>
              ))}
              {[1, 2, 3].length === 0 && (
                <p className="text-center text-vip-gray-400 py-6">Aucun partenaire en attente</p>
              )}
            </CardContent>
          </Card>

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

        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Gérez rapidement la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/admin/statistics">
                  <GoldButton className="w-full">
                    <BarChart className="h-4 w-4 mr-2" /> Voir statistiques
                  </GoldButton>
                </Link>
                <GoldButton className="w-full">
                  Ajouter un podcast
                </GoldButton>
                <GoldButton className="w-full">
                  Envoyer newsletter
                </GoldButton>
                <GoldButton className="w-full">
                  Gestion des catégories
                </GoldButton>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Nouvelle carte pour la sauvegarde complète */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-vip-gray-900 border-vip-gray-800 border-2 border-vip-gold/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileDown className="h-5 w-5 text-vip-gold" />
                Sauvegarde complète
              </CardTitle>
              <CardDescription>
                Exportez une sauvegarde complète de l'application et de son contenu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-vip-gray-400">
                  Cette fonctionnalité vous permet d'exporter toutes les données de l'application dans un fichier JSON qui pourra être utilisé pour restaurer l'application en cas de besoin.
                </p>
                <div className="bg-vip-gray-800 p-3 rounded-md text-sm">
                  <p className="font-medium text-vip-white mb-1">La sauvegarde inclut :</p>
                  <ul className="list-disc list-inside text-vip-gray-400 space-y-1">
                    <li>Tous les partenaires et leurs informations</li>
                    <li>Tous les clients et leurs profils</li>
                    <li>Toutes les salles de réception</li>
                    <li>Toutes les recommandations</li>
                    <li>Tous les podcasts et talkshows</li>
                    <li>Les paramètres de l'application</li>
                  </ul>
                </div>
                <ExportBackupButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
