import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";
import { Order } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
const order = () => {
  const { user } = useUser();
  const [order, setOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://192.168.18.107:3333/api/order/${user?.id}`
          );
          setOrder(response.data.data);
        } catch (error) {
          console.log("error", error);
        } finally {
          setLoading(false);
        }
      })();
    }, [])
  );
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          <View>
            <View>
              <Text className="text-xl font-semibold tracking-wider text-center my-8">
                Order List
              </Text>
            </View>
            {loading ? (
              <>
                <View className="h-96 flex items-center justify-center">
                  <ActivityIndicator color={"green"} size={50} />
                </View>
              </>
            ) : (
              <>
                <View>
                  <FlatList
                    data={order}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <View className="mt-4 p-4">
                        <View className="border border-gray-300  rounded-xl">
                          <View className=" px-2 py-3 flex items-center flex-row justify-between">
                            <View>
                              <Text className="text-sm text-gray-400 font-medium ">
                                {item.email}
                              </Text>
                            </View>
                            <View>
                              <Text
                                className={`text-sm text-white  px-2 pb-1 rounded-full text-center ${
                                  item.status === "Inprocess"
                                    ? "bg-yellow-700"
                                    : "bg-green-700"
                                }`}
                              >
                                {item.status}
                              </Text>
                            </View>
                          </View>
                          {/* <View className="w-full h-[0.5px] bg-gray-300" /> */}
                          <View className="px-4">
                            <View className="flex items-center justify-between flex-row ">
                              <Text className="text-sm text-gray-400">
                                Name
                              </Text>
                              <Text className="text-sm">{item.name}</Text>
                            </View>
                            <View className="flex items-center justify-between flex-row py-1">
                              <Text className="text-sm text-gray-400">
                                Number
                              </Text>
                              <Text className="text-sm">
                                {item.number ? item.number : "N/A"}
                              </Text>
                            </View>
                            <View className="flex items-center justify-between flex-row py-1">
                              <Text className="text-sm text-gray-400">
                                Place Order at
                              </Text>
                              <Text className="text-sm">
                                {`${new Date(item.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "2-digit",
                                  }
                                )} | ${new Date(item.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}`}
                              </Text>
                            </View>
                            <View className="flex items-center justify-between flex-row py-1">
                              <Text className="text-sm text-gray-400">
                                Total Bill
                              </Text>
                              <Text className="text-sm">
                                {item.totalamount
                                  ? `$ ${Math.round(item.totalamount)}`
                                  : "N/A"}
                              </Text>
                            </View>
                            <View>
                              <Text className=" text-xl text-center font-medium text-green-700 tracking-wider">
                                Orders
                              </Text>
                              <View>
                                {item.product.map((item, idx) => (
                                  <View key={idx} className="my-3">
                                    <View className="flex items-start flex-row  gap-2">
                                      <View>
                                        <Image
                                          source={{ uri: item.image }}
                                          className="w-20 h-20 "
                                        />
                                      </View>
                                      <View className="flex-1">
                                        <Text className="text-sm font-medium">
                                          {item.name}
                                        </Text>
                                        <View className="flex items-center flex-row gap-2">
                                          <Text
                                            className={`text-sm font-medium  ${
                                              item.salePrice
                                                ? "line-through text-gray-400 decoration-gray-400  "
                                                : " text-green-700"
                                            }`}
                                          >
                                            ${Math.round(item.originalPrice)}
                                          </Text>
                                          {item.salePrice && (
                                            <Text className="text-sm font-medium text-green-700">
                                              ${Math.round(item.salePrice)}
                                            </Text>
                                          )}
                                        </View>
                                        <View className="flex items-center justify-between flex-row">
                                          <View className="flex items-center flex-row gap-2">
                                            <Text className="text-sm text-gray-400 font-medium">
                                              Quantity
                                            </Text>
                                            <Text className="text-sm font-semibold">
                                              {item.quantity}
                                            </Text>
                                          </View>
                                          <View className="flex items-center gap-1 flex-row">
                                            <AntDesign
                                              name="star"
                                              size={20}
                                              color="orange"
                                            />
                                            <Text className="text-sm">
                                              {item.rating.toFixed(1)}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                ))}
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                    ListEmptyComponent={
                      <Text className="text-3xl text-center">
                        No orders found
                      </Text>
                    }
                    contentContainerStyle={{ paddingBottom: 300 }}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default order;

const styles = StyleSheet.create({});
