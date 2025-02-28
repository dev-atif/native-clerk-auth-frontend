import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useRef } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { CaroselData } from "../mock/index"; // Import your data

const { width: screenWidth } = Dimensions.get("window");

const CustomCarousel = ({ data }: { data: any[] }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<Carousel<any>>(null);

  if (!data || data.length === 0) {
    return <Text>No data available</Text>;
  }

  const renderItem = ({ item }: { item: any }) => (
    <View className="bg-green-400/10 rounded-lg relative h-56 px-4">
      <Image
        source={item.image}
        style={styles.image}
        className="w-32 h-32 mix-blend-screen absolute top-1/4 right-3"
      />
      <Text className="text-green-700 text-2xl mt-4 font-semibold">
        {item.offer}
      </Text>
      <Text className="text-gray-400 text-lg w-1/2 mt-4">
        Enjoy our big offer of every day
      </Text>
      <Pressable
        className="bg-green-700 w-1/2 py-2 rounded-lg mt-4 "
        style={{ elevation: 5 }}
      >
        <Text className="text-white text-center">Shop Now</Text>
      </Pressable>
    </View>
  );

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.9}
        layout="default"
        vertical={false}
        onSnapToItem={(index) => setTimeout(() => setActiveSlide(index), 100)}
      />

      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.activeDot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
        carouselRef={carouselRef}
      />
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <CustomCarousel data={CaroselData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  image: {
    // width: "30%",
    // height: 80,
    // resizeMode: "cover",
    // borderRadius: 10,
  },
  offerText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  paginationContainer: {
    paddingTop: 20,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "green",
  },
  inactiveDot: {
    backgroundColor: "gray",
  },
});
