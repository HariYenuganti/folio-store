"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (item: CartItem) => void;
  remove: (productId: string, size: string, color: string) => void;
  setQuantity: (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const sameLine = (a: CartItem, b: CartItem) =>
  a.productId === b.productId && a.size === b.size && a.color === b.color;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => sameLine(i, item));
          if (existing) {
            return {
              items: s.items.map((i) =>
                sameLine(i, item)
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return { items: [...s.items, item], isOpen: true };
        }),
      remove: (productId, size, color) =>
        set((s) => ({
          items: s.items.filter(
            (i) =>
              !(i.productId === productId && i.size === size && i.color === color)
          ),
        })),
      setQuantity: (productId, size, color, quantity) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.productId === productId && i.size === size && i.color === color
                ? { ...i, quantity: Math.max(1, quantity) }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "form-cart", partialize: (s) => ({ items: s.items }) }
  )
);

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const cartCount = (items: CartItem[]) =>
  items.reduce((n, i) => n + i.quantity, 0);
