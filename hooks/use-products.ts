"use client";

import { Filters } from "@/types/filter";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async (filters: Filters): Promise<Product[]> => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.category) params.append("category", filters.category);

  const res = await fetch(`/api/products?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch products");

  const data: Product[] = await res.json();
  return data;
};

export const useProducts = (filters: Filters) => {
  return useQuery<Product[], Error>({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
