import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Feather from "@expo/vector-icons/Feather";
const singleproduct = () => {
  const route = useRouter();
  const { item } = useLocalSearchParams();
  const product = item ? JSON.parse(item as string) : null;

  if (!product) return <Text>Loading...</Text>;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1 }}>
        <View className="bg-gray-100 pt-16">
          <View className="px-4 mt-4 flex items-center justify-between flex-row">
            <EvilIcons
              onPress={() => route.back()}
              name="arrow-left"
              size={40}
              color="black"
            />
            <Text className="text-lg font-medium">Details</Text>
            <FontAwesome6 name="heart" size={24} color="black" />
          </View>
          <View>
            <View className="flex items-center justify-center">
              <Image source={product.image} className="w-80 h-80" />
            </View>
          </View>
        </View>
        <View className="mt-4 px-4 flex items-center justify-between flex-row">
          <Text className="text-lg font-bold text-gray-400">Fruit</Text>
          <View className="flex items-center gap-2 flex-row">
            <Pressable className="bg-gray-300 p-1 rounded-lg mt-2 flex items-center justify-between flex-row">
              <AntDesign name="minus" size={24} color="black" />
            </Pressable>
            <Text className=" w-12 text-center">{1} kg</Text>
            <Pressable className="bg-green-700 p-1 rounded-lg mt-2 flex items-center justify-between flex-row">
              <AntDesign name="plus" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <View className="px-4">
          <Text className="text-2xl font-medium tracking-wider ">
            {product?.name}
          </Text>
          <View className="-ml-3 mt-2">
            <StarRatingDisplay
              starSize={30}
              emptyColor="lightgray"
              rating={product?.rating}
            />
          </View>
          <View className="my-4">
            <Text className="text-xl font-bold ">Product Details</Text>
            <Text>{product?.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View>
        <View
          className="h-20 w-full bg-white rounded-t-xl px-4 flex items-center justify-between flex-row"
          style={{ elevation: 7 }}
        >
          <View>
            <Text className="text-gray-400">Total Price</Text>
            <Text className="text-xl font-semibold">$12.00</Text>
          </View>
          <Pressable
            onPress={() => route.navigate("/(auth)/(cart)")}
            className="flex items-center justify-center gap-3 bg-green-700 flex-row py-3 w-1/2 rounded-lg"
          >
            <Feather name="shopping-cart" size={24} color="white" />
            <Text className="text-white font-semibold">Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default singleproduct;

const styles = StyleSheet.create({});
