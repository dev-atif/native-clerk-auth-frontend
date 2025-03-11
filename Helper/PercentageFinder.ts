export const calculateDiscount = (originalPrice: string, salePrice: string) => {
  const price = parseFloat(originalPrice);
  const sale = parseFloat(salePrice);

  if (isNaN(price) || isNaN(sale) || price <= 0 || sale <= 0 || sale >= price) {
    return 0; // Avoid invalid discounts
  }

  return `${Math.round(((price - sale) / price) * 100)}%`;
};
