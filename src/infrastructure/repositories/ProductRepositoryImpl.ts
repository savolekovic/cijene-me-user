import axiosClient from '../api/axiosClient';
import { Category, Product, ProductFilters } from '../../core/types/Product';
import { ProductRepository, PaginatedResponse } from '../../core/domain/repositories/ProductRepository';
import { AxiosInstance } from 'axios';
import { ProductEntry, ProductStatistics } from 'core/types/ProductEntry';

export class ProductRepositoryImpl implements ProductRepository {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axiosClient;
  }

  async getProducts(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
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
        .reduce<Record<string, any>>((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {})
    };

    try {
      console.log('Making request to:', 'products', { filters });
      const { data } = await this.httpClient.get('products', { 
        params: cleanFilters 
      });
      console.log('Response:', data);
      return data;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    const { data } = await this.httpClient.get('categories/simple', {});
    return data;
  }

  async getProductEntries(filters: ProductFilters = {}): Promise<PaginatedResponse<ProductEntry>> {
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
        .reduce<Record<string, any>>((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {})
    };

    const { data } = await this.httpClient.get('product-entries', { 
      params: cleanFilters 
    });
    return data;
  }

  async searchProducts(term: string): Promise<PaginatedResponse<Product>> {
    const { data } = await this.httpClient.get('products/', { 
      params: { search: term } 
    });
    return data;
  }

  async getProductStatistics(productId: number): Promise<ProductStatistics> {
    const { data } = await this.httpClient.get(`product-entries/product/${productId}/statistics`);
    console.log('Statistics response:', data);
    return data;
  }
} 