import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { Product } from "@/mock";
import { Products } from "@/types";

// Secure storage configuration
const secureStorage = {
  getItem: async (name: string) => SecureStore.getItemAsync(name),
  setItem: async (name: string, value: string) =>
    SecureStore.setItemAsync(name, value),
  removeItem: async (name: string) => SecureStore.deleteItemAsync(name),
};

interface FavProduct extends Products {
  userId: string;
}

interface FavProductStore {
  FavProduct: FavProduct[];
  setFav: (product: FavProduct) => void;
}

export const useFavouriteProduct = create<FavProductStore>()(
  persist(
    (set) => ({
      FavProduct: [],
      setFav: (product: FavProduct) => {
        set((state) => {
          const exists = state.FavProduct.some((p) => p.id === product.id);
          return {
            FavProduct: exists
              ? state.FavProduct.filter((p) => p.id !== product.id)
              : [...state.FavProduct, product],
          };
        });
      },
    }),
    {
      name: "fav-product-storage",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
