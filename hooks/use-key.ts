import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
interface KeyStore {
  key: string | null;
  addKey: () => void;
  removeKey: () => void;
  getKey: () => string | null
}

const useKeyManager = create(
  persist<KeyStore>((set, get) => ({
    key: null,
    addKey: () => {
      // Check if a key already exists
      set((currentState) => {
        if (currentState.key) {
        //  toast.error("Check your email");
          return currentState;
        }

//         const timestamp = new Date().getTime();
// const randomPart = Math.floor(Math.random() * 10000); 
const generatedKey = uuidv4();
        return { ...currentState, key: generatedKey };
      });
    },

    getKey: () => {
      return get().key;
    },


    removeKey: () => {
      set({ key: null });
    },
  }), {
    name: 'key-storage',
    storage: createJSONStorage(() => localStorage),
  })
);

export default useKeyManager;
