import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useProductStore } from "@/store/ProductStore";

const CartIcon = () => {
  const router = useRouter();
  const { Cart } = useProductStore();
  return (
    <Pressable
      onPress={() => router.push("/cart")}
      className="  p-2 rounded-full"
    >
      <Feather name="shopping-cart" size={24} color="green" />
      {Cart.length > 0 ? (
        <>
          <View className="w-3 h-3 bg-red-500 rounded-full absolute right-1 top-2" />
        </>
      ) : null}
    </Pressable>
  );
};

export default CartIcon;

const styles = StyleSheet.create({});
