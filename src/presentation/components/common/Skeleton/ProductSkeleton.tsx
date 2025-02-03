import React from 'react';
import './Skeleton.css';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="card product-skeleton">
      <div className="skeleton-image"></div>
      <div className="card-body">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton; 