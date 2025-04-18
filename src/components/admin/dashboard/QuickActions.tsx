
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import GoldButton from "@/components/GoldButton";
import { BarChart } from "lucide-react";

const QuickActions = () => {
  return (
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
          <Link to="/admin/podcasts">
            <GoldButton className="w-full">
              Gérer les podcasts
            </GoldButton>
          </Link>
          <Link to="/admin/partners">
            <GoldButton className="w-full">
              Gérer les partenaires
            </GoldButton>
          </Link>
          <Link to="/admin/partner-types">
            <GoldButton className="w-full">
              Gestion des catégories
            </GoldButton>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
