import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import DropDown from "@/components/DropDown";
import { locations, ProductData } from "@/mock";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Carosel from "@/components/Carosel";
import Categories from "@/components/Categories";
import ProductCard from "@/components/products-card/ProductCard";

const Home = () => {
  const router = useRouter();
  const [selectlocation, setSelectLocation] = useState(locations[0].value);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View className="px-8 mt-8">
          <View className="flex items-center justify-between flex-row ">
            <View>
              <Text className="text-gray-400">Location</Text>
              <View className="flex flex-row items-center gap-2">
                <FontAwesome6 name="location-dot" size={24} color="green" />
                <View className=" w-3/5">
                  <DropDown
                    data={locations}
                    selectedValue={selectlocation}
                    setSelectedValue={setSelectLocation}
                    value={selectlocation}
                  />
                </View>
              </View>
            </View>
            <View className="bg-gray-100 p-2 rounded-full">
              <Ionicons name="notifications-sharp" size={24} color="black" />
            </View>
          </View>
          {/* _________SearchBar_____________ */}
          <View className="my-4 flex items-center gap-2 flex-row">
            <View className="flex-1  flex items-center gap-2 flex-row px-2 border border-gray-300 rounded-lg">
              <Ionicons name="search" size={24} color="green" />
              <TextInput placeholder="Search Food,Drink etc" />
            </View>
            <Pressable className="bg-green-700 p-[9px] rounded-lg ">
              <Entypo
                name="flow-parallel"
                size={24}
                color="white"
                style={{
                  transform: [{ rotate: "90deg" }],
                  alignSelf: "center",
                }}
              />
            </Pressable>
          </View>
          {/* ___________-Carosel__________ */}
          <View className="mt-4 ">
            <Carosel />
          </View>
          <View>
            <Categories />
          </View>
          <View>
            <FlatList
              data={ProductData}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <ProductCard item={item} />}
              ItemSeparatorComponent={() => <View style={{ width: 16 }} />} // Adds horizontal gap
            />
          </View>
          <View className="mt-8" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
