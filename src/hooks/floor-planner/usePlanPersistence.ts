
import { useToast } from '@/hooks/use-toast';
import { fabric } from 'fabric';

interface UsePlanPersistenceProps {
  canvas: fabric.Canvas | null;
}

export const usePlanPersistence = ({ canvas }: UsePlanPersistenceProps) => {
  const { toast } = useToast();

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

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const jsonData = e.target?.result as string;
        canvas.loadFromJSON(jsonData, canvas.renderAll.bind(canvas));
        toast({
          title: "Plan importé",
          description: "Le plan a été importé avec succès"
        });
      } catch (error) {
        console.error("Erreur lors de l'importation:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'importer le plan",
          variant: "destructive"
        });
      }
    };

    reader.readAsText(file);
  };

  return {
    savePlan,
    importPlan
  };
};
