import { useProductStore } from "@/store/ProductStore";
import { useMemo } from "react";

export const useCartPrice = () => {
  const { Cart } = useProductStore();

  // Calculate total price of cart items
  const totalPrice = useMemo(() => {
    return Cart.reduce((total, item) => {
      const price = item.salePrice ? item.salePrice : item.originalPrice;
      return total + price * item.quantity;
    }, 0);
  }, [Cart]);

  const deliveryCharge = useMemo(() => Math.floor(Math.random() * 11) + 5, []);

  const taxRate = useMemo(() => Math.random() * (10 - 5) + 5, []);
  const taxAmount = useMemo(
    () => (totalPrice * taxRate) / 100,
    [totalPrice, taxRate]
  );

  // Final total price including delivery and tax
  const finalTotal = useMemo(
    () => totalPrice + deliveryCharge + taxAmount,
    [totalPrice, deliveryCharge, taxAmount]
  );

  return { totalPrice, deliveryCharge, taxAmount, finalTotal };
};
