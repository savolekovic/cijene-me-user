import React, { useState } from 'react';
import SearchFilters from '../../components/products/filters/SearchFilters/SearchFilters';
import ProductList from '../../components/products/ProductList/ProductList';
import { useProductsQuery } from '../../hooks/products/useProductsQuery';
import './HomePage.css';

function HomePage() {
  const [filters, setFilters] = useState({
    search: '',
    category_id: null,
    min_price: null,
    max_price: null,
    has_entries: null,
    barcode: null,
    order_by: 'created_at',
    order_direction: 'desc',
    page: 1,
    per_page: 20
  });

  const { 
    data: productsData = { data: [] }, 
    isLoading: loading, 
    error 
  } = useProductsQuery(
    Object.entries(filters)
      .filter(([_, v]) => v != null && v !== '')
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {})
  );

  const handleSearch = (term) => {
    setFilters(prev => ({ ...prev, search: term, page: 1 }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1
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
        currentPage={filters.page}
        sortBy={filters.order_by}
        sortDirection={filters.order_direction}
      />
    </div>
  );
}

export default HomePage; 