import Cimage from "../assets/images/vagetables.png";
import Apple from "../assets/images/apple.png";
import orange from "../assets/images/orange.png";
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
    image: orange,
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
    image: Apple,
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
    image: orange,
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
    image: Apple,
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
    image: orange,
    discount: "15% OFF",
    weight: "1Kg",
    rating: Math.random() * 5,
    originalPrice: 300, // Example price
    salePrice: 300 - 300 * 0.15, // Applying 15% discount
    description:
      "Enjoy the tropical sweetness of our juicy mangoes, full of vitamins and flavor.",
  },
];
