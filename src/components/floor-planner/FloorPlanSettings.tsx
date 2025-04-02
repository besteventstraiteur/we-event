
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import InputField from "@/components/InputField";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import RoomPresetsSelector from './RoomPresetsSelector';

interface FloorPlanSettingsProps {
  planName: string;
  setPlanName: (name: string) => void;
  planMode: '2d' | '2d';
  setPlanMode: (mode: any) => void;
  roomWidth: number;
  setRoomWidth: (width: number) => void;
  roomHeight: number;
  setRoomHeight: (height: number) => void;
  updateRoomDimensions: () => void;
}

const FloorPlanSettings: React.FC<FloorPlanSettingsProps> = ({
  planName,
  setPlanName,
  planMode,
  setPlanMode,
  roomWidth,
  setRoomWidth,
  roomHeight,
  setRoomHeight,
  updateRoomDimensions
}) => {
  const [isDimensionsChanged, setIsDimensionsChanged] = useState(false);

  const handleWidthChange = (value: number) => {
    setRoomWidth(value);
    setIsDimensionsChanged(true);
  };

  const handleHeightChange = (value: number) => {
    setRoomHeight(value);
    setIsDimensionsChanged(true);
  };

  const handlePresetSelect = (width: number, height: number) => {
    setRoomWidth(width);
    setRoomHeight(height);
    setIsDimensionsChanged(true);
  };
  
  const applyDimensions = () => {
    updateRoomDimensions();
    setIsDimensionsChanged(false);
  };

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-md border border-gray-100 mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <InputField
            id="plan-name"
            label="Nom du plan"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            className="bg-white border-gray-200 text-gray-900"
          />
        </div>
        <div className="w-full md:w-1/3">
          <Label>Mode d'affichage</Label>
          <Select value={planMode} onValueChange={(value) => setPlanMode(value as '2d' | '2d')}>
            <SelectTrigger className="bg-white border-gray-200 text-gray-900">
              <SelectValue placeholder="Mode d'affichage" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 text-gray-900">
              <SelectItem value="2d">2D</SelectItem>
              <SelectItem value="2d">2D amélioré</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/3 mt-auto mb-0">
          <RoomPresetsSelector onSelectPreset={handlePresetSelect} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="room-width">Largeur (cm): {roomWidth}</Label>
          </div>
          <div className="flex gap-4 items-center">
            <Slider
              id="room-width-slider"
              min={200}
              max={2000}
              step={50}
              value={[roomWidth]}
              onValueChange={(values) => handleWidthChange(values[0])}
              className="flex-grow"
            />
            <Input
              id="room-width"
              type="number"
              min="200"
              max="2000"
              value={roomWidth}
              onChange={(e) => handleWidthChange(parseInt(e.target.value) || 700)}
              className="w-24 bg-white border-gray-200 text-gray-900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="room-height">Longueur (cm): {roomHeight}</Label>
          </div>
          <div className="flex gap-4 items-center">
            <Slider
              id="room-height-slider"
              min={200}
              max={2000}
              step={50}
              value={[roomHeight]}
              onValueChange={(values) => handleHeightChange(values[0])}
              className="flex-grow"
            />
            <Input
              id="room-height"
              type="number"
              min="200"
              max="2000"
              value={roomHeight}
              onChange={(e) => handleHeightChange(parseInt(e.target.value) || 500)}
              className="w-24 bg-white border-gray-200 text-gray-900"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant={isDimensionsChanged ? "default" : "outline"}
          className={isDimensionsChanged 
            ? "bg-vip-gold hover:bg-vip-gold/90 text-black" 
            : "border-gray-200 text-gray-600 hover:text-gray-900"}
          onClick={applyDimensions}
          disabled={!isDimensionsChanged}
        >
          {isDimensionsChanged ? "Appliquer les modifications" : "Dimensions appliquées"}
        </Button>
      </div>
    </div>
  );
};

export default FloorPlanSettings;
