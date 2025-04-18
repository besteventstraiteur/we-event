
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDown } from "lucide-react";
import ExportBackupButton from "@/components/admin/ExportBackupButton";

const BackupSection = () => {
  return (
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
  );
};

export default BackupSection;
