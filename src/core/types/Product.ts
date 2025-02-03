export interface Product {
  id: number;
  name: string;
  image_url: string | null;
  barcode: string | null;
  category_id: number;
  category?: Category;
  store_count?: number;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ProductFilters {
  search?: string;
  category_id?: number | null;
  min_price?: number | null;
  max_price?: number | null;
  has_entries?: boolean | null;
  barcode?: string | null;
  order_by?: 'name' | 'created_at' | 'barcode';
  order_direction?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
} 