import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  // Let's add some logging to see the product data
  console.log('Product data:', product);

  // Since we don't have price data in the API response, we'll need to handle this differently
  return (
    <div className="card h-100 border-0 shadow-sm product-card">
      <div className="position-relative product-image-wrapper">
        <img 
          src={product.image_url} 
          className="card-img-top product-image" 
          alt={product.name} 
        />
      </div>
      <div className="card-body d-flex flex-column p-3">
        <div className="category-badge mb-2">{product.category.name}</div>
        <h5 className="product-title mb-2">{product.name}</h5>
        <div className="mt-auto">
          <div className="price-section mb-2">
            <div className="d-flex justify-content-between align-items-baseline">
              <div className="store-count">
                <i className="bi bi-shop me-1"></i>
                Dostupno u {product.store_count || 'više'} prodavnica
              </div>
            </div>
          </div>
          <button className="btn btn-outline-primary w-100 history-btn">
            <i className="bi bi-graph-up me-1"></i>
            Istorija cijena
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 