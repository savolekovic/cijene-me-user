import React from 'react';
import SearchFilters from '../../components/products/filters/SearchFilters/SearchFilters';
import ProductList from '../../components/products/ProductList/ProductList';
import { useProductsQuery } from '../../hooks/products/useProductsQuery';
import { useFilterState, FilterValue } from '../../hooks/useFilterState';
import './HomePage.css';
import { ProductFilters } from '../../../core/types/Product';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useCategoriesQuery } from 'presentation/hooks/products/useCategoriesQuery';

// Add back the type definition
type OrderDirection = 'asc' | 'desc';

interface PaginationState {
  page: number;
  per_page: number;
}

interface SortState {
  order_by: string;
  order_direction: OrderDirection; // Now it uses the type
}

type Filters = ProductFilters & Partial<PaginationState> & Partial<SortState> & Record<string, FilterValue>;

type OrderBy = 'name' | 'created_at';

const HomePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Add categories query at the page level
  const { data: categories } = useCategoriesQuery();
  
  const urlParams = React.useMemo(() => ({
    page: Number(searchParams.get('page')) || 1,
    per_page: Number(searchParams.get('per_page')) || 20,
    category_id: searchParams.get('category_id') ? Number(searchParams.get('category_id')) : null,
    min_price: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : null,
    max_price: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : null,
    search: searchParams.get('search') || '',
    order_by: (searchParams.get('order_by') || 'created_at') as OrderBy,
    order_direction: (searchParams.get('order_direction') || 'desc') as OrderDirection
  }), [searchParams]);

  const [filters, setFilters] = useFilterState<Filters>(urlParams, {
    debounceMs: 300
  });

  // Reset page when filters change (except page/perPage changes)
  React.useEffect(() => {
    const shouldResetPage = 
      filters.search !== urlParams.search ||
      filters.category_id !== urlParams.category_id ||
      filters.min_price !== urlParams.min_price ||
      filters.max_price !== urlParams.max_price ||
      filters.order_by !== urlParams.order_by ||
      filters.order_direction !== urlParams.order_direction;

    if (shouldResetPage) {
      setFilters(prev => ({ ...prev, page: 1 }));
    }
  }, [
    filters.search,
    filters.category_id,
    filters.min_price,
    filters.max_price,
    filters.order_by,
    filters.order_direction,
    urlParams,
    setFilters
  ]);

  // Scroll to top only when page number changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [urlParams.page]); // Only depend on page number

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
    setFilters(prev => ({ ...prev, page }));
  }, [setFilters]);

  // Query products using URL params directly
  const { data, isLoading, error, refetch } = useProductsQuery({
    ...filters,
    page: urlParams.page,
    per_page: urlParams.per_page
  });

  const productListProps = React.useMemo(() => ({
    products: data?.data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    onSortChange: handleSortChange,
    onPageChange: handlePageChange,
    currentPage: urlParams.page,
    totalItems: data?.total_count ?? 0,
    perPage: urlParams.per_page,
    sortBy: filters.order_by || 'created_at',
    sortDirection: filters.order_direction || 'desc',
    onRetry: refetch
  }), [
    data,
    isLoading,
    error,
    handleSortChange,
    handlePageChange,
    urlParams,
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
        categories={categories || []}
      />
      <ProductList {...productListProps} />
    </div>
  );
};

export default HomePage; 