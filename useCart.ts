import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: number, color: string) => void;
  removeItem: (itemId: string, size: number, color: string) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (product, size, color) => {
        const items = get().items;
        const existingItem = items.find(
          (i) => i.id === product.id && i.selectedSize === size && i.selectedColor === color
        );

        if (existingItem) {
          existingItem.quantity += 1;
          set({ 
            items: [...items],
            total: get().total + product.price
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1, selectedSize: size, selectedColor: color }],
            total: get().total + product.price
          });
        }
      },
      removeItem: (itemId, size, color) => {
        const items = get().items;
        const itemToRemove = items.find(
          (i) => i.id === itemId && i.selectedSize === size && i.selectedColor === color
        );
        
        if (!itemToRemove) return;

        const newItems = items.filter(
          (i) => !(i.id === itemId && i.selectedSize === size && i.selectedColor === color)
        );

        set({
          items: newItems,
          total: get().total - (itemToRemove.price * itemToRemove.quantity)
        });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'nike-cart-storage',
    }
  )
);
