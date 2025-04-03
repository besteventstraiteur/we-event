
import React from "react";
import { ShoppingCart } from "lucide-react";

interface EmptyCartProps {
  message?: string;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ 
  message = "Votre panier est vide. Ajoutez des services ou packs pour simuler le coût de votre mariage."
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ShoppingCart className="h-16 w-16 text-vip-gray-600 mb-4" />
      <p className="text-vip-gray-400 text-center">
        {message}
      </p>
    </div>
  );
};

export default EmptyCart;
