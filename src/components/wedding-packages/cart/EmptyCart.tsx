
import React from "react";
import { ShoppingCart } from "lucide-react";

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <ShoppingCart className="h-16 w-16 text-vip-gray-600 mb-4" />
      <p className="text-vip-gray-400 text-center">
        Votre panier est vide. Ajoutez des services ou packs pour simuler le coût de votre mariage.
      </p>
    </div>
  );
};

export default EmptyCart;
