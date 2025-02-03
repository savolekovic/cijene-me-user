export const formatPrice = (price: string | number | null): string => {
  if (price === null) return '-';
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `€${numPrice.toFixed(2)}`;
};

export const parsePrice = (price: string | number): number => {
  return typeof price === 'string' ? parseFloat(price) : price;
}; 