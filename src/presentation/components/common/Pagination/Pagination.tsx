import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | '...';

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

  // Memoize page numbers array with ellipsis
  const pageNumbers = React.useMemo(() => {
    const pages: PageItem[] = [];
    let lastAddedPage = 0;

    // Helper to add ellipsis if there's a gap
    const addEllipsisIfNeeded = (pageNum: number) => {
      if (lastAddedPage && pageNum - lastAddedPage > 1) {
        pages.push('...');
      }
      pages.push(pageNum);
      lastAddedPage = pageNum;
    };

    // Always show first page
    pages.push(1);
    lastAddedPage = 1;

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      addEllipsisIfNeeded(i);
    }

    // Always show last page if it exists
    if (totalPages > 1) {
      addEllipsisIfNeeded(totalPages);
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
            className={`page-item ${pageNum === currentPage ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => pageNum !== '...' && handlePageClick(pageNum as number)}
              disabled={pageNum === '...'}
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