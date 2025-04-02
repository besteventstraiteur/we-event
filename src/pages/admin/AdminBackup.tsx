
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Clock, Database, Server, Shield } from "lucide-react";
import ExportBackupButton from "@/components/admin/ExportBackupButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminBackup = () => {
  return (
    <DashboardLayout type="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Sauvegarde du système</h1>
          <p className="text-vip-gray-400">Exportez et gérez les sauvegardes de votre application</p>
        </div>

        <Tabs defaultValue="export" className="w-full">
          <TabsList className="mb-6 bg-vip-gray-800">
            <TabsTrigger value="export">Exporter</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="space-y-6">
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
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-vip-gray-800 border-vip-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-vip-gold flex items-center gap-2 text-sm">
                          <Database size={16} /> Données
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold text-vip-white">248</p>
                        <p className="text-xs text-vip-gray-400">Entrées à sauvegarder</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-vip-gray-800 border-vip-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-vip-gold flex items-center gap-2 text-sm">
                          <Clock size={16} /> Dernière sauvegarde
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold text-vip-white">12 juin 2023</p>
                        <p className="text-xs text-vip-gray-400">Il y a 3 jours</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-vip-gray-800 border-vip-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-vip-gold flex items-center gap-2 text-sm">
                          <Shield size={16} /> Format
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xl font-bold text-vip-white">JSON</p>
                        <p className="text-xs text-vip-gray-400">Chiffré & compressé</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="bg-vip-gray-800 p-4 rounded-md">
                    <h3 className="font-medium text-vip-white mb-2">Contenu de la sauvegarde</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                      <li className="flex items-center gap-2 text-vip-gray-400">
                        <div className="w-2 h-2 rounded-full bg-vip-gold"></div>
                        <span>23 partenaires</span>
                      </li>
                      <li className="flex items-center gap-2 text-vip-gray-400">
                        <div className="w-2 h-2 rounded-full bg-vip-gold"></div>
                        <span>156 clients</span>
                      </li>
                      <li className="flex items-center gap-2 text-vip-gray-400">
                        <div className="w-2 h-2 rounded-full bg-vip-gold"></div>
                        <span>15 salles de réception</span>
                      </li>
                      <li className="flex items-center gap-2 text-vip-gray-400">
                        <div className="w-2 h-2 rounded-full bg-vip-gold"></div>
                        <span>30 recommandations</span>
                      </li>
                      <li className="flex items-center gap-2 text-vip-gray-400">
                        <div className="w-2 h-2 rounded-full bg-vip-gold"></div>
                        <span>10 podcasts</span>
                      </li>
                      <li className="flex items-center gap-2 text-vip-gray-400">
                        <div className="w-2 h-2 rounded-full bg-vip-gold"></div>
                        <span>8 talkshows</span>
                      </li>
                      <li className="flex items-center gap-2 text-vip-gray-400">
                        <div className="w-2 h-2 rounded-full bg-vip-gold"></div>
                        <span>Paramètres système</span>
                      </li>
                      <li className="flex items-center gap-2 text-vip-gray-400">
                        <div className="w-2 h-2 rounded-full bg-vip-gold"></div>
                        <span>Métadonnées complètes</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-vip-gray-400">
                      Cette fonctionnalité vous permet d'exporter toutes les données de l'application dans un fichier JSON qui pourra être utilisé pour restaurer l'application en cas de besoin.
                    </p>
                    <ExportBackupButton />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle>Historique des sauvegardes</CardTitle>
                <CardDescription>Les 5 dernières sauvegardes effectuées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "12 juin 2023", time: "14:30", size: "1.2 Mo", user: "Admin" },
                    { date: "5 juin 2023", time: "10:15", size: "1.1 Mo", user: "Admin" },
                    { date: "29 mai 2023", time: "16:45", size: "1.0 Mo", user: "Admin" },
                  ].map((backup, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-md bg-vip-gray-800 hover:bg-vip-gray-700 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-vip-gray-700 flex items-center justify-center">
                          <FileDown size={18} className="text-vip-gold" />
                        </div>
                        <div>
                          <p className="font-medium text-vip-white">{backup.date}</p>
                          <p className="text-sm text-vip-gray-400">{backup.time} • {backup.size}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-vip-gold hover:text-vip-gold/80 text-sm font-medium">
                          Télécharger
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {[1, 2, 3].length === 0 && (
                    <p className="text-center text-vip-gray-400 py-6">Aucun historique de sauvegarde</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle>Paramètres de sauvegarde</CardTitle>
                <CardDescription>Configurez les options de sauvegarde</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-center text-vip-gray-400 py-6">
                    Les paramètres de sauvegarde seront disponibles prochainement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminBackup;
