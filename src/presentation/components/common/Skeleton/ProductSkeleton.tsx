import React from 'react';
import './Skeleton.css';

const ProductSkeleton: React.FC = () => {
  return (
    <div className="card h-100">
      <div className="skeleton" style={{ height: '200px', borderRadius: '8px 8px 0 0' }}></div>
      <div className="card-body">
        <div className="skeleton" style={{ height: '20px', width: '80%', marginBottom: '8px' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '60%', marginBottom: '8px' }}></div>
        <div className="skeleton" style={{ height: '16px', width: '40%' }}></div>
      </div>
    </div>
  );
};

export default ProductSkeleton; 