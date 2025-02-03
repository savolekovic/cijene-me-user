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

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ 
  selectedFilters, 
  categories, 
  onRemoveFilter, 
  onClearAll 
}) => {
  const getFilterPills = (): FilterPill[] => {
    const pills: FilterPill[] = [];

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

    if (selectedFilters.min_price) {
      pills.push({
        id: 'min-price',
        label: `Od €${selectedFilters.min_price}`,
        type: 'min_price'
      });
    }

    if (selectedFilters.max_price) {
      pills.push({
        id: 'max-price',
        label: `Do €${selectedFilters.max_price}`,
        type: 'max_price'
      });
    }

    if (selectedFilters.has_entries) {
      pills.push({
        id: 'has-entries',
        label: 'Sa cijenama',
        type: 'has_entries'
      });
    }

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