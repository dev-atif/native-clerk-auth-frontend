import { Product } from "@/mock";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductStoreState {
  Cart: Product[];
  addCart: (product: Product) => void;
}

export const useProductStore = create<ProductStoreState>()(
  persist(
    (set) => ({
      Cart: [],
      addCart: (product: Product) =>
        set((s) => {
          console.log("🚀 Product added to cart:", product);
          return { Cart: [...s.Cart, product] };
        }),
    }),
    { name: "product-storage" }
  )
);
