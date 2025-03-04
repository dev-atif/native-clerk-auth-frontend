import { Product } from "@/mock";
import axios from "axios";

export const CreateWishlist = async (
  item: Product,
  userId: string,
  productId: Number
) => {
  try {
    if (!item || !userId) {
      console.error("Missing item or userId in CreateWishlist.");
      return;
    }
    console.log("images", item.image);
    const { id, ...Data } = item;
    const response = await axios.post(
      `http://192.168.18.107:3333/api/products/wishlist`,
      {
        ...Data,
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
