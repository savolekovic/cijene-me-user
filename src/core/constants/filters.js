export const SORT_OPTIONS = {
  NAME_ASC: { value: 'name-asc', label: 'Ime (A-Z)' },
  NAME_DESC: { value: 'name-desc', label: 'Ime (Z-A)' },
  NEWEST: { value: 'created_at-desc', label: 'Najnovije prvo' },
  OLDEST: { value: 'created_at-asc', label: 'Najstarije prvo' },
  // ...
};

export const DEFAULT_FILTERS = {
  per_page: 20,
  page: 1,
  order_by: 'created_at',
  order_direction: 'desc'
}; 