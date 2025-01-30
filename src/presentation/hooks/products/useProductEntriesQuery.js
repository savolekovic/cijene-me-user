import { useQuery } from '@tanstack/react-query';
import { container } from '../../../di/container';

const productRepository = container.get('productRepository');

export function useProductEntriesQuery(productId, filters = {}) {
  const defaultFilters = {
    per_page: 20,
    page: 1,
    order_by: 'created_at',
    order_direction: 'desc',
    product_id: productId
  };

  return useQuery({
    queryKey: ['product-entries', productId, filters],
    queryFn: () => productRepository.getProductEntries({ ...defaultFilters, ...filters }),
    enabled: !!productId,
    staleTime: 0,
    cacheTime: 0
  });
} 