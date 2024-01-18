import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import toast from "react-hot-toast";
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

        const timestamp = new Date().getTime();
const randomPart = Math.floor(Math.random() * 10000); // Adjust the range as needed
const generatedKey = `${timestamp.toString(36)}_${randomPart.toString(36)}`;
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
