
import React from 'react';
import { Button } from "@/components/ui/button";
import GoldButton from '@/components/GoldButton';
import { Save, Upload, Trash2 } from 'lucide-react';

interface FloorPlanActionsProps {
  createRoomPlan: () => void;
  savePlan: () => void;
  isMobile?: boolean;
}

const FloorPlanActions: React.FC<FloorPlanActionsProps> = ({
  createRoomPlan,
  savePlan,
  isMobile = false
}) => {
  if (isMobile) {
    // Version simplifiée pour mobile
    return (
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          className="border-gray-200 text-gray-600 h-11 px-3"
          onClick={createRoomPlan}
        >
          <Trash2 size={18} />
        </Button>
        <GoldButton 
          onClick={savePlan}
          className="h-11"
        >
          <Save size={18} />
        </GoldButton>
      </div>
    );
  }
  
  // Version desktop
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
