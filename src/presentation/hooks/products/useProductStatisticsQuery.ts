import { useQuery } from '@tanstack/react-query';
import { container } from '../../../di/container';
import { ProductRepository } from '../../../core/domain/repositories/ProductRepository';
import { ProductStatistics } from '../../../core/types/ProductEntry';

const productRepository = container.resolve('productRepository') as ProductRepository;

export function useProductStatisticsQuery(productId: number) {
  return useQuery<ProductStatistics, Error>({
    queryKey: ['product-statistics', productId],
    queryFn: async () => {
      const response = await productRepository.getProductStatistics(productId);
      return response;
    },
    enabled: !!productId,
    staleTime: 0
  });
} 