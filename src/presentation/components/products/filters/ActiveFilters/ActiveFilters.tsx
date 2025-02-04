import React from 'react';
import { Category, ProductFilters } from '../../../../../core/types/Product';
import './ActiveFilters.css';

interface ActiveFiltersProps {
  selectedFilters: ProductFilters;
  categories: Category[];
  onRemoveFilter: (type: keyof ProductFilters) => void;
  onClearAll: () => void;
}

interface FilterPill {
  id: string;
  label: string;
  type: keyof ProductFilters;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = React.memo(({
  selectedFilters,
  categories,
  onRemoveFilter,
  onClearAll
}) => {
  // Development-only logging - moved outside conditional
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Render] ActiveFilters:', {
        activeFiltersCount: Object.values(selectedFilters).filter(v => v != null).length,
        selectedCategory: selectedFilters.category_id
      });
    }
  }, [selectedFilters]);

  // Memoize active filters calculation
  const activeFilters = React.useMemo(() => {
    const filters = [];
    
    if (selectedFilters.category_id) {
      const category = categories.find(c => c.id === selectedFilters.category_id);
      if (category) {
        filters.push({
          type: 'category_id',
          label: `Kategorija: ${category.name}`
        });
      }
    }

    if (selectedFilters.min_price) {
      filters.push({
        type: 'min_price',
        label: `Min. cijena: ${selectedFilters.min_price}€`
      });
    }

    if (selectedFilters.max_price) {
      filters.push({
        type: 'max_price',
        label: `Max. cijena: ${selectedFilters.max_price}€`
      });
    }

    return filters;
  }, [selectedFilters, categories]);

  if (activeFilters.length === 0) return null;

  return (
    <div className="active-filters">
      <div className="filter-pills">
        {activeFilters.map(filter => (
          <span key={filter.type} className="filter-pill">
            {filter.label}
            <button 
              className="btn-remove" 
              onClick={() => onRemoveFilter(filter.type as keyof ProductFilters)}
            >
              <i className="bi bi-x"></i>
            </button>
          </span>
        ))}
        {activeFilters.length > 0 && (
          <button className="btn btn-link btn-sm" onClick={onClearAll}>
            Poništi sve
          </button>
        )}
      </div>
    </div>
  );
}, (prev, next) => {
  return (
    prev.selectedFilters === next.selectedFilters &&
    prev.categories === next.categories
  );
});

export default ActiveFilters; 