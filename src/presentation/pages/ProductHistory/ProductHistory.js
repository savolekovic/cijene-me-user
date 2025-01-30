import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductHistory.css';

function ProductHistory() {
  const { id } = useParams();

  return (
    <div className="product-history-page">
      <div className="container py-4">
        <h2>Istorija cijena</h2>
        <p>Product ID: {id}</p>
        {/* We'll implement the history chart and data here */}
      </div>
    </div>
  );
}

export default ProductHistory; 