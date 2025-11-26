"use client";

import { Filters } from "@/types/sort_filter";
import { Product, ProductApiResponse } from "@/types/product";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export const fetchProducts = async (
  filters: Filters,
  page: number = 1,
  limit: number = 10
): Promise<ProductApiResponse> => {
  const params = new URLSearchParams();

  if (filters.search) params.append("search", filters.search);
  if (filters.category) params.append("category", filters.category);
  if (filters.sortBy) params.append("sortBy", filters.sortBy);
  if (filters.sortOrder) params.append("order", filters.sortOrder);

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const res = await fetch(`/api/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");

  const data: ProductApiResponse = await res.json();
  return data;
};

export const useProducts = (filters: Filters) => {
  const query = useInfiniteQuery<ProductApiResponse, Error>({
    queryKey: ["products", filters],
    queryFn: ({ pageParam }) =>
      fetchProducts(filters, typeof pageParam === "number" ? pageParam : 1),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  const products: Product[] =
    (query.data as InfiniteData<ProductApiResponse>)?.pages.flatMap(
      (page) => page.data
    ) || [];

  return { ...query, products };
};
