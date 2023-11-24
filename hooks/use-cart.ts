import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Product } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product, quantity: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product, quantity: number) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast('Item already in cart.');
      }

      const newItem: CartItem = { ...data, quantity: 1 };
      set({ items: [...get().items, newItem] });
      toast.success('Item added to cart.');
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast.success('Item removed from cart.');
    },
    removeAll: () => set({ items: [] }),

    updateQuantity: (id: string, quantity: number) => {
      const updatedItems = get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      set({ items: updatedItems });
      
    },
  }), 
  
  {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage),
  })
);

export default useCart;
