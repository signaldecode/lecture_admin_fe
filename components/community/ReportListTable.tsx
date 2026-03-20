'use client';

import { useCallback } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { useDataTable } from '@/hooks/useDataTable';
import { formatDate } from '@/lib/format';
import type { CommunityReport, ReportStatus, ReportAction, PaginatedResponse } from '@/types';

const statusVariantMap: Record<ReportStatus, 'warning' | 'success'> = {
  PENDING: 'warning',
  PROCESSED: 'success',
};

const statusLabelMap: Record<ReportStatus, string> = {
  PENDING: '대기',
  PROCESSED: '처리완료',
};

const actionLabelMap: Record<ReportAction, string> = {
  WARN: '경고',
  DELETE: '삭제',
  SUSPEND: '정지',
};

const reportColumns: ColumnDef<CommunityReport>[] = [
  {
    accessorKey: 'postTitle',
    header: '게시글',
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('postTitle')}</span>
    ),
  },
  {
    accessorKey: 'reason',
    header: '신고 사유',
    cell: ({ row }) => {
      const reason = row.getValue('reason') as string;
      return (
        <span className="max-w-[200px] truncate block" title={reason}>
          {reason}
        </span>
      );
    },
  },
  {
    accessorKey: 'reporterName',
    header: '신고자',
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as ReportStatus;
      return (
        <StatusBadge
          label={statusLabelMap[status]}
          variant={statusVariantMap[status]}
        />
      );
    },
  },
  {
    accessorKey: 'action',
    header: '조치',
    cell: ({ row }) => {
      const action = row.original.action;
      if (!action) return <span className="text-muted-foreground">-</span>;
      return actionLabelMap[action];
    },
  },
  {
    accessorKey: 'createdAt',
    header: '신고일',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
];

// TODO: Replace with actual API call
const mockReports: CommunityReport[] = [
  { id: 1, postId: 3, postTitle: '부적절한 광고 게시글', reason: '스팸성 광고 게시글입니다. 반복적으로 동일한 내용을 게시하고 있습니다.', reporterName: '김철수', status: 'PROCESSED', action: 'DELETE', createdAt: '2026-03-18T09:00:00' },
  { id: 2, postId: 5, postTitle: '욕설이 포함된 게시글', reason: '비속어 및 인신공격이 포함되어 있습니다.', reporterName: '이영희', status: 'PROCESSED', action: 'WARN', createdAt: '2026-03-17T15:20:00' },
  { id: 3, postId: 8, postTitle: '저작권 침해 자료 공유', reason: '유료 강의 자료를 무단으로 공유하고 있습니다.', reporterName: '박민수', status: 'PENDING', createdAt: '2026-03-19T11:30:00' },
  { id: 4, postId: 12, postTitle: '개인정보 노출 게시글', reason: '타인의 개인정보(전화번호, 주소)가 노출되어 있습니다.', reporterName: '정수연', status: 'PENDING', createdAt: '2026-03-20T08:45:00' },
];

export function ReportListTable() {
  const fetchReports = useCallback(
    async (params: {
      page: number;
      pageSize: number;
      query?: string;
    }): Promise<PaginatedResponse<CommunityReport>> => {
      // TODO: Replace with actual API call
      const filtered = params.query
        ? mockReports.filter((r) => r.postTitle.includes(params.query!))
        : mockReports;

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
  } = useDataTable<CommunityReport>({ fetchFn: fetchReports });

  return (
    <div>
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="게시글 제목으로 검색"
      />

      <DataTable
        columns={reportColumns}
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
