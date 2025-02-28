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
import { useSearchParams } from "expo-router/build/hooks";
import { useSignUp } from "@clerk/clerk-expo";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(""); // Store OTP as a string
  const inputRefs = useRef<Array<TextInput | null>>([]); // Refs for input fields
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "No email is provided";
  const { isLoaded, signUp, setActive } = useSignUp();
  const [loading, setLoading] = useState(false);
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
  const ClickVerify = async () => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      const verify = await signUp.attemptEmailAddressVerification({
        code: String(otp),
      });
      if (verify.status === "complete") {
        await setActive({ session: verify.createdSessionId });
        router.navigate(`/Profile?verify=${verify}`);
        ToastAndroid.show(
          "Email verification Complete",

          ToastAndroid.LONG
        );
      }
    } catch (error) {
      ToastAndroid.show((error as Error).message, ToastAndroid.TOP);
      console.log("erro in verify", error);
    } finally {
      setLoading(false);
    }
  };
  // const ClickVerify = () => {
  //   router.navigate("/Profile");
  // };
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
          <View>
            <Text className="text-center text-3xl">Verify Code</Text>
            <Text className="text-sm text-gray-400 text-center my-2">
              Please enter the code we just sent to your email
            </Text>
            <Text className="text-sm font-semibold  text-green-700 text-center">
              {email}
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
          <View className="mt-20">
            <Text className="text-center text-gray-400 my-2">
              Don't receive OTP?
            </Text>
            <Text className="text-center underline">Resend Code</Text>
          </View>
          <View className="w-3/4 mt-8">
            <Pressable
              onPress={ClickVerify}
              className="bg-green-700 py-3 rounded-lg"
            >
              {loading ? (
                <>
                  <ActivityIndicator color="white" size={25} />
                </>
              ) : (
                <>
                  <Text className="text-white text-center">Verify</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyOtp;
