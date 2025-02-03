import React, { ReactNode } from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  action?: ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
  action
}) => {
  return (
    <div className="empty-state">
      <i className={`bi ${icon} empty-state-icon`}></i>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-subtitle">{subtitle}</p>
      {action && (
        <div className="empty-state-action">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState; 