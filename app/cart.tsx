import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { ProductData } from "@/mock";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import LongCard from "@/components/products-card/LongCard";
import CustomBottomSheet from "@/components/bottom-sheet/CustomBottomSheet";
import { useFocusEffect, useRouter } from "expo-router";
import { useProductStore } from "@/store/ProductStore";
import { useCartPrice } from "@/Hooks/useCartPrice";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const [IsBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const { height } = Dimensions.get("window");
  const router = useRouter();
  const { Cart } = useProductStore();
  const { totalPrice, deliveryCharge, finalTotal } = useCartPrice();
  useFocusEffect(
    useCallback(() => {
      setIsBottomSheetVisible(false);
    }, [])
  );
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView>
        {Cart.length > 0 ? (
          <>
            <View className="mt-4 " style={{ position: "relative" }}>
              <View className="flex flex-row items-center gap-24 px-4">
                <Feather
                  onPress={() => router.replace("/(auth)/(home)")}
                  name="arrow-left-circle"
                  size={30}
                  color="black"
                />
                <Text className="tracking-wider font-medium text-xl text-center">
                  Shopping Cart
                </Text>
              </View>

              <FlatList
                style={{ paddingHorizontal: 10, height: height - 115 }}
                data={Cart}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <LongCard QuantityButtons item={item} />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
              />

              {/* Checkout Section */}
              <View
                className="h-20 w-full bg-white rounded-t-xl px-4 flex items-center justify-between flex-row"
                style={{ elevation: 7 }}
              >
                <View>
                  <Text className="text-gray-400">Total Price</Text>
                  <Text className="text-xl font-semibold">
                    {totalPrice.toFixed(2)} $
                  </Text>
                </View>
                <Pressable
                  onPress={() => setIsBottomSheetVisible(true)}
                  className="flex items-center justify-center gap-3 bg-green-700 flex-row py-3 w-1/2 rounded-lg"
                >
                  <FontAwesome6 name="square-check" size={24} color="white" />
                  <Text className="text-white font-semibold">Check Out</Text>
                </Pressable>
              </View>

              {IsBottomSheetVisible ? (
                <>
                  <View style={{ position: "absolute", bottom: 0 }}>
                    <CustomBottomSheet
                      snapPoints={["47%"]}
                      setIsBottomSheetVisible={setIsBottomSheetVisible}
                    >
                      <View>
                        <View className="bg-gray-200 rounded-lg flex items-center justify-between flex-row ">
                          <View className="px-2">
                            <TextInput placeholder="Promo Code" />
                          </View>
                          <Pressable className="bg-green-700 py-3 w-32 rounded-lg">
                            <Text className="text-white text-center">
                              Apply
                            </Text>
                          </Pressable>
                        </View>
                        <View className="px-4">
                          <View className="flex flex-row justify-between mt-4">
                            <Text className=" text-xl text-gray-400 mt-2">
                              Sub Total
                            </Text>
                            <Text className=" text-xl font-medium  mt-2">
                              ${totalPrice.toFixed(2)}
                            </Text>
                          </View>
                          <View className="flex flex-row justify-between my-2">
                            <Text className=" text-xl text-gray-400 ">
                              Delivery Fee
                            </Text>
                            <Text className=" text-xl font-medium  ">
                              ${deliveryCharge}
                            </Text>
                          </View>
                          <View className="flex flex-row justify-between ">
                            <Text className=" text-xl text-gray-400 ">
                              Discount
                            </Text>
                            <Text className=" text-xl font-medium  ">
                              $10.00
                            </Text>
                          </View>
                          <View className="bg-gray-300 w-full h-[0.5px] my-6" />
                          <View className="flex flex-row justify-between ">
                            <Text className=" text-xl text-gray-400 ">
                              Total Cost
                            </Text>
                            <Text className=" text-xl font-medium  ">
                              $ {finalTotal.toFixed(2)}
                            </Text>
                          </View>
                          {/* __________Button________________ */}
                          <Pressable
                            onPress={() => router.navigate("/checkout")}
                            className="bg-green-700 py-3 w-full rounded-lg mt-6"
                          >
                            <Text className="text-white text-center font-medium">
                              Proceed to Checkout
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </CustomBottomSheet>
                  </View>
                </>
              ) : null}
            </View>
          </>
        ) : (
          <>
            <View>
              <View className="flex flex-row items-center gap-24 px-4 mt-6">
                <Feather
                  onPress={() => router.replace("/(auth)/(home)")}
                  name="arrow-left-circle"
                  size={30}
                  color="black"
                />
                <Text className="tracking-wider font-medium text-xl text-center">
                  Shopping Cart
                </Text>
              </View>
              <View
                style={{
                  height: 550,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text className="text-3xl text-green-700 px-4 text-center">
                  Cart Is Empty
                </Text>
                <Text className="text-center my-4 text-gray-400">
                  Please Select Product to place order{" "}
                </Text>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Cart;
