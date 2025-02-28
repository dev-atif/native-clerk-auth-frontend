import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import vagetable from "../assets/images/vegetable.png";
import fruits from "../assets/images/fruits.png";
import mEg from "../assets/images/dairy-products.png";
import drinks from "../assets/images/cocktail.png";
import { Image } from "react-native";
const Categories = () => {
  return (
    <View>
      <View className="flex items-baseline justify-between flex-row">
        <Text className="text-2xl font-semibold">Category</Text>
        <Pressable>
          <Text className="text-green-700 font-medium">See All</Text>
        </Pressable>
      </View>
      <View className="my-4">
        <View className="flex items-center justify-between flex-row">
          <Pressable className="flex items-center justify-center ">
            <View className="bg-gray-100  rounded-full w-3/4 flex items-center justify-center py-[9px]">
              <Image source={vagetable} className="w-10 h-10" />
            </View>
            <Text className="text-sm">Vagetables</Text>
          </Pressable>
          <Pressable className="flex items-center justify-center ">
            <View className="bg-gray-100  rounded-full w-16 flex items-center justify-center py-[10px]">
              <Image source={fruits} className="w-10 h-10" />
            </View>
            <Text className="text-sm">Fruits</Text>
          </Pressable>
          <Pressable>
            <View className="bg-gray-100  rounded-full  w-16 flex items-center justify-center py-[10px]">
              <Image source={mEg} className="w-10 h-10" />
            </View>
            <Text className="text-sm">Milk&Egg</Text>
          </Pressable>
          <Pressable className="flex items-center justify-center ">
            <View className="bg-gray-100  rounded-full w-16 flex items-center justify-center py-[10px]">
              <Image source={drinks} className="w-10 h-10" />
            </View>
            <Text className="text-sm">Drinks</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
