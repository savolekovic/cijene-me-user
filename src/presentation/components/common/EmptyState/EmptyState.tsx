import React, { ReactNode } from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
  size?: 'default' | 'large' | 'medium';
}

const EmptyState: React.FC<EmptyStateProps> = React.memo(({
  icon,
  title,
  subtitle,
  action,
  size = 'medium'
}) => {
  return (
    <div className={`empty-state ${size === 'large' ? 'empty-state-large' : size === 'medium' ? 'empty-state-medium' : ''}`}>
      <div className={`empty-state-icon ${size === 'large' ? 'empty-state-icon-large' : size === 'medium' ? 'empty-state-icon-medium' : ''}`}>
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
}, (prev, next) => {
  return (
    prev.icon === next.icon &&
    prev.title === next.title &&
    prev.subtitle === next.subtitle &&
    prev.size === next.size
  );
});

export default EmptyState; 