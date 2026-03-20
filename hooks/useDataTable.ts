'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SortingState } from '@tanstack/react-table';
import type { PaginatedResponse } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';

interface UseDataTableOptions<TData> {
  fetchFn: (params: {
    page: number;
    pageSize: number;
    sort?: string;
    query?: string;
    filters?: Record<string, string>;
  }) => Promise<PaginatedResponse<TData>>;
  defaultPageSize?: number;
}

interface UseDataTableReturn<TData> {
  data: TData[];
  isLoading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  pageCount: number;
  totalElements: number;
  sorting: SortingState;
  searchQuery: string;
  filters: Record<string, string>;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSorting: (sorting: SortingState) => void;
  setSearchQuery: (query: string) => void;
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  refetch: () => void;
}

export function useDataTable<TData>({
  fetchFn,
  defaultPageSize = 10,
}: UseDataTableOptions<TData>): UseDataTableReturn<TData> {
  const [data, setData] = useState<TData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [pageCount, setPageCount] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const debouncedQuery = useDebounce(searchQuery, 300);

  const sortParam = sorting.length > 0
    ? `${sorting[0].id},${sorting[0].desc ? 'desc' : 'asc'}`
    : undefined;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn({
        page,
        pageSize,
        sort: sortParam,
        query: debouncedQuery || undefined,
        filters: Object.keys(filters).length > 0 ? filters : undefined,
      });

      setData(result.content);
      setPageCount(result.totalPages);
      setTotalElements(result.totalElements);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, page, pageSize, sortParam, debouncedQuery, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSetPageSize = useCallback((newSize: number) => {
    setPageSize(newSize);
    setPage(0);
  }, []);

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => {
      if (!value) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: value };
    });
    setPage(0);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setPage(0);
  }, []);

  return {
    data,
    isLoading,
    error,
    page,
    pageSize,
    pageCount,
    totalElements,
    sorting,
    searchQuery,
    filters,
    setPage,
    setPageSize: handleSetPageSize,
    setSorting,
    setSearchQuery,
    setFilter,
    clearFilters,
    refetch: fetchData,
  };
}
