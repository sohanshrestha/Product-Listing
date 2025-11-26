import { Category } from "./category";

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: Category;
  thumbnail: string;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductApiResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
