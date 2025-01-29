import React, { useState, useCallback, useEffect } from 'react';
import { useCategoriesQuery } from '../hooks/useProductsQuery';
import FilterPanel from './filters/FilterPanel';
import ActiveFilters from './filters/ActiveFilters';
import './SearchFilters.css';

/**
 * @typedef {Object} SearchFiltersProps
 * @property {(term: string) => void} onSearch
 * @property {(filters: Object) => void} onFilterChange
 * @property {Object} selectedFilters
 */

// Custom debounce hook
const useDebounce = (callback, delay) => {
  return useCallback((value) => {
    const timeoutId = setTimeout(() => {
      callback(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

/**
 * @param {SearchFiltersProps} props
 */
const SearchFilters = ({ onSearch, onFilterChange, selectedFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(selectedFilters.search || '');
  const [tempFilters, setTempFilters] = useState(selectedFilters);

  useEffect(() => {
    setTempFilters(selectedFilters);
  }, [selectedFilters]);

  const {
    data: categories = [],
    isLoading: categoriesLoading
  } = useCategoriesQuery(isFilterOpen);

  const debouncedSearch = useDebounce(onSearch, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleFilterPanelOpen = () => {
    setTempFilters(selectedFilters);
    setIsFilterOpen(true);
  };

  const handleClose = () => {
    setTempFilters(selectedFilters);
    setIsFilterOpen(false);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      category_id: null,
      min_price: null,
      max_price: null,
      has_entries: null,
      barcode: null
    };
    onFilterChange(clearedFilters);
    setIsFilterOpen(false);
  };

  const handleApplyFilters = () => {
    onFilterChange(tempFilters);
    setIsFilterOpen(false);
  };

  const handleTempFilterChange = (newFilters) => {
    setTempFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  return (
    <div className="search-filters py-3 bg-white border-bottom">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="input-group">
              <span className="input-group-text border-end-0 bg-white">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input 
                type="text" 
                className="form-control border-start-0 ps-0"
                placeholder="Pretraži proizvode..."
                onChange={handleSearchChange}
                value={searchValue}
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={handleFilterPanelOpen}
              >
                <i className="bi bi-funnel me-1"></i>
                Filteri
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-12">
            <ActiveFilters
              selectedFilters={selectedFilters}
              categories={categories}
              onRemoveFilter={(type) => onFilterChange({ [type]: null })}
              onClearAll={handleClearAll}
            />
          </div>
        </div>
      </div>

      <FilterPanel
        isOpen={isFilterOpen}
        onClose={handleClose}
        categories={categories}
        categoriesLoading={categoriesLoading}
        selectedFilters={tempFilters}
        onFilterChange={handleTempFilterChange}
        onClearAll={handleClearAll}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default SearchFilters; 