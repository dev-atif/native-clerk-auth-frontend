import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { useProductStore } from "@/store/ProductStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import LogOut from "../LogOut";
import { useUser } from "@clerk/clerk-expo";
import CartIcon from "../CartIcon";
import DropdownMenu, { MenuOption } from "../dropdown-menu";
import { UserRole } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const Header = () => {
  const { isLoaded, user } = useUser();
  const { Cart } = useProductStore();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };
  if (!isLoaded) return;
  return (
    <View className=" bg-white pt-12 pb-2 flex px-4 justify-center ">
      <View className="flex items-center flex-row justify-between">
        <View style={{ elevation: 6 }}>
          <Image
            source={user?.imageUrl ? { uri: user.imageUrl } : undefined}
            className="w-14 h-14 rounded-full"
            resizeMode="cover"
          />
        </View>

        <View className="flex items-center flex-row-reverse gap-2">
          <View>
            <DropdownMenu
              visible={visible}
              handleOpen={() => setVisible(true)}
              handleClose={() => setVisible(false)}
              trigger={
                <View>
                  <Ionicons name="menu" size={35} color="green" />
                </View>
              }
            >
              <MenuOption
                onSelect={() => {
                  setVisible(false);
                  handleLogout();
                }}
              >
                <View className="flex items-center flex-row gap-2">
                  <AntDesign name="logout" size={24} color="green" />
                  <Text>Logout</Text>
                </View>
              </MenuOption>
              <MenuOption
                onSelect={() => {
                  setVisible(false);
                  router.navigate("/Profile");
                }}
              >
                <View className="   rounded-full flex items-center flex-row gap-2">
                  <Feather name="edit" size={25} color="green" />
                  <Text>Edit Profile</Text>
                </View>
              </MenuOption>
              {user?.unsafeMetadata?.role === UserRole.Admin ? (
                <>
                  <MenuOption
                    onSelect={() => {
                      setVisible(false);
                      router.navigate("/(admin)");
                    }}
                  >
                    <View className="   rounded-full flex items-center flex-row gap-2">
                      <FontAwesome name="cubes" size={24} color="green" />
                      <Text>Create product</Text>
                    </View>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => {
                      setVisible(false);
                      router.navigate("/(admin)/createcategory");
                    }}
                  >
                    <View className="   rounded-full flex items-center flex-row gap-2">
                      <MaterialIcons name="category" size={24} color="green" />
                      <Text>Create Category</Text>
                    </View>
                  </MenuOption>
                </>
              ) : null}
            </DropdownMenu>
          </View>

          <View>
            <CartIcon />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
