import React from 'react';
import EmptyState from '../../common/EmptyState/EmptyState';
import { Product } from '../../../../core/types/Product';
import Pagination from '../../common/Pagination/Pagination';
import { SORT_OPTIONS } from '../../../../core/constants/sortOptions';
import ProductListSkeleton from '../../common/Skeleton/ProductListSkeleton';
import ProductCardList from './ProductCardList';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onSortChange: (orderBy: string, orderDirection: 'asc' | 'desc') => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalItems: number;
  perPage: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onRetry: () => void;
}

const ProductList: React.FC<ProductListProps> = React.memo(({
  products,
  loading,
  error,
  onSortChange,
  onPageChange,
  currentPage,
  totalItems,
  perPage,
  sortBy,
  sortDirection,
  onRetry
}) => {
  // Calculate start and end item numbers
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);
  
  const paginationInfo = React.useMemo(() => {
    if (totalItems === 0) return 'Nema proizvoda';
    return `Prikazano ${startItem}-${endItem} od ${totalItems} proizvoda`;
  }, [startItem, endItem, totalItems]);

  // Memoize pagination props
  const paginationProps = React.useMemo(() => ({
    currentPage,
    totalItems,
    perPage,
    onPageChange
  }), [currentPage, totalItems, perPage, onPageChange]);

  const handleSortChange = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const [newOrderBy, newOrderDirection] = event.target.value.split('-') as [string, 'asc' | 'desc'];
    onSortChange(newOrderBy, newOrderDirection);
  }, [onSortChange]);

  if (loading) {
    return (
      <div className="container py-4">
        <ProductListSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon="bi-exclamation-circle"
        title="Greška pri učitavanju"
        subtitle={error}
        action={
          <button className="btn btn-primary btn-sm" onClick={onRetry}>
            <i className="bi bi-arrow-clockwise me-2"></i>
            Pokušaj ponovo
          </button>
        }
      />
    );
  }

  if (products.length === 0) {
    return (
      <div className="container py-5">
        <EmptyState
          icon="bi-search"
          title="Nema rezultata"
          subtitle="Nismo pronašli proizvode koji odgovaraju vašoj pretrazi. Pokušajte sa drugim filterima."
          action={
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={() => window.location.href = '/'}
            >
              <i className="bi bi-arrow-counterclockwise me-2"></i>
              Poništi filtere
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div className="text-muted">
          {paginationInfo}
        </div>
        <div className="d-flex gap-2 align-items-center">
          <label className="text-muted me-2">Sortiraj po:</label>
          <select 
            className="form-select form-select-sm" 
            style={{ width: 'auto' }}
            value={`${sortBy}-${sortDirection}`}
            onChange={handleSortChange}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ProductCardList products={products} />
      <Pagination {...paginationProps} />
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.currentPage === nextProps.currentPage &&
    prevProps.totalItems === nextProps.totalItems &&
    prevProps.products === nextProps.products &&
    prevProps.loading === nextProps.loading &&
    prevProps.sortBy === nextProps.sortBy &&
    prevProps.sortDirection === nextProps.sortDirection;
});

export default ProductList; 