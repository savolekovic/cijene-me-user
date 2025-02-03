export interface StoreBrand {
  id: number;
  name: string;
}

export interface StoreLocation {
  id: number;
  address: string;
  store_brand: StoreBrand;
}

export interface Product {
  id: number;
  name: string;
  image_url: string | null;
}

export interface ProductEntry {
  id: number;
  price: string;
  created_at: string;
  product: Product;
  store_location: StoreLocation;
}

export interface ProductStatistics {
  lowest_price: number;
  highest_price: number;
  average_price: number;
  latest_price: number;
  total_entries: number;
  first_entry_date: string;
  latest_entry_date: string;
  price_change: number;
  price_change_percentage: number;
}