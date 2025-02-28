import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputFields from "@/components/InputFields";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, SetLoading] = useState(false);
  const { isLoaded, setActive, signIn } = useSignIn();
  const handleInputChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const router = useRouter();
  /* ______Make Login_________ */
  const submitLogin = async () => {
    if (!isLoaded) return;
    SetLoading(true);
    try {
      const result = await signIn?.create({
        identifier: formData.email,
        password: formData.password,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch (error) {
      ToastAndroid.show((error as Error).message, ToastAndroid.TOP);
      console.log("error in catch", error);
    } finally {
      SetLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="mt-4">
        <View className="mt-8">
          <Text className="text-center text-4xl ">Sign In</Text>
          <Text className="px-8 text-center text-gray-500 mt-4">
            Hi! Welcome back,you,ve been missed
          </Text>
        </View>
        <View className="px-4 mt-4 ">
          <View className="my-4">
            <InputFields
              placeholder="xyz@gmail.com "
              label="Email"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
          </View>
          <InputFields
            secureTextEntry
            placeholder="******* "
            label="Password"
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
        </View>
        <Text
          className="text-green-700 underline px-4 mt-4"
          onPress={() => router.navigate("/forgetpassword")}
        >
          Forget Password
        </Text>
        <View className="px-8 my-4">
          <Pressable
            onPress={submitLogin}
            className="rounded-lg bg-green-700 py-3"
          >
            {loading ? (
              <>
                <ActivityIndicator color={"white"} size={25} />
              </>
            ) : (
              <Text
                className="text-white text-lg text-center
          "
              >
                Sign In
              </Text>
            )}
          </Pressable>
        </View>
        <View className="flex items-center my-4 gap-4 justify-center flex-row">
          <View className="w-[80px] h-[0.5] bg-gray-500" />
          <View>
            <Text className="text-gray-400">Or Sign In with</Text>
          </View>
          <View className="w-[80px] h-[0.5] bg-gray-500" />
        </View>
        <View className="flex items-center justify-center flex-row gap-8 my-6">
          <Pressable className="border border-gray-400 py-3  w-[15%] rounded-full flex items-center justify-center">
            <AntDesign name="apple1" size={30} color="black" />
          </Pressable>
          <Pressable className="border border-gray-400 py-3 w-[15%] rounded-full flex items-center justify-center">
            <FontAwesome5 name="google" size={30} color="black" />
          </Pressable>
          <Pressable className="border border-gray-400 py-3 w-[15%] rounded-full flex items-center justify-center">
            <FontAwesome6 name="facebook-f" size={30} color="black" />
          </Pressable>
        </View>
        <View className="flex flex-row items-center justify-center">
          <Text>Don't have an Account? </Text>
          <Text
            className="text-green-700 underline"
            onPress={() => router.navigate("/register")}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
