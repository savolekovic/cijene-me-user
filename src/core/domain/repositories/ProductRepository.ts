import { Product, ProductFilters } from '../../types/Product';
import { ProductEntry, ProductStatistics } from '../../types/ProductEntry';
import { Category } from '../../types/Product';

export interface PaginatedResponse<T> {
  data: T[];
  total_count: number;
  current_page: number;
  per_page: number;
  last_page: number;
}

export interface ProductRepository {
  getProducts(filters: ProductFilters): Promise<PaginatedResponse<Product>>;
  getCategories(): Promise<Category[]>;
  getProductEntries(filters: ProductFilters): Promise<PaginatedResponse<ProductEntry>>;
  getProductStatistics(productId: number): Promise<ProductStatistics>;
  searchProducts(term: string): Promise<PaginatedResponse<Product>>;
} 