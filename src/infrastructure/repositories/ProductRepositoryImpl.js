import { ProductRepository } from '../../core/repositories/ProductRepository';
import axiosClient from '../api/axiosClient';

export class ProductRepositoryImpl extends ProductRepository {
  async getProducts(filters = {}) {
    const requiredParams = {
      per_page: 20,
      page: 1,
      order_by: 'created_at',
      order_direction: 'desc'
    };

    const cleanFilters = {
      ...requiredParams,
      ...Object.entries(filters)
        .filter(([_, value]) => value != null && value !== '')
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {})
    };

    const { data } = await axiosClient.get('products/', { 
      params: cleanFilters 
    });
    return data;
  }

  async getCategories() {
    const { data } = await axiosClient.get('categories/simple/');
    return data;
  }

  async searchProducts(term) {
    const { data } = await axiosClient.get('/products', { 
      params: { search: term } 
    });
    return data;
  }
} 