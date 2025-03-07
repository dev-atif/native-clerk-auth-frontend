import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter, useSegments } from "expo-router";

const SearchBar = () => {
  const router = useRouter();
  const segment = useSegments();
  const { search } = useLocalSearchParams();
  const [filter, setFilter] = useState("");

  // Initialize filter state if search param exists
  useEffect(() => {
    if (search && typeof search === "string") {
      setFilter(search);
    }
  }, [search]);

  const handleChange = (text: string) => {
    setFilter(text);

    if (segment[1] === "(product)") {
      router.setParams(text ? { search: text } : { search: "" });
    }
  };

  const handleSearchClick = () => {
    if (!filter.trim()) return;

    if (segment?.[1] !== "(product)") {
      router.push({
        pathname: "/(auth)/(product)",
        params: { search: filter },
      });
    } else {
      router.setParams({ search: filter });
    }
  };

  return (
    <View>
      <View className="my-4 flex items-center gap-2 flex-row">
        <View className="flex-1 flex items-center gap-2 flex-row px-2 border border-gray-300 rounded-lg">
          <Pressable onPress={handleSearchClick}>
            <Ionicons name="search" size={24} color="green" />
          </Pressable>
          <TextInput
            placeholder="Search Food, Drink, etc."
            onChangeText={handleChange}
            value={filter}
            className="w-full"
          />
        </View>
        <Pressable className="bg-green-700 p-[9px] rounded-lg">
          <Entypo
            name="flow-parallel"
            size={24}
            color="white"
            style={{ transform: [{ rotate: "90deg" }], alignSelf: "center" }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
