// Add TypeScript and proper type definitions
export interface Product {
  id: number;
  name: string;
  image_url: string | null;
  barcode: string | null;
  category_id: number;
  category?: Category;
  store_count?: number;
}

export interface Category {
  id: number;
  name: string;
} 