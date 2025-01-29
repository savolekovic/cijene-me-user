import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  categories, 
  categoriesLoading, 
  selectedFilters, 
  onFilterChange, 
  onClearAll,
  onApply 
}) => {
  const handlePriceChange = (type, value) => {
    const numValue = value === '' ? null : Number(value);
    onFilterChange({ [type]: numValue });
  };

  const handleCategoryChange = (categoryId) => {
    console.log('Category selected:', categoryId); // Debug log
    onFilterChange({ 
      category_id: selectedFilters.category_id === categoryId ? null : categoryId 
    });
  };

  const handleHasEntriesChange = (value) => {
    onFilterChange({ has_entries: value });
  };

  const handleBarcodeChange = (value) => {
    onFilterChange({ barcode: value || null });
  };

  return (
    <div className={`filter-panel ${isOpen ? 'open' : ''}`}>
      <div className="filter-header">
        <h5>Filteri</h5>
        <button onClick={onClose}>&times;</button>
      </div>
      
      <div className="filter-content">
        <div className="filter-section">
          <h6>Kategorije</h6>
          {categoriesLoading ? (
            <div className="categories-loading">
              <div className="progress" style={{ height: '2px' }}>
                <div 
                  className="progress-bar progress-bar-striped progress-bar-animated" 
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          ) : (
            <div className="categories-list">
              {categories.map(category => (
                <div key={category.id} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`category-${category.id}`}
                    checked={selectedFilters.category_id === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <label className="form-check-label" htmlFor={`category-${category.id}`}>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="filter-section">
          <h6>Cijena</h6>
          <div className="price-range">
            <input
              type="number"
              className="form-control"
              placeholder="Od"
              value={selectedFilters.min_price || ''}
              onChange={(e) => handlePriceChange('min_price', e.target.value)}
              min="0"
              step="0.01"
            />
            <input
              type="number"
              className="form-control"
              placeholder="Do"
              value={selectedFilters.max_price || ''}
              onChange={(e) => handlePriceChange('max_price', e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="filter-section">
          <h6>Dostupnost</h6>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="has-entries"
              checked={selectedFilters.has_entries === true}
              onChange={(e) => handleHasEntriesChange(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="has-entries">
              Samo proizvodi sa cijenama
            </label>
          </div>
        </div>

        <div className="filter-section">
          <h6>Barkod</h6>
          <input
            type="text"
            className="form-control"
            placeholder="Unesi barkod"
            value={selectedFilters.barcode || ''}
            onChange={(e) => handleBarcodeChange(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-actions">
        <button className="btn btn-outline-secondary" onClick={onClearAll}>
          Očisti
        </button>
        <button className="btn btn-primary" onClick={onApply}>
          Primijeni
        </button>
      </div>
    </div>
  );
};

export default FilterPanel; 