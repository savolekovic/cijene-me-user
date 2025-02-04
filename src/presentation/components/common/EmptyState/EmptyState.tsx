import React, { ReactNode } from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
  size?: 'default' | 'large';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
  action,
  size = 'default'
}) => {
  return (
    <div className={`empty-state ${size === 'large' ? 'empty-state-large' : ''}`}>
      <div className={`empty-state-icon ${size === 'large' ? 'empty-state-icon-large' : ''}`}>
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="empty-state-text">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      {action && (
        <div className="empty-state-action">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState; 