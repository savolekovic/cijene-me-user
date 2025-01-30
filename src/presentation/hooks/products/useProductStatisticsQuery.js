import { useQuery } from '@tanstack/react-query';
import { container } from '../../../di/container';

const productRepository = container.get('productRepository');

export function useProductStatisticsQuery(productId) {
  return useQuery({
    queryKey: ['product-statistics', productId],
    queryFn: () => productRepository.getProductStatistics(productId),
    enabled: !!productId,
    staleTime: 0,
    cacheTime: 0
  });
} 