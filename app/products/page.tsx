"use client";

import { FilterPanel } from "@/components/product/filter-panel";
import { ProductCard } from "@/components/product/productCard";
import { Spinner } from "@/components/ui/spinner";
import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import { type Product } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ProductPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || null;

  const rawSortBy = searchParams.get("sortBy");
  const sortBy =
    rawSortBy === "price" || rawSortBy === "rating" ? rawSortBy : undefined;

  const rawOrder = searchParams.get("order");
  const order =
    rawOrder === "asc" || rawOrder === "desc" ? rawOrder : undefined;

  const { data: categories } = useCategories();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts({ search, category, sortBy, sortOrder: order });

  const products: Product[] = data?.pages.flatMap((page) => page.data) || [];

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="container mx-auto p-4 sm:px-6 lg:px-16">
      <FilterPanel
        filters={{
          search,
          category,
          sort: sortBy && order ? `${sortBy}_${order}` : "",
        }}
        categories={categories}
      />

      {isLoading ? (
        <div className="flex gap-2 flex-col justify-center items-center h-[70vh]">
          <Spinner className="w-10 h-10" />
          <p className="text-muted-foreground text-sm">Loading Products...</p>
        </div>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products.length > 0 ? (
              products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
          <div ref={loadMoreRef} className="h-1" />

          {isFetchingNextPage && (
            <div className="flex gap-2 flex-col justify-center items-center">
              <Spinner className="w-10 h-10" />
              <p className="text-muted-foreground text-sm">
                Loading More Products...
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
