import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import Animated from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { CreateWishlist } from "@/Helper/CreateWishList";
import eventBus from "@/Helper/event";
import { GetFavProducts } from "@/Helper/GetFavProducts";
interface Product {
  id: number;
  name: string;
  image: any;
  discount: string;
  weight: string;
  rating: number;
  originalPrice: number;
  salePrice: number;
  description: string;
}
interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const { width: screenWidth } = Dimensions.get("window");
  const [favdata, setFavdata] = useState([]);
  const route = useRouter();
  const { user } = useUser();
  const userId = user?.id || "";
  //@ts-ignore
  const id = item.productId ? item.productId : item.id;
  const AddtoWishlist = async (item: Product) => {
    try {
      if (user) {
        const response = await CreateWishlist(item, user.id, id);
        if (response) {
          ToastAndroid.show(`${response.message}`, ToastAndroid.LONG);
          eventBus.emit("wishlistUpdated");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchWishlist = async () => {
    try {
      const data = await GetFavProducts(userId);
      if (data?.data) {
        setFavdata(data.data);
      } else {
        setFavdata([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setFavdata([]);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchWishlist();
    }
  }, [AddtoWishlist]);
  //@ts-ignore
  const FavIconColor = favdata.some((Citem) => Citem.productId == id);

  return (
    <Pressable
      style={{ elevation: 5, width: screenWidth / 2 - 32 }}
      className="bg-white p-2 rounded-lg mb-5"
    >
      <View className="flex bg-gray-100 items-center justify-center rounded-lg h-36  relative">
        <Image
          source={{ uri: item.image }}
          className="w-28 h-28 mix-blend-darken"
        />
        <Text className="text-white bg-green-700 px-4 py-1 text-sm absolute top-0 left-0 rounded-tl-lg rounded-br-lg">
          {item.discount}
        </Text>
        <Pressable
          onPress={() => AddtoWishlist(item)}
          className="absolute top-1 right-1"
        >
          <AntDesign
            name="heart"
            size={20}
            color={FavIconColor ? "green" : "gray"}
          />
        </Pressable>
      </View>
      <View>
        <Text className=" text-base my-1">{item.name}</Text>
      </View>
      <View className=" flex items-center justify-between flex-row">
        <Text>{item.weight}</Text>
        <Pressable
          onPress={() =>
            route.push({
              pathname: "/(auth)/(home)/singpleproduct",
              params: { item: JSON.stringify(item) },
            })
          }
          className="bg-green-700 py-1 w-1/2 rounded-lg"
        >
          <Text className="text-white text-center">Buy</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});
