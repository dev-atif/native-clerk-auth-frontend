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
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useFocusEffect, useRouter } from "expo-router";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import DropDown from "@/components/DropDown";
import { locations, Product, ProductData } from "@/mock";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Carosel from "@/components/Carosel";
import Categories from "@/components/Categories";
import ProductCard from "@/components/products-card/ProductCard";
import Header from "@/components/Header";
import { FetchProducts } from "@/Helper/GetallProducts";
import { Products } from "@/types";
import { useFavouriteProduct } from "@/store/FavProductStore";
import SearchBar from "@/components/SearchBar";
import DropdownMenu, { MenuOption } from "@/components/dropdown-menu";

const Home = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Products[]>([]);
  const { FavProduct } = useFavouriteProduct();
  const { user } = useUser();
  useFocusEffect(
    useCallback(() => {
      const getProducts = async () => {
        try {
          const fetchedProducts = await FetchProducts({
            skip: 0,
            limit: 10,
          });
          setProducts(fetchedProducts);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      getProducts();
    }, [])
  );
  const [selectlocation, setSelectLocation] = useState(locations[0].value);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View className="-mt-10">
          <Header />
        </View>
        <View></View>
        <View className="px-8 mt-1">
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
          <SearchBar />
          {/* ___________-Carosel__________ */}
          <View className="mt-4 ">
            <Carosel />
          </View>
          <View>
            <Categories />
          </View>
          <View>
            <Text className="text-xl tracking-wider py-2 font-semibold">
              Latest Products
            </Text>
          </View>
          <View>
            <FlatList
              data={products}
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
