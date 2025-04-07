
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SlideType } from "@/components/video-presentation/presentation-types";

// Define schema for form validation
const slideSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  keyFeatures: z.array(z.string()).optional(),
  path: z.string().optional(),
  image: z.string().optional(),
  videoUrl: z.string().optional(),
});

type SlideFormValues = z.infer<typeof slideSchema>;

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
  const [mediaType, setMediaType] = useState<string>(slide.videoUrl ? "video" : slide.image ? "image" : "none");
  const { toast } = useToast();

  // Initialize form with the react-hook-form
  const form = useForm<SlideFormValues>({
    resolver: zodResolver(slideSchema),
    defaultValues: {
      title: slide.title,
      description: slide.description,
      keyFeatures: slide.keyFeatures || [],
      path: slide.path || "",
      image: slide.image || "",
      videoUrl: slide.videoUrl || "",
    }
  });

  // Update form values when slide changes
  React.useEffect(() => {
    if (slide) {
      form.reset({
        title: slide.title,
        description: slide.description,
        keyFeatures: slide.keyFeatures || [],
        path: slide.path || "",
        image: slide.image || "",
        videoUrl: slide.videoUrl || "",
      });
      
      setMediaType(slide.videoUrl ? "video" : slide.image ? "image" : "none");
    }
  }, [slide, form]);

  const handleMediaTypeChange = (value: string) => {
    setMediaType(value);
    
    if (value === "video") {
      form.setValue("image", "");
    } else if (value === "image") {
      form.setValue("videoUrl", "");
    } else {
      form.setValue("image", "");
      form.setValue("videoUrl", "");
    }
  };

  const handleFeaturesChange = (featuresText: string) => {
    const features = featuresText.split('\n').filter(feature => feature.trim() !== '');
    form.setValue("keyFeatures", features);
  };

  const onSubmit = (values: SlideFormValues) => {
    // Create updated slide object
    const updatedSlide: SlideType = {
      ...slide,
      title: values.title,
      description: values.description,
      keyFeatures: values.keyFeatures,
      path: values.path,
      image: values.image,
      videoUrl: values.videoUrl,
    };
    
    onSave(updatedSlide);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Éditer le slide
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Titre du slide"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description du slide"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="keyFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fonctionnalités clés</FormLabel>
                  <FormControl>
                    <Textarea
                      value={field.value?.join('\n') || ''}
                      onChange={(e) => handleFeaturesChange(e.target.value)}
                      placeholder="Une fonctionnalité par ligne"
                      rows={4}
                    />
                  </FormControl>
                  <FormDescription>
                    Saisissez une fonctionnalité par ligne
                  </FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lien du bouton (optionnel)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="/client/dashboard"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Chemin vers lequel le bouton redirigera (laissez vide pour masquer le bouton)
                  </FormDescription>
                </FormItem>
              )}
            />
            
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
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de l'image</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="/screenshots/feature.png"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Chemin vers l'image (ex: /screenshots/feature.png)
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}
            
            {mediaType === "video" && (
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de la vidéo/GIF</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="/videos/demo.mp4 ou /gifs/demo.gif"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Chemin vers la vidéo ou le GIF (ex: /videos/demo.mp4)
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={onCancel}>Annuler</Button>
              <Button 
                type="submit"
                className="bg-vip-gold hover:bg-amber-600"
              >
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SlideEditorDialog;
