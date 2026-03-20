'use client';

import { useCallback } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { useDataTable } from '@/hooks/useDataTable';
import { formatNumber } from '@/lib/format';
import uiData from '@/data/uiData.json';
import type { CommunityCategory, PaginatedResponse } from '@/types';

const texts = uiData.community.categories;

const categoryColumns: ColumnDef<CommunityCategory>[] = [
  {
    accessorKey: 'name',
    header: texts.columns.name,
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'slug',
    header: texts.columns.slug,
    cell: ({ row }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
        {row.getValue('slug')}
      </code>
    ),
  },
  {
    accessorKey: 'postCount',
    header: texts.columns.postCount,
    cell: ({ row }) => formatNumber(row.getValue('postCount')),
  },
  {
    accessorKey: 'order',
    header: texts.columns.order,
  },
];

// TODO: Replace with actual API call
const mockCategories: CommunityCategory[] = [
  { id: 1, name: '자유게시판', slug: 'free', postCount: 342, order: 1 },
  { id: 2, name: '질문답변', slug: 'qna', postCount: 189, order: 2 },
  { id: 3, name: '스터디모집', slug: 'study', postCount: 67, order: 3 },
  { id: 4, name: '취업정보', slug: 'career', postCount: 95, order: 4 },
  { id: 5, name: '후기', slug: 'review', postCount: 213, order: 5 },
];

export function CategoryListTable() {
  const fetchCategories = useCallback(
    async (params: {
      page: number;
      pageSize: number;
    }): Promise<PaginatedResponse<CommunityCategory>> => {
      // TODO: Replace with actual API call
      return {
        content: mockCategories.slice(
          params.page * params.pageSize,
          (params.page + 1) * params.pageSize,
        ),
        totalElements: mockCategories.length,
        totalPages: Math.ceil(mockCategories.length / params.pageSize),
        page: params.page,
        pageSize: params.pageSize,
      };
    },
    [],
  );

  const {
    data,
    isLoading,
    page,
    pageSize,
    pageCount,
    totalElements,
    sorting,
    setPage,
    setPageSize,
    setSorting,
  } = useDataTable<CommunityCategory>({ fetchFn: fetchCategories });

  return (
    <div>
      <DataTable
        columns={categoryColumns}
        data={data}
        pageCount={pageCount}
        pagination={{ pageIndex: page, pageSize }}
        onPaginationChange={(updater) => {
          if (typeof updater === 'function') {
            const next = updater({ pageIndex: page, pageSize });
            setPage(next.pageIndex);
          }
        }}
        sorting={sorting}
        onSortingChange={(updater) => {
          const next = typeof updater === 'function' ? updater(sorting) : updater;
          setSorting(next);
        }}
        isLoading={isLoading}
      />

      <DataTablePagination
        page={page}
        pageSize={pageSize}
        pageCount={pageCount}
        totalElements={totalElements}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
