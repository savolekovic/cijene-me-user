const API_BASE_URL = 'https://cijene-me-api.onrender.com';

export const getProducts = async (params = {}) => {
  const queryParams = new URLSearchParams({
    search: '',
    per_page: 20,
    page: 1,
    order_by: 'created_at',
    order_direction: 'desc',
    ...params
  });

  const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories/simple`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}; 