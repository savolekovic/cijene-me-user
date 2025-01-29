import React, { useState, useEffect } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { ProductList } from '../components/product/ProductList';
import { SearchFilters } from '../components/shared/SearchFilters';
import { Navigation } from '../components/shared/Navigation';

export const ProductsPage = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const [filters, setFilters] = useState({
    search: '',
    category_id: null,
    min_price: null,
    max_price: null,
    order_by: 'created_at',
    order_direction: 'desc',
    page: 1
  });

  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1
    }));
  };

  return (
    <>
      <Navigation />
      <SearchFilters 
        onSearch={(term) => handleFilterChange({ search: term })}
        onFilterChange={handleFilterChange}
        selectedFilters={filters}
      />
      <ProductList 
        products={products}
        loading={loading}
        error={error}
        onSortChange={(orderBy, orderDirection) => 
          handleFilterChange({ order_by: orderBy, order_direction: orderDirection })}
        onPageChange={(page) => handleFilterChange({ page })}
        currentPage={filters.page}
        sortBy={filters.order_by}
        sortDirection={filters.order_direction}
      />
    </>
  );
}; 