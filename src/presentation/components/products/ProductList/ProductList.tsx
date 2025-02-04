import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import EmptyState from '../../common/EmptyState/EmptyState';
import { Product } from '../../../../core/types/Product';
import './ProductList.css';
import Pagination from '../../common/Pagination/Pagination';
import { SORT_OPTIONS } from '../../../../core/constants/sortOptions';
import ProductListSkeleton from '../../common/Skeleton/ProductListSkeleton';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onSortChange: (orderBy: string, orderDirection: 'asc' | 'desc') => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onRetry: () => void;
}


const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
  onSortChange,
  onPageChange,
  currentPage,
  totalPages,
  sortBy,
  sortDirection,
  onRetry
}) => {
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

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [newOrderBy, newOrderDirection] = event.target.value.split('-') as [string, 'asc' | 'desc'];
    onSortChange(newOrderBy, newOrderDirection);
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div className="text-muted mb-3 mb-md-0">
          Prikazano {products.length} proizvoda
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

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {products.map(product => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProductList; 