export interface Filters {
  search: string;
  category: string | null;
  sortBy?: "price" | "rating";
  sortOrder?: "asc" | "desc";
}

export interface SortOption {
  label: string;
  value: string;
}

export interface SortDropdownProps {
  selected: string;
  onChange: (value: string) => void;
}
