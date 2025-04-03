
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <MobileOptimizedLayout className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md border-red-200 shadow-lg">
        <CardHeader className="pb-2 flex flex-row items-center gap-2">
          <Shield className="h-8 w-8 text-red-500" />
          <CardTitle className="text-red-700">Accès non autorisé</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <p className="text-gray-700">
              Vous n'avez pas les permissions nécessaires pour accéder à cette section.
            </p>
            <div className="p-4 bg-red-50 rounded-md border border-red-100">
              <p className="text-sm text-red-700">
                Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur
                ou vérifier vos informations de connexion.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={handleGoBack}
          >
            <ArrowLeft size={16} />
            Retour
          </Button>
          <Button 
            className="gap-2 bg-red-600 hover:bg-red-700" 
            asChild
          >
            <Link to="/">
              <Home size={16} />
              Accueil
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </MobileOptimizedLayout>
  );
};

export default Unauthorized;
