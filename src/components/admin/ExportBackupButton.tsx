
import React, { useState } from 'react';
import { Download, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ExportData {
  partners: any[];
  clients: any[];
  venues: any[];
  recommendations: any[];
  podcasts: any[];
  talkshows: any[];
  settings: Record<string, any>;
}

const mockExportData: ExportData = {
  partners: Array.from({ length: 23 }, (_, i) => ({
    id: `partner-${i + 1}`,
    name: `Partenaire ${i + 1}`,
    email: `partner${i + 1}@example.com`,
    category: ['Photographe', 'DJ', 'Traiteur', 'Décorateur', 'Domaine'][i % 5],
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  })),
  clients: Array.from({ length: 156 }, (_, i) => ({
    id: `client-${i + 1}`,
    name: `Client ${i + 1}`,
    email: `client${i + 1}@example.com`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  })),
  venues: Array.from({ length: 15 }, (_, i) => ({
    id: `venue-${i + 1}`,
    name: `Salle de réception ${i + 1}`,
    location: `Paris ${i + 1}`,
    capacity: 100 + i * 20,
  })),
  recommendations: Array.from({ length: 30 }, (_, i) => ({
    id: `reco-${i + 1}`,
    title: `Recommandation ${i + 1}`,
    partnerId: `partner-${(i % 23) + 1}`,
    clientId: `client-${(i % 156) + 1}`,
    status: ['pending', 'accepted', 'declined'][i % 3],
  })),
  podcasts: Array.from({ length: 10 }, (_, i) => ({
    id: `podcast-${i + 1}`,
    title: `Podcast ${i + 1}`,
    description: `Description du podcast ${i + 1}`,
    audioUrl: `https://example.com/podcast-${i + 1}.mp3`,
  })),
  talkshows: Array.from({ length: 8 }, (_, i) => ({
    id: `talkshow-${i + 1}`,
    title: `Talkshow ${i + 1}`,
    description: `Description du talkshow ${i + 1}`,
    videoUrl: `https://example.com/talkshow-${i + 1}.mp4`,
  })),
  settings: {
    appName: 'Best Events VIP',
    appVersion: '1.0.0',
    theme: 'dark',
    exportedAt: new Date().toISOString(),
  }
};

const ExportBackupButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    setIsComplete(false);
    
    try {
      // Simuler un délai de chargement pour une opération d'export
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Dans un environnement réel, ici nous récupérerions les données depuis l'API
      const exportData = mockExportData;
      
      // Créer un objet Blob avec les données exportées au format JSON
      const dataString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataString], { type: 'application/json' });
      
      // Créer une URL pour le blob
      const url = URL.createObjectURL(blob);
      
      // Créer un élément <a> pour déclencher le téléchargement
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `best-events-vip-export-${new Date().toISOString().split('T')[0]}.json`;
      
      // Ajouter le lien au document et cliquer dessus
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Nettoyer
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
      
      setIsComplete(true);
      
      toast({
        title: "Export réussi",
        description: "Sauvegarde complète téléchargée avec succès",
      });
      
    } catch (error) {
      console.error("Erreur lors de l'export des données:", error);
      toast({
        variant: "destructive",
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export des données",
      });
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setTimeout(() => setIsComplete(false), 2000);
      }, 500);
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant="default"
      className="bg-vip-gray-800 hover:bg-vip-gray-700 text-vip-white w-full"
      disabled={isExporting}
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : isComplete ? (
        <Check className="w-4 h-4 mr-2" />
      ) : (
        <Download className="w-4 h-4 mr-2" />
      )}
      {isExporting ? "Exportation en cours..." : isComplete ? "Export terminé" : "Exporter une sauvegarde complète"}
    </Button>
  );
};

export default ExportBackupButton;
