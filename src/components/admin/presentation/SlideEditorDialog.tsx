
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SlideType } from "@/components/video-presentation/presentation-types";

interface SlideEditorDialogProps {
  open: boolean;
  slide: SlideType;
  onSave: (slide: SlideType) => void;
  onCancel: () => void;
}

const SlideEditorDialog: React.FC<SlideEditorDialogProps> = ({
  open,
  slide,
  onSave,
  onCancel
}) => {
  const [editedSlide, setEditedSlide] = useState<SlideType>({...slide});
  const [mediaType, setMediaType] = useState<string>(slide.videoUrl ? "video" : "image");
  const { toast } = useToast();

  const handleInputChange = (field: keyof SlideType, value: string) => {
    setEditedSlide(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeaturesChange = (featuresText: string) => {
    const features = featuresText.split('\n').filter(feature => feature.trim() !== '');
    setEditedSlide(prev => ({
      ...prev,
      keyFeatures: features
    }));
  };

  const handleMediaTypeChange = (value: string) => {
    setMediaType(value);
    
    if (value === "video") {
      setEditedSlide(prev => ({
        ...prev,
        image: "",
        videoUrl: prev.videoUrl || ""
      }));
    } else {
      setEditedSlide(prev => ({
        ...prev,
        videoUrl: "",
        image: prev.image || ""
      }));
    }
  };

  const handleSubmit = () => {
    if (!editedSlide.title.trim()) {
      toast({
        title: "Titre obligatoire",
        description: "Veuillez saisir un titre pour le slide",
        variant: "destructive"
      });
      return;
    }
    
    if (!editedSlide.description.trim()) {
      toast({
        title: "Description obligatoire",
        description: "Veuillez saisir une description pour le slide",
        variant: "destructive"
      });
      return;
    }
    
    onSave(editedSlide);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Éditer le slide
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid gap-4">
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <Input
                value={editedSlide.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Titre du slide"
              />
            </FormItem>
            
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={editedSlide.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Description du slide"
                rows={3}
              />
            </FormItem>
            
            <FormItem>
              <FormLabel>Fonctionnalités clés</FormLabel>
              <Textarea
                value={editedSlide.keyFeatures?.join('\n') || ''}
                onChange={(e) => handleFeaturesChange(e.target.value)}
                placeholder="Une fonctionnalité par ligne"
                rows={4}
              />
              <FormDescription>
                Saisissez une fonctionnalité par ligne
              </FormDescription>
            </FormItem>
            
            <FormItem>
              <FormLabel>Lien du bouton (optionnel)</FormLabel>
              <Input
                value={editedSlide.path || ''}
                onChange={(e) => handleInputChange("path", e.target.value)}
                placeholder="/client/dashboard"
              />
              <FormDescription>
                Chemin vers lequel le bouton redirigera (laissez vide pour masquer le bouton)
              </FormDescription>
            </FormItem>
            
            <FormItem>
              <FormLabel>Type de média</FormLabel>
              <Select
                value={mediaType}
                onValueChange={handleMediaTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type de média" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Vidéo/GIF</SelectItem>
                  <SelectItem value="none">Aucun</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
            
            {mediaType === "image" && (
              <FormItem>
                <FormLabel>URL de l'image</FormLabel>
                <Input
                  value={editedSlide.image || ''}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="/screenshots/feature.png"
                />
                <FormDescription>
                  Chemin vers l'image (ex: /screenshots/feature.png)
                </FormDescription>
              </FormItem>
            )}
            
            {mediaType === "video" && (
              <FormItem>
                <FormLabel>URL de la vidéo/GIF</FormLabel>
                <Input
                  value={editedSlide.videoUrl || ''}
                  onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                  placeholder="/videos/demo.mp4 ou /gifs/demo.gif"
                />
                <FormDescription>
                  Chemin vers la vidéo ou le GIF (ex: /videos/demo.mp4)
                </FormDescription>
              </FormItem>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Annuler</Button>
          <Button 
            onClick={handleSubmit}
            className="bg-vip-gold hover:bg-amber-600"
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SlideEditorDialog;
