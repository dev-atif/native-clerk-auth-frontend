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
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";
import { useClerk, useSignIn } from "@clerk/clerk-expo";
import InputFields from "@/components/InputFields";
import { useSearchParams } from "expo-router/build/hooks";

const Createnewpassword = () => {
  const [formData, setFormData] = useState({
    ConfrmPassword: "",
    password: "",
  });
  const [loading, SetLoading] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const OTP = params.get("OTP");
  console.log("OTP", OTP);
  const { isLoaded, signIn } = useSignIn();
  const { signOut } = useClerk();
  const handleInputChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const NewPassword = async () => {
    if (!isLoaded) return;
    if (formData.password != formData.ConfrmPassword) {
      ToastAndroid.show("Password Do not Match Try agian", ToastAndroid.TOP);
    } else {
      try {
        SetLoading(true);
        const result = await signIn?.attemptFirstFactor({
          strategy: "reset_password_email_code",
          code: String(OTP),
          password: formData.password,
        });
        if (result.status === "complete") {
          ToastAndroid.show("Password Change seccessfully", ToastAndroid.LONG);
          router.navigate("/login");
          signOut();
        }
      } catch (error) {
        ToastAndroid.show((error as Error).message, ToastAndroid.TOP);
        console.log("error in catch", error);
      } finally {
        SetLoading(false);
      }
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white" }}
      className="px-4"
    >
      <View>
        <View className="my-8">
          <EvilIcons
            onPress={() => router.back()}
            name="arrow-left"
            size={45}
            color="gray"
          />
        </View>
        <View className=" mt-20">
          <View className="mt-8">
            <Text className="text-center text-4xl ">New Password</Text>
            <Text className="px-8 text-center text-gray-500 mt-4">
              Your New password Must be different from previously used Password
            </Text>
          </View>
          <View className="px-4 mt-20 ">
            <InputFields
              placeholder="******** "
              label="password"
              value={formData.password}
              onChangeText={(text) => handleInputChange("password", text)}
            />
            <View className="w-full">
              <InputFields
                placeholder="******** "
                label="Confrm Password"
                value={formData.ConfrmPassword}
                onChangeText={(text) =>
                  handleInputChange("ConfrmPassword", text)
                }
              />
            </View>
          </View>
          <View className=" flex items-center px-4 justify-center ">
            <Pressable
              onPress={NewPassword}
              className="rounded-lg w-full mt-4 bg-green-700 py-3"
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
                  Create New Password
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Createnewpassword;

const styles = StyleSheet.create({});
