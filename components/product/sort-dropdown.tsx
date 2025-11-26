"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type SortDropdownProps, type SortOption } from "@/types/sort_filter";

const SORT_OPTIONS: SortOption[] = [
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Rating: Low → High", value: "rating_asc" },
  { label: "Rating: High → Low", value: "rating_desc" },
];

export const SortDropdown = ({ selected, onChange }: SortDropdownProps) => {
  const selectedOption = SORT_OPTIONS.find((o) => o.value === selected);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Sort: {selectedOption?.label || "Select"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
