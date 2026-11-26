"use client";

interface SearchBarProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  id,
  label,
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="reusable-search">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="catalog-input"
      />
    </div>
  );
}