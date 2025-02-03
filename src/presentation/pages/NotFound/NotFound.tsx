import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState/EmptyState';

const NotFound: React.FC = () => {
  return (
    <div className="container py-5">
      <EmptyState
        icon="bi-question-circle"
        title="Stranica nije pronađena"
        subtitle="Stranica koju tražite ne postoji ili je uklonjena"
        action={
          <Link to="/" className="btn btn-outline-primary btn-sm">
            <i className="bi bi-house-door me-2"></i>
            Nazad na početnu
          </Link>
        }
      />
    </div>
  );
};

export default NotFound; 