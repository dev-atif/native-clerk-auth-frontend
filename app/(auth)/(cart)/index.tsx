import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { ProductData } from "@/mock";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import LongCard from "@/components/products-card/LongCard";
const cart = () => {
  useEffect(() => {
    console.log("Cart component mounted");
  }, []);

  console.log("Cart is rendering...");
  const { height } = Dimensions.get("window");
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="mt-14 ">
        <View>
          <View className="flex flex-row items-center gap-24 px-4">
            <Feather name="arrow-left-circle" size={30} color="black" />
            <Text className="tracking-wider font-medium text-xl text-center ">
              Shopping Cart
            </Text>
          </View>
          <View>
            <FlatList
              style={{ paddingHorizontal: 10, height: height - 120 }}
              data={ProductData}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <LongCard item={item} />}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
          <View
            className="h-20 w-full bg-white rounded-t-xl px-4 flex items-center justify-between flex-row"
            style={{ elevation: 7 }}
          >
            <View>
              <Text className="text-gray-400">Total Price</Text>
              <Text className="text-xl font-semibold">$12.00</Text>
            </View>
            <Pressable className="flex items-center justify-center gap-3 bg-green-700 flex-row py-3 w-1/2 rounded-lg">
              <FontAwesome6 name="square-check" size={24} color="white" />
              <Text className="text-white font-semibold">Check Out</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default cart;

const styles = StyleSheet.create({});
