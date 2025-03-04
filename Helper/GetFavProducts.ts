import axios from "axios";
import { ToastAndroid } from "react-native";

export const GetFavProducts = async (userId: string) => {
  try {
    if (!userId) {
      ToastAndroid.show(
        "Sorry, there is some issue. Try again.",
        ToastAndroid.LONG
      );
      return null;
    }

    const response = await axios.get(
      `http://192.168.18.107:3333/api/products/getwishlist/${userId}`
    );

    return response.data;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
