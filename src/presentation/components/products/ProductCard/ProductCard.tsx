import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../../core/types/Product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const navigate = useNavigate();
  
  // Memoize the handler since it depends on product.id
  const handleHistoryClick = React.useCallback(() => {
    navigate(`/products/${product.id}/history`);
  }, [navigate, product.id]);

  // Only log on actual re-renders
  React.useEffect(() => {
    console.log('[Render] ProductCard:', {
      id: product.id,
      name: product.name
    });
  }, [product.id, product.name]);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image_url || '/placeholder.png'} 
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <div className="category-badge mb-2">{product.category?.name}</div>
        <h3 className="product-title">{product.name}</h3>
        <div className="mt-auto">
          <div className="price-section">
            <div className="d-flex justify-content-between align-items-baseline">
              <div className="store-count">
                <i className="bi bi-shop me-1"></i>
                Dostupno u {product.store_count || 'više'} prodavnica
              </div>
            </div>
          </div>
          <button 
            className="btn btn-outline-primary w-100 history-btn"
            onClick={handleHistoryClick}
          >
            <i className="bi bi-graph-up me-1"></i>
            Istorija cijena
          </button>
        </div>
      </div>
    </div>
  );
}, (prev, next) => {
  // More specific comparison to prevent unnecessary re-renders
  return (
    prev.product.id === next.product.id &&
    prev.product.name === next.product.name &&
    prev.product.image_url === next.product.image_url
  );
});

export default ProductCard; 