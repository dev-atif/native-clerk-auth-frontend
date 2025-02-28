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
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const forgetpassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    confirmPassword: "",
    password: "",
  });
  const [loading, SetLoading] = useState(false);

  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const handleInputChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const resetpassword = async () => {
    if (!isLoaded) return;
    SetLoading(true);
    try {
      const reset = await signIn.create({
        strategy: "reset_password_email_code",
        identifier: formData.email,
      });
      if (reset?.id) {
        ToastAndroid.show(
          "A verification code send to your email",
          ToastAndroid.TOP
        );
        router.navigate("/verifyresetpasswordotp");
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
        <View>
          <EvilIcons
            onPress={() => router.back()}
            name="arrow-left"
            size={45}
            color="gray"
          />
        </View>
        <View className="mt-8">
          <Text className="text-center text-4xl ">New Password</Text>
          <Text className="px-8 text-center text-gray-500 mt-4">
            Your New password Must be different from previously used Password
          </Text>
        </View>

        <>
          <View className="px-4 mt-20 ">
            <InputFields
              placeholder="xyz@gmail.com "
              label="Email"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
          </View>
          <View className="px-8 my-6">
            <Pressable
              onPress={resetpassword}
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
                  Get Code
                </Text>
              )}
            </Pressable>
          </View>
        </>
      </View>
    </SafeAreaView>
  );
};

export default forgetpassword;

const styles = StyleSheet.create({});
