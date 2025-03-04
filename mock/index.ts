import Cimage from "../assets/images/vagetables.png";

export const locations = [
  { label: "New York", value: "new_york" },
  { label: "London", value: "london" },
  { label: "Tokyo", value: "tokyo" },
  { label: "Paris", value: "paris" },
  { label: "Sydney", value: "sydney" },
  { label: "Berlin", value: "berlin" },
  { label: "Dubai", value: "dubai" },
  { label: "Toronto", value: "toronto" },
  { label: "Moscow", value: "moscow" },
  { label: "Mumbai", value: "mumbai" },
];

export const CaroselData = [
  {
    image: Cimage,
    offer: "Upto 30% Offer",
  },
  {
    image: Cimage,
    offer: "Upto 20% Offer",
  },
  {
    image: Cimage,
    offer: "Upto 20% Offer",
  },
  {
    image: Cimage,
    offer: "Upto 80% Offer",
  },
  {
    image: Cimage,
    offer: "Upto 50% Offer",
  },
];

export const ProductData = [
  {
    id: 1,
    name: "Fresh Apple",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/5/305062155/SB/TM/XR/86539219/fresh-orange-fruit.jpg",
    discount: "35% OFF",
    weight: "1Kg",
    rating: Math.random() * 5,
    originalPrice: 200, // Example price
    salePrice: 200 - 200 * 0.35, // Applying 35% discount
    description:
      "Crisp, juicy apples packed with natural sweetness and essential nutrients.",
  },
  {
    id: 2,
    name: "Fresh Banana",
    image:
      "https://www.fruitables.com.pk/cdn/shop/products/13_1080x.png?v=1667297224",
    discount: "20% OFF",
    weight: "1.5Kg",
    rating: Math.random() * 5,
    originalPrice: 150, // Example price
    salePrice: 150 - 150 * 0.2, // Applying 20% discount
    description:
      "Rich in potassium and fiber, these ripe bananas are perfect for snacking or smoothies.",
  },
  {
    id: 3,
    name: "Juicy Orange",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/5/305062155/SB/TM/XR/86539219/fresh-orange-fruit.jpg",
    discount: "25% OFF",
    weight: "2Kg",
    rating: Math.random() * 5,
    originalPrice: 250, // Example price
    salePrice: 250 - 250 * 0.25, // Applying 25% discount
    description:
      "Bursting with citrus flavor, our oranges are loaded with vitamin C for a refreshing taste.",
  },
  {
    id: 4,
    name: "Green Grapes",
    image:
      "https://www.fruitables.com.pk/cdn/shop/products/13_1080x.png?v=1667297224",
    discount: "30% OFF",
    weight: "500g",
    rating: Math.random() * 5,
    originalPrice: 180, // Example price
    salePrice: 180 - 180 * 0.3, // Applying 30% discount
    description:
      "Sweet and tangy green grapes, perfect for snacking or adding to fruit salads.",
  },
  {
    id: 5,
    name: "Fresh Mango",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/5/305062155/SB/TM/XR/86539219/fresh-orange-fruit.jpg",
    discount: "15% OFF",
    weight: "1Kg",
    rating: Math.random() * 5,
    originalPrice: 300, // Example price
    salePrice: 300 - 300 * 0.15, // Applying 15% discount
    description:
      "Enjoy the tropical sweetness of our juicy mangoes, full of vitamins and flavor.",
  },
];

export type Product = {
  id: number;
  name: string;
  image: string; // Assuming `orange` is an image URL or imported asset
  discount: string;
  weight: string;
  rating: number;
  originalPrice: number;
  salePrice: number;
  description: string;
};
