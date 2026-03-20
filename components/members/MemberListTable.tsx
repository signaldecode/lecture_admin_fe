'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { useDataTable } from '@/hooks/useDataTable';
import { memberColumns } from '@/components/members/columns';
import uiData from '@/data/uiData.json';
import type { Member, PaginatedResponse } from '@/types';

const texts = uiData.members;

// Mock data for development
const mockMembers: Member[] = [
  { id: 1, name: '김철수', email: 'kim@example.com', grade: 'GOLD', status: 'ACTIVE', point: 15000, createdAt: '2025-06-15T00:00:00' },
  { id: 2, name: '이영희', email: 'lee@example.com', grade: 'PLATINUM', status: 'ACTIVE', point: 42000, createdAt: '2025-03-20T00:00:00' },
  { id: 3, name: '박민수', email: 'park@example.com', grade: 'BASIC', status: 'SUSPENDED', point: 0, createdAt: '2025-09-01T00:00:00' },
  { id: 4, name: '정수연', email: 'jung@example.com', grade: 'SILVER', status: 'ACTIVE', point: 5500, createdAt: '2025-11-10T00:00:00' },
  { id: 5, name: '최지훈', email: 'choi@example.com', grade: 'BASIC', status: 'WITHDRAWN', point: 0, createdAt: '2025-12-05T00:00:00' },
];

export function MemberListTable() {
  const fetchMembers = useCallback(
    async (params: {
      page: number;
      pageSize: number;
      query?: string;
    }): Promise<PaginatedResponse<Member>> => {
      // TODO: Replace with actual API call
      // return apiClient.get<PaginatedResponse<Member>>('members', params);
      const filtered = params.query
        ? mockMembers.filter(
            (m) =>
              m.name.includes(params.query!) ||
              m.email.includes(params.query!),
          )
        : mockMembers;

      return {
        content: filtered.slice(
          params.page * params.pageSize,
          (params.page + 1) * params.pageSize,
        ),
        totalElements: filtered.length,
        totalPages: Math.ceil(filtered.length / params.pageSize),
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
    searchQuery,
    setPage,
    setPageSize,
    setSorting,
    setSearchQuery,
  } = useDataTable<Member>({ fetchFn: fetchMembers });

  return (
    <div>
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={texts.searchPlaceholder}
      />

      <DataTable
        columns={memberColumns}
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
