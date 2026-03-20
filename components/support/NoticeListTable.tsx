'use client';

import { useCallback } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { useDataTable } from '@/hooks/useDataTable';
import { formatDate, formatNumber } from '@/lib/format';
import type { Notice, PaginatedResponse } from '@/types';

const noticeColumns: ColumnDef<Notice>[] = [
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('title')}</span>
    ),
  },
  {
    accessorKey: 'isPinned',
    header: '고정',
    cell: ({ row }) => {
      const isPinned = row.getValue('isPinned') as boolean;
      return <span>{isPinned ? '\uD83D\uDCCC' : '-'}</span>;
    },
  },
  {
    accessorKey: 'viewCount',
    header: '조회수',
    cell: ({ row }) => formatNumber(row.getValue('viewCount')),
  },
  {
    accessorKey: 'createdAt',
    header: '작성일',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
  {
    accessorKey: 'updatedAt',
    header: '수정일',
    cell: ({ row }) => formatDate(row.getValue('updatedAt')),
  },
];

// TODO: Replace with actual API call
const mockNotices: Notice[] = [
  { id: 1, title: '2026년 상반기 시스템 점검 안내', content: '시스템 점검이 예정되어 있습니다.', isPinned: true, viewCount: 1523, createdAt: '2026-03-15T09:00:00', updatedAt: '2026-03-15T09:00:00' },
  { id: 2, title: '개인정보 처리방침 변경 안내', content: '개인정보 처리방침이 변경됩니다.', isPinned: true, viewCount: 892, createdAt: '2026-03-10T10:30:00', updatedAt: '2026-03-12T14:00:00' },
  { id: 3, title: '신규 강의 카테고리 추가 안내', content: '새로운 카테고리가 추가되었습니다.', isPinned: false, viewCount: 456, createdAt: '2026-03-05T11:00:00', updatedAt: '2026-03-05T11:00:00' },
  { id: 4, title: '이벤트 쿠폰 지급 완료 안내', content: '이벤트 참여자에게 쿠폰이 지급되었습니다.', isPinned: false, viewCount: 234, createdAt: '2026-03-01T15:00:00', updatedAt: '2026-03-01T15:00:00' },
];

export function NoticeListTable() {
  const fetchNotices = useCallback(
    async (params: {
      page: number;
      pageSize: number;
    }): Promise<PaginatedResponse<Notice>> => {
      // TODO: Replace with actual API call
      return {
        content: mockNotices.slice(
          params.page * params.pageSize,
          (params.page + 1) * params.pageSize,
        ),
        totalElements: mockNotices.length,
        totalPages: Math.ceil(mockNotices.length / params.pageSize),
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
  } = useDataTable<Notice>({ fetchFn: fetchNotices });

  return (
    <div>
      <DataTable
        columns={noticeColumns}
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
