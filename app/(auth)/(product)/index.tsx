import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useLocalSearchParams, useRouter, useSegments } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Entypo } from "@expo/vector-icons";

import { Products } from "@/types";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/products-card/ProductCard";
import DropDown from "@/components/DropDown";
const PriceFilter = [
  { label: "Default", value: "" },
  { label: "High", value: "high" },
  { label: "Low", value: "low" },
];
const ProductsScreen = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const { search, catId, catName } = useLocalSearchParams();
  const { height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pricefilt, setPriceFilt] = useState("");
  const limit = 5;
  const [skip, setSkip] = useState(0);
  const route = useRouter();
  const segment = useSegments();

  // Fetch products function
  const fetchProduct = async (isNewSearch = false, newSkip = skip) => {
    if (loading) return; // Prevent duplicate API calls

    try {
      setLoading(true);

      if (isNewSearch) {
        setProducts([]); // Clear previous data on new search
        setSkip(0);
      }

      const { data } = await axios.get(
        `http://192.168.18.107:3333/api/products?skip=${newSkip}&limit=${limit}&catId=${catId}&SearchKeyword=${search}&sortedByprice=${pricefilt}`
      );

      if (data.data.length > 0) {
        setProducts((prevProducts) =>
          isNewSearch ? data.data : [...prevProducts, ...data.data]
        );
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProduct(true, 0);

      return () => {
        // Clears products when the screen is unfocused
        setProducts([]);
        setSkip(0);
        setHasMore(true);
        setPriceFilt("");
      };
    }, [segment, search, catId, pricefilt])
  );

  // Load more products when reaching the end
  const onLoadFetch = () => {
    if (!loading && hasMore) {
      const newSkip = skip + 1;
      setSkip(newSkip);
      fetchProduct(false, newSkip);
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          <View className="">
            <Header />
          </View>
          <View className="px-4">
            <SearchBar />
          </View>
          <View className="mx-4 my-2 px-2 rounded-xl border border-gray-300">
            <DropDown
              data={PriceFilter}
              selectedValue={pricefilt}
              setSelectedValue={setPriceFilt}
              placeholder={{ label: "Price order", value: "" }}
              value={pricefilt}
            />
          </View>
          <View className="px-4">
            <Text className="text-2xl tracking-wider">Products</Text>
          </View>

          {/* Category Filter Section */}
          <View className="px-4 flex items-center flex-row gap-2 flex-wrap">
            {catId && catId !== "undefined" && (
              <>
                <Text className="tracking-wider text-2xl text-green-700 font-medium">
                  Filter By
                </Text>
                <View className="bg-green-700 rounded-full pr-1 flex items-center flex-row">
                  <Text className="relative text-sm text-white p-1 px-3 text-center">
                    {catName}
                  </Text>
                  <Entypo
                    onPress={() =>
                      route.setParams({ catId: undefined, catName: undefined })
                    }
                    name="circle-with-cross"
                    size={20}
                    color="white"
                  />
                </View>
              </>
            )}
          </View>

          {/* Product List */}
          <View className="px-2 pt-4">
            <FlatList
              style={{ height: height - 302 }}
              data={products}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              onEndReached={onLoadFetch}
              onEndReachedThreshold={1} // Ensures early fetching
              columnWrapperStyle={{
                gap: 10,
              }}
              renderItem={({ item }) => (
                <View style={{ flex: 1, margin: 5 }}>
                  <ProductCard item={item} />
                </View>
              )}
              contentContainerStyle={{
                paddingBottom: 100,
              }}
              ListFooterComponent={
                loading && hasMore ? (
                  <ActivityIndicator size="large" color="green" />
                ) : null
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ProductsScreen;
