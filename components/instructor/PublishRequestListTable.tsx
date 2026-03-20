'use client';

import { useCallback } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { useDataTable } from '@/hooks/useDataTable';
import { formatDate } from '@/lib/format';
import type { PublishRequest, PublishRequestStatus, PaginatedResponse } from '@/types';
import uiData from '@/data/uiData.json';

const texts = uiData.instructor.publishRequests;

const statusVariantMap: Record<PublishRequestStatus, 'warning' | 'success' | 'destructive'> = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'destructive',
};

const statusLabelMap = texts.statusLabels as Record<PublishRequestStatus, string>;

const publishRequestColumns: ColumnDef<PublishRequest>[] = [
  {
    accessorKey: 'courseTitle',
    header: texts.columns.courseTitle,
  },
  {
    accessorKey: 'status',
    header: texts.columns.status,
    cell: ({ row }) => {
      const status = row.getValue('status') as PublishRequestStatus;
      return (
        <StatusBadge
          label={statusLabelMap[status]}
          variant={statusVariantMap[status]}
        />
      );
    },
  },
  {
    accessorKey: 'requestedAt',
    header: texts.columns.requestedAt,
    cell: ({ row }) => formatDate(row.getValue('requestedAt')),
  },
  {
    accessorKey: 'reviewedAt',
    header: texts.columns.reviewedAt,
    cell: ({ row }) => {
      const reviewedAt = row.getValue('reviewedAt') as string | undefined;
      return reviewedAt ? formatDate(reviewedAt) : '-';
    },
  },
  {
    accessorKey: 'rejectReason',
    header: texts.columns.rejectReason,
    cell: ({ row }) => {
      const reason = row.getValue('rejectReason') as string | undefined;
      return reason ? (
        <span className="line-clamp-1" title={reason}>
          {reason}
        </span>
      ) : (
        '-'
      );
    },
  },
];

// TODO: Replace with actual API call to /api/admin/instructor/publish-requests
const mockPublishRequests: PublishRequest[] = [
  { id: 1, courseId: 1, courseTitle: 'React 완전 정복 - 심화편', status: 'PENDING', requestedAt: '2026-03-18T10:00:00' },
  { id: 2, courseId: 2, courseTitle: 'Next.js 15 마스터 클래스', status: 'APPROVED', requestedAt: '2026-03-01T09:00:00', reviewedAt: '2026-03-05T14:00:00' },
  { id: 3, courseId: 3, courseTitle: 'Node.js 백엔드 기초', status: 'REJECTED', requestedAt: '2026-02-20T11:30:00', reviewedAt: '2026-02-25T16:00:00', rejectReason: '커리큘럼 구성이 부족합니다. 실습 프로젝트를 추가해주세요.' },
];

export function PublishRequestListTable() {
  const fetchPublishRequests = useCallback(
    async (params: {
      page: number;
      pageSize: number;
      query?: string;
    }): Promise<PaginatedResponse<PublishRequest>> => {
      // TODO: Replace with actual API call
      const filtered = params.query
        ? mockPublishRequests.filter((r) =>
            r.courseTitle.includes(params.query!),
          )
        : mockPublishRequests;

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
  } = useDataTable<PublishRequest>({ fetchFn: fetchPublishRequests });

  return (
    <div>
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={texts.searchPlaceholder}
      />

      <DataTable
        columns={publishRequestColumns}
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
