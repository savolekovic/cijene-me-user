import React from 'react';
import { Category, ProductFilters } from '../../../../../core/types/Product';
import './FilterPanel.css';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  categoriesLoading: boolean;
  selectedFilters: ProductFilters;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
  onClearAll: () => void;
  onApply: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = React.memo(({
  isOpen,
  onClose,
  categories = [],
  categoriesLoading,
  selectedFilters,
  onFilterChange,
  onClearAll,
  onApply
}) => {

  // Memoize handlers
  const handleCategoryChange = React.useCallback((categoryId: number | null) => {
    onFilterChange({ category_id: categoryId });
  }, [onFilterChange]);

  const handlePriceChange = React.useCallback((type: 'min_price' | 'max_price', value: string) => {
    const numValue = value ? parseFloat(value) : null;
    onFilterChange({ [type]: numValue });
  }, [onFilterChange]);

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ 
      barcode: e.target.value || null 
    });
  };

  const handleHasEntriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ 
      has_entries: e.target.checked 
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="filter-panel-backdrop" onClick={onClose} />
      <div className="filter-panel">
        <div className="filter-panel-header">
          <h5 className="m-0">Filteri</h5>
          <button 
            className="btn-close" 
            onClick={onClose}
            aria-label="Close"
          />
        </div>

        <div className="filter-panel-body">
          <div className="filter-section">
            <label className="form-label">Kategorija</label>
            {categoriesLoading ? (
              <div className="placeholder-glow">
                <span className="placeholder col-12"></span>
              </div>
            ) : (
              <select
                className="form-select"
                value={selectedFilters.category_id?.toString() || ''}
                onChange={(e) => handleCategoryChange(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Sve kategorije</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="filter-section">
            <label className="form-label">Cijena (€)</label>
            <div className="row g-2">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min"
                  value={selectedFilters.min_price?.toString() || ''}
                  onChange={(e) => handlePriceChange('min_price', e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max"
                  value={selectedFilters.max_price?.toString() || ''}
                  onChange={(e) => handlePriceChange('max_price', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="filter-section">
            <label className="form-label">Barkod</label>
            <input
              type="text"
              className="form-control"
              placeholder="Unesite barkod"
              value={selectedFilters.barcode || ''}
              onChange={handleBarcodeChange}
            />
          </div>

          <div className="filter-section">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="hasEntriesCheck"
                checked={selectedFilters.has_entries || false}
                onChange={handleHasEntriesChange}
              />
              <label className="form-check-label" htmlFor="hasEntriesCheck">
                Samo proizvodi sa cijenama
              </label>
            </div>
          </div>
        </div>

        <div className="filter-panel-footer">
          <button 
            className="btn btn-outline-secondary" 
            onClick={onClearAll}
          >
            Poništi
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onApply}
          >
            Primijeni
          </button>
        </div>
      </div>
    </>
  );
}, (prev, next) => {
  return (
    prev.isOpen === next.isOpen &&
    prev.categories === next.categories &&
    prev.categoriesLoading === next.categoriesLoading &&
    prev.selectedFilters.category_id === next.selectedFilters.category_id &&
    prev.selectedFilters.min_price === next.selectedFilters.min_price &&
    prev.selectedFilters.max_price === next.selectedFilters.max_price
  );
});

export default FilterPanel; 