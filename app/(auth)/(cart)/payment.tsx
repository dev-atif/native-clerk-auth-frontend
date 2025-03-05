import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CheckBox } from "react-native-elements";
import { useState } from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomBottomSheet from "@/components/bottom-sheet/CustomBottomSheet";
import InputFields from "@/components/InputFields";
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";
import { useProductStore } from "@/store/ProductStore";
import { useCartPrice } from "@/Hooks/useCartPrice";
import { useAddressStore } from "@/store/UserAddress";
import { ActivityIndicator } from "react-native";
const payment = () => {
  const [paymentmethod, setPaymentmethod] = useState("");
  const [IsBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ScrollView
            className="px-4 "
            style={{ flex: 1, backgroundColor: "white" }}
          >
            <View className="flex flex-row items-center gap-24  mt-8">
              <Feather
                onPress={() => router.back()}
                name="arrow-left-circle"
                size={30}
                color="black"
              />
              <Text className="tracking-wider font-medium text-xl text-center">
                Checkout
              </Text>
            </View>
            <View className="mt-6">
              <Text className=" font-medium text-xl">Cash </Text>
              <Pressable
                onPress={() => setPaymentmethod("Cash")}
                className="flex items-center justify-between flex-row border border-gray-200 rounded-xl  mt-4"
              >
                <View className="flex items-center flex-row gap-2 px-4">
                  <Ionicons name="cash-outline" size={24} color="green" />
                  <Text className="  text-lg text-gray-400">Cash </Text>
                </View>
                <CheckBox
                  checked={paymentmethod === "Cash"}
                  onPress={() => setPaymentmethod("Cash")}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="green"
                />
              </Pressable>
            </View>
            <View className="mt-6">
              <Text className=" font-medium text-xl">Wallet </Text>
              <Pressable
                onPress={() => setPaymentmethod("Wallet")}
                className="flex items-center justify-between flex-row border border-gray-200 rounded-xl  mt-4"
              >
                <View className="flex items-center flex-row gap-2 px-4">
                  <Ionicons name="wallet-outline" size={24} color="green" />
                  <Text className="  text-lg text-gray-400">Wallet </Text>
                </View>
                <CheckBox
                  checked={paymentmethod === "Wallet"}
                  onPress={() => setPaymentmethod("Wallet")}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checkedColor="green"
                />
              </Pressable>
            </View>
            <View className="mt-6">
              <Text className=" font-medium text-xl">Credit & Debit Card </Text>
              <Pressable
                onPress={() => setIsBottomSheetVisible(true)}
                className="flex items-center justify-between flex-row border pr-3 border-gray-200 rounded-xl py-4  mt-4"
              >
                <View className="flex items-center flex-row gap-2 px-4">
                  <Ionicons name="card-outline" size={24} color="green" />
                  <Text className="  text-lg text-gray-400">Add Card</Text>
                </View>
                <SimpleLineIcons name="arrow-right" size={24} color="green" />
              </Pressable>
            </View>
            <View className="mt-6 mb-8">
              <Text className=" font-medium text-xl">More Options </Text>
              <View className="border border-gray-200 rounded-xl  mt-4">
                <View className="flex items-center justify-between flex-row ">
                  <View className="flex items-center flex-row gap-2 pl-4">
                    <Entypo name="paypal" size={24} color="green" />
                    <Text className="  text-lg text-gray-400">Paypal </Text>
                  </View>
                  <CheckBox
                    checked={paymentmethod === "Paypal"}
                    onPress={() => setPaymentmethod("Paypal")}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="green"
                  />
                </View>
                <View className="flex items-center justify-between flex-row border-t border-b border-gray-200">
                  <View className="flex items-center flex-row gap-2 pl-4">
                    <FontAwesome6 name="cc-apple-pay" size={24} color="green" />
                    <Text className="  text-lg text-gray-400">Apple Pay </Text>
                  </View>
                  <CheckBox
                    checked={paymentmethod === "ApplePay"}
                    onPress={() => setPaymentmethod("ApplePay")}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="green"
                  />
                </View>
                <View className="flex items-center justify-between flex-row ">
                  <View className="flex items-center flex-row gap-2 pl-4">
                    <FontAwesome5 name="google-pay" size={24} color="green" />
                    <Text className="  text-lg text-gray-400">Google Pay </Text>
                  </View>
                  <CheckBox
                    checked={paymentmethod === "GooglePay"}
                    onPress={() => setPaymentmethod("GooglePay")}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="green"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            className="h-20 w-full bg-white rounded-t-xl px-4 flex items-center justify-between flex-row"
            style={{ elevation: 7 }}
          >
            <Pressable
              // onPress={CreateOrder}
              onPress={() => router.replace("/(auth)/(cart)/Summary")}
              className="flex items-center justify-center gap-3 bg-green-700 flex-row py-3 w-full rounded-lg"
            >
              {loading ? (
                <>
                  <ActivityIndicator color={"white"} size={20} />
                </>
              ) : (
                <>
                  <Text className="text-white font-semibold">
                    Confirm payment
                  </Text>
                </>
              )}
            </Pressable>
          </View>

          {IsBottomSheetVisible ? (
            <>
              <View style={{ position: "absolute", bottom: 0 }}>
                <CustomBottomSheet
                  snapPoints={["100%"]}
                  setIsBottomSheetVisible={setIsBottomSheetVisible}
                >
                  <View>
                    <View>
                      <View className="flex flex-row items-center gap-24  mt-8">
                        <Feather
                          onPress={() => setIsBottomSheetVisible(false)}
                          name="arrow-left-circle"
                          size={30}
                          color="black"
                        />
                        <Text className="tracking-wider font-medium text-xl text-center">
                          Add Card
                        </Text>
                      </View>
                      <View>
                        <Image
                          source={require("@/assets/images/visacard.png")}
                          resizeMode="stretch"
                          className="w-full h-82 mt-8"
                        />
                      </View>
                      <View className="my-4">
                        <View>
                          <InputFields
                            label="Card Holder Name"
                            placeholder="Ester Howard"
                          />
                        </View>
                        <View className="my-4">
                          <InputFields
                            label="Card Number"
                            placeholder="123 3454 65768 9"
                          />
                        </View>
                        <View className="flex flex-row gap-4 ">
                          <View className="flex-1">
                            <InputFields
                              label="Expiray Date"
                              placeholder="12/4"
                              keyboardType="numbers-and-punctuation"
                            />
                          </View>
                          <View className="flex-1">
                            <InputFields
                              label="CVV"
                              placeholder="Ester Howard"
                            />
                          </View>
                        </View>
                      </View>
                      <View className="flex items-center flex-row -ml-4">
                        <CheckBox checked={true} checkedColor="green" />
                        <Text className="">Save Card</Text>
                      </View>
                    </View>
                    <View className="mt-6">
                      <Pressable
                        onPress={() => setIsBottomSheetVisible(false)}
                        className="bg-green-700 py-3 w-full rounded-xl"
                      >
                        <Text className="text-white text-xl text-center">
                          Add Card
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </CustomBottomSheet>
              </View>
            </>
          ) : null}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default payment;

const styles = StyleSheet.create({});
