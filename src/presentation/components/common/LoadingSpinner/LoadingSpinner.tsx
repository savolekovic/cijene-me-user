import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="d-flex justify-content-center p-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner; 