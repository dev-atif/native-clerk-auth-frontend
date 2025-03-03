import * as SecureStore from "expo-secure-store";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { Product } from "@/mock";

interface CartItem extends Product {
  quantity: number;
}

interface ProductStoreState {
  Cart: CartItem[];
  addCart: (product: Product) => void;
  deleteProduct: (id: number) => void;
  decrementCart: (id: number) => void;
}
//Storage for secure storage of data in the device using expo-secure-store library
const secureStorage = {
  getItem: async (name: string) => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useProductStore = create<ProductStoreState>()(
  persist(
    (set) => ({
      Cart: [],
      addCart: (product: Product) =>
        set((state) => {
          const productExists = state.Cart.some(
            (item) => item.id === product.id
          );

          if (productExists) {
            // If product exists, increase quantity
            return {
              Cart: state.Cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            // If new product, add with quantity 1
            return {
              Cart: [
                ...state.Cart,
                //@ts-ignore
                { ...product, quantity: product?.quantity },
              ],
            };
          }
        }),

      deleteProduct: (id: number) => {
        set((state) => ({
          Cart: state.Cart.filter((item) => item.id !== id),
        }));
      },
      decrementCart: (id: number) => {
        set((state) => ({
          Cart: state.Cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ).filter((item) => item.quantity > 0),
        }));
      },
    }),
    {
      name: "product-storage",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
