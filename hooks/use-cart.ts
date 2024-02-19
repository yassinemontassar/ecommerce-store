import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';
interface CartItem extends Product {
  quantity: number;
  taille: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product, quantity: number, taille: string) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateTaille: (id: string, taille: string) => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product, quantity: number, taille: string) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast.error(`${data.name} déjà dans le panier`, { position: 'bottom-center' });

      }

      const newItem: CartItem = { ...data, quantity: 1, taille: ''};
      set({ items: [...get().items, newItem] });
      toast.success(`${data.name} ajouté au panier`, { position: 'bottom-center' });
    },
    removeItem: (id: string) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast.success('Article retiré du panier');
    },
    removeAll: () => set({ items: [] }),

    updateQuantity: (id: string, quantity: number) => {
      const updatedItems = get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      set({ items: updatedItems });
      
    },

    updateTaille: (id: string, taille: string) => {
      const updatedItems = get().items.map((item) =>
        item.id === id ? { ...item, taille } : item
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
