import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileUpdate from "@/components/profile-update";

const Profile = () => {
  return (
    <View style={{ flex: 1 }}>
      <ProfileUpdate />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
