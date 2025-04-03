
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { WeddingPackage, PackageService } from "@/models/weddingPackage";
import { useToast } from "@/hooks/use-toast";

// Define the cart item types
export interface CartItem {
  id: string;
  type: "package" | "service";
  name: string;
  price: number;
  vendorName?: string;
  serviceType?: string;
  packageId?: string;
}

// Define the cart state
interface CartState {
  items: CartItem[];
  total: number;
}

// Define the actions for the cart reducer
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" };

// Create the initial state
const initialState: CartState = {
  items: [],
  total: 0,
};

// Create the cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      // Check if item already exists
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case "REMOVE_ITEM":
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove?.price || 0),
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
};

// Create the cart context
interface CartContextType {
  cart: CartState;
  addPackageToCart: (pkg: WeddingPackage) => void;
  addServiceToCart: (service: PackageService, packageId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the cart provider
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const { toast } = useToast();

  const addPackageToCart = (pkg: WeddingPackage) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `package-${pkg.id}`,
        type: "package",
        name: pkg.name,
        price: pkg.totalPrice,
      },
    });
    toast({
      title: "Pack ajouté",
      description: `${pkg.name} a été ajouté à votre panier.`,
    });
  };

  const addServiceToCart = (service: PackageService, packageId: string) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `service-${service.id}`,
        type: "service",
        name: service.description,
        price: service.price,
        vendorName: service.vendorName,
        serviceType: service.type,
        packageId: packageId,
      },
    });
    toast({
      title: "Service ajouté",
      description: `${service.description} a été ajouté à votre panier.`,
    });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: itemId,
    });
    toast({
      title: "Article retiré",
      description: "L'article a été retiré de votre panier.",
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast({
      title: "Panier vidé",
      description: "Tous les articles ont été retirés de votre panier.",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addPackageToCart,
        addServiceToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
