'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { useDataTable } from '@/hooks/useDataTable';
import { formatDate } from '@/lib/format';
import type { SupportTicket, TicketStatus, PaginatedResponse } from '@/types';

const statusVariantMap: Record<TicketStatus, 'warning' | 'default' | 'success' | 'secondary'> = {
  PENDING: 'warning',
  IN_PROGRESS: 'default',
  RESOLVED: 'success',
  CLOSED: 'secondary',
};

const statusLabelMap: Record<TicketStatus, string> = {
  PENDING: '대기',
  IN_PROGRESS: '처리중',
  RESOLVED: '해결',
  CLOSED: '종료',
};

const ticketColumns: ColumnDef<SupportTicket>[] = [
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ row }) => (
      <Link
        href={`/support/tickets/${row.original.id}`}
        className="font-medium text-primary hover:underline"
      >
        {row.getValue('title')}
      </Link>
    ),
  },
  {
    accessorKey: 'memberName',
    header: '회원',
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as TicketStatus;
      return (
        <StatusBadge
          label={statusLabelMap[status]}
          variant={statusVariantMap[status]}
        />
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: '접수일',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
];

// TODO: Replace with actual API call
const mockTickets: SupportTicket[] = [
  { id: 1, memberName: '김철수', memberEmail: 'kim@example.com', title: '결제가 완료되었는데 강의가 보이지 않습니다', content: '어제 결제를 했는데 아직 강의 목록에 나타나지 않습니다.', status: 'PENDING', createdAt: '2026-03-20T09:00:00' },
  { id: 2, memberName: '이영희', memberEmail: 'lee@example.com', title: '환불 요청드립니다', content: '강의 내용이 기대와 달라 환불을 요청합니다.', status: 'IN_PROGRESS', createdAt: '2026-03-19T14:30:00' },
  { id: 3, memberName: '박민수', memberEmail: 'park@example.com', title: '비밀번호 변경이 안됩니다', content: '비밀번호 변경 페이지에서 오류가 발생합니다.', status: 'RESOLVED', createdAt: '2026-03-18T10:15:00', resolvedAt: '2026-03-18T16:00:00' },
  { id: 4, memberName: '정수연', memberEmail: 'jung@example.com', title: '수료증 발급 문의', content: '강의를 완료했는데 수료증은 어떻게 발급받나요?', status: 'CLOSED', createdAt: '2026-03-17T11:45:00', resolvedAt: '2026-03-17T15:30:00' },
  { id: 5, memberName: '최지훈', memberEmail: 'choi@example.com', title: '영상 재생이 안됩니다', content: '크롬 브라우저에서 영상이 로딩되지 않습니다.', status: 'PENDING', createdAt: '2026-03-20T08:20:00' },
];

export function TicketListTable() {
  const fetchTickets = useCallback(
    async (params: {
      page: number;
      pageSize: number;
      query?: string;
    }): Promise<PaginatedResponse<SupportTicket>> => {
      // TODO: Replace with actual API call
      const filtered = params.query
        ? mockTickets.filter(
            (t) =>
              t.title.includes(params.query!) ||
              t.memberName.includes(params.query!),
          )
        : mockTickets;

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
  } = useDataTable<SupportTicket>({ fetchFn: fetchTickets });

  return (
    <div>
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="제목 또는 회원명으로 검색"
      />

      <DataTable
        columns={ticketColumns}
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
