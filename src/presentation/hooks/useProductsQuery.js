import { useQuery } from '@tanstack/react-query';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/ProductRepositoryImpl';

const productRepository = new ProductRepositoryImpl();

export function useProductsQuery(filters = {}) {
  const defaultFilters = {
    per_page: 20,
    page: 1,
    order_by: 'created_at',
    order_direction: 'desc'
  };

  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productRepository.getProducts({ ...defaultFilters, ...filters }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCategoriesQuery(enabled = false) {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productRepository.getCategories(),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
} 