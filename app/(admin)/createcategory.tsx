import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import InputFields from "@/components/InputFields";
import axios from "axios";

const createcategory = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  /* _________________CreateCategory______________________________________ */
  const createCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://192.168.18.107:3333/api/category/create",
        { name: category }
      );
      if (data.success) {
        ToastAndroid.show(
          "New Category Created Successfully!",
          ToastAndroid.LONG
        );
        setCategory("");
      }
    } catch (error) {
      console.log("🚀 ~ :35 ~ createCategory ~ error:", error);
      ToastAndroid.show("Failed to create category!", ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <View>
            <View className="w-9/12 ">
              <View className="flex flex-row items-center  justify-between px-4 mt-3">
                <Feather
                  onPress={() => router.replace("/(auth)/(home)")}
                  name="arrow-left-circle"
                  size={30}
                  color="black"
                />
                <Text className="tracking-wider font-medium text-xl text-center">
                  Create Category
                </Text>
              </View>
            </View>
            <View className="px-4  h-[650px] flex items-center justify-center">
              <View className="w-full">
                <View>
                  <InputFields
                    placeholder="Write Category Name"
                    label="Add Category"
                    onChangeText={(text) => setCategory(text)}
                  />
                </View>
                <View>
                  <TouchableOpacity
                    onPress={createCategory}
                    className="bg-green-700 py-3 rounded-lg mt-6"
                  >
                    {loading ? (
                      <>
                        <ActivityIndicator color={"white"} size={30} />
                      </>
                    ) : (
                      <>
                        <Text className="text-xl text-white text-center font-medium tracking-widest">
                          Create
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default createcategory;

const styles = StyleSheet.create({});
