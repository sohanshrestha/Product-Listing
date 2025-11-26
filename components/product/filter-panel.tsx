"use client";

import { Category } from "@/types/category";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FilterPanelProps {
  categories?: Category[];
  filters: {
    search: string;
    category: string | null;
  };
}

export const FilterPanel = ({ categories, filters }: FilterPanelProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchInput) params.set("search", searchInput);
      else params.delete("search");

      if (filters.category) params.set("category", filters.category);
      else params.delete("category");

      router.push(`/products?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.category, router, searchInput]);

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("category", value);
    else params.delete("category");

    if (searchInput) params.set("search", searchInput);
    else params.delete("search");

    router.push(`/products?${params.toString()}`);
  };

  const handleReset = () => {
    setSearchInput("");
    router.push("/products");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
      <Input
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="flex-1"
      />

      <Select
        onValueChange={handleCategoryChange}
        value={filters.category || ""}
      >
        <SelectTrigger className="w-60">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((cat) => (
            <SelectItem key={cat._id} value={cat._id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};
