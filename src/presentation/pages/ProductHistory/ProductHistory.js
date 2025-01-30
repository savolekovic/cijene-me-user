import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { srLatn } from 'date-fns/locale';
import { useProductEntriesQuery } from '../../hooks/products/useProductEntriesQuery';
import { useProductStatisticsQuery } from '../../hooks/products/useProductStatisticsQuery';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import './ProductHistory.css';

function ProductHistory() {
  const { id } = useParams();
  const [filters] = useState({
    page: 1,
    per_page: 20
  });

  const { 
    data: entriesData = { data: [] }, 
    isLoading: entriesLoading,
    error: entriesError,
    refetch: refetchEntries
  } = useProductEntriesQuery(id, filters);

  const {
    data: statistics,
    isLoading: statsLoading,
    error: statsError
  } = useProductStatisticsQuery(id);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('me', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRelativeTime = (dateString) => {
    try {
      const distance = formatDistanceToNow(new Date(dateString), { 
        addSuffix: true,
        locale: srLatn 
      });
      
      // Replace "pre" with "prije"
      return distance.replace('pre', 'prije');
    } catch (error) {
      return dateString;
    }
  };

  if (entriesLoading || statsLoading) {
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

  if (entriesError || statsError) {
    return (
      <div className="container py-5">
        <EmptyState
          icon="bi-exclamation-triangle"
          title="Došlo je do greške"
          subtitle="Nismo uspjeli učitati istoriju cijena. Molimo pokušajte ponovo."
          action={
            <button 
              className="btn btn-primary btn-sm"
              onClick={refetchEntries}
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
            <Link to="/" className="history-back-link">
              <i className="bi bi-arrow-left me-2"></i>
              Nazad na proizvode
            </Link>
          </div>
        </div>

        <div className="product-header mb-4">
          <div className="d-flex align-items-center">
            <div className="history-product-image-wrapper me-3">
              <img 
                src={product?.image_url || '/placeholder.png'} 
                alt={product?.name}
                className="history-product-image"
              />
            </div>
            <div>
              <h1 className="history-product-title mb-1">{product?.name}</h1>
              <div className="history-meta">
                <span className="me-3">
                  <i className="bi bi-clock-history me-1"></i>
                  {statistics?.total_entries} unosa
                </span>
                <span>
                  <i className="bi bi-calendar3 me-1"></i>
                  Dodato {formatDate(statistics?.first_entry_date)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-3 col-6 mb-3">
            <div className="price-stat-card">
              <div className="stat-label">
                <i className="bi bi-tag-fill me-2"></i>
                Posljednja cijena
              </div>
              <div className="stat-value-wrapper">
                <span className="stat-value">
                  {statistics?.latest_price}€
                </span>
                {statistics?.price_change && (
                  <span className={`price-change ${statistics.price_change > 0 ? 'price-up' : 'price-down'}`}>
                    <i className={`bi bi-arrow-${statistics.price_change > 0 ? 'up' : 'down'}`}></i>
                    {Math.abs(statistics.price_change_percentage).toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="price-stat-card">
              <div className="stat-label">
                <i className="bi bi-graph-down-arrow me-2"></i>
                Najniža cijena
              </div>
              <div className="stat-value text-success">{statistics?.lowest_price}€</div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="price-stat-card">
              <div className="stat-label">
                <i className="bi bi-graph-up-arrow me-2"></i>
                Najviša cijena
              </div>
              <div className="stat-value text-danger">{statistics?.highest_price}€</div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="price-stat-card">
              <div className="stat-label">
                <i className="bi bi-calculator me-2"></i>
                Prosječna cijena
              </div>
              <div className="stat-value text-primary">{statistics?.average_price}€</div>
            </div>
          </div>
        </div>

        <div className="price-history-table">
          <div className="table-header">
            <h3 className="table-title">Istorija cijena</h3>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <i className="bi bi-shop me-2"></i>
                    Prodavnica
                  </th>
                  <th>
                    <i className="bi bi-geo-alt me-2"></i>
                    Lokacija
                  </th>
                  <th>
                    <i className="bi bi-cash me-2"></i>
                    Cijena
                  </th>
                  <th>
                    <i className="bi bi-calendar-date me-2"></i>
                    Datum
                  </th>
                </tr>
              </thead>
              <tbody>
                {entriesData.data.map(entry => (
                  <tr key={entry.id}>
                    <td>{entry.store_location.store_brand.name}</td>
                    <td>{entry.store_location.address}</td>
                    <td className="price-cell">{entry.price}€</td>
                    <td>{formatRelativeTime(entry.created_at)}</td>
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