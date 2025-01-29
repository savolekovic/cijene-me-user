export class GetProducts {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(filters) {
    return this.productRepository.getProducts(filters);
  }
} 