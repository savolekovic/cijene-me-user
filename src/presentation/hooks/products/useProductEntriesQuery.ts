import { useQuery } from '@tanstack/react-query';
import { container } from '../../../di/container';
import { ProductRepository } from '../../../core/domain/repositories/ProductRepository';
import { ProductFilters } from '../../../core/types/Product';
import { ProductEntry } from '../../../core/types/ProductEntry';
import { PaginatedResponse } from '../../../core/domain/repositories/ProductRepository';

const productRepository = container.resolve('productRepository') as ProductRepository;

interface ProductEntryFilters extends ProductFilters {
  product_id: number;
}

export function useProductEntriesQuery(productId: number, filters: Partial<ProductFilters> = {}) {
  const defaultFilters: ProductEntryFilters = {
    per_page: 20,
    page: 1,
    order_by: 'created_at' as const,
    order_direction: 'desc' as const,
    product_id: productId,
    search: '',
    category_id: null,
    min_price: null,
    max_price: null,
    has_entries: null,
    barcode: null
  };

  return useQuery<PaginatedResponse<ProductEntry>, Error>({
    queryKey: ['product-entries', productId, filters],
    queryFn: async () => {
      const response = await productRepository.getProductEntries({ ...defaultFilters, ...filters });
      console.log('Product entries response:', response);
      return response;
    },
    enabled: !!productId,
    staleTime: 0
  });
} 