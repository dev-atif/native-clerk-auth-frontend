import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
interface Address {
  title: string;
  address: string;
}

interface AddressStore {
  addresses: Address[];

  setCurrentAddress: (index: number) => void;
  currentAddressIndex: number | null;
  addAddress: (address: Address) => void;
  removeAddress: (index: number) => void;
}
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
export const useAddressStore = create<
  AddressStore,
  [["zustand/persist", unknown]]
>(
  persist(
    (set) => ({
      addresses: [],
      currentAddressIndex: null,
      addAddress: (address) =>
        set((state) => ({ addresses: [...state.addresses, address] })),

      removeAddress: (index) =>
        set((state) => ({
          addresses: state.addresses.filter((_, i) => i !== index),
        })),
      setCurrentAddress: (index: number) =>
        set(() => ({ currentAddressIndex: index })),
    }),

    {
      name: "address-storage",
      storage: createJSONStorage(() => secureStorage), // using localStorage
    }
  )
);
