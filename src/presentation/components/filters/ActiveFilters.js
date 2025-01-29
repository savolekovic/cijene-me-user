import React from 'react';
import './ActiveFilters.css';

const ActiveFilters = ({ selectedFilters, categories, onRemoveFilter, onClearAll }) => {
  const getFilterPills = () => {
    const pills = [];

    // Category filter
    if (selectedFilters.category_id) {
      const category = categories.find(c => c.id === selectedFilters.category_id);
      if (category) {
        pills.push({
          id: `category-${category.id}`,
          label: category.name,
          type: 'category_id'
        });
      }
    }

    // Price range
    if (selectedFilters.min_price || selectedFilters.max_price) {
      pills.push({
        id: 'price-range',
        label: `€${selectedFilters.min_price || '0'} - €${selectedFilters.max_price || '∞'}`,
        type: 'price'
      });
    }

    // Has entries
    if (selectedFilters.has_entries) {
      pills.push({
        id: 'has-entries',
        label: 'Sa cijenama',
        type: 'has_entries'
      });
    }

    // Barcode
    if (selectedFilters.barcode) {
      pills.push({
        id: 'barcode',
        label: `Barkod: ${selectedFilters.barcode}`,
        type: 'barcode'
      });
    }

    return pills;
  };

  const pills = getFilterPills();
  if (pills.length === 0) return null;

  return (
    <div className="active-filters">
      <div className="filter-pills">
        {pills.map(pill => (
          <span key={pill.id} className="filter-pill">
            {pill.label}
            <button 
              className="btn-remove" 
              onClick={() => onRemoveFilter(pill.type)}
            >
              <i className="bi bi-x"></i>
            </button>
          </span>
        ))}
        {pills.length > 0 && (
          <button className="btn btn-link btn-sm" onClick={onClearAll}>
            Poništi sve
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters; 