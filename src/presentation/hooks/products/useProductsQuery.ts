import { useQuery } from '@tanstack/react-query';
import { container } from '../../../di/container';
import { Product, ProductFilters } from '../../../core/types/Product';
import { PaginatedResponse, ProductRepository } from '../../../core/domain/repositories/ProductRepository';

const productRepository = container.resolve('productRepository') as ProductRepository;

export function useProductsQuery(filters: ProductFilters) {
  return useQuery<PaginatedResponse<Product>, Error>({
    queryKey: ['products', filters],
    queryFn: () => productRepository.getProducts(filters),
    staleTime: 30000
  });
}
