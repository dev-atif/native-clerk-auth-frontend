import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const ManualLocation = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="px-4">
        <View className="flex flex-row items-center gap-16">
          <View className="my-8">
            <EvilIcons
              onPress={() => router.back()}
              name="arrow-left"
              size={45}
              color="gray"
            />
          </View>
          <View>
            <Text className="text-xl text-center font-semibold">
              Enter Your Location
            </Text>
          </View>
        </View>
        {/* ________Search Bar___________________________ */}
        <View className="flex flex-row items-center border border-gray-300 rounded-lg px-2">
          <View>
            <Ionicons name="search" size={24} color="black" />
          </View>
          <View className="flex-1">
            <TextInput placeholder="Golden Evenue" />
          </View>
          <View>
            <AntDesign name="closecircleo" size={24} color="green" />
          </View>
        </View>
        <Pressable className="flex flex-row items-center gap-7 my-8">
          <FontAwesome6 name="location-arrow" size={35} color="green" />
          <Text className="text-lg font-medium">Use My current Location</Text>
        </Pressable>
        <View className="h-[1px] bg-gray-200 " />
        <View className="my-4">
          <Text className="text-lg font-medium text-gray-400">
            Search Result
          </Text>
        </View>
        <View className="flex flex-row items-center gap-3">
          <FontAwesome6 name="location-arrow" size={20} color="green" />
          <Text className="text-lg font-medium">Golden Evenue</Text>
        </View>
        <View>
          <Text className="text-lg font-medium text-gray-400">
            850 Preston Rd. Ingl..
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManualLocation;

const styles = StyleSheet.create({});
