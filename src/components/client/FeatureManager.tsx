
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useFeatureFlags, FeatureFlags } from "@/hooks/useFeatureFlags";
import { ScrollArea } from "@/components/ui/scroll-area";

const featureLabels: Record<keyof FeatureFlags, string> = {
  photos: "Galerie Photos",
  playlists: "Playlists Musicales",
  menus: "Menus",
  guests: "Gestion des Invités",
  floorPlan: "Plan de Table",
  pinterbest: "Inspiration (Pinterbest)",
  requests: "Demandes",
  miniSite: "Mini-site",
  talkshows: "Talkshows",
  podcasts: "Podcasts",
};

const FeatureManager = () => {
  const { features, toggleFeature } = useFeatureFlags();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-vip-gold flex items-center gap-2">
          Fonctionnalités Actives
        </CardTitle>
        <CardDescription>
          Activez ou désactivez les fonctionnalités dont vous avez besoin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {Object.entries(featureLabels).map(([key, label]) => (
              <div
                key={key}
                className="flex items-center justify-between py-2"
              >
                <div className="space-y-0.5">
                  <div className="font-medium">{label}</div>
                </div>
                <Switch
                  checked={features[key as keyof FeatureFlags]}
                  onCheckedChange={() => toggleFeature(key as keyof FeatureFlags)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FeatureManager;
