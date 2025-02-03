import React, { Component, ErrorInfo, ReactNode } from 'react';
import EmptyState from './EmptyState/EmptyState';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <EmptyState
          icon="bi-exclamation-triangle"
          title="Došlo je do greške"
          subtitle="Molimo osvježite stranicu"
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 