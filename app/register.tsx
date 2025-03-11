import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputFields from "@/components/InputFields";
import { CheckBox } from "react-native-elements";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { UserRole } from "@/types";

const register = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isChecked: false,
  });
  const [loading, SetLoading] = useState(false);
  const router = useRouter();
  const { signUp, isLoaded } = useSignUp();
  const handleInputChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!isLoaded) return;
    if (!isChecked) {
      ToastAndroid.show(
        "Agree with our terms and conditions",
        ToastAndroid.TOP
      );
    } else {
      SetLoading(true);
      try {
        const submit = await signUp.create({
          username: formData.name,
          emailAddress: formData.email,
          password: formData.password,
          unsafeMetadata: { role: UserRole.General },
        });

        if (submit) {
          await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
          });
        } else {
          console.log("error");
        }
        ToastAndroid.show(
          "A verification code sent to your Email",
          ToastAndroid.TOP
        );
        router.navigate(`/verifyottp?email=${formData.email}`);
      } catch (error) {
        ToastAndroid.show((error as Error).message, ToastAndroid.TOP);
        console.log("error in catch", error);
      } finally {
        SetLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <View className="mt-8">
          <Text className="text-center text-4xl ">Create Account</Text>
          <Text className="px-8 text-center text-gray-500 mt-4">
            Fill your information Below or register with Your social accout
          </Text>
        </View>
        <View className="px-4 mt-4 ">
          <InputFields
            placeholder="Xyz "
            label="Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
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
        <View className="flex mt-2 items-center flex-row">
          <CheckBox
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            containerStyle={styles.checkboxContainer}
            checkedColor="green"
          />
          <View className="flex items-center flex-row -ml-4">
            <Text>Agree with </Text>
            <Text className="text-green-700">Terms & Conditions</Text>
          </View>
        </View>
        <View className="px-8 my-4">
          <Pressable
            onPress={handleSubmit}
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
                Sign Up
              </Text>
            )}
          </Pressable>
        </View>
        <View className="flex items-center my-4 gap-4 justify-center flex-row">
          <View className="w-[80px] h-[0.5] bg-gray-500" />
          <View>
            <Text className="text-gray-400">Or Sign up with</Text>
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
          <Text>Already have an Account? </Text>
          <Text
            className="text-green-700 underline"
            onPress={() => router.navigate("/login")}
          >
            SignIn
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
});
