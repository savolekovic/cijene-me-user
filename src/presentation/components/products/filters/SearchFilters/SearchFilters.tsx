import React, { useState } from 'react';
import FilterPanel from '../FilterPanel/FilterPanel';
import ActiveFilters from '../ActiveFilters/ActiveFilters';
import { ProductFilters } from '../../../../../core/types/Product';
import './SearchFilters.css';
import { useCategoriesQuery } from 'presentation/hooks/products/useCategoriesQuery';

interface SearchFiltersProps {
  onSearch: (term: string) => void;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
  selectedFilters: ProductFilters;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onSearch, 
  onFilterChange, 
  selectedFilters 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(selectedFilters.search || '');
  const [tempFilters, setTempFilters] = useState<ProductFilters>(selectedFilters);

  const {
    data: categories = [],
    isLoading: categoriesLoading
  } = useCategoriesQuery(isFilterOpen);


  const handleFilterPanelOpen = () => {
    setTempFilters(selectedFilters);
    setIsFilterOpen(true);
  };

  const handleClose = () => {
    setTempFilters(selectedFilters);
    setIsFilterOpen(false);
  };

  const handleClearAll = () => {
    const clearedFilters: Partial<ProductFilters> = {
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

  const handleTempFilterChange = (newFilters: Partial<ProductFilters>) => {
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
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  onSearch(e.target.value);
                }}
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