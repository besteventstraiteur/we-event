
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <div>
        <Label htmlFor="plan-name">Nom du plan</Label>
        <Input
          id="plan-name"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="bg-white border-gray-200 text-gray-900"
        />
      </div>
      <div>
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
      <div>
        <Label htmlFor="room-width">Largeur (cm)</Label>
        <Input
          id="room-width"
          type="number"
          min="100"
          max="2000"
          value={roomWidth}
          onChange={(e) => setRoomWidth(parseInt(e.target.value) || 700)}
          className="bg-white border-gray-200 text-gray-900"
        />
      </div>
      <div>
        <Label htmlFor="room-height">Longueur (cm)</Label>
        <Input
          id="room-height"
          type="number"
          min="100"
          max="2000"
          value={roomHeight}
          onChange={(e) => setRoomHeight(parseInt(e.target.value) || 500)}
          className="bg-white border-gray-200 text-gray-900"
        />
      </div>
      <div className="md:col-span-4">
        <Button
          variant="outline"
          className="border-gray-200 text-gray-600 hover:text-gray-900"
          onClick={updateRoomDimensions}
        >
          Appliquer les dimensions
        </Button>
      </div>
    </div>
  );
};

export default FloorPlanSettings;
