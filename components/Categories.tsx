import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

// Import local images
import vagetable from "../assets/images/vegetable.png";
import fruits from "../assets/images/fruits.png";
import dairy from "../assets/images/dairy-products.png";
import drinks from "../assets/images/cocktail.png";
import { useFocusEffect, useRouter } from "expo-router";

// Category image mapping
const categoryImages: Record<string, any> = {
  Vagetables: vagetable,
  Fruits: fruits,
  "Milk&Egg": dairy,
  Drinks: drinks,
};

interface Category {
  id: string;
  name: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const route = useRouter();
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://192.168.18.107:3333/api/category"
      );
      setCategories(response.data.data);
    } catch (error) {
      console.log("Error in Categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <View>
      <View className="flex items-baseline justify-between flex-row">
        <Text className="text-2xl font-semibold">Category</Text>
        <Pressable>
          <Text className="text-green-700 font-medium">See All</Text>
        </Pressable>
      </View>
      <View className="my-4">
        <View className="flex flex-wrap justify-between flex-row">
          {categories.slice(0, 4).map((category) => {
            return (
              <Pressable
                key={category.id}
                className="flex items-center justify-center"
              >
                <Pressable
                  onPress={() =>
                    route.push({
                      pathname: "/(auth)/(product)",
                      params: {
                        catId: `${category.id}`,
                        catName: `${category.name}`,
                      },
                    })
                  }
                  className="bg-gray-100 rounded-full w-16 flex items-center justify-center py-3"
                >
                  <Image
                    source={categoryImages[category.name] || undefined}
                    className="w-10 h-10"
                  />
                </Pressable>
                <Text className="text-sm">{category.name}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
