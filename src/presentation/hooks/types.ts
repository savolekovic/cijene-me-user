export interface PaginationState {
  page: number;
  per_page: number;
}

export interface SortState {
  order_by: string;
  order_direction: 'asc' | 'desc';
} 