import { useState, useCallback } from 'react';
import React from 'react';

interface PaginationConfig {
  initialPage?: number;
  initialPerPage?: number;
}

export const usePagination = (initialPage = 1, initialPerPage = 20) => {
  const [state, setState] = React.useState({
    page: initialPage,
    perPage: initialPerPage
  });

  const onPageChange = React.useCallback((newPage: number) => {
    setState(prev => ({ ...prev, page: newPage }));
  }, []);

  return {
    page: state.page,
    perPage: state.perPage,
    onPageChange
  };
}; 