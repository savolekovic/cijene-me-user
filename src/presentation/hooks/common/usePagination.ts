import { useState } from 'react';

interface PaginationConfig {
  initialPage?: number;
  initialPerPage?: number;
}

export function usePagination({ initialPage = 1, initialPerPage = 20 }: PaginationConfig = {}) {
  const [page, setPage] = useState(initialPage);
  const [perPage] = useState(initialPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    page,
    perPage,
    onPageChange: handlePageChange
  };
} 