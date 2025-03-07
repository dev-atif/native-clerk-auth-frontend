import { Products } from "@/types";
import axios from "axios";

export const CreateWishlist = async (userId: string, productId: string) => {
  try {
    if (!userId) {
      console.error("Missing item or userId in CreateWishlist.");
      return;
    }

    const response = await axios.post(
      `http://192.168.18.107:3333/api/products/wishlist`,
      {
        userId,
        productId,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};
