import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  FlatList,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import CustomBottomSheet from "@/components/bottom-sheet/CustomBottomSheet";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { ProductData } from "@/mock";
import LongCard from "@/components/products-card/LongCard";
import { useRouter } from "expo-router";
import { CheckBox } from "react-native-elements";
import { useProductStore } from "@/store/ProductStore";

const checkout = () => {
  const [IsBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const { height } = Dimensions.get("window");
  const [selectedIndex, setIndex] = useState(0);
  const { Cart } = useProductStore();
  const router = useRouter();
  console.log(selectedIndex);
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="mt-14 " style={{ position: "relative" }}>
        <View className="flex flex-row items-center gap-24 px-4">
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
        <Text className="px-4 text-lg font-semibold my-4">
          Delivery Address
        </Text>
        <View className="px-4 flex items-center justify-between flex-row ">
          <View className="flex items-start flex-row gap-2 w-1/2">
            <FontAwesome6 name="location-dot" size={24} color="green" />
            <View>
              <Text className="font-medium">Home</Text>
              <Text className="text-gray-400">
                123 Main Street City, State, Zip
              </Text>
            </View>
          </View>
          <Pressable onPress={() => setIsBottomSheetVisible(true)}>
            <Text className="text-green-700 font-semibold">Change </Text>
          </Pressable>
        </View>
        <Text className="tracking-wider font-medium text-xl px-4 my-4">
          OrderList
        </Text>
        {/* Product List */}
        <FlatList
          style={{ paddingHorizontal: 10, height: height - 296 }}
          data={Cart}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <LongCard QuantityButtons item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        {/* Checkout Section */}
        <View
          className="h-20 w-full bg-white rounded-t-xl px-4 flex items-center justify-between flex-row"
          style={{ elevation: 7 }}
        >
          <Pressable
            onPress={() => router.navigate("/payment")}
            className="flex items-center justify-center gap-3 bg-green-700 flex-row py-3 w-full rounded-lg"
          >
            <Text className="text-white font-semibold">
              Continue to Payment
            </Text>
          </Pressable>
        </View>
        {IsBottomSheetVisible ? (
          <>
            <View style={{ position: "absolute", bottom: 0 }}>
              <CustomBottomSheet
                snapPoints={["100%"]}
                setIsBottomSheetVisible={setIsBottomSheetVisible}
              >
                <View className="felex flex-col justify-between h-full">
                  <View className="flex flex-row items-center gap-24  mt-16">
                    <Feather
                      onPress={() => setIsBottomSheetVisible(false)}
                      name="arrow-left-circle"
                      size={30}
                      color="black"
                    />
                    <Text className="tracking-wider font-medium text-xl text-center">
                      Delievry Address
                    </Text>
                  </View>
                  <View className="mt-8">
                    <View className=" flex items-center justify-between flex-row ">
                      <View className="flex items-start flex-row gap-2 w-1/2">
                        <FontAwesome6
                          name="location-dot"
                          size={24}
                          color="green"
                        />
                        <View>
                          <Text className="font-medium">Home</Text>
                          <Text className="text-gray-400">
                            1901 Thronridge Cir,Shilo,Hawali 81063
                          </Text>
                        </View>
                      </View>
                      <View>
                        <CheckBox
                          checked={selectedIndex === 0}
                          onPress={() => setIndex(0)}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checkedColor="green"
                        />
                      </View>
                    </View>
                    <View className="w-full  h-[0.5px] bg-gray-300  my-8 " />
                    <View className=" flex items-center justify-between flex-row ">
                      <View className="flex items-start flex-row gap-2 w-1/2">
                        <FontAwesome6
                          name="location-dot"
                          size={24}
                          color="green"
                        />
                        <View>
                          <Text className="font-medium">Office</Text>
                          <Text className="text-gray-400">
                            1901 Thronridge Cir,Shilo,Hawali 81063
                          </Text>
                        </View>
                      </View>
                      <View>
                        <CheckBox
                          checked={selectedIndex === 1}
                          onPress={() => setIndex(1)}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checkedColor="green"
                        />
                      </View>
                    </View>
                    <View className="w-full  h-[0.5px] bg-gray-300  my-8 " />
                    <View className=" flex items-center justify-between flex-row ">
                      <View className="flex items-start flex-row gap-2 w-1/2">
                        <FontAwesome6
                          name="location-dot"
                          size={24}
                          color="green"
                        />
                        <View>
                          <Text className="font-medium">Parents House</Text>
                          <Text className="text-gray-400">
                            1901 Thronridge Cir,Shilo,Hawali 81063
                          </Text>
                        </View>
                      </View>
                      <View>
                        <CheckBox
                          checked={selectedIndex === 2}
                          onPress={() => setIndex(2)}
                          checkedIcon="dot-circle-o"
                          uncheckedIcon="circle-o"
                          checkedColor="green"
                        />
                      </View>
                    </View>
                    <View className="w-full  h-[0.5px] bg-gray-300  my-8 " />
                  </View>
                  <View className="flex-1  flex items-end justify-end flex-row ">
                    <Pressable
                      onPress={() => setIsBottomSheetVisible(false)}
                      className="bg-green-700 py-4 w-full rounded-lg"
                    >
                      <Text className="text-white text-center text-xl font-medium tracking-wider">
                        Apply
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </CustomBottomSheet>
            </View>
          </>
        ) : null}
      </View>
    </GestureHandlerRootView>
  );
};

export default checkout;

const styles = StyleSheet.create({});
