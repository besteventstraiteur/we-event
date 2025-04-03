
import React from "react";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

interface CartItemsListProps {
  items: CartItemType[];
  onRemoveItem: (itemId: string) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ items, onRemoveItem }) => {
  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="flex flex-col space-y-4 overflow-y-auto flex-1 pr-2">
      {items.map((item) => (
        <CartItem 
          key={item.id} 
          item={item} 
          onRemove={onRemoveItem} 
        />
      ))}
    </div>
  );
};

export default CartItemsList;
