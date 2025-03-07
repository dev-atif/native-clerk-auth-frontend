import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { ProductData } from "@/mock";
import LongCard from "@/components/products-card/LongCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useProductStore } from "@/store/ProductStore";
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";
import { useCartPrice } from "@/Hooks/useCartPrice";
import { useAddressStore } from "@/store/UserAddress";
const Summary = () => {
  const router = useRouter();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { Cart } = useProductStore();
  const { finalTotal } = useCartPrice();
  const { addresses, currentAddressIndex } = useAddressStore();

  const CreateOrder = async () => {
    try {
      setLoading(true);
      const orderData = {
        userId: user?.id,
        name: user?.username,
        number: user?.unsafeMetadata?.number,
        email: user?.emailAddresses[0]?.emailAddress,
        totalamount: finalTotal,
        address:
          currentAddressIndex !== null && currentAddressIndex !== undefined
            ? addresses[currentAddressIndex].address
            : null,
        product: Cart,
      };
      const response = await axios.post(
        "http://192.168.18.107:3333/api/order/create",
        orderData
      );
      if (response) {
        setSuccess(true);
        ToastAndroid.show(
          "Order Has been Placed Successfully!",
          ToastAndroid.LONG
        );
      }
    } catch (error: any) {
      console.error(
        "CreateOrder Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      setSuccess(false);
    }, [])
  );
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
                      onPress={() => router.replace("/(auth)/(home)")}
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
                      onPress={() => router.push("/(auth)/(home)")}
                      name="arrow-left-circle"
                      size={30}
                      color="black"
                    />
                    <Text className="tracking-wider font-medium text-xl text-center">
                      Review Summary
                    </Text>
                  </View>
                  <View>
                    {Cart.map((item) => (
                      //@ts-ignore
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
                        {new Date().toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "2-digit",
                        })}{" "}
                        |{" "}
                        {new Date().toLocaleString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
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
                <Pressable
                  onPress={() => router.replace("/(auth)/order")}
                  className="flex items-center justify-center gap-3 bg-green-700 flex-row py-3 w-full rounded-lg"
                >
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
                  onPress={CreateOrder}
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
