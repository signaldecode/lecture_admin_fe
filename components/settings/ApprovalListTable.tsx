'use client';

import { useCallback } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { Button } from '@/components/ui/button';
import { useDataTable } from '@/hooks/useDataTable';
import { formatDate } from '@/lib/format';
import type { ApprovalItem, PaginatedResponse } from '@/types';
import uiData from '@/data/uiData.json';

const texts = uiData.settings.approvals;

const columns: ColumnDef<ApprovalItem>[] = [
  { accessorKey: 'courseTitle', header: texts.columns.courseTitle, cell: ({ row }) => <span className="font-medium">{row.getValue('courseTitle')}</span> },
  { accessorKey: 'instructorName', header: texts.columns.instructorName },
  { accessorKey: 'requestedAt', header: texts.columns.requestedAt, cell: ({ row }) => formatDate(row.getValue('requestedAt')) },
  {
    id: 'actions',
    header: texts.columns.actions,
    cell: ({ row }) => (
      <div className="flex gap-1">
        <Button size="xs" onClick={() => { /* TODO: apiClient.patch(`settings/approvals/${row.original.id}/approve`) */ alert(`승인: ${row.original.courseTitle}`); }}>{texts.approveButton}</Button>
        <Button size="xs" variant="destructive" onClick={() => { /* TODO: reject */ alert(`거절: ${row.original.courseTitle}`); }}>{texts.rejectButton}</Button>
      </div>
    ),
  },
];

const mockApprovals: ApprovalItem[] = [
  { id: 1, courseId: 3, courseTitle: 'Next.js 16 마스터클래스', instructorName: '이강사', requestedAt: '2026-03-18T10:00:00' },
  { id: 2, courseId: 5, courseTitle: 'Docker & Kubernetes 실전', instructorName: '최강사', requestedAt: '2026-03-19T14:30:00' },
  { id: 3, courseId: 6, courseTitle: 'AWS 클라우드 입문', instructorName: '정강사', requestedAt: '2026-03-20T09:15:00' },
];

export function ApprovalListTable() {
  const fetchFn = useCallback(async (params: { page: number; pageSize: number }): Promise<PaginatedResponse<ApprovalItem>> => {
    return { content: mockApprovals.slice(params.page * params.pageSize, (params.page + 1) * params.pageSize), totalElements: mockApprovals.length, totalPages: Math.ceil(mockApprovals.length / params.pageSize), page: params.page, pageSize: params.pageSize };
  }, []);

  const { data, isLoading, page, pageSize, pageCount, totalElements, sorting, setPage, setPageSize, setSorting } = useDataTable<ApprovalItem>({ fetchFn });

  return (
    <div>
      <DataTable columns={columns} data={data} pageCount={pageCount} pagination={{ pageIndex: page, pageSize }} onPaginationChange={(updater) => { if (typeof updater === 'function') { const next = updater({ pageIndex: page, pageSize }); setPage(next.pageIndex); } }} sorting={sorting} onSortingChange={(updater) => { const next = typeof updater === 'function' ? updater(sorting) : updater; setSorting(next); }} isLoading={isLoading} />
      <DataTablePagination page={page} pageSize={pageSize} pageCount={pageCount} totalElements={totalElements} onPageChange={setPage} onPageSizeChange={setPageSize} />
    </div>
  );
}
