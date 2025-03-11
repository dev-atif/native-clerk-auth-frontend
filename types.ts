interface OrderProduct {
  id: number;
  name: string;
  image: string;
  discount: string;
  weight: string;
  rating: number;
  originalPrice: number;
  salePrice: number;
  description: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  name: string;
  number: string;
  address: string;
  email: string;
  totalamount: number | null;
  product: OrderProduct[];
  status: string;
  createdAt: string;
}
export interface Category {
  id: string;
  name: string;
}
export interface CategoryTypes {
  categories: Category[];
}

export interface Products {
  category: Category;
  categoryId: string;
  createdAt: string;
  description: string;
  discount: string;
  id: string;
  image: string;
  name: string;
  originalPrice: number;
  rating: number;
  ratings: number;
  salePrice: number;
  state: string;
  updatedAt: string;
  weight: string;
  size: string;
}

export type ProductResponse = Products[];

export enum UserRole {
  Admin = "admin",
  General = "general",
}
