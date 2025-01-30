import React from 'react';
import './EmptyState.css';

const EmptyState = ({ 
  icon = "bi-inbox", 
  title = "Nema rezultata", 
  subtitle = "Nismo pronašli proizvode koji odgovaraju vašoj pretrazi",
  action = null 
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="empty-state-text">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      {action}
    </div>
  );
};

export default EmptyState; 