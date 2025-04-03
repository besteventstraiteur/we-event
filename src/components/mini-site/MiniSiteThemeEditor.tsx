
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MiniSiteTheme } from "@/types/miniSiteTypes";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Type, Image as ImageIcon, Upload } from "lucide-react";

interface MiniSiteThemeEditorProps {
  theme: MiniSiteTheme;
  setTheme: React.Dispatch<React.SetStateAction<MiniSiteTheme>>;
}

const fontOptions = [
  { value: "Inter", label: "Inter (Sans-serif)" },
  { value: "Playfair Display", label: "Playfair Display (Serif)" },
  { value: "Montserrat", label: "Montserrat (Sans-serif)" },
  { value: "Lora", label: "Lora (Serif)" },
  { value: "Roboto", label: "Roboto (Sans-serif)" },
  { value: "Merriweather", label: "Merriweather (Serif)" },
  { value: "Open Sans", label: "Open Sans (Sans-serif)" },
  { value: "Cormorant Garamond", label: "Cormorant Garamond (Serif)" },
];

const MiniSiteThemeEditor: React.FC<MiniSiteThemeEditorProps> = ({
  theme,
  setTheme
}) => {
  const handleColorChange = (colorType: keyof MiniSiteTheme["colors"], value: string) => {
    setTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }));
  };

  const handleFontChange = (fontType: keyof MiniSiteTheme["fonts"], value: string) => {
    setTheme(prev => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [fontType]: value
      }
    }));
  };

  const handleImageUpload = (imageType: keyof MiniSiteTheme["images"], event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // In a real app, this would upload the file to a server
    // For now, we'll use a local URL
    const imageUrl = URL.createObjectURL(file);
    
    setTheme(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [imageType]: imageType === 'gallery' 
          ? [...(prev.images.gallery || []), imageUrl]
          : imageUrl
      }
    }));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Couleurs
          </TabsTrigger>
          <TabsTrigger value="fonts" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Typographie
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Images
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color" className="flex items-center justify-between">
                Couleur principale
                <div 
                  className="h-4 w-4 rounded-full border" 
                  style={{ backgroundColor: theme.colors.primary }}
                />
              </Label>
              <div className="flex">
                <Input
                  id="primary-color"
                  type="color"
                  value={theme.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-12 p-1 h-10"
                />
                <Input
                  type="text"
                  value={theme.colors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="flex-1 ml-2"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondary-color" className="flex items-center justify-between">
                Couleur secondaire
                <div 
                  className="h-4 w-4 rounded-full border" 
                  style={{ backgroundColor: theme.colors.secondary }}
                />
              </Label>
              <div className="flex">
                <Input
                  id="secondary-color"
                  type="color"
                  value={theme.colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-12 p-1 h-10"
                />
                <Input
                  type="text"
                  value={theme.colors.secondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="flex-1 ml-2"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accent-color" className="flex items-center justify-between">
                Couleur d'accent
                <div 
                  className="h-4 w-4 rounded-full border" 
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </Label>
              <div className="flex">
                <Input
                  id="accent-color"
                  type="color"
                  value={theme.colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-12 p-1 h-10"
                />
                <Input
                  type="text"
                  value={theme.colors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="flex-1 ml-2"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="background-color" className="flex items-center justify-between">
                Couleur de fond
                <div 
                  className="h-4 w-4 rounded-full border" 
                  style={{ backgroundColor: theme.colors.background }}
                />
              </Label>
              <div className="flex">
                <Input
                  id="background-color"
                  type="color"
                  value={theme.colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-12 p-1 h-10"
                />
                <Input
                  type="text"
                  value={theme.colors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="flex-1 ml-2"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="text-color" className="flex items-center justify-between">
                Couleur du texte
                <div 
                  className="h-4 w-4 rounded-full border" 
                  style={{ backgroundColor: theme.colors.text }}
                />
              </Label>
              <div className="flex">
                <Input
                  id="text-color"
                  type="color"
                  value={theme.colors.text}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="w-12 p-1 h-10"
                />
                <Input
                  type="text"
                  value={theme.colors.text}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="flex-1 ml-2"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Palettes prédéfinies</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { name: "Or & Noir", colors: { primary: "#D4AF37", secondary: "#333333", accent: "#F5F5F5", background: "#FFFFFF", text: "#333333" } },
                { name: "Bleu Marine & Or", colors: { primary: "#14213D", secondary: "#FCA311", accent: "#E5E5E5", background: "#FFFFFF", text: "#14213D" } },
                { name: "Rose & Gris", colors: { primary: "#F28482", secondary: "#84A59D", accent: "#F7EDE2", background: "#FFFFFF", text: "#333333" } },
                { name: "Vert Olive & Crème", colors: { primary: "#606C38", secondary: "#BC6C25", accent: "#FEFAE0", background: "#FFFFFF", text: "#283618" } },
                { name: "Lavande & Blanc", colors: { primary: "#7209B7", secondary: "#3A0CA3", accent: "#F8EDEB", background: "#FFFFFF", text: "#333333" } },
                { name: "Eucalyptus", colors: { primary: "#617B5C", secondary: "#9D9C62", accent: "#F5F3EE", background: "#FFFFFF", text: "#333333" } },
                { name: "Sable & Terracotta", colors: { primary: "#CB997E", secondary: "#6B705C", accent: "#EDDCD2", background: "#FFFFFF", text: "#333333" } },
                { name: "Bordeaux & Or", colors: { primary: "#7D0633", secondary: "#D4AF37", accent: "#F5F5F5", background: "#FFFFFF", text: "#333333" } }
              ].map((palette, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-2 flex flex-col items-center"
                  onClick={() => setTheme(prev => ({ ...prev, colors: palette.colors }))}
                >
                  <div className="flex mb-2">
                    {Object.values(palette.colors).map((color, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-xs">{palette.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="fonts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heading-font">Police des titres</Label>
              <Select 
                value={theme.fonts.heading} 
                onValueChange={(value) => handleFontChange('heading', value)}
              >
                <SelectTrigger id="heading-font">
                  <SelectValue placeholder="Choisir une police" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map(font => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div 
                className="mt-2 p-2 border rounded"
                style={{ fontFamily: theme.fonts.heading }}
              >
                <p className="text-xl">Exemple de titre</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="body-font">Police du texte</Label>
              <Select 
                value={theme.fonts.body} 
                onValueChange={(value) => handleFontChange('body', value)}
              >
                <SelectTrigger id="body-font">
                  <SelectValue placeholder="Choisir une police" />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map(font => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div 
                className="mt-2 p-2 border rounded"
                style={{ fontFamily: theme.fonts.body }}
              >
                <p>Exemple de texte de paragraphe.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Combinaisons de polices recommandées</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { heading: "Playfair Display", body: "Inter" },
                { heading: "Montserrat", body: "Lora" },
                { heading: "Cormorant Garamond", body: "Montserrat" },
                { heading: "Roboto", body: "Merriweather" },
                { heading: "Lora", body: "Open Sans" },
                { heading: "Merriweather", body: "Roboto" }
              ].map((combo, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-start text-left"
                  onClick={() => setTheme(prev => ({ 
                    ...prev, 
                    fonts: { heading: combo.heading, body: combo.body } 
                  }))}
                >
                  <p style={{ fontFamily: combo.heading }} className="text-lg mb-1">
                    {combo.heading}
                  </p>
                  <p style={{ fontFamily: combo.body }} className="text-sm">
                    {combo.body}
                  </p>
                </Button>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-medium">Image d'en-tête</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              {theme.images.hero ? (
                <div className="relative">
                  <img 
                    src={theme.images.hero} 
                    alt="Hero preview" 
                    className="max-h-48 mx-auto rounded"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setTheme(prev => ({ 
                      ...prev, 
                      images: { ...prev.images, hero: undefined } 
                    }))}
                  >
                    Supprimer
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground pb-2">
                    Téléchargez une image pour l'en-tête de votre site
                  </p>
                  <Label 
                    htmlFor="hero-image" 
                    className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Parcourir
                  </Label>
                  <Input
                    id="hero-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload('hero', e)}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="text-base font-medium">Motif d'arrière-plan</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              {theme.images.backgroundPattern ? (
                <div className="relative">
                  <img 
                    src={theme.images.backgroundPattern} 
                    alt="Background pattern preview" 
                    className="max-h-48 mx-auto rounded"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setTheme(prev => ({ 
                      ...prev, 
                      images: { ...prev.images, backgroundPattern: undefined } 
                    }))}
                  >
                    Supprimer
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground pb-2">
                    Téléchargez une image qui sera utilisée comme motif d'arrière-plan
                  </p>
                  <Label 
                    htmlFor="pattern-image" 
                    className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Parcourir
                  </Label>
                  <Input
                    id="pattern-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload('backgroundPattern', e)}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-base font-medium">Galerie d'images</Label>
              <Label 
                htmlFor="gallery-image" 
                className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                <Plus className="h-4 w-4 mr-2" /> Ajouter une image
              </Label>
              <Input
                id="gallery-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload('gallery', e)}
              />
            </div>
            
            {(!theme.images.gallery || theme.images.gallery.length === 0) ? (
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <div className="flex justify-center">
                  <ImageIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Ajoutez des photos pour la galerie de votre mini-site
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {theme.images.gallery.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Gallery image ${index+1}`} 
                      className="h-24 w-full object-cover rounded"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setTheme(prev => {
                        const newGallery = [...(prev.images.gallery || [])];
                        newGallery.splice(index, 1);
                        return { 
                          ...prev, 
                          images: { ...prev.images, gallery: newGallery } 
                        };
                      })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MiniSiteThemeEditor;
