
import React from 'react';
import { Button } from "@/components/ui/button";
import GoldButton from '@/components/GoldButton';
import { Save, Upload, Trash2 } from 'lucide-react';

interface FloorPlanActionsProps {
  createRoomPlan: () => void;
  savePlan: () => void;
}

const FloorPlanActions: React.FC<FloorPlanActionsProps> = ({
  createRoomPlan,
  savePlan
}) => {
  return (
    <div className="flex justify-between mt-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="border-gray-200 text-gray-600 hover:text-gray-900"
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
          onChange={(e) => {
            // This is handled in the parent component
          }}
        />
        <Button
          variant="outline"
          className="border-gray-200 text-gray-600 hover:text-gray-900"
          onClick={createRoomPlan}
        >
          <Trash2 size={18} className="mr-2" /> Réinitialiser
        </Button>
      </div>
      <GoldButton onClick={savePlan}>
        <Save size={18} className="mr-2" /> Sauvegarder
      </GoldButton>
    </div>
  );
};

export default FloorPlanActions;
