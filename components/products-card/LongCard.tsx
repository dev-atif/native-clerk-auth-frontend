import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
interface LongCardProps {
  item: {
    id: number;
    name: string;
    image: any;
    discount: string;
    weight: string;
    rating: number;
    description: string;
    originalPrice: number;
    salePrice: number;
  };
}
const renderRightActions = () => {
  return (
    <View className="bg-red-300 mt-4 p-5 rounded-lg flex items-center justify-center">
      <MaterialCommunityIcons name="delete-sweep" size={30} color="white" />
    </View>
  );
};
const LongCard: React.FC<LongCardProps> = ({ item }) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View className=" mt-4 p-3 rounded-lg shadow-lg bg-white">
        <View className="flex flex-row gap-2 items-center">
          <View className="bg-gray-200 rounded-lg ">
            <Image source={item.image} className="w-32 h-32" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-gray-400">{item.weight}</Text>
            <View className="flex items-center flex-row gap-1">
              <Text className="text-green-700 font-medium">
                ${item.salePrice}
              </Text>
              <Text className="text-gray-400 line-through">
                ${item.originalPrice}
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Pressable className="bg-gray-300 p-1 rounded-lg mt-2 flex items-center justify-between flex-row">
                <AntDesign name="minus" size={24} color="black" />
              </Pressable>
              <Text className="  text-center">{1} kg</Text>
              <Pressable className="bg-green-700 p-1 rounded-lg mt-2 flex items-center justify-between flex-row">
                <AntDesign name="plus" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default LongCard;

const styles = StyleSheet.create({});
