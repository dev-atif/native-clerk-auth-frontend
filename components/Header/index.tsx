import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useProductStore } from "@/store/ProductStore";
import CartIcon from "../cartIcon";
import LogOut from "../LogOut";
import { useUser } from "@clerk/clerk-expo";

const Header = () => {
  const { isLoaded, user } = useUser();
  const { Cart } = useProductStore();
  const router = useRouter();

  if (!isLoaded) return;
  return (
    <View className=" bg-white pt-12 pb-2 flex px-4 justify-center ">
      <View className="flex items-center flex-row justify-between">
        <View style={{ elevation: 6 }}>
          <Image
            source={user?.imageUrl ? { uri: user.imageUrl } : undefined}
            className="w-14 h-14 rounded-full"
            resizeMode="cover"
          />
        </View>
        <View className="flex items-center flex-row-reverse gap-2">
          <LogOut />
          <Pressable
            onPress={() => router.replace("/Profile")}
            className="  p-2 rounded-full"
          >
            <Feather name="edit" size={25} color="green" />
          </Pressable>
          <CartIcon />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
