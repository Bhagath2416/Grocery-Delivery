
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { CartItem, Product } from "../assets/types";

interface CartContextType {
  items: CartItem[];

  addToCart: (
    product: Product,
    quantity?: number
  ) => void;

  removeFromCart: (
    productId: string
  ) => void;

  updateQuantity: (
    productId: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  cartCount: number;
  cartTotal: number;

  isCartOpen: boolean;

  setIsCartOpen: (
    open: boolean
  ) => void;
}

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );
  export function CartProvider({
    children,
  }: {
    children: ReactNode;
  }) {
    const getUserId = () => {
      const savedUser = localStorage.getItem("auth_user");
  
      if (!savedUser) {
        return null;
      }
  
      try {
        const user = JSON.parse(savedUser);
        return user.id ? String(user.id) : null;
      } catch {
        return null;
      }
    };
  
    const [userId, setUserId] = useState<string | null>(() => {
      return getUserId();
    });
  
    const [items, setItems] = useState<CartItem[]>([]);
  
    const [isCartOpen, setIsCartOpen] = useState(false);
  
    // Detect login/logout
    useEffect(() => {
      const handleAuthChange = () => {
        const newUserId = getUserId();
  
        setUserId(newUserId);
  
        if (!newUserId) {
          setItems([]);
          setIsCartOpen(false);
        }
      };
  
      window.addEventListener(
        "auth-change",
        handleAuthChange
      );
  
      return () => {
        window.removeEventListener(
          "auth-change",
          handleAuthChange
        );
      };
    }, []);
  
    // Load the cart whenever the user changes
    useEffect(() => {
      if (!userId) {
        setItems([]);
        return;
      }
  
      const savedCart = localStorage.getItem(
        `app_cart_${userId}`
      );
  
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch {
          setItems([]);
        }
      } else {
        setItems([]);
      }
  
      setIsCartOpen(false);
    }, [userId]);
  
    // Save cart for the current user
    useEffect(() => {
      if (!userId) {
        return;
      }
  
      localStorage.setItem(
        `app_cart_${userId}`,
        JSON.stringify(items)
      );
    }, [items, userId]);
  
    const addToCart = (
      product: Product,
      quantity = 1
    ) => {
      if (!userId) {
        return;
      }
  
      setItems((prev) => {
        const existing = prev.find(
          (item) => item.product.id === product.id
        );
  
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + quantity,
                }
              : item
          );
        }
  
        return [
          ...prev,
          {
            product,
            quantity,
          },
        ];
      });
  
      setIsCartOpen(true);
    };
  
    const removeFromCart = (
      productId: string
    ) => {
      setItems((prev) =>
        prev.filter(
          (item) =>
            item.product.id !== productId
        )
      );
    };
  
    const updateQuantity = (
      productId: string,
      quantity: number
    ) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
  
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity,
              }
            : item
        )
      );
    };
  
    const clearCart = () => {
      setItems([]);
      setIsCartOpen(false);
    };
  
    const cartCount = items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );
  
    const cartTotal = items.reduce(
      (sum, item) =>
        sum +
        item.product.price *
          item.quantity,
      0
    );
  
    return (
      <CartContext.Provider
        value={{
          items,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          cartCount,
          cartTotal,
          isCartOpen,
          setIsCartOpen,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }


export function useCart() {
  const context =
    useContext(CartContext);


  if (!context) {
    throw new Error(
      "useCart must be used within CartProvider"
    );
  }

  return context;
}





