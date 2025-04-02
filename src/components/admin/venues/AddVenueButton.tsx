
import React from 'react';
import { Plus } from 'lucide-react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import GoldButton from '@/components/GoldButton';

interface AddVenueButtonProps {
  onClick: () => void;
}

const AddVenueButton: React.FC<AddVenueButtonProps> = ({ onClick }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <GoldButton onClick={onClick}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter une salle
        </GoldButton>
      </DialogTrigger>
    </Dialog>
  );
};

export default AddVenueButton;
