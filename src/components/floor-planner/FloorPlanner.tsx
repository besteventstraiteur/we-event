
import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import GoldButton from '@/components/GoldButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Download, Upload, Trash2, ZoomIn, ZoomOut, Table, Circle, ChevronDown } from 'lucide-react';

interface FloorPlannerProps {
  onSave?: (data: string) => void;
  initialData?: string;
  readOnly?: boolean;
}

const FloorPlanner: React.FC<FloorPlannerProps> = ({ onSave, initialData, readOnly = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [planName, setPlanName] = useState<string>('Nouveau plan');
  const [planMode, setPlanMode] = useState<'2d' | '2d'>('2d');
  const { toast } = useToast();

  // Initialisation du canvas
  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#f5f5f5',
        selection: !readOnly,
        preserveObjectStacking: true,
      });
      
      setCanvas(fabricCanvas);
      
      // Charger les données initiales si elles existent
      if (initialData) {
        try {
          fabricCanvas.loadFromJSON(initialData, fabricCanvas.renderAll.bind(fabricCanvas));
        } catch (error) {
          console.error("Erreur lors du chargement du plan:", error);
          toast({
            title: "Erreur",
            description: "Impossible de charger le plan",
            variant: "destructive"
          });
        }
      } else {
        // Créer un plan par défaut (un rectangle représentant la salle)
        const room = new fabric.Rect({
          left: 50,
          top: 50,
          width: 700,
          height: 500,
          fill: 'white',
          stroke: '#ccc',
          strokeWidth: 2,
          selectable: !readOnly,
        });
        fabricCanvas.add(room);
        fabricCanvas.centerObject(room);
        fabricCanvas.renderAll();
      }

      // Configurer les limitations si en mode lecture seule
      if (readOnly) {
        fabricCanvas.selection = false;
        fabricCanvas.forEachObject(obj => {
          obj.selectable = false;
        });
      }

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [initialData, readOnly, toast]);

  // Ajouter un objet au canvas en fonction de l'outil sélectionné
  const addObject = (type: string) => {
    if (!canvas) return;

    let object;

    switch (type) {
      case 'tableRonde180':
        object = new fabric.Circle({
          radius: 90,
          fill: '#d1bc8a',
          stroke: '#bca976',
          strokeWidth: 2,
          left: 100,
          top: 100,
          originX: 'center',
          originY: 'center',
        });
        object.set('type', 'tableRonde180');
        object.set('capacity', 10);
        break;
      case 'tableRonde152':
        object = new fabric.Circle({
          radius: 76,
          fill: '#d1bc8a',
          stroke: '#bca976',
          strokeWidth: 2,
          left: 100,
          top: 100,
          originX: 'center',
          originY: 'center',
        });
        object.set('type', 'tableRonde152');
        object.set('capacity', 8);
        break;
      case 'tableRectangle':
        object = new fabric.Rect({
          width: 180,
          height: 80,
          fill: '#d1bc8a',
          stroke: '#bca976',
          strokeWidth: 2,
          left: 100,
          top: 100,
          originX: 'center',
          originY: 'center',
        });
        object.set('type', 'tableRectangle');
        object.set('capacity', 6);
        break;
      case 'chaise':
        object = new fabric.Circle({
          radius: 15,
          fill: '#8a8a8a',
          stroke: '#666666',
          strokeWidth: 1,
          left: 100,
          top: 100,
          originX: 'center',
          originY: 'center',
        });
        object.set('type', 'chaise');
        break;
      default:
        return;
    }

    if (object) {
      canvas.add(object);
      canvas.setActiveObject(object);
      canvas.renderAll();
      
      toast({
        description: `Élément ajouté, déplacez-le à l'endroit souhaité`,
      });
    }
  };

  // Supprimer l'objet sélectionné
  const deleteSelected = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      toast({
        description: "Élément supprimé",
      });
    } else {
      toast({
        description: "Sélectionnez un élément à supprimer",
        variant: "destructive"
      });
    }
  };

  // Zoomer/dézoomer
  const handleZoom = (zoomIn: boolean) => {
    if (!canvas) return;

    const currentZoom = canvas.getZoom();
    const newZoom = zoomIn ? currentZoom * 1.1 : currentZoom / 1.1;
    
    if (newZoom > 0.2 && newZoom < 3) {
      canvas.zoomToPoint({ x: canvas.width! / 2, y: canvas.height! / 2 }, newZoom);
      canvas.renderAll();
    }
  };

  // Sauvegarder le plan
  const savePlan = () => {
    if (!canvas) return;

    try {
      const jsonData = JSON.stringify(canvas.toJSON(['type', 'capacity']));
      if (onSave) {
        onSave(jsonData);
      }
      
      toast({
        title: "Plan sauvegardé",
        description: "Votre plan a été enregistré avec succès"
      });
      
      // Option de téléchargement du plan
      const link = document.createElement('a');
      link.download = `${planName.replace(/\s+/g, '_').toLowerCase()}.json`;
      const blob = new Blob([jsonData], { type: 'application/json' });
      link.href = URL.createObjectURL(blob);
      link.click();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le plan",
        variant: "destructive"
      });
    }
  };

  // Importer un plan
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

  return (
    <div className="flex flex-col">
      <Card className="bg-vip-gray-900 border-vip-gray-800 mb-4">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-vip-white">Éditeur de Plan</CardTitle>
              <CardDescription className="text-vip-gray-400">
                Créez et modifiez le plan de votre salle de réception
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {!readOnly && (
                <>
                  <Button
                    variant="outline"
                    className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                    onClick={() => handleZoom(true)}
                  >
                    <ZoomIn size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                    onClick={() => handleZoom(false)}
                  >
                    <ZoomOut size={18} />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!readOnly && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="col-span-2">
                <Label htmlFor="plan-name">Nom du plan</Label>
                <Input
                  id="plan-name"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="bg-vip-gray-800 border-vip-gray-700 text-vip-white"
                />
              </div>
              <div>
                <Label>Mode d'affichage</Label>
                <Select value={planMode} onValueChange={(value) => setPlanMode(value as '2d' | '2d')}>
                  <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                    <SelectValue placeholder="Mode d'affichage" />
                  </SelectTrigger>
                  <SelectContent className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                    <SelectItem value="2d">2D</SelectItem>
                    <SelectItem value="2d">2D amélioré</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {!readOnly && (
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant={selectedTool === 'select' ? "default" : "outline"} 
                onClick={() => setSelectedTool('select')}
                className={selectedTool === 'select' ? "border-vip-gold text-vip-white" : "border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"}
              >
                Sélection
              </Button>
              <Button
                variant="outline"
                onClick={() => addObject('tableRonde180')}
                className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
              >
                <Circle size={18} className="mr-2" /> Table ronde (180cm)
              </Button>
              <Button
                variant="outline"
                onClick={() => addObject('tableRonde152')}
                className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
              >
                <Circle size={16} className="mr-2" /> Table ronde (152cm)
              </Button>
              <Button
                variant="outline"
                onClick={() => addObject('tableRectangle')}
                className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
              >
                <Table size={18} className="mr-2" /> Table rectangle
              </Button>
              <Button
                variant="outline"
                onClick={() => addObject('chaise')}
                className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
              >
                Chaise
              </Button>
              <Button
                variant="outline"
                onClick={deleteSelected}
                className="border-vip-gray-700 text-red-400 hover:text-red-300 hover:border-red-400"
              >
                <Trash2 size={18} className="mr-2" /> Supprimer
              </Button>
            </div>
          )}

          <div className="canvas-container border border-vip-gray-700 rounded-md overflow-hidden">
            <canvas ref={canvasRef} />
          </div>

          {!readOnly && (
            <div className="flex justify-between mt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                  onClick={() => {
                    const fileInput = document.getElementById('import-plan');
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                >
                  <Upload size={18} className="mr-2" /> Importer
                </Button>
                <input
                  id="import-plan"
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={importPlan}
                />
                <Button
                  variant="outline"
                  className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                  onClick={() => {
                    if (canvas) {
                      canvas.clear();
                      const room = new fabric.Rect({
                        left: 50,
                        top: 50,
                        width: 700,
                        height: 500,
                        fill: 'white',
                        stroke: '#ccc',
                        strokeWidth: 2,
                      });
                      canvas.add(room);
                      canvas.centerObject(room);
                      canvas.renderAll();
                    }
                  }}
                >
                  <Trash2 size={18} className="mr-2" /> Réinitialiser
                </Button>
              </div>
              <GoldButton onClick={savePlan}>
                <Save size={18} className="mr-2" /> Sauvegarder
              </GoldButton>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FloorPlanner;
