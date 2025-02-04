import React from 'react';
import './Skeleton.css';

const StatisticsSkeleton: React.FC = () => {
  return (
    <div className="row">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="col-md-3 col-6 mb-3">
          <div className="price-stat-card h-100">
            <div className="skeleton" style={{ height: '16px', width: '70%', marginBottom: '12px' }}></div>
            <div className="skeleton" style={{ height: '32px', width: '100%' }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsSkeleton; 