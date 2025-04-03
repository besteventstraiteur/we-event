
import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GoldButton from "@/components/GoldButton";

const CartSummary = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  };

  const getServiceIcon = (type?: string) => {
    if (!type) return null;
    // Using existing imports and functions from other components
    return null;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-5 w-5 mr-2" />
          <span>Panier</span>
          {cart.items.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-vip-gold text-vip-black px-1.5 min-w-5 h-5 flex items-center justify-center rounded-full">
              {cart.items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-vip-gray-900 border-vip-gray-800 w-[350px] sm:w-[450px]">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Simulation de budget
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col h-[calc(100vh-180px)]">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <ShoppingCart className="h-16 w-16 text-vip-gray-600 mb-4" />
              <p className="text-vip-gray-400 text-center">
                Votre panier est vide. Ajoutez des services ou packs pour simuler le coût de votre mariage.
              </p>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 overflow-y-auto flex-1 pr-2">
              {cart.items.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-vip-gray-800/50 rounded-lg p-3 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <div className="flex items-center">
                      {item.type === "package" ? (
                        <Badge className="bg-vip-gold text-vip-black mr-2">Pack</Badge>
                      ) : (
                        <Badge className="bg-vip-gray-700 mr-2">Service</Badge>
                      )}
                      <h4 className="font-medium line-clamp-1">{item.name}</h4>
                    </div>
                    {item.vendorName && (
                      <p className="text-sm text-vip-gray-400 mt-1">{item.vendorName}</p>
                    )}
                    <p className="text-vip-gold font-bold mt-1">{formatPrice(item.price)}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-vip-gray-400 hover:text-white hover:bg-vip-gray-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {cart.items.length > 0 && (
            <div className="mt-auto pt-4 border-t border-vip-gray-800">
              <div className="flex justify-between text-sm text-vip-gray-400 mb-2">
                <span>Nombre d'articles:</span>
                <span>{cart.items.length}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total estimé:</span>
                <span className="text-vip-gold">{formatPrice(cart.total)}</span>
              </div>
              
              <div className="mt-4 space-y-2">
                <GoldButton className="w-full">
                  Enregistrer cette simulation
                </GoldButton>
                <Button 
                  variant="outline" 
                  className="w-full border-vip-gray-700 text-vip-gray-400"
                  onClick={clearCart}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Vider le panier
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSummary;
