import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import ProductHeaderSkeleton from '../../components/common/Skeleton/ProductHeaderSkeleton';

const ProductHistory: React.FC = React.memo(() => {
  const { id } = useParams() as { id: string };
  
  // Memoize the parsed ID to avoid unnecessary recalculations
  const productId = React.useMemo(() => parseInt(id, 10), [id]);

  // Use pagination with URL state
  const { page, perPage, onPageChange } = usePagination({
    initialPage: 1,
    initialPerPage: 20
  });

  // Query data with memoized ID
  const { 
    data: entriesData = { data: [], total_count: 0 },
    isLoading: entriesLoading,
    error: entriesError,
    refetch: refetchEntries
  } = useProductEntriesQuery(productId, { page, per_page: perPage });

  const {
    data: statistics,
    isLoading: statsLoading,
    error: statsError
  } = useProductStatisticsQuery(productId);

  // Memoize the product to prevent unnecessary re-renders
  const product = React.useMemo(() => 
    entriesData.data[0]?.product,
    [entriesData.data]
  );

  // Memoize props passed to PriceHistoryTable
  const tableProps = React.useMemo(() => ({
    entries: entriesData.data,
    currentPage: page,
    totalItems: entriesData.total_count,
    perPage,
    onPageChange
  }), [entriesData.data, entriesData.total_count, page, perPage, onPageChange]);

  // Add development-only logging
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Render] ProductHistory:', {
        productId: id,
        entriesCount: entriesData?.data.length,
        hasStatistics: !!statistics
      });
    }
  }, [id, entriesData?.data.length, statistics]);

  const navigate = useNavigate();
  
  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(-1);
  };

  // Loading state
  if (entriesLoading || statsLoading) {
    return (
      <div className="container py-4">
        <ProductHeaderSkeleton />
        <div className="mb-4">
          <StatisticsSkeleton />
        </div>
        <PriceHistorySkeleton />
      </div>
    );
  }

  // Error states
  if (!product) {
    return (
      <div className="container py-5">
        <EmptyState
          icon="bi-question-circle"
          title="Proizvod nije pronađen"
          subtitle="Proizvod koji tražite ne postoji ili je uklonjen."
          action={
            <a 
              href="/" 
              className="btn btn-outline-primary btn-sm"
              onClick={handleBackClick}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Nazad na proizvode
            </a>
          }
          size="large"
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
          size="large"
        />
      </div>
    );
  }

  return (
    <div className="product-history-page">
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-12">
            <a href="/" className="history-back-link" onClick={handleBackClick}>
              <i className="bi bi-arrow-left me-2"></i>
              Nazad na proizvode
            </a>
          </div>
        </div>

        <ProductHeader product={product} statistics={statistics} />
        {statistics && <ProductStatistics statistics={statistics} />}
        <PriceHistoryTable {...tableProps} />
      </div>
    </div>
  );
});

export default ProductHistory; 