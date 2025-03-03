import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ProductData } from "@/mock";
import LongCard from "@/components/products-card/LongCard";
import Ionicons from "@expo/vector-icons/Ionicons";
const Summary = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(true);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ScrollView
            className="px-4 "
            style={{ flex: 1, backgroundColor: "white" }}
          >
            {success ? (
              <>
                <View className="">
                  {/* Back Button - Fixed Height */}
                  <View className="mt-8">
                    <Feather
                      onPress={() => router.push("/(auth)/(home)")}
                      name="arrow-left-circle"
                      size={30}
                      color="black"
                    />
                  </View>

                  {/* Success Message - Takes Remaining Height */}
                  <View
                    style={{
                      height: Dimensions.get("window").height - 150,
                    }}
                    className="flex items-center justify-center"
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={200}
                      color="green"
                    />
                    <Text className="font-semibold px-8 text-2xl text-center">
                      Your Order Is Successfully Done
                    </Text>
                    <Text className="text-center text-gray-400 mt-6 px-8">
                      You can track the Delivery in the "My Orders" section
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <>
                <View>
                  <View className="flex flex-row items-center gap-24  mt-8">
                    <Feather
                      onPress={() => router.back()}
                      name="arrow-left-circle"
                      size={30}
                      color="black"
                    />
                    <Text className="tracking-wider font-medium text-xl text-center">
                      Review Summary
                    </Text>
                  </View>
                  <View>
                    {ProductData.slice(0, 2).map((item) => (
                      <LongCard item={item} key={item.id} />
                    ))}
                  </View>
                  {/* _____Details--____________________ */}
                  <View>
                    <View className=" flex items-center justify-between flex-row mt-4">
                      <Text className="text-gray-400 text-base tracking-wider">
                        Order Date
                      </Text>
                      <Text className="text-gray-400 text-base ">
                        12th May 2021 | 12:00 PM
                      </Text>
                    </View>
                    <View className=" flex items-center justify-between flex-row mt-4">
                      <Text className="text-gray-400 text-base tracking-wider">
                        Promo Code
                      </Text>
                      <Text className="text-gray-400 text-base ">
                        asdaqedasd
                      </Text>
                    </View>
                    <View className=" flex items-center justify-between flex-row mt-4">
                      <Text className="text-gray-400 text-base tracking-wider">
                        Expected Delivery Date
                      </Text>
                      <Text className="text-gray-400 text-base ">
                        12th May 2021
                      </Text>
                    </View>
                    <View className="w-full h-[0.5px] bg-gray-200 mt-8" />
                    <View className=" flex items-center justify-between flex-row mt-4">
                      <Text className="text-gray-400 text-base tracking-wider">
                        Amount
                      </Text>
                      <Text className="text-gray-400 text-base ">$20.00</Text>
                    </View>
                    <View className=" flex items-center justify-between flex-row mt-4">
                      <Text className="text-gray-400 text-base tracking-wider">
                        Delivery Charges
                      </Text>
                      <Text className="text-gray-400 text-base ">$05.00</Text>
                    </View>
                    <View className=" flex items-center justify-between flex-row mt-4">
                      <Text className="text-gray-400 text-base tracking-wider">
                        Tax
                      </Text>
                      <Text className="text-gray-400 text-base ">$00.00</Text>
                    </View>
                    <View className=" flex items-center justify-between flex-row my-4">
                      <Text className="text-gray-400 text-base tracking-wider">
                        Discount
                      </Text>
                      <Text className="text-gray-400 text-base ">$05.00</Text>
                    </View>
                  </View>
                </View>
              </>
            )}
          </ScrollView>
          {success ? (
            <>
              <View
                className="h-32 w-full bg-white rounded-t-xl px-4 py-3 flex items-center flex-col justify-between "
                style={{ elevation: 7 }}
              >
                <Pressable className="flex items-center justify-center gap-3 bg-green-700 flex-row py-3 w-full rounded-lg">
                  <Text className="text-white font-semibold">View Order</Text>
                </Pressable>
                <Pressable>
                  <Text className="text-green-700 font-semibold">
                    View E-Receipt
                  </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <View
                className="h-20 w-full bg-white rounded-t-xl px-4 flex items-center justify-between flex-row"
                style={{ elevation: 7 }}
              >
                <Pressable
                  onPress={() => router.navigate("/Summary")}
                  className="flex items-center justify-center gap-3 bg-green-700 flex-row py-3 w-full rounded-lg"
                >
                  <Text className="text-white font-semibold">Continue</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Summary;

const styles = StyleSheet.create({});
