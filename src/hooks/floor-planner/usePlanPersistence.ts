
import { useToast } from '@/hooks/use-toast';
import { fabric } from 'fabric';
import { useState } from 'react';

interface UsePlanPersistenceProps {
  canvas: fabric.Canvas | null;
}

export const usePlanPersistence = ({ canvas }: UsePlanPersistenceProps) => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);

  // Save plan
  const savePlan = (planName: string) => {
    if (!canvas) return null;

    try {
      const jsonData = JSON.stringify(canvas.toJSON(['type', 'capacity']));
      
      // Option to download plan
      const link = document.createElement('a');
      link.download = `${planName.replace(/\s+/g, '_').toLowerCase()}.json`;
      const blob = new Blob([jsonData], { type: 'application/json' });
      link.href = URL.createObjectURL(blob);
      link.click();

      return jsonData;
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le plan",
        variant: "destructive"
      });
      return null;
    }
  };

  // Import plan
  const importPlan = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !event.target.files || event.target.files.length === 0) return;
    
    setIsImporting(true);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const jsonData = e.target?.result as string;
        const parsedData = JSON.parse(jsonData);
        
        // Validation du format - vérifier les attributs clés attendus
        if (!parsedData.objects || !Array.isArray(parsedData.objects)) {
          throw new Error("Format de fichier non valide");
        }
        
        canvas.loadFromJSON(jsonData, canvas.renderAll.bind(canvas));
        toast({
          title: "Plan importé",
          description: "Le plan a été importé avec succès"
        });
      } catch (error) {
        console.error("Erreur lors de l'importation:", error);
        toast({
          title: "Erreur",
          description: "Format de fichier non compatible avec l'éditeur de plan",
          variant: "destructive"
        });
      } finally {
        setIsImporting(false);
        // Réinitialiser le champ de fichier pour permettre la sélection du même fichier
        if (event.target) {
          event.target.value = '';
        }
      }
    };

    reader.readAsText(file);
  };

  // Méthode pour valider si un fichier est au format attendu
  const validateFloorPlanFile = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = function (e) {
        try {
          const jsonData = e.target?.result as string;
          const parsedData = JSON.parse(jsonData);
          
          // Vérifier si le fichier contient les propriétés attendues
          const isValid = parsedData && 
                         parsedData.objects && 
                         Array.isArray(parsedData.objects) &&
                         parsedData.background !== undefined;
          
          resolve(isValid);
        } catch (error) {
          console.error("Erreur validation:", error);
          resolve(false);
        }
      };
      
      reader.onerror = () => resolve(false);
      reader.readAsText(file);
    });
  };

  return {
    savePlan,
    importPlan,
    validateFloorPlanFile,
    isImporting
  };
};
