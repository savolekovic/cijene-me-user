import { useQuery } from '@tanstack/react-query';
import { container } from '../../../di/container';
import { Product, ProductFilters } from '../../../core/types/Product';
import { Category } from '../../../core/types/Product';
import { PaginatedResponse, ProductRepository } from '../../../core/domain/repositories/ProductRepository';
import { ProductEntry, ProductStatistics } from '../../../core/types/ProductEntry';

const productRepository = container.resolve('productRepository') as ProductRepository;

export const useProductsQuery = (filters: ProductFilters) => {
  return useQuery<PaginatedResponse<Product>, Error>({
    queryKey: ['products', filters],
    queryFn: () => productRepository.getProducts(filters)
  });
};

export const useCategoriesQuery = (enabled = true) => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: () => productRepository.getCategories(),
    enabled
  });
};

export const useProductEntriesQuery = (filters: ProductFilters) => {
  return useQuery<PaginatedResponse<ProductEntry>, Error>({
    queryKey: ['product-entries', filters],
    queryFn: () => productRepository.getProductEntries(filters)
  });
};

export const useProductStatisticsQuery = (productId: number) => {
  return useQuery<ProductStatistics, Error>({
    queryKey: ['product-statistics', productId],
    queryFn: () => productRepository.getProductStatistics(productId)
  });
}; 