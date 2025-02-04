import { useQuery } from '@tanstack/react-query';
import { container } from '../../../di/container';
import { Category } from '../../../core/types/Product';
import { ProductRepository } from '../../../core/domain/repositories/ProductRepository';

const productRepository = container.resolve('productRepository') as ProductRepository;

export const useCategoriesQuery = (enabled = true) => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: () => productRepository.getCategories(),
    enabled
  });
}; 