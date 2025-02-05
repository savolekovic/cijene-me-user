import React from 'react';
import { Product } from '../../../../core/types/Product';
import ProductCard from '../ProductCard/ProductCard';

interface ProductCardListProps {
  products: Product[];
}

const ProductCardList = React.memo(({ products }: ProductCardListProps) => {

  return (
    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
      {products.map(product => (
        <div className="col" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}, (prev, next) => prev.products === next.products);

export default ProductCardList; 