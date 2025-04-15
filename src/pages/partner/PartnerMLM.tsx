
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clipboard, Users, TrendingUp, Award, Badge, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PartnerMLM = () => {
  const [affiliateCode] = useState("PART12345");
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateCode);
    toast({
      title: "Code copié !",
      description: "Votre code d'affiliation a été copié dans le presse-papier.",
    });
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mon Réseau</h1>
          <p className="text-gray-500">
            Gérez votre réseau, suivez vos commissions et progressez dans le programme d'ambassadeurs
          </p>
        </div>

        {/* Affiliate Code Section */}
        <Card>
          <CardHeader>
            <CardTitle>Mon Code d'Affiliation</CardTitle>
            <CardDescription>
              Partagez ce code pour parrainer de nouveaux partenaires et développer votre réseau
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 p-3 rounded-md font-mono text-xl flex-1">
                {affiliateCode}
              </div>
              <Button onClick={copyToClipboard} variant="outline" size="icon">
                <Clipboard className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Status and Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle>Mon Statut</CardTitle>
            <CardDescription>
              Votre avancement et vos avantages actuels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className="h-6 w-6 text-amber-600" />
                  <span className="font-medium">Ambassadeur</span>
                </div>
                <div>
                  <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    Statut actuel
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progression vers Manager</span>
                  <span>300€ / 500€</span>
                </div>
                <Progress value={60} className="h-2" />
                <p className="text-xs text-gray-500">
                  Il vous manque 200€ de CA réseau et 1 ambassadeur pour atteindre le statut Manager
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="border rounded-md p-3 text-center">
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-gray-500">Filleuls directs</div>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <div className="text-2xl font-bold">7</div>
                  <div className="text-sm text-gray-500">Réseau total</div>
                </div>
                <div className="border rounded-md p-3 text-center">
                  <div className="text-2xl font-bold">300€</div>
                  <div className="text-sm text-gray-500">CA généré</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="commissions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
            <TabsTrigger value="network">Mon réseau</TabsTrigger>
            <TabsTrigger value="bonuses">Bonus de statut</TabsTrigger>
            <TabsTrigger value="recommandations">Recommandations</TabsTrigger>
          </TabsList>

          <TabsContent value="commissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mes Commissions</CardTitle>
                <CardDescription>
                  Résumé des commissions générées à ce jour
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Commission du mois</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                        <p className="text-2xl font-bold">49.90€</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Commission totale</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                        <p className="text-2xl font-bold">249.50€</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Prochain paiement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-purple-500 mr-2" />
                        <p className="text-lg font-bold">01/05/2025</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Détail des commissions</h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">Niveau 1 (Filleuls directs)</p>
                          <p className="text-sm text-gray-500">10% de commission</p>
                        </div>
                        <p className="font-bold">29.94€</p>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">Niveau 2 (Filleuls des filleuls)</p>
                          <p className="text-sm text-gray-500">5% de commission</p>
                        </div>
                        <p className="font-bold">14.97€</p>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">Niveau 3 (Filleuls de 3e génération)</p>
                          <p className="text-sm text-gray-500">2.5% de commission</p>
                        </div>
                        <p className="font-bold">4.99€</p>
                      </div>
                      
                      <div className="flex justify-between items-center font-semibold text-lg">
                        <p>Total</p>
                        <p>49.90€</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Structure de Mon Réseau</CardTitle>
                <CardDescription>
                  Visualisez tous les membres de votre réseau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Sophie Martin</p>
                          <p className="text-sm text-gray-500">Niveau 1 • Ambassadeur • Actif</p>
                        </div>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          49.99€ mensuel
                        </span>
                      </div>
                    </div>
                    
                    {/* Enfants (niveau 2) */}
                    <div className="pl-10 mt-4 space-y-3">
                      <div className="p-3 border-l-2 border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                              <Users className="h-4 w-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium">Thomas Dubois</p>
                              <p className="text-sm text-gray-500">Niveau 2 • Ambassadeur • Actif</p>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              49.99€ mensuel
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Jean Dupont</p>
                          <p className="text-sm text-gray-500">Niveau 1 • Ambassadeur • Actif</p>
                        </div>
                      </div>
                      <div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          49.99€ mensuel
                        </span>
                      </div>
                    </div>
                    
                    {/* Enfants (niveau 2) */}
                    <div className="pl-10 mt-4 space-y-3">
                      <div className="p-3 border-l-2 border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                              <Users className="h-4 w-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium">Marie Laurent</p>
                              <p className="text-sm text-gray-500">Niveau 2 • Ambassadeur • Actif</p>
                            </div>
                          </div>
                          <div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              49.99€ mensuel
                            </span>
                          </div>
                        </div>
                        
                        {/* Enfants (niveau 3) */}
                        <div className="pl-8 mt-3 space-y-3">
                          <div className="p-3 border-l-2 border-gray-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                                  <Users className="h-3 w-3 text-gray-500" />
                                </div>
                                <div>
                                  <p className="font-medium">Lucie Moreau</p>
                                  <p className="text-sm text-gray-500">Niveau 3 • Ambassadeur • Actif</p>
                                </div>
                              </div>
                              <div>
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  49.99€ mensuel
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bonuses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bonus de Statut</CardTitle>
                <CardDescription>
                  Votre progression vers les différents bonus du programme de parrainage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-md bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <Award className="h-10 w-10 text-amber-500" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">Manager</h3>
                        <p className="text-sm text-gray-500">
                          Bonus fixe de 50€ dès que votre réseau génère 500€ de CA, avec au moins 5 filleuls directs et 1 ambassadeur.
                        </p>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span>300€ / 500€</span>
                          </div>
                          <Progress value={60} className="h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <Award className="h-10 w-10 text-gray-400" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">Leader</h3>
                        <p className="text-sm text-gray-500">
                          Bonus fixe de 150€ dès que votre réseau génère 2000€ de CA, avec au moins 15 filleuls directs et 2 managers.
                        </p>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span>300€ / 2000€</span>
                          </div>
                          <Progress value={15} className="h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <Award className="h-10 w-10 text-gray-400" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">Elite</h3>
                        <p className="text-sm text-gray-500">
                          Bonus de +5% sur tout le CA de votre réseau dès que vous avez 30 filleuls et 2 leaders.
                        </p>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span>3 / 30 filleuls</span>
                          </div>
                          <Progress value={10} className="h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommandations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mes Recommandations Validées</CardTitle>
                <CardDescription>
                  Suivez vos recommandations validées et débloquez des bonus de commission supplémentaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="border rounded-md p-4 text-center flex-1">
                      <div className="text-3xl font-bold text-green-600">3</div>
                      <div className="text-sm text-gray-500 mt-1">Recommandations validées</div>
                    </div>
                    
                    <div className="border rounded-md p-4 text-center flex-1">
                      <div className="text-3xl font-bold">+0%</div>
                      <div className="text-sm text-gray-500 mt-1">Bonus actuel</div>
                    </div>
                    
                    <div className="border rounded-md p-4 text-center flex-1">
                      <div className="text-3xl font-bold text-amber-600">+1%</div>
                      <div className="text-sm text-gray-500 mt-1">Prochain bonus à 5 recomm.</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression vers le prochain bonus</span>
                      <span>3 / 5 recommandations</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="bg-gray-50 rounded-md p-4">
                    <h3 className="font-medium mb-3">Paliers de bonus</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>5 recommandations validées</span>
                        <span className="font-medium">+1% de commissions</span>
                      </div>
                      <div className="flex justify-between">
                        <span>10 recommandations validées</span>
                        <span className="font-medium">+2% de commissions</span>
                      </div>
                      <div className="flex justify-between">
                        <span>15 recommandations validées</span>
                        <span className="font-medium">+3% de commissions</span>
                      </div>
                      <div className="flex justify-between">
                        <span>20+ recommandations validées</span>
                        <span className="font-medium">+5% de commissions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerMLM;
