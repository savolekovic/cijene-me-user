import React, { useState, useEffect } from 'react';
import SearchFilters from '../../components/products/filters/SearchFilters/SearchFilters';
import ProductList from '../../components/products/ProductList/ProductList';
import { useProductsQuery } from '../../hooks/products/useProductsQuery';
import { useFilterState, FilterValue } from '../../hooks/useFilterState';
import './HomePage.css';
import { ProductFilters } from '../../../core/types/Product';
import { PaginationState, SortState } from '../../hooks/types';
import { useSearchParams } from 'react-router-dom';

type OrderDirection = 'asc' | 'desc';
type Filters = ProductFilters & Partial<PaginationState> & Partial<SortState> & Record<string, FilterValue>;

type OrderBy = 'name' | 'created_at';

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Memoize initial filter state with URL values
  const initialFilters = React.useMemo(() => {
    const page = Number(searchParams.get('page')) || 1;
    const per_page = Number(searchParams.get('per_page')) || 20;
    const category_id = searchParams.get('category_id') ? Number(searchParams.get('category_id')) : null;
    const min_price = searchParams.get('min_price') ? Number(searchParams.get('min_price')) : null;
    const max_price = searchParams.get('max_price') ? Number(searchParams.get('max_price')) : null;
    const direction = searchParams.get('order_direction');

    return {
      search: searchParams.get('search') || '',
      category_id,
      min_price,
      max_price,
      has_entries: searchParams.get('has_entries') === 'true' || null,
      barcode: searchParams.get('barcode') || null,
      order_by: (searchParams.get('order_by') || 'created_at') as OrderBy,
      order_direction: (direction === 'asc' || direction === 'desc' ? direction : 'desc') as OrderDirection,
      page,
      per_page
    };
  }, [searchParams]);

  const [filters, setFilters] = useFilterState<Filters>(initialFilters, {
    debounceMs: 300
  });

  // Only reset page when search filters change, not pagination or sorting
  const lastSearchRef = React.useRef({
    search: filters.search,
    category_id: filters.category_id,
    min_price: filters.min_price,
    max_price: filters.max_price
  });

  useEffect(() => {
    const lastSearch = lastSearchRef.current;
    if (filters.search !== lastSearch.search ||
        filters.category_id !== lastSearch.category_id ||
        filters.min_price !== lastSearch.min_price ||
        filters.max_price !== lastSearch.max_price) {
      setFilters(prev => ({ ...prev, page: 1 }));
      lastSearchRef.current = {
        search: filters.search,
        category_id: filters.category_id,
        min_price: filters.min_price,
        max_price: filters.max_price
      };
    }
  }, [filters.search, filters.category_id, filters.min_price, filters.max_price, setFilters]);

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

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [filters.page]);

  const handlePageChange = React.useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, [setFilters]);

  const { data: productsData, isLoading, error, refetch } = useProductsQuery({
    ...filters // Now includes all pagination params
  });

  const productListProps = React.useMemo(() => ({
    products: productsData?.data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    onSortChange: handleSortChange,
    onPageChange: handlePageChange,
    currentPage: filters.page || 1,
    totalItems: productsData?.total_count ?? 0,
    perPage: filters.per_page || 20,
    sortBy: filters.order_by || 'created_at',
    sortDirection: filters.order_direction || 'desc',
    onRetry: refetch
  }), [
    productsData?.data,
    isLoading,
    error?.message,
    handleSortChange,
    handlePageChange,
    filters.page,
    filters.per_page,
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