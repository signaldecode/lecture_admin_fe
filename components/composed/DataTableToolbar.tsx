'use client';

import { SearchInput } from '@/components/composed/SearchInput';

interface DataTableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
}

export function DataTableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  children,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        className="max-w-sm"
      />
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
