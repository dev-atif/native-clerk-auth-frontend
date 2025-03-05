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
