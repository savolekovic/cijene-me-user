import { ProductRepository } from '../../core/repositories/ProductRepository';
import { apiClient } from '../api/client';

export class ProductRepositoryImpl extends ProductRepository {
  async getProducts(filters = {}) {
    const defaultParams = {
      search: '',
      per_page: 20,
      page: 1,
      order_by: 'created_at',
      order_direction: 'desc'
    };

    const cleanFilters = Object.fromEntries(
      Object.entries({ ...defaultParams, ...filters })
        .filter(([_, v]) => v != null)
    );
    
    return apiClient.get('/products', cleanFilters);
  }

  async getCategories() {
    return apiClient.get('/categories/simple');
  }

  async searchProducts(term) {
    return apiClient.get('/products', { search: term });
  }
} 