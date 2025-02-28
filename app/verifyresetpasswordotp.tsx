import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";

const verifyresetpasswordotp = () => {
  const [otp, setOtp] = useState(""); // Store OTP as a string
  const inputRefs = useRef<Array<TextInput | null>>([]); // Refs for input fields
  const router = useRouter();

  const { width } = Dimensions.get("window");
  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      // Allow only digits (single character)
      let newOtp = otp.split(""); // Convert string to array for manipulation
      newOtp[index] = text;
      setOtp(newOtp.join("")); // Convert back to string

      if (text && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus(); // Move to next input
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
      let newOtp = otp.split("");
      newOtp[index] = ""; // Remove the digit
      setOtp(newOtp.join(""));
      inputRefs.current[index - 1]?.focus(); // Move to previous input
    }
  };
  /* _______Verify Code------------- */

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
        <View className="flex items-center justify-center mt-20">
          <View className="mt-8">
            <Text className="text-center text-4xl ">New Password</Text>
            <Text className="px-8 text-center text-gray-500 mt-4">
              Your New password Must be different from previously used Password
            </Text>
          </View>
          <View className="flex items-center justify-center gap-3 flex-row mt-8">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <TextInput
                  placeholder="-"
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={otp[index] || ""}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  className="border border-gray-300 rounded-xl p-3 text-center  text-lg"
                  style={{ width: width / 8.5 }}
                />
              ))}
          </View>

          <View className="w-3/4 mt-8">
            <Pressable
              disabled={otp.length > 5 ? false : true}
              onPress={() => {
                if (otp.length > 5) {
                  router.navigate(`/Createnewpassword?OTP=${otp}`);
                  ToastAndroid.show("Code Is Invalid", ToastAndroid.CENTER);
                }
              }}
              className="bg-green-700 py-3 rounded-lg"
            >
              <Text className="text-white text-center">Verify</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default verifyresetpasswordotp;
