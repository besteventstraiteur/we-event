
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const AdminMLM = () => {
  const [timeFilter, setTimeFilter] = useState("month");

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion du Réseau MLM</h1>
          <p className="text-vip-gray-400">
            Suivez les performances du système de parrainage, les commissions et les statuts des partenaires
          </p>
        </div>

        {/* KPI summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-vip-white">Total Partenaires</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">237</p>
              <p className="text-xs text-green-400 flex items-center">
                <span className="mr-1">↑</span>12% ce mois
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-vip-white">CA Généré</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">11 849€</p>
              <p className="text-xs text-green-400 flex items-center">
                <span className="mr-1">↑</span>8.5% ce mois
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-vip-white">Commissions Versées</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">2 370€</p>
              <p className="text-xs text-green-400 flex items-center">
                <span className="mr-1">↑</span>7.2% ce mois
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-vip-white">Taux de Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">23.4%</p>
              <p className="text-xs text-amber-400 flex items-center">
                <span className="mr-1">→</span>+0.2% ce mois
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px] bg-vip-gray-900 border-vip-gray-800 text-vip-white">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white">
                <SelectItem value="day">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-vip-gold hover:bg-amber-600">
            <Download className="mr-2 h-4 w-4" /> Exporter les données
          </Button>
        </div>
        
        <Tabs defaultValue="network" className="w-full">
          <TabsList className="bg-vip-gray-900 border border-vip-gray-800 mb-4">
            <TabsTrigger 
              value="network" 
              className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
            >
              Structure du réseau
            </TabsTrigger>
            <TabsTrigger 
              value="commissions" 
              className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
            >
              Commissions
            </TabsTrigger>
            <TabsTrigger 
              value="statuses" 
              className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
            >
              Statuts et badges
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
            >
              Configuration
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="network" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-vip-white">Structure du réseau</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-vip-gray-400" />
                  <Input
                    placeholder="Rechercher un partenaire..."
                    className="pl-8 bg-vip-gray-800 border-vip-gray-700 text-vip-white"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-vip-gray-800">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-vip-gray-800 hover:bg-vip-gray-800">
                        <TableHead className="text-vip-white">Partenaire</TableHead>
                        <TableHead className="text-vip-white">Statut</TableHead>
                        <TableHead className="text-vip-white">Filleuls</TableHead>
                        <TableHead className="text-vip-white">Réseau total</TableHead>
                        <TableHead className="text-vip-white">CA Généré</TableHead>
                        <TableHead className="text-vip-white">Date d'inscription</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="bg-vip-gray-900 hover:bg-vip-gray-800">
                        <TableCell className="font-medium text-vip-white">Maxime Dubois</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs rounded-full bg-amber-600/20 text-amber-400">
                            Leader
                          </span>
                        </TableCell>
                        <TableCell className="text-vip-white">23</TableCell>
                        <TableCell className="text-vip-white">76</TableCell>
                        <TableCell className="text-vip-white">3 750€</TableCell>
                        <TableCell className="text-vip-gray-400">12 Nov 2024</TableCell>
                      </TableRow>
                      
                      <TableRow className="bg-vip-gray-900 hover:bg-vip-gray-800">
                        <TableCell className="font-medium text-vip-white">Sophie Martin</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs rounded-full bg-emerald-600/20 text-emerald-400">
                            Manager
                          </span>
                        </TableCell>
                        <TableCell className="text-vip-white">12</TableCell>
                        <TableCell className="text-vip-white">31</TableCell>
                        <TableCell className="text-vip-white">1 549€</TableCell>
                        <TableCell className="text-vip-gray-400">03 Jan 2025</TableCell>
                      </TableRow>
                      
                      <TableRow className="bg-vip-gray-900 hover:bg-vip-gray-800">
                        <TableCell className="font-medium text-vip-white">Jean Dupont</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-600/20 text-blue-400">
                            Ambassadeur
                          </span>
                        </TableCell>
                        <TableCell className="text-vip-white">3</TableCell>
                        <TableCell className="text-vip-white">7</TableCell>
                        <TableCell className="text-vip-white">350€</TableCell>
                        <TableCell className="text-vip-gray-400">15 Feb 2025</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="commissions" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-vip-white">Historique des commissions</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-vip-gray-400" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-8 bg-vip-gray-800 border-vip-gray-700 text-vip-white"
                    />
                  </div>
                  <Button variant="outline" className="border-vip-gray-700 text-vip-white">
                    <Filter className="mr-2 h-4 w-4" /> Filtrer
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-vip-gray-800">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-vip-gray-800 hover:bg-vip-gray-800">
                        <TableHead className="text-vip-white">Période</TableHead>
                        <TableHead className="text-vip-white">Partenaire</TableHead>
                        <TableHead className="text-vip-white">Montant</TableHead>
                        <TableHead className="text-vip-white">Niveau 1</TableHead>
                        <TableHead className="text-vip-white">Niveau 2</TableHead>
                        <TableHead className="text-vip-white">Niveau 3</TableHead>
                        <TableHead className="text-vip-white">Bonus</TableHead>
                        <TableHead className="text-vip-white">Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="bg-vip-gray-900 hover:bg-vip-gray-800">
                        <TableCell className="text-vip-white">Mars 2025</TableCell>
                        <TableCell className="font-medium text-vip-white">Maxime Dubois</TableCell>
                        <TableCell className="text-vip-white">387.90€</TableCell>
                        <TableCell className="text-vip-white">199.96€</TableCell>
                        <TableCell className="text-vip-white">87.94€</TableCell>
                        <TableCell className="text-vip-white">30.00€</TableCell>
                        <TableCell className="text-vip-white">70.00€</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-400">
                            Payé
                          </span>
                        </TableCell>
                      </TableRow>
                      
                      <TableRow className="bg-vip-gray-900 hover:bg-vip-gray-800">
                        <TableCell className="text-vip-white">Mars 2025</TableCell>
                        <TableCell className="font-medium text-vip-white">Sophie Martin</TableCell>
                        <TableCell className="text-vip-white">149.90€</TableCell>
                        <TableCell className="text-vip-white">99.98€</TableCell>
                        <TableCell className="text-vip-white">49.92€</TableCell>
                        <TableCell className="text-vip-white">0.00€</TableCell>
                        <TableCell className="text-vip-white">0.00€</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-400">
                            Payé
                          </span>
                        </TableCell>
                      </TableRow>
                      
                      <TableRow className="bg-vip-gray-900 hover:bg-vip-gray-800">
                        <TableCell className="text-vip-white">Mars 2025</TableCell>
                        <TableCell className="font-medium text-vip-white">Jean Dupont</TableCell>
                        <TableCell className="text-vip-white">49.90€</TableCell>
                        <TableCell className="text-vip-white">29.94€</TableCell>
                        <TableCell className="text-vip-white">19.96€</TableCell>
                        <TableCell className="text-vip-white">0.00€</TableCell>
                        <TableCell className="text-vip-white">0.00€</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-400">
                            Payé
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="statuses" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle className="text-vip-white">Statuts et Badges</CardTitle>
                <CardDescription className="text-vip-gray-400">
                  Gestion des statuts, badges et niveaux du programme MLM
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-vip-gray-700 rounded-md bg-vip-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                          <span className="text-blue-400 text-lg font-bold">A</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-vip-white">Ambassadeur</h3>
                          <p className="text-sm text-vip-gray-400">Statut de base</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-vip-gray-700 text-vip-white">
                        Modifier
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-vip-gray-700 rounded-md bg-vip-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                          <span className="text-green-400 text-lg font-bold">M</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-vip-white">Manager</h3>
                          <p className="text-sm text-vip-gray-400">500€ CA réseau + 5 filleuls + 1 ambassadeur</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-vip-gray-700 text-vip-white">
                        Modifier
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-vip-gray-700 rounded-md bg-vip-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center">
                          <span className="text-amber-400 text-lg font-bold">L</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-vip-white">Leader</h3>
                          <p className="text-sm text-vip-gray-400">2000€ CA réseau + 15 filleuls + 2 managers</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-vip-gray-700 text-vip-white">
                        Modifier
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-vip-gray-700 rounded-md bg-vip-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                          <span className="text-purple-400 text-lg font-bold">E</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-vip-white">Elite</h3>
                          <p className="text-sm text-vip-gray-400">30 filleuls + 2 leaders</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-vip-gray-700 text-vip-white">
                        Modifier
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle className="text-vip-white">Configuration MLM</CardTitle>
                <CardDescription className="text-vip-gray-400">
                  Paramètres du système de commissions et bonus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-vip-white">Commission Niveau 1</label>
                    <div className="flex items-center">
                      <Input 
                        type="number" 
                        value="10" 
                        className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                      />
                      <span className="ml-2 text-vip-white">%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-vip-white">Commission Niveau 2</label>
                    <div className="flex items-center">
                      <Input 
                        type="number" 
                        value="5" 
                        className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                      />
                      <span className="ml-2 text-vip-white">%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-vip-white">Commission Niveau 3</label>
                    <div className="flex items-center">
                      <Input 
                        type="number" 
                        value="2.5" 
                        className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                      />
                      <span className="ml-2 text-vip-white">%</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-vip-gray-700">
                  <h3 className="text-lg font-medium text-vip-white mb-4">Bonus de statuts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-vip-white">Bonus Manager</label>
                      <div className="flex items-center">
                        <Input 
                          type="number" 
                          value="50" 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                        />
                        <span className="ml-2 text-vip-white">€</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-vip-white">Bonus Leader</label>
                      <div className="flex items-center">
                        <Input 
                          type="number" 
                          value="150" 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                        />
                        <span className="ml-2 text-vip-white">€</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-vip-white">Bonus Elite</label>
                      <div className="flex items-center">
                        <Input 
                          type="number" 
                          value="5" 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                        />
                        <span className="ml-2 text-vip-white">% du CA réseau</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-vip-gray-700">
                  <h3 className="text-lg font-medium text-vip-white mb-4">Bonus de recommandations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-vip-white">5 recommandations</label>
                      <div className="flex items-center">
                        <Input 
                          type="number" 
                          value="1" 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                        />
                        <span className="ml-2 text-vip-white">% supplémentaire</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-vip-white">10 recommandations</label>
                      <div className="flex items-center">
                        <Input 
                          type="number" 
                          value="2" 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                        />
                        <span className="ml-2 text-vip-white">% supplémentaire</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-vip-white">15 recommandations</label>
                      <div className="flex items-center">
                        <Input 
                          type="number" 
                          value="3" 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                        />
                        <span className="ml-2 text-vip-white">% supplémentaire</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-vip-white">20+ recommandations</label>
                      <div className="flex items-center">
                        <Input 
                          type="number" 
                          value="5" 
                          className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                        />
                        <span className="ml-2 text-vip-white">% supplémentaire</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button className="bg-vip-gold hover:bg-amber-600 text-white">
                    Enregistrer les modifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminMLM;
