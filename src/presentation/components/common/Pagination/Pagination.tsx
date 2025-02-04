import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = React.memo(({
  currentPage,
  totalItems,
  perPage,
  onPageChange
}) => {
  // Memoize calculations
  const { totalPages, hasNextPage, hasPrevPage } = React.useMemo(() => {
    const total = Math.ceil(totalItems / perPage);
    return {
      totalPages: total,
      hasNextPage: currentPage < total,
      hasPrevPage: currentPage > 1
    };
  }, [totalItems, perPage, currentPage]);

  // Memoize page numbers array
  const pageNumbers = React.useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  // Memoize handlers
  const handlePrevPage = React.useCallback(() => {
    onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNextPage = React.useCallback(() => {
    onPageChange(currentPage + 1);
  }, [currentPage, onPageChange]);

  const handlePageClick = React.useCallback((pageNum: number) => {
    if (typeof pageNum === 'number') {
      onPageChange(pageNum);
    }
  }, [onPageChange]);

  console.log('[Render] Pagination:', {
    currentPage,
    totalItems,
    perPage,
    hasNextPage
  });

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>

        {pageNumbers.map((pageNum, index) => (
          <li
            key={index}
            className={`page-item ${pageNum === currentPage ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageClick(pageNum as number)}
            >
              {pageNum}
            </button>
          </li>
        ))}

        <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={handleNextPage}
            disabled={!hasNextPage}
            aria-label="Next page"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}, (prev, next) => {
  return (
    prev.currentPage === next.currentPage &&
    prev.totalItems === next.totalItems &&
    prev.perPage === next.perPage
  );
});

export default Pagination; 