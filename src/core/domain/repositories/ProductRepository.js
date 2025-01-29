/**
 * @interface
 */
export class ProductRepository {
  /**
   * @param {import('../types/Product').ProductFilters} filters
   * @returns {Promise<{data: import('../types/Product').Product[]}>}
   */
  async getProducts(filters) {
    throw new Error('Method not implemented');
  }
  
  async searchProducts(term) {
    throw new Error('Method not implemented');
  }

  /**
   * @returns {Promise<Array<{id: number, name: string}>>}
   */
  async getCategories() {
    throw new Error('Method not implemented');
  }
} 