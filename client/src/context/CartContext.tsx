import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axiosInstance from "../api/axiosInstance";
import type { Cart } from "../types/cart";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    if (!user) return setCart(null);
    setLoading(true);
    try {
      const { data } = await axiosInstance.get<Cart>("/cart");
      setCart(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  const addToCart = async (productId: string, quantity?: number) => {
    const { data } = await axiosInstance.post<Cart>("/cart", {
      productId,
      quantity,
    });
    setCart(data);
  };

  const updateQuantity = async (productId: string, quantity?: number) => {
    const { data } = await axiosInstance.put<Cart>(`/cart/${productId}`, {
      quantity,
    });
    setCart(data);
  };

  const removeFromCart = async (productId: string) => {
    const { data } = await axiosInstance.delete<Cart>(`/cart/${productId}`);
    setCart(data);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
