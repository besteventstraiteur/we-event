
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Trash2, Save, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PresentationSlides from "@/components/video-presentation/presentation-slides";
import { SlideType } from "@/components/video-presentation/presentation-types";
import SlideEditorDialog from "./SlideEditorDialog";

const PresentationSlideManager: React.FC = () => {
  const [slides, setSlides] = useState<SlideType[]>([]);
  const [selectedSlide, setSelectedSlide] = useState<SlideType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load slides from the main presentation
  useEffect(() => {
    setSlides([...PresentationSlides]);
  }, []);

  const handleAddSlide = () => {
    const newSlide: SlideType = {
      title: "Nouveau slide",
      description: "Description du nouveau slide",
      keyFeatures: ["Fonctionnalité 1", "Fonctionnalité 2"],
      path: "",
      image: "",
    };
    
    setSelectedSlide(newSlide);
    setSelectedIndex(null); // Null means we're adding a new slide
    setIsDialogOpen(true);
  };

  const handleEditSlide = (slide: SlideType, index: number) => {
    setSelectedSlide({...slide});
    setSelectedIndex(index);
    setIsDialogOpen(true);
  };

  const handleDeleteSlide = (index: number) => {
    const updatedSlides = [...slides];
    updatedSlides.splice(index, 1);
    setSlides(updatedSlides);
    
    toast({
      title: "Slide supprimé",
      description: "Le slide a été supprimé avec succès",
    });
  };

  const handleSaveChanges = () => {
    // Here we would save the changes to the server
    // For now, we just show a success message
    toast({
      title: "Modifications enregistrées",
      description: "Les modifications de la présentation ont été enregistrées",
    });
  };

  const handleMoveSlide = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) || 
      (direction === "down" && index === slides.length - 1)
    ) {
      return;
    }

    const updatedSlides = [...slides];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    
    [updatedSlides[index], updatedSlides[targetIndex]] = 
      [updatedSlides[targetIndex], updatedSlides[index]];
    
    setSlides(updatedSlides);
  };

  const handleSaveSlide = (updatedSlide: SlideType) => {
    const updatedSlides = [...slides];
    
    if (selectedIndex !== null) {
      // Edit existing slide
      updatedSlides[selectedIndex] = updatedSlide;
    } else {
      // Add new slide
      updatedSlides.push(updatedSlide);
    }
    
    setSlides(updatedSlides);
    setIsDialogOpen(false);
    
    toast({
      title: selectedIndex !== null ? "Slide modifié" : "Slide ajouté",
      description: selectedIndex !== null 
        ? "Le slide a été modifié avec succès" 
        : "Le nouveau slide a été ajouté à la présentation",
    });
  };

  const getSlideCategory = (index: number): string => {
    // This is a simplified way to determine the category based on the slides structure
    // In a real implementation, we might want to add a category field to the SlideType
    let currentIndex = 0;
    
    if (index < PresentationSlides.indexOf(PresentationSlides.find(slide => 
      slide.title === "Fonctionnalités Client") || PresentationSlides[0])) {
      return "Introduction";
    } else if (index < PresentationSlides.indexOf(PresentationSlides.find(slide => 
      slide.title === "Fonctionnalités Prestataire") || PresentationSlides[0])) {
      return "Client";
    } else if (index < PresentationSlides.length - 1) {
      return "Prestataire";
    } else {
      return "Conclusion";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des slides de présentation</h2>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleAddSlide}
            className="flex items-center gap-1 bg-vip-gold hover:bg-amber-600"
          >
            <PlusCircle size={16} />
            Ajouter un slide
          </Button>
          
          <Button 
            onClick={handleSaveChanges}
            className="flex items-center gap-1"
          >
            <Save size={16} />
            Enregistrer tout
          </Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">N°</TableHead>
            <TableHead className="w-[100px]">Catégorie</TableHead>
            <TableHead className="w-[250px]">Titre</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[120px]">Type de média</TableHead>
            <TableHead className="w-[100px]">Ordonner</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slides.map((slide, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{getSlideCategory(index)}</TableCell>
              <TableCell className="truncate max-w-[250px]">{slide.title}</TableCell>
              <TableCell className="truncate max-w-[350px]">{slide.description}</TableCell>
              <TableCell>
                {!slide.image && !slide.videoUrl ? "Aucun" : 
                  slide.videoUrl ? "Vidéo/GIF" : "Image"}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleMoveSlide(index, "up")}
                    disabled={index === 0}
                  >
                    <ArrowUpDown className="h-4 w-4 rotate-90" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleMoveSlide(index, "down")}
                    disabled={index === slides.length - 1}
                  >
                    <ArrowUpDown className="h-4 w-4 -rotate-90" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditSlide(slide, index)}
                  >
                    Modifier
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeleteSlide(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {selectedSlide && (
        <SlideEditorDialog
          open={isDialogOpen}
          slide={selectedSlide}
          onSave={handleSaveSlide}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default PresentationSlideManager;
