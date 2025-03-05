import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { GetFavProducts } from "@/Helper/GetFavProducts";
import { useUser } from "@clerk/clerk-expo";
import ProductCard from "@/components/products-card/ProductCard";
import eventBus from "@/Helper/event"; // Import event emitter

const Favourite = () => {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id || "";
  const [fav, setFav] = useState([]);

  const fetchWishlist = async () => {
    try {
      const data = await GetFavProducts(userId);
      if (data?.data) {
        setFav(data.data);
      } else {
        setFav([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setFav([]);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWishlist();
    }

    const listener = () => {
      fetchWishlist();
    };

    eventBus.on("wishlistUpdated", listener);

    return () => {
      eventBus.off("wishlistUpdated", listener);
    };
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View className="flex flex-row items-center gap-24 px-4">
            <Feather
              onPress={() => router.back()}
              name="arrow-left-circle"
              size={30}
              color="black"
            />
            <Text className="tracking-wider font-medium text-xl text-center">
              Favourite Products
            </Text>
          </View>
          <View>
            <View style={{ padding: 10 }}>
              {fav.length > 0 ? (
                <FlatList
                  data={fav}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                  renderItem={({ item }) => (
                    <View style={{ flex: 1, margin: 5 }}>
                      <ProductCard item={item} />
                    </View>
                  )}
                />
              ) : (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  No favorite items found.
                </Text>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Favourite;
