import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { pickImage } from "@/Helper/UploadImage";
import Entypo from "@expo/vector-icons/Entypo";
import InputFields from "@/components/InputFields";
import CustomDropDown from "@/components/custom-dropdown";
import axios from "axios";
import { calculateDiscount } from "@/Helper/PercentageFinder";
const productType = [
  { label: "Liquid", value: "Liquid" },
  { label: "Solid", value: "Solid" },
  { label: "Clothes", value: "Clothes" },
];
interface Category {
  id: string;
  name: string;
}
const createproduct = () => {
  const initialData = {
    name: "",
    description: "",
    price: "",
    salePrice: "",
    categoryId: "",
    productType: "",
    weight: "",
    size: [],
  };
  const [imageurl, setImageUrl] = useState<string | null>(null);
  const [formdata, setFormdata] = useState<{
    name: string;
    description: string;
    price: string;
    salePrice: string;
    categoryId: string;
    productType: string;
    weight: string;
    size: string[];
  }>({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    categoryId: "",
    productType: "",
    weight: "",
    size: [],
  });
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  /* _____________get Values in State  ___________________________*/
  const handleInputChange = (name: string, value: any) => {
    setFormdata((prev) => ({
      ...prev,
      [name]: value?.value ?? value, // If value is an object, store its 'value' key
    }));
  };
  const formatWeight = (weight: string, productType: string) => {
    if (!weight) return ""; // Handle empty weight
    return productType === "Liquid" ? `${weight}L` : `${weight}g`;
  };

  /* _____________--Create Product APi____________________________ */
  const CreateProduct = async () => {
    const Data = {
      name: formdata.name,
      image: imageurl,
      discount: formdata.salePrice
        ? calculateDiscount(formdata.price, formdata.salePrice)
        : null,
      weight: formatWeight(formdata.weight, formdata.productType),
      originalPrice: Number(formdata.price),
      salePrice: formdata.salePrice ? Number(formdata.salePrice) : null,
      description: formdata.description,
      state: formdata.productType,
      categoryId: formdata.categoryId,
      size: formdata.size,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.18.107:3333/api/products/create",
        Data
      );
      if (response.data?.success) {
        ToastAndroid.show("Created Successfully", ToastAndroid.LONG);
        setFormdata(initialData);
        setImageUrl(null);
      } else {
        ToastAndroid.show("Failed to create product", ToastAndroid.LONG);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      ToastAndroid.show("An error occurred", ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };
  /* _______-Fetch Category */
  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        "http://192.168.18.107:3333/api/category"
      );

      if (response.data && response.data.data) {
        const formattedCategories = response.data.data.map(
          (item: Category) => ({
            label: item.name,
            value: item.id,
          })
        );

        setCategories(formattedCategories);
      }
    } catch (error) {
      console.log("Error while fetching Category:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
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
                  Create Product
                </Text>
              </View>
            </View>
            {/* ____________-Upload Image ________________ */}
            <View className="px-4 mt-12">
              {imageurl ? (
                <>
                  <View className="relative">
                    <Image
                      source={{ uri: imageurl }}
                      className="w-full h-64 rounded-xl"
                      resizeMode="cover"
                      resizeMethod="auto"
                    />
                    <Pressable
                      style={{ position: "absolute", top: 3, right: 2 }}
                      onPress={() => setImageUrl(null)}
                    >
                      <Entypo name="circle-with-cross" size={30} color="red" />
                    </Pressable>
                  </View>
                </>
              ) : (
                <>
                  <View className="bg-gray-100 rounded-xl h-64 flex items-center justify-center ">
                    <Text
                      onPress={() => pickImage(setImageUrl)}
                      className="text-2xl tracking-widest text-green-700 border border-green-700 px-16 py-10 rounded-xl border-dashed"
                    >
                      Upload Image
                    </Text>
                  </View>
                </>
              )}
            </View>
            {/* __________________Remainig Product Details____________________________ */}
            <View className="px-4 mt-8">
              <View>
                <InputFields
                  label="Name"
                  placeholder="product name"
                  value={formdata.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                />
              </View>
              <View className="mt-4">
                <InputFields
                  label="Description"
                  placeholder="About product"
                  multiline
                  numberOfLines={3}
                  value={formdata.description}
                  onChangeText={(text) =>
                    handleInputChange("description", text)
                  }
                />
              </View>
              <View className="flex items-center gap-4 my-4 flex-row">
                <View className="flex-1">
                  <InputFields
                    label="Price"
                    placeholder="price"
                    inputMode="numeric"
                    onChangeText={(text) => handleInputChange("price", text)}
                  />
                </View>
                <View className="flex-1">
                  <InputFields
                    label="Sale Price"
                    placeholder="Sale Price"
                    inputMode="numeric"
                    value={formdata.salePrice}
                    onChangeText={(text) =>
                      handleInputChange("salePrice", text)
                    }
                  />
                </View>
              </View>
              <View>
                <CustomDropDown
                  data={categories}
                  placeholder="select Category"
                  label="Category"
                  value={formdata.categoryId}
                  onChange={(value) => handleInputChange("categoryId", value)}
                />
              </View>
              <View className="flex items-center gap-4 my-4 flex-row">
                <View className="flex-1">
                  <CustomDropDown
                    data={productType}
                    placeholder="Product type"
                    label="Product Type"
                    value={formdata.productType}
                    onChange={(value) =>
                      handleInputChange("productType", value)
                    }
                  />
                </View>
                {formdata.productType === "Clothes" ? (
                  <>
                    <View className="mt-1">
                      <Text className="">Sizes</Text>
                      <View className="flex-1 flex flex-row  items-center justify-center gap-2">
                        {["S", "M", "L", "XL"].map((size) => (
                          <TouchableOpacity
                            key={size}
                            className={` w-10 h-10 flex items-center rounded-lg  justify-center transform transition-all duration-300 ${
                              formdata.size.includes(size)
                                ? "bg-green-700"
                                : "bg-transparent border border-black"
                            }`}
                            onPress={() => {
                              const newSize = formdata.size.includes(size)
                                ? formdata.size.filter((s) => s !== size)
                                : [...formdata.size, size];
                              handleInputChange("size", newSize);
                            }}
                          >
                            <Text
                              className={`text-sm transform transition-all duration-300 ${
                                formdata.size.includes(size)
                                  ? "text-white"
                                  : "text-green-700 "
                              }`}
                            >
                              {size}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <View className="flex-1">
                      <InputFields
                        label="Weight"
                        placeholder="1L or 500g"
                        value={formdata.weight}
                        onChangeText={(text) =>
                          handleInputChange("weight", text)
                        }
                        inputMode="numeric"
                      />
                    </View>
                  </>
                )}
              </View>
              <View className="mb-12 ">
                <TouchableOpacity
                  onPress={CreateProduct}
                  className="py-4 w-full bg-green-700 rounded-lg"
                >
                  {loading ? (
                    <>
                      <ActivityIndicator color={"white"} size={30} />
                    </>
                  ) : (
                    <>
                      <Text className="text-center text-white text-xl font-medium tracking-widest ">
                        Create
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default createproduct;

const styles = StyleSheet.create({});
