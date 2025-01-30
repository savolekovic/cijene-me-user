import { useQuery } from '@tanstack/react-query';
import { container } from '../../../di/container';

const productRepository = container.get('productRepository');

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
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
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