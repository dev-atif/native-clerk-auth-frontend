import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "expo-router";
const LogOut = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };
  return (
    <Pressable onPress={handleLogout}>
      <AntDesign name="logout" size={24} color="green" />
    </Pressable>
  );
};

export default LogOut;

const styles = StyleSheet.create({});
