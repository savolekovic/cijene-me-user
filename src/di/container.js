import { ProductRepositoryImpl } from '../infrastructure/repositories/ProductRepositoryImpl';

class Container {
  static #instance = null;
  #repositories = null;

  constructor() {
    if (Container.#instance) {
      throw new Error('Use Container.getInstance() instead of new operator');
    }
    this.#repositories = new Map();
    this.#registerRepositories();
    Container.#instance = this;
  }

  #registerRepositories() {
    this.#repositories.set('productRepository', new ProductRepositoryImpl());
  }

  static getInstance() {
    if (!Container.#instance) {
      Container.#instance = new Container();
    }
    return Container.#instance;
  }

  get(key) {
    const repository = this.#repositories.get(key);
    if (!repository) {
      throw new Error(`No repository registered for key: ${key}`);
    }
    return repository;
  }

  register(key, instance) {
    this.#repositories.set(key, instance);
  }
}

export const container = Container.getInstance(); 