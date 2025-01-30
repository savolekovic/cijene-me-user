import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters from '../../components/products/filters/SearchFilters/SearchFilters';
import ProductList from '../../components/products/ProductList/ProductList';
import { useProductsQuery } from '../../hooks/products/useProductsQuery';
import { useFilterState } from '../../hooks/useFilterState';
import './HomePage.css';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useFilterState({
    search: '',
    category_id: null,
    min_price: null,
    max_price: null,
    has_entries: null,
    barcode: null,
    order_by: 'created_at',
    order_direction: 'desc'
  }, {
    excludeFromUrl: ['page', 'per_page'],
    debounceMs: 300 // Debounce URL updates for search
  });

  const [pagination, setPagination] = useState({ page: 1, per_page: 20 });

  // Update URL when filters change (excluding pagination)
  useEffect(() => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        params.set(key, value.toString());
      }
    });
    
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  // Reset pagination when filters change
  useEffect(() => {
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [filters]);

  const { data: productsData = { data: [] }, isLoading: loading, error, refetch } = useProductsQuery({
    ...filters,
    ...pagination
  });

  // Handler updates
  const handleSearch = (term) => {
    setFilters(prev => ({ ...prev, search: term }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const handleSortChange = (orderBy, orderDirection) => {
    setFilters(prev => ({
      ...prev,
      order_by: orderBy,
      order_direction: orderDirection
    }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  return (
    <div className="home-page">
      <SearchFilters 
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        selectedFilters={filters}
      />
      <ProductList 
        products={productsData.data}
        loading={loading}
        error={error?.message}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
        currentPage={pagination.page}
        sortBy={filters.order_by}
        sortDirection={filters.order_direction}
        onRetry={refetch}
      />
    </div>
  );
}

export default HomePage; 