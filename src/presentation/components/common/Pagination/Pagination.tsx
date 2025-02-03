import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <nav aria-label="Page navigation">
      <div className="pagination-info mb-2">
        {totalItems && itemsPerPage && (
          <small className="text-muted">
            Prikazano {Math.min(currentPage * itemsPerPage, totalItems)} od {totalItems} rezultata
          </small>
        )}
      </div>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>

        {getPageNumbers().map((pageNum, index) => (
          <li
            key={index}
            className={`page-item ${pageNum === currentPage ? 'active' : ''} ${
              pageNum === '...' ? 'disabled' : ''
            }`}
          >
            <button
              className="page-link"
              onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
              disabled={pageNum === '...'}
            >
              {pageNum}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination; 