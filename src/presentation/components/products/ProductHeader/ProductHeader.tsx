import React from 'react';
import { Product } from '../../../../core/types/Product';
import { ProductStatistics } from '../../../../core/types/ProductEntry';
import { formatDate } from '../../../../core/utils/dateFormatters';
import './ProductHeader.css';

// Create a type that includes only the properties we need
type ProductHeaderProduct = Pick<Product, 'name' | 'image_url'>;

interface ProductHeaderProps {
  product?: ProductHeaderProduct;
  statistics?: ProductStatistics;
}

const ProductHeader: React.FC<ProductHeaderProps> = React.memo(({ product, statistics }) => {
  // Development-only logging - moved outside conditional
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Render] ProductHeader:', {
        productName: product?.name,
        hasStatistics: !!statistics,
        totalEntries: statistics?.total_entries
      });
    }
  }, [product?.name, statistics]);

  return (
    <div className="product-header mb-4">
      <div className="d-flex align-items-center">
        <div className="history-product-image-wrapper me-3">
          <img 
            src={product?.image_url || '/placeholder.png'} 
            alt={product?.name}
            className="history-product-image"
          />
        </div>
        <div>
          <h1 className="history-product-title mb-1">{product?.name}</h1>
          <div className="history-meta">
            <span className="me-3">
              <i className="bi bi-clock-history me-1"></i>
              {statistics?.total_entries} unosa
            </span>
            <span>
              <i className="bi bi-calendar3 me-1"></i>
              Dodato {statistics?.first_entry_date && formatDate(statistics.first_entry_date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}, (prev, next) => {
  return (
    prev.product?.name === next.product?.name &&
    prev.product?.image_url === next.product?.image_url &&
    prev.statistics?.total_entries === next.statistics?.total_entries &&
    prev.statistics?.first_entry_date === next.statistics?.first_entry_date
  );
});

export default ProductHeader; 