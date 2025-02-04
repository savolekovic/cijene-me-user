import React from 'react';
import './Skeleton.css';

const StatisticsSkeleton: React.FC = () => {
  return (
    <div className="row">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="col-md-3 col-6 mb-3">
          <div className="price-stat-card">
            <div className="skeleton-text mb-2" style={{ width: '70%' }}></div>
            <div className="skeleton-title"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsSkeleton; 