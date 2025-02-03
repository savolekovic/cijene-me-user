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
  const [filters, setFilters] = useFilterState<Filters>({
    search: '',
    category_id: null,
    min_price: null,
    max_price: null,
    has_entries: null,
    barcode: null,
    order_by: 'created_at' as OrderBy,
    order_direction: 'desc' as const
  }, {
    excludeFromUrl: ['page', 'per_page'],
    debounceMs: 300
  });

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    per_page: 20
  });

  useEffect(() => {
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [filters]);

  const { data: productsData, isLoading: loading, error, refetch } = useProductsQuery({
    ...filters,
    ...pagination
  });

  const handleSearch = (term: string) => {
    setFilters(prev => ({ ...prev, search: term }));
  };

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const handleSortChange = (orderBy: OrderBy, orderDirection: 'asc' | 'desc') => {
    setFilters(prev => ({
      ...prev,
      order_by: orderBy,
      order_direction: orderDirection
    }));
  };

  const handlePageChange = (page: number) => {
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
        products={productsData?.data ?? []}
        loading={loading}
        error={error?.message ?? null}
        onSortChange={(orderBy, orderDirection) => 
          handleSortChange(orderBy as OrderBy, orderDirection as 'asc' | 'desc')}
        onPageChange={handlePageChange}
        currentPage={pagination.page}
        sortBy={filters.order_by || 'created_at'}
        sortDirection={filters.order_direction || 'desc'}
        onRetry={refetch}
      />
    </div>
  );
};

export default HomePage; 