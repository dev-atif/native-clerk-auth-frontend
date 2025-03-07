import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import {
  router,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
  useSegments,
} from "expo-router";
import axios from "axios";
import { Products } from "@/types";
import ProductCard from "@/components/products-card/ProductCard";
import Entypo from "@expo/vector-icons/Entypo";
const index = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const { search, catId, catName } = useLocalSearchParams();
  const params = useLocalSearchParams();
  const { height } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  const limit = 6;
  const [skip, setSkip] = useState(0);
  const route = useRouter();
  const segment = useSegments();

  const fecthProduct = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://192.168.18.107:3333/api/products?skip=${skip}&limit=${limit}&catId=${catId}&SearchKeyword=${search}`
      );
      if (data.data.length > 0) {
        setProducts(data.data);
      }
    } catch (error) {
      console.log("Error in Get all Products =====>", error);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fecthProduct();
      setSkip(0);
      if (segment[1] !== "(product)") {
        router.setParams({ catId: undefined, catName: undefined });
      }
    }, [segment, search, catId])
  );

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          <View className="-mt-10">
            <Header />
          </View>
          <View className="px-4">
            <SearchBar />
          </View>
          <View className="px-4">
            <Text className="text-2xl tracking-wider ">Products</Text>
          </View>

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
          <View className="px-2 pt-4">
            <FlatList
              style={{ height: height - 300 }}
              showsVerticalScrollIndicator={false}
              data={products}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
                gap: 160,
              }}
              renderItem={({ item }) => (
                <View style={{ flex: 1, margin: 5, alignItems: "center" }}>
                  <ProductCard item={item} />
                </View>
              )}
              contentContainerStyle={{
                paddingBottom: 50,
                alignItems: "center",
              }}
              ListFooterComponent={
                loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : null
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default index;

const styles = StyleSheet.create({});
