import React, { useState, useEffect } from 'react';
import SearchFilters from '../../components/products/filters/SearchFilters/SearchFilters';
import ProductList from '../../components/products/ProductList/ProductList';
import { useProductsQuery } from '../../hooks/products/useProductsQuery';
import { useFilterState, FilterValue } from '../../hooks/useFilterState';
import './HomePage.css';
import { ProductFilters } from '../../../core/types/Product';
import { PaginationState, SortState } from '../../hooks/types';

type Filters = ProductFilters & Partial<PaginationState> & Partial<SortState> & Record<string, FilterValue>;

type OrderBy = 'name' | 'created_at' | 'barcode';

const HomePage: React.FC = () => {
  // Memoize initial filter state
  const initialFilters = React.useMemo(() => ({
    search: '',
    category_id: null,
    min_price: null,
    max_price: null,
    has_entries: null,
    barcode: null,
    order_by: 'created_at' as OrderBy,
    order_direction: 'desc' as const
  }), []);

  const [filters, setFilters] = useFilterState<Filters>(initialFilters, {
    excludeFromUrl: ['page', 'per_page'],
    debounceMs: 300
  });

  // Move pagination state initialization to useMemo
  const [pagination, setPagination] = React.useState(() => ({
    page: 1,
    per_page: 20
  }));

  // Clean up useEffect dependencies
  useEffect(() => {
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [filters.search, filters.category_id, filters.min_price, filters.max_price]); // Only reset page on filter changes

  // Move this up, before the logging effect
  const { data: productsData, isLoading, error, refetch } = useProductsQuery({
    ...filters,
    ...pagination
  });

  // Add development-only logging
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Render] HomePage:', {
        filters,
        pagination,
        productsCount: productsData?.data.length
      });
    }
  }, [filters, pagination, productsData?.data.length]);

  const handleSearch = React.useCallback((term: string) => {
    setFilters(prev => ({ ...prev, search: term }));
  }, [setFilters]);

  const handleFilterChange = React.useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, [setFilters]);

  const handleSortChange = React.useCallback((orderBy: string, orderDirection: 'asc' | 'desc') => {
    setFilters(prev => ({
      ...prev,
      order_by: orderBy as OrderBy,
      order_direction: orderDirection
    }));
  }, [setFilters]);

  const handlePageChange = React.useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  const productListProps = React.useMemo(() => ({
    products: productsData?.data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    onSortChange: handleSortChange,
    onPageChange: handlePageChange,
    currentPage: pagination.page,
    totalItems: productsData?.total_count ?? 0,
    perPage: pagination.per_page,
    sortBy: filters.order_by || 'created_at',
    sortDirection: filters.order_direction || 'desc',
    onRetry: refetch
  }), [
    productsData?.data,
    isLoading,
    error?.message,
    handleSortChange,
    handlePageChange,
    pagination.page,
    pagination.per_page,
    filters.order_by,
    filters.order_direction,
    refetch
  ]);

  return (
    <div className="home-page">
      <SearchFilters 
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        selectedFilters={filters}
      />
      <ProductList {...productListProps} />
    </div>
  );
};

export default HomePage; 