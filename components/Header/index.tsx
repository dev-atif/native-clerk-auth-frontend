import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useProductStore } from "@/store/ProductStore";

const Header = () => {
  const { isLoaded, user } = useUser();
  const { Cart } = useProductStore();
  const router = useRouter();
  if (!isLoaded) return;
  return (
    <View className=" bg-white pt-12 pb-2 flex px-4 justify-center ">
      <View className="flex items-center flex-row justify-between">
        <View className="">
          <Image
            source={user?.imageUrl ? { uri: user.imageUrl } : undefined}
            className="w-14 h-14 rounded-full "
            resizeMode="cover"
          />
        </View>
        <View className="flex items-center flex-row-reverse gap-2">
          <Pressable
            onPress={() => router.replace("/Profile")}
            className="  p-2 rounded-full"
          >
            <Feather name="edit" size={25} color="green" />
          </Pressable>
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
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
