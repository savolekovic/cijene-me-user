export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Ime (A-Z)' },
  { value: 'name-desc', label: 'Ime (Z-A)' },
  { value: 'created_at-desc', label: 'Najnovije prvo' },
  { value: 'created_at-asc', label: 'Najstarije prvo' },
  { value: 'barcode-asc', label: 'Barkod (rastući)' },
  { value: 'barcode-desc', label: 'Barkod (opadajući)' }
] as const; 