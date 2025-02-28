import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import image from "../assets/images/image.png";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Image source={image} resizeMode="contain" width={400} height={400} />
      </View>
      <View className="flex items-center justify-center mt-2">
        <View className="flex  items-center justify-center flex-row gap-2">
          <Text className="text-2xl">Lets Find The</Text>
          <Text className="text-2xl text-green-700">Best</Text>
          <Text className="text-2xl">&</Text>
        </View>
        <Text className="text-2xl text-green-700">Healthy Grocery</Text>
      </View>
      <View className="mt-2">
        <Text className="px-4 text-center text-gray-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis modi
          ipsum
        </Text>
      </View>
      <View className="px-8  mt-3">
        <Pressable
          onPress={() => router.replace("/register")}
          className="rounded-lg bg-green-700 py-3 flex items-center justify-center"
        >
          <Text className="text-white"> Lets Get Started</Text>
        </Pressable>
      </View>
      <View className=" mt-3 flex items-center flex-row gap-3 justify-center">
        <Text className="text-gray-500">Already Have an Account?</Text>
        <Text
          className="text-green-700 underline"
          onPress={() => router.replace("/login")}
        >
          Signin
        </Text>
      </View>
    </View>
  );
};

export default index;
