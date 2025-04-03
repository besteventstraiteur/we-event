
import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CartItemsList from "./cart/CartItemsList";
import CartSummaryFooter from "./cart/CartSummaryFooter";

const CartSummary = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);

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
          <CartItemsList 
            items={cart.items} 
            onRemoveItem={removeFromCart}
          />
          
          {cart.items.length > 0 && (
            <CartSummaryFooter 
              itemCount={cart.items.length} 
              totalAmount={cart.total} 
              onClearCart={clearCart}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSummary;
