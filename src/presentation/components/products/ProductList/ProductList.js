import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import EmptyState from '../../common/EmptyState/EmptyState';
import './ProductList.css';

const ProductList = ({ 
  products = [],
  loading,
  error,
  onSortChange,
  onPageChange,
  currentPage,
  sortBy,
  sortDirection,
  onRetry
}) => {
  const productsPerPage = 20;

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="loading-state">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Učitavanje...</span>
        </div>
        <p className="mt-3 text-muted">Učitavanje proizvoda...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container py-5">
      <EmptyState
        icon="bi-exclamation-triangle"
        title="Došlo je do greške"
        subtitle="Nismo uspjeli učitati proizvode. Molimo pokušajte ponovo."
        action={
          <button 
            className="btn btn-primary btn-sm"
            onClick={onRetry}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Pokušaj ponovo
          </button>
        }
      />
    </div>
  );

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="container py-5">
        <EmptyState
          icon="bi-search"
          title="Nema rezultata"
          subtitle="Pokušajte sa drugačijim filterima ili pretragom"
          action={
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => window.location.href = '/'}
              >
                <i className="bi bi-house-door me-2"></i>
                Početna
              </button>
            </div>
          }
        />
      </div>
    );
  }

  const handleSortChange = (event) => {
    const [newOrderBy, newOrderDirection] = event.target.value.split('-');
    onSortChange(newOrderBy, newOrderDirection);
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div className="text-muted mb-3 mb-md-0">
          Prikazano {products.length} proizvoda
        </div>
        <div className="d-flex gap-2 align-items-center">
          <label className="text-muted me-2">Sortiraj po:</label>
          <select 
            className="form-select form-select-sm" 
            style={{width: 'auto'}}
            value={`${sortBy}-${sortDirection}`}
            onChange={handleSortChange}
          >
            <option value="name-asc">Ime (A-Z)</option>
            <option value="name-desc">Ime (Z-A)</option>
            <option value="created_at-desc">Najnovije prvo</option>
            <option value="created_at-asc">Najstarije prvo</option>
            <option value="barcode-asc">Barkod (rastući)</option>
            <option value="barcode-desc">Barkod (opadajući)</option>
          </select>
        </div>
      </div>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
        {products.map(product => (
          <div className="col" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(currentPage - 1)}
            >
              Prethodna
            </button>
          </li>
          {[...Array(Math.ceil(products.length / productsPerPage))].map((_, index) => (
            <li 
              key={index + 1} 
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button 
                className="page-link"
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(products.length / productsPerPage) ? 'disabled' : ''}`}>
            <button 
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Sljedeća
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList; 