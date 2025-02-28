import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import * as Currentlocation from "expo-location";
const Location = () => {
  const route = useRouter();
  const [location, setLocation] =
    useState<Currentlocation.LocationObject | null>(null);
  const getLocation = async () => {
    // Request permission
    let { status } = await Currentlocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location access is required.");
      return;
    }

    // Fetch location
    let userLocation = await Currentlocation.getCurrentPositionAsync({});
    if (userLocation) {
      route.navigate("/(auth)/home");
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className=" w-full px-4">
        <View className="flex items-center justify-center">
          <View className="bg-gray-100 w-[37%] flex items-center justify-center py-10 rounded-full ">
            <FontAwesome6 name="location-dot" size={50} color="green" />
          </View>
          <View className="my-8">
            <Text className="text-3xl font-bold">What is Your Location ?</Text>
          </View>
          <View>
            <Text className="text-center text-gray-400">
              We need to Know your location in order to suggest nearby services
            </Text>
          </View>
          <Pressable
            onPress={getLocation}
            className="bg-green-700 w-full py-4 rounded-lg my-8"
          >
            <Text className="text-white text-center text-lg  font-semibold ">
              Allow Location Access
            </Text>
          </Pressable>
          <Pressable onPress={() => route.navigate("/ManualLocation")}>
            <Text className="text-xl font-semibold text-green-700">
              Enter Location Manually
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Location;

const styles = StyleSheet.create({});
