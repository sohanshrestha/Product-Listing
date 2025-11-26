"use client";

import { FilterPanel } from "@/components/product/filter-panel";
import { ProductCard } from "@/components/product/productCard";
import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import { type Product } from "@/types/product";
import { useSearchParams } from "next/navigation";

export default function ProductPage() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || null;

  const { data: categories } = useCategories();
  const {
    data: products = [],
    isLoading,
    error,
  } = useProducts({ search, category });

  return (
    <div className="p-4">
      <FilterPanel filters={{ search, category }} categories={categories} />

      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {products.length ? (
            products.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}
