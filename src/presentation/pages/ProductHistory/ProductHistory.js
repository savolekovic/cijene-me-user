import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductEntriesQuery } from '../../hooks/products/useProductEntriesQuery';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import './ProductHistory.css';

function ProductHistory() {
  const { id } = useParams();
  const [filters, setFilters] = useState({
    page: 1,
    per_page: 20
  });

  const { 
    data: entriesData = { data: [] }, 
    isLoading: loading,
    error,
    refetch
  } = useProductEntriesQuery(id, filters);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('me', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const priceStats = useMemo(() => {
    if (!entriesData.data.length) return null;

    const prices = entriesData.data.map(entry => parseFloat(entry.price));
    return {
      latest: entriesData.data[0].price,
      lowest: Math.min(...prices).toFixed(2),
      highest: Math.max(...prices).toFixed(2),
      average: (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)
    };
  }, [entriesData.data]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="loading-state">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Učitavanje...</span>
          </div>
          <p className="mt-3 text-muted">Učitavanje istorije cijena...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <EmptyState
          icon="bi-exclamation-triangle"
          title="Došlo je do greške"
          subtitle="Nismo uspjeli učitati istoriju cijena. Molimo pokušajte ponovo."
          action={
            <button 
              className="btn btn-primary btn-sm"
              onClick={refetch}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Pokušaj ponovo
            </button>
          }
        />
      </div>
    );
  }

  if (!entriesData.data.length) {
    return (
      <div className="container py-5">
        <EmptyState
          icon="bi-graph-up"
          title="Nema podataka o cijenama"
          subtitle="Za ovaj proizvod još uvijek nema unijetih cijena"
          action={
            <Link to="/" className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-house-door me-2"></i>
              Nazad na početnu
            </Link>
          }
        />
      </div>
    );
  }

  const product = entriesData.data[0]?.product;

  return (
    <div className="product-history-page">
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-12">
            <Link to="/" className="btn btn-link btn-sm ps-0">
              <i className="bi bi-arrow-left me-2"></i>
              Nazad na proizvode
            </Link>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex align-items-center mb-4">
              <img 
                src={product?.image_url || '/placeholder.png'} 
                alt={product?.name}
                className="history-product-image me-3"
              />
              <div>
                <h1 className="history-product-title">{product?.name}</h1>
                <p className="text-muted mb-0">Istorija cijena</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-3 col-6 mb-3">
            <div className="price-stat-card">
              <div className="stat-label">Posljednja cijena</div>
              <div className="stat-value">{priceStats?.latest}€</div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="price-stat-card">
              <div className="stat-label">Najniža cijena</div>
              <div className="stat-value text-success">{priceStats?.lowest}€</div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="price-stat-card">
              <div className="stat-label">Najviša cijena</div>
              <div className="stat-value text-danger">{priceStats?.highest}€</div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="price-stat-card">
              <div className="stat-label">Prosječna cijena</div>
              <div className="stat-value text-primary">{priceStats?.average}€</div>
            </div>
          </div>
        </div>

        <div className="price-history-table">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Prodavnica</th>
                  <th>Lokacija</th>
                  <th>Cijena</th>
                  <th>Datum</th>
                </tr>
              </thead>
              <tbody>
                {entriesData.data.map(entry => (
                  <tr key={entry.id}>
                    <td>{entry.store_location.store_brand.name}</td>
                    <td>{entry.store_location.address}</td>
                    <td className="price-cell">{entry.price}€</td>
                    <td>{formatDate(entry.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductHistory; 