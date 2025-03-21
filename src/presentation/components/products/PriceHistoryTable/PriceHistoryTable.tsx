import React from 'react';
import { ProductEntry } from '../../../../core/types/ProductEntry';
import { formatRelativeTime } from '../../../../core/utils/dateFormatters';
import Pagination from '../../common/Pagination/Pagination';
import './PriceHistoryTable.css';

interface PriceHistoryTableProps {
  entries: ProductEntry[];
  currentPage: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

const PriceHistoryTable: React.FC<PriceHistoryTableProps> = React.memo(({ 
  entries,
  currentPage,
  totalItems,
  perPage,
  onPageChange
}) => {
  // Memoize pagination props
  const paginationProps = React.useMemo(() => ({
    currentPage,
    totalItems,
    perPage,
    onPageChange
  }), [currentPage, totalItems, perPage, onPageChange]);

  // Only log on actual re-renders
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Render] PriceHistoryTable:', {
        entriesCount: entries.length,
        currentPage,
        totalItems,
        perPage
      });
    }
  }, [entries.length, currentPage, totalItems, perPage]);

  return (
    <div className="price-history-table">
      <div className="table-header">
        <h3 className="table-title">Istorija cijena</h3>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>
                <i className="bi bi-shop me-2"></i>
                Prodavnica
              </th>
              <th>
                <i className="bi bi-geo-alt me-2"></i>
                Lokacija
              </th>
              <th>
                <i className="bi bi-cash me-2"></i>
                Cijena
              </th>
              <th>
                <i className="bi bi-calendar-date me-2"></i>
                Datum
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id}>
                <td>{entry.store_location.store_brand.name}</td>
                <td>{entry.store_location.address}</td>
                <td className="price-cell">{entry.price}€</td>
                <td>{formatRelativeTime(entry.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination {...paginationProps} />
    </div>
  );
}, (prev, next) => {
  // Add proper memoization check
  return (
    prev.entries === next.entries &&
    prev.currentPage === next.currentPage &&
    prev.totalItems === next.totalItems &&
    prev.perPage === next.perPage
  );
});

export default PriceHistoryTable; 