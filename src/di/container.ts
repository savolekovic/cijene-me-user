import { ProductRepositoryImpl } from '../infrastructure/repositories/ProductRepositoryImpl';

class Container {
  private services: Map<string, any>;

  constructor() {
    this.services = new Map();
    this.registerServices();
  }

  private registerServices() {
    this.services.set('productRepository', new ProductRepositoryImpl());
  }

  resolve(key: string) {
    return this.services.get(key);
  }
}

export const container = new Container(); 