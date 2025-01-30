import ProductRepository from '../../core/domain/repositories/ProductRepository';
import axiosClient from '../api/axiosClient';

export class ProductRepositoryImpl extends ProductRepository {
  constructor() {
    super();
    this.httpClient = axiosClient;
  }

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

    const { data } = await this.httpClient.get('products/', { 
      params: cleanFilters 
    });
    return data;
  }

  async getCategories() {
    const { data } = await this.httpClient.get('categories/simple/');
    return data;
  }

  async getProductEntries(filters = {}) {
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

    const { data } = await this.httpClient.get('product-entries/', { 
      params: cleanFilters 
    });
    return data;
  }

  async searchProducts(term) {
    const { data } = await this.httpClient.get('products/', { 
      params: { search: term } 
    });
    return data;
  }

  async getProductStatistics(productId) {
    const { data } = await this.httpClient.get(`product-entries/product/${productId}/statistics`);
    return data;
  }
} 