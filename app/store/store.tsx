"use client";

import { create } from "zustand";
import { ProductType } from "@/types/product";
import { persist } from "zustand/middleware";

interface StoreState {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen?: boolean) => void;
  cartItems: ProductType[];
  addToCart: (product: ProductType, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>()(persist(
  (set) => ({
  isCartOpen: false,

  setIsCartOpen: (isOpen) =>
    set((state) => ({
      isCartOpen: isOpen !== undefined ? isOpen : !state.isCartOpen,
    })),

  cartItems: [],

  addToCart: (product, quantity) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity ?? 0) + quantity }
              : item,
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...product, quantity }],
        };
      }
    }),
    removeFromCart: (productId) =>
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== productId),
      })),

    clearCart: () => set({ cartItems: [] }),
  }),
  {
    name: "cart-storage",
    partialize: (state) => ({ cartItems: state.cartItems }),
  }
));
