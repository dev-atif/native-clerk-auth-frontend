import axios from "axios";

interface FetchProductsParams {
  skip?: number;
  limit?: number;
  catId?: string;
  SearchKeyword?: string;
}

export const FetchProducts = async ({
  skip,
  limit,
  catId,
  SearchKeyword,
}: FetchProductsParams) => {
  try {
    const response = await axios.get(
      "http://192.168.18.107:3333/api/products",
      {
        params: {
          skip,
          limit,
          catId,
          SearchKeyword,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
