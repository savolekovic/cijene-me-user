import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductEntriesQuery } from '../../hooks/products/useProductEntriesQuery';
import { useProductStatisticsQuery } from '../../hooks/products/useProductStatisticsQuery';
import { usePagination } from '../../hooks/common/usePagination';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import StatisticsSkeleton from '../../components/common/Skeleton/StatisticsSkeleton';
import PriceHistorySkeleton from '../../components/common/Skeleton/PriceHistorySkeleton';
import ProductStatistics from '../../components/products/ProductStatistics/ProductStatistics';
import PriceHistoryTable from '../../components/products/PriceHistoryTable/PriceHistoryTable';
import './ProductHistory.css';
import ProductHeader from '../../components/products/ProductHeader/ProductHeader';

const ProductHistory: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { page, perPage, onPageChange } = usePagination();

  const { 
    data: entriesData = { data: [], total: 0, last_page: 1 }, 
    isLoading: entriesLoading,
    error: entriesError,
    refetch: refetchEntries
  } = useProductEntriesQuery(parseInt(id, 10), { page, per_page: perPage });

  const {
    data: statistics,
    isLoading: statsLoading,
    error: statsError
  } = useProductStatisticsQuery(parseInt(id, 10));

  const product = entriesData.data[0]?.product;

  if (entriesLoading || statsLoading) {
    return (
      <div className="container py-4">
        <div className="mb-4">
          <StatisticsSkeleton />
        </div>
        <PriceHistorySkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <EmptyState
          icon="bi-question-circle"
          title="Proizvod nije pronađen"
          subtitle="Proizvod koji tražite ne postoji ili je uklonjen."
          action={
            <Link to="/" className="btn btn-outline-primary btn-sm">
              <i className="bi bi-arrow-left me-2"></i>
              Nazad na proizvode
            </Link>
          }
        />
      </div>
    );
  }

  if (entriesError || statsError) {
    return (
      <div className="container py-5">
        <EmptyState
          icon="bi-exclamation-triangle"
          title="Došlo je do greške"
          subtitle="Nismo uspjeli učitati istoriju cijena. Molimo pokušajte ponovo."
          action={
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => refetchEntries()}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Pokušaj ponovo
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="product-history-page">
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-12">
            <Link to="/" className="history-back-link">
              <i className="bi bi-arrow-left me-2"></i>
              Nazad na proizvode
            </Link>
          </div>
        </div>

        <ProductHeader product={product} statistics={statistics} />
        {statistics && <ProductStatistics statistics={statistics} />}
        <PriceHistoryTable 
          entries={entriesData.data} 
          currentPage={page}
          totalPages={entriesData.last_page}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default ProductHistory; 