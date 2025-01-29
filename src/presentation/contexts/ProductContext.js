import React, { createContext, useContext, useState, useCallback } from 'react';
import { container } from '../../di/container';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const productRepository = container.resolve('productRepository');

  const fetchProducts = useCallback(async (filters) => {
    try {
      setLoading(true);
      const data = await productRepository.getProducts(filters);
      setProducts(data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [productRepository]);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await productRepository.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, [productRepository]);

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      error,
      fetchProducts,
      fetchCategories
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}; 