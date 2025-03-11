import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import InputFields from "@/components/InputFields";

import DropDown from "@/components/DropDown";
import { EvilIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useSearchParams } from "expo-router/build/hooks";
const countryCodes = [
  { label: "+1 ", value: "+1" },
  { label: "+44 ", value: "+44" },
  { label: "+91 ", value: "+91" },
  { label: "+92 ", value: "+92" },
  { label: "+33 ", value: "+33" },
  { label: "+49 ", value: "+49" },
  { label: "+81 ", value: "+81" },
  { label: "+86 ", value: "+86" },
  { label: "+61 ", value: "+61" },
  { label: "+971", value: "+971" },
  { label: "+966", value: "+966" },
];
const Gender = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];
const ProfileUpdate = () => {
  const DummyImage =
    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
  const { user, isLoaded } = useUser();
  const [selectedCode, setSelectedCode] = React.useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(user?.imageUrl);
  const [formdata, setFormData] = useState({
    name: "",
    number: "",
  });

  const { width } = Dimensions.get("window");
  useEffect(() => {
    if (user && typeof user.unsafeMetadata?.number === "string") {
      const number = user.unsafeMetadata.number || "";

      setFormData({
        name: user.firstName || "",
        number: number.slice(3) || "",
      });

      setSelectedCode(number.slice(0, 3) || "+92");
      setGender((user?.unsafeMetadata?.gender as string) || "");
    }
  }, [user]);
  const router = useRouter();




  const handleInputChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };




  
  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const base64Image = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );

        setSelectedImage(`data:image/jpeg;base64,${base64Image}`);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };

  const UpdateProfile = async () => {
    if (!isLoaded) return;
    try {
      setLoading(true);
      await user?.update({
        firstName: formdata.name,
        unsafeMetadata: {
          ...user?.unsafeMetadata,
          number: selectedCode + formdata.number,
          gender: gender,
        },
      });
      await user?.setProfileImage({ file: selectedImage || null });
      ToastAndroid.show("Profile Update Successfully", ToastAndroid.CENTER);
    } catch (error) {
      ToastAndroid.show((error as Error).message, ToastAndroid.TOP);
      console.log("error in catch", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View className="px-4">
        <View className="my-8">
          <EvilIcons
            onPress={() => router.replace("/(auth)/(home)")}
            name="arrow-left"
            size={45}
            color="gray"
          />
        </View>
        <View className="">
          <Text className="text-center text-3xl ">Update your Profile</Text>
          <Text className="px-8 text-sm text-center text-gray-500 mt-4">
            Dont worry only you can see your personal data.No one else wll be
            able to see it
          </Text>
        </View>
        <View>
          <View className="flex items-center justify-center mt-8 relative">
            <Image
              source={
                selectedImage
                  ? { uri: selectedImage }
                  : user?.imageUrl
                  ? { uri: user.imageUrl }
                  : { uri: DummyImage }
              }
              className="rounded-full"
              width={150}
              height={150}
            />
            <View>
              <Pressable
                onPress={pickImage}
                style={{ position: "absolute", bottom: 15, left: 40 }}
              >
                <FontAwesome
                  style={{
                    backgroundColor: "green",
                    paddingHorizontal: 8,
                    paddingVertical: 6,
                  }}
                  className="rounded-full"
                  name="pencil"
                  size={25}
                  color="white"
                />
              </Pressable>
            </View>
          </View>
          <View>
            <InputFields
              label="Name"
              placeholder="jhon Deo"
              value={formdata.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
          </View>
          {/* __________--DropDown To Slecetd Country Code_____ */}
          <View className="my-4">
            <View>
              <Text className="pl-2">Phone Number</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              className="mt-1 border border-gray-300 rounded-lg"
            >
              <View style={{ width: width / 4.5 }} className="pl-4">
                <DropDown
                  data={countryCodes}
                  selectedValue={selectedCode}
                  setSelectedValue={setSelectedCode}
                  placeholder={{ label: "+92" }}
                  value={selectedCode}
                />
              </View>
              <View className="w-[1.5px] h-6 bg-gray-300" />
              <View className="pl-2  w-[75%]">
                <TextInput
                  placeholder="Enter Phone Number"
                  keyboardType="numeric"
                  value={formdata.number}
                  onChangeText={(text) => handleInputChange("number", text)}
                />
              </View>
            </View>
          </View>
          {/* ________________Gender DropDown________________________ */}
          <View>
            <View>
              <Text className="pl-2">Gender</Text>
            </View>

            <View className="pl-2 mt-1 border border-gray-300 rounded-lg">
              <DropDown
                data={Gender}
                selectedValue={gender}
                setSelectedValue={setGender}
                placeholder={{ label: "select " }}
                value={gender}
              />
            </View>
          </View>
          <View className="mt-6">
            <Pressable
              onPress={UpdateProfile}
              className={`bg-green-700 rounded-lg ${loading ? "py-3" : "py-0"}`}
            >
              {loading ? (
                <>
                  <ActivityIndicator color={"white"} size={25} />
                </>
              ) : (
                <>
                  <Text className="text-white text-lg py-3 text-center">
                    Update Profile
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileUpdate;

const styles = StyleSheet.create({});
