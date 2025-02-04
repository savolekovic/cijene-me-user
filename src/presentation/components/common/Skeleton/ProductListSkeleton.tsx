import React from 'react';
import ProductSkeleton from './ProductSkeleton';
import './Skeleton.css';

const ProductListSkeleton: React.FC = () => {
  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
      {[...Array(10)].map((_, index) => (
        <div className="col" key={index}>
          <ProductSkeleton />
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton; 