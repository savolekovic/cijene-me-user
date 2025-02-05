import React from 'react';
import { ProductStatistics as ProductStatsType } from '../../../../core/types/ProductEntry';
import './ProductStatistics.css';

interface ProductStatisticsProps {
  statistics: ProductStatsType;
}

const ProductStatistics: React.FC<ProductStatisticsProps> = React.memo(({ statistics }) => {
  // Development-only logging - moved outside conditional
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Render] ProductStatistics:', {
        latestPrice: statistics.latest_price,
        priceChange: statistics.price_change,
        totalEntries: statistics.total_entries
      });
    }
  }, [statistics.latest_price, statistics.price_change, statistics.total_entries]);

  return (
    <div className="row mb-4">
      <div className="col-md-3 col-6 mb-3">
        <div className="price-stat-card">
          <div className="stat-label">
            <i className="bi bi-tag-fill me-2"></i>
            Posljednja cijena
          </div>
          <div className="stat-value-wrapper">
            <span className="stat-value">{statistics?.latest_price}€</span>
            {statistics?.price_change ? (
              <span className={`price-change ${statistics.price_change > 0 ? 'price-down' : 'price-up'}`}>
                <i className={`bi bi-arrow-${statistics.price_change > 0 ? 'up' : 'down'}`}></i>
                {Math.abs(statistics.price_change_percentage).toFixed(1)}%
              </span>
            ) : (
              <span className="price-change price-unchanged">
                <i className="bi bi-dash-circle"></i>
                Bez promjene
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-3 col-6 mb-3">
        <div className="price-stat-card">
          <div className="stat-label">
            <i className="bi bi-graph-down-arrow me-2"></i>
            Najniža cijena
          </div>
          <div className="stat-value text-success">{statistics?.lowest_price}€</div>
        </div>
      </div>
      <div className="col-md-3 col-6 mb-3">
        <div className="price-stat-card">
          <div className="stat-label">
            <i className="bi bi-graph-up-arrow me-2"></i>
            Najviša cijena
          </div>
          <div className="stat-value text-danger">{statistics?.highest_price}€</div>
        </div>
      </div>
      <div className="col-md-3 col-6 mb-3">
        <div className="price-stat-card">
          <div className="stat-label">
            <i className="bi bi-calculator me-2"></i>
            Prosječna cijena
          </div>
          <div className="stat-value text-primary">{statistics?.average_price}€</div>
        </div>
      </div>
    </div>
  );
}, (prev, next) => {
  // More specific comparison
  return (
    prev.statistics.latest_price === next.statistics.latest_price &&
    prev.statistics.price_change === next.statistics.price_change &&
    prev.statistics.lowest_price === next.statistics.lowest_price &&
    prev.statistics.highest_price === next.statistics.highest_price &&
    prev.statistics.average_price === next.statistics.average_price &&
    prev.statistics.total_entries === next.statistics.total_entries
  );
});

export default ProductStatistics; 