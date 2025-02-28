import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
interface Product {
  id: number;
  name: string;
  image: any;
  discount: string;
  weight: string;
}
interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { width: screenWidth } = Dimensions.get("window");
  const route = useRouter();
  return (
    <Pressable
      onPress={() =>
        route.push({
          pathname: "/(auth)/(home)/singleproduct",
          params: { item: JSON.stringify(item) },
        })
      }
      style={{ elevation: 5, width: screenWidth / 2 - 32 }}
      className="bg-white p-2 rounded-lg mb-5"
    >
      <View className="flex bg-gray-100 items-center justify-center rounded-lg h-36  relative">
        <Image source={item.image} className="w-28 h-28" />
        <Text className="text-white bg-green-700 px-4 py-1 text-sm absolute top-0 left-0 rounded-tl-lg rounded-br-lg">
          {item.discount}
        </Text>
        <View className="absolute top-1 right-1">
          <AntDesign name="heart" size={20} color="green" />
        </View>
      </View>
      <View>
        <Text className=" text-base my-1">{item.name}</Text>
      </View>
      <View className=" flex items-center justify-between flex-row">
        <Text>{item.weight}</Text>
        <Pressable className="bg-green-700 py-1 w-1/2 rounded-lg">
          <Text className="text-white text-center">Buy</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
