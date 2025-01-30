import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    navigate(`/products/${product.id}/history`);
  };

  // Let's add some logging to see the product data
  console.log('Product data:', product);

  // Since we don't have price data in the API response, we'll need to handle this differently
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
};

export default ProductCard; 