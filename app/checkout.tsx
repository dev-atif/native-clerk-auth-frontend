import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import {
  FlatList,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import CustomBottomSheet from "@/components/bottom-sheet/CustomBottomSheet";
import {
  Feather,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ProductData } from "@/mock";
import LongCard from "@/components/products-card/LongCard";
import { useRouter } from "expo-router";
import { CheckBox } from "react-native-elements";
import { useProductStore } from "@/store/ProductStore";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import InputFields from "@/components/InputFields";
import { useAddressStore } from "@/store/UserAddress";
import { Swipeable } from "react-native-gesture-handler";

const checkout = () => {
  const [IsBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const { height } = Dimensions.get("window");
  const [selectedIndex, setIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState({
    title: "",
    Address: "",
  });
  const { Cart } = useProductStore();
  const swipeableRefs = useRef(new Map()); // Store references for multiple Swipeable items

  const handleSwipeOpen = (idx: number) => {
    // Close any other open Swipeable items
    swipeableRefs.current.forEach((ref, key) => {
      if (key !== idx && ref) {
        ref.close();
      }
    });
  };
  const {
    addAddress,
    addresses,
    setCurrentAddress,
    currentAddressIndex,
    removeAddress,
  } = useAddressStore();
  const router = useRouter();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  console.log("ManageMent Address", currentAddressIndex, selectedIndex);
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
              <Text className="font-medium">
                {addresses[currentAddressIndex ?? 0]?.title}
              </Text>
              <Text className="text-gray-400">
                {addresses[currentAddressIndex ?? 0]?.address}
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
          className="h-28 w-full bg-white rounded-t-xl px-4 flex items-center justify-between flex-row"
          style={{
            elevation: 7, // Android shadow
          }}
        >
          <Pressable
            onPress={() => router.navigate("/payment")}
            className="flex items-center justify-center mb-5 gap-3 bg-green-700 flex-row py-3 w-full rounded-lg"
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
                <GestureHandlerRootView>
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
                    <ScrollView className="h-[55vh]">
                      <View className="mt-8">
                        {addresses.map((itm, idx) => {
                          const renderRightActions = () => {
                            return (
                              <Pressable
                                onPress={() => {
                                  const ref = swipeableRefs.current.get(idx);
                                  if (ref) {
                                    ref.close(); // Close before deleting
                                  }
                                  removeAddress(idx);
                                }}
                                className="bg-red-300 mt-4 p-5 rounded-lg flex items-center justify-center"
                              >
                                <MaterialCommunityIcons
                                  name="delete-sweep"
                                  size={30}
                                  color="white"
                                />
                              </Pressable>
                            );
                          };
                          return (
                            <Swipeable
                              renderRightActions={renderRightActions}
                              ref={(ref) => {
                                if (ref) swipeableRefs.current.set(idx, ref);
                              }}
                              onSwipeableWillOpen={() => handleSwipeOpen(idx)}
                              key={idx}
                            >
                              <View
                                className={` 
                             py-6  flex items-center justify-between flex-row `}
                              >
                                <View className="flex items-start flex-row gap-2 w-1/2">
                                  <FontAwesome6
                                    name="location-dot"
                                    size={24}
                                    color="green"
                                  />
                                  <View>
                                    <Text className="font-medium">
                                      {itm.title}
                                    </Text>
                                    <Text className="text-gray-400">
                                      {itm.address}
                                    </Text>
                                  </View>
                                </View>
                                <View>
                                  <CheckBox
                                    checked={selectedIndex === idx}
                                    onPress={() => setIndex(idx)}
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    checkedColor="green"
                                  />
                                </View>
                              </View>
                              {idx !== addresses.length - 1 && ( // Hide for last item
                                <View className="w-full h-[0.5px] bg-gray-200" />
                              )}
                            </Swipeable>
                          );
                        })}
                      </View>
                    </ScrollView>
                    <View>
                      <Pressable
                        onPress={toggleModal}
                        className="flex items-center gap-2 flex-row border border-green-700 py-6 rounded-xl justify-center border-dashed"
                      >
                        <AntDesign name="plus" size={24} color="green" />
                        <Text className="text-green-700">
                          Add New Delievry Address
                        </Text>
                      </Pressable>
                    </View>
                    <View className="flex-1 mb-5 flex items-end justify-end flex-row ">
                      <Pressable
                        onPress={() => {
                          setIsBottomSheetVisible(false);
                          setCurrentAddress(selectedIndex); // Save selected index in Zustand
                        }}
                        className="bg-green-700 py-4 w-full rounded-lg"
                      >
                        <Text className="text-white text-center text-xl font-medium tracking-wider">
                          Apply
                        </Text>
                      </Pressable>
                    </View>
                    {/* ____________ADD ADRESS MODEL _________ */}
                    <View>
                      <Modal
                        animationIn={"bounceInLeft"}
                        backdropColor="transparent"
                        isVisible={isModalVisible}
                      >
                        <View style={{ flex: 1, justifyContent: "center" }}>
                          <View
                            style={{ elevation: 10 }}
                            className="bg-white p-6 rounded-xl"
                          >
                            <View className="flex items-end justify-end">
                              <AntDesign
                                onPress={toggleModal}
                                name="closecircleo"
                                size={30}
                                color="red"
                              />
                            </View>
                            <Text className="text-center text-xl font-medium tracking-wider">
                              Please Enter Address
                            </Text>
                            <View className="my-6">
                              <InputFields
                                label="Title"
                                onChangeText={(text) =>
                                  setAddress({ ...address, title: text })
                                }
                              />
                            </View>
                            <View>
                              <InputFields
                                label="Address"
                                onChangeText={(text) =>
                                  setAddress({ ...address, Address: text })
                                }
                              />
                            </View>
                            <Pressable
                              onPress={() => {
                                toggleModal();
                                addAddress({
                                  address: address.Address,
                                  title: address.title,
                                });
                              }}
                              className="bg-green-700 py-4 rounded-lg mt-6"
                            >
                              <Text className="text-white tracking-wider text-center">
                                Add
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </Modal>
                    </View>
                  </View>
                </GestureHandlerRootView>
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
