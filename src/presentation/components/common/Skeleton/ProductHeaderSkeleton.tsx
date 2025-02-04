import React from 'react';
import './Skeleton.css';

const ProductHeaderSkeleton: React.FC = () => {
  return (
    <div className="product-header mb-4">
      <div className="d-flex align-items-center">
        <div className="history-product-image-wrapper me-3">
          <div className="skeleton skeleton-image"></div>
        </div>
        <div>
          <div className="skeleton skeleton-title mb-3"></div>
          <div className="d-flex gap-3">
            <div className="skeleton skeleton-text" style={{ width: '100px' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '150px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeaderSkeleton; 