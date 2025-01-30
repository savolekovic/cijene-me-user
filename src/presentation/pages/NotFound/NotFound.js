import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container py-5">
        <EmptyState
          icon="bi-map"
          title="Stranica nije pronađena"
          subtitle="Stranica koju tražite ne postoji ili je premještena"
          action={
            <Link to="/" className="btn btn-primary btn-sm">
              <i className="bi bi-house-door me-2"></i>
              Nazad na početnu
            </Link>
          }
        />
      </div>
    </div>
  );
}

export default NotFound; 