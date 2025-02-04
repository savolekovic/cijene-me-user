import React from 'react';
import ProductSkeleton from './ProductSkeleton';
import './Skeleton.css';

const ProductListSkeleton: React.FC<{ count?: number }> = React.memo(({ count = 10 }) => {
  // Development-only logging - moved outside conditional
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Render] ProductListSkeleton:', { count });
    }
  }, [count]);

  // Memoize skeleton array
  const skeletons = React.useMemo(() => (
    Array(count).fill(null).map((_, index) => (
      <div className="col" key={index}>
        <ProductSkeleton />
      </div>
    ))
  ), [count]);

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
      {skeletons}
    </div>
  );
});

export default ProductListSkeleton; 