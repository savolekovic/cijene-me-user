import React, { useState, useEffect, useCallback } from 'react';
import { getProducts, getCategories } from './services/api';
import Navigation from './presentation/components/Navigation';
import SearchFilters from './presentation/components/SearchFilters';
import ProductList from './presentation/components/ProductList';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category_id: null,
    min_price: null,
    max_price: null,
    order_by: 'created_at',
    order_direction: 'desc',
    page: 1
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      // Remove null/undefined values from filters
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null)
      );
      const response = await getProducts(cleanFilters);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchProducts]);

  const handleSearch = (term) => {
    setFilters(prev => ({ ...prev, search: term, page: 1 }));
  };

  const handleFilterChange = (filters) => {
    setFilters(prev => ({
      ...prev,
      ...filters,
      page: 1 // Reset page when filters change
    }));
  };

  const handleSortChange = (orderBy, orderDirection) => {
    setFilters(prev => ({
      ...prev,
      order_by: orderBy,
      order_direction: orderDirection,
      page: 1
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  return (
    <div className="App">
      <Navigation />
      <SearchFilters 
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        selectedFilters={filters}
      />
      <ProductList 
        products={products}
        loading={loading}
        error={error}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
        currentPage={filters.page}
        sortBy={filters.order_by}
        sortDirection={filters.order_direction}
      />
    </div>
  );
}

export default App;
