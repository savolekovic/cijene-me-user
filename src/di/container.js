import { GetProducts } from '../core/useCases/product/GetProducts';
import { ProductRepositoryImpl } from '../infrastructure/repositories/ProductRepositoryImpl';

class Container {
  constructor() {
    this.instances = new Map();
  }

  register(key, instance) {
    this.instances.set(key, instance);
  }

  resolve(key) {
    if (!this.instances.has(key)) {
      throw new Error(`No instance registered for key: ${key}`);
    }
    return this.instances.get(key);
  }
}

export const container = new Container();

// Register implementations
const productRepository = new ProductRepositoryImpl();
const getProductsUseCase = new GetProducts(productRepository);

container.register('productRepository', productRepository);
container.register('getProductsUseCase', getProductsUseCase); 