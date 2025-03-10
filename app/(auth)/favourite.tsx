import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useUser } from "@clerk/clerk-expo";
import ProductCard from "@/components/products-card/ProductCard";
import eventBus from "@/Helper/event"; // Import event emitter
import { useFavouriteProduct } from "@/store/FavProductStore";
import CartIcon from "@/components/cartIcon";

const Favourite = () => {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id || "";
  const { FavProduct } = useFavouriteProduct();

  const CurrentUserFav = FavProduct.filter((item) => item.userId === userId);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View className="flex flex-row items-center  justify-between px-4 mt-3">
            <Feather
              onPress={() => router.back()}
              name="arrow-left-circle"
              size={30}
              color="black"
            />
            <Text className="tracking-wider font-medium text-xl text-center">
              Favourite Products
            </Text>
            <CartIcon />
          </View>
          <View>
            <View className="px-2 pt-4">
              <FlatList
                showsVerticalScrollIndicator={false}
                data={CurrentUserFav}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={{
                  gap: 5,
                }}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, margin: 5 }}>
                    <ProductCard item={item} />
                  </View>
                )}
                ListEmptyComponent={
                  <View
                    style={{
                      height: 300,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        textAlign: "center",
                        paddingTop: 10,
                      }}
                    >
                      No Favourite found
                    </Text>
                  </View>
                }
                contentContainerStyle={{
                  paddingBottom: 50,
                  // ✅ Ensures the list items are centered
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Favourite;
