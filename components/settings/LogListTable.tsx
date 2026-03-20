'use client';

import { useCallback } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { useDataTable } from '@/hooks/useDataTable';
import { formatDateTime } from '@/lib/format';
import uiData from '@/data/uiData.json';
import type { ActivityLog, PaginatedResponse } from '@/types';

const texts = uiData.settings.logs;

const columns: ColumnDef<ActivityLog>[] = [
  { accessorKey: 'adminName', header: texts.columns.adminName },
  { accessorKey: 'action', header: texts.columns.action },
  { accessorKey: 'targetType', header: texts.columns.targetType },
  { accessorKey: 'targetId', header: texts.columns.targetId },
  { accessorKey: 'details', header: texts.columns.details, cell: ({ row }) => <span className="max-w-[200px] truncate block">{row.getValue('details') ?? '-'}</span> },
  { accessorKey: 'createdAt', header: texts.columns.createdAt, cell: ({ row }) => formatDateTime(row.getValue('createdAt')) },
];

const mockLogs: ActivityLog[] = [
  { id: 1, adminName: '슈퍼관리자', action: '강의 승인', targetType: 'COURSE', targetId: 3, details: 'Next.js 16 마스터클래스 승인', createdAt: '2026-03-20T10:30:00' },
  { id: 2, adminName: '박상담', action: '문의 답변', targetType: 'TICKET', targetId: 15, details: '결제 오류 문의 답변 완료', createdAt: '2026-03-20T09:45:00' },
  { id: 3, adminName: '슈퍼관리자', action: '회원 정지', targetType: 'MEMBER', targetId: 42, details: '이용약관 위반', createdAt: '2026-03-19T16:20:00' },
  { id: 4, adminName: '슈퍼관리자', action: '쿠폰 생성', targetType: 'COUPON', targetId: 8, details: 'SPRING2026 쿠폰 생성', createdAt: '2026-03-19T14:10:00' },
  { id: 5, adminName: '김강사', action: '강의 수정', targetType: 'COURSE', targetId: 1, details: 'React 완전 정복 커리큘럼 업데이트', createdAt: '2026-03-19T11:00:00' },
  { id: 6, adminName: '슈퍼관리자', action: '환불 승인', targetType: 'ORDER', targetId: 231, details: '환불 ₩59,000', createdAt: '2026-03-18T17:30:00' },
];

export function LogListTable() {
  const fetchFn = useCallback(async (params: { page: number; pageSize: number; query?: string }): Promise<PaginatedResponse<ActivityLog>> => {
    const filtered = params.query ? mockLogs.filter((l) => l.adminName.includes(params.query!) || l.action.includes(params.query!) || (l.details?.includes(params.query!) ?? false)) : mockLogs;
    return { content: filtered.slice(params.page * params.pageSize, (params.page + 1) * params.pageSize), totalElements: filtered.length, totalPages: Math.ceil(filtered.length / params.pageSize), page: params.page, pageSize: params.pageSize };
  }, []);

  const { data, isLoading, page, pageSize, pageCount, totalElements, sorting, searchQuery, setPage, setPageSize, setSorting, setSearchQuery } = useDataTable<ActivityLog>({ fetchFn });

  return (
    <div>
      <DataTableToolbar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder={texts.searchPlaceholder} />
      <DataTable columns={columns} data={data} pageCount={pageCount} pagination={{ pageIndex: page, pageSize }} onPaginationChange={(updater) => { if (typeof updater === 'function') { const next = updater({ pageIndex: page, pageSize }); setPage(next.pageIndex); } }} sorting={sorting} onSortingChange={(updater) => { const next = typeof updater === 'function' ? updater(sorting) : updater; setSorting(next); }} isLoading={isLoading} />
      <DataTablePagination page={page} pageSize={pageSize} pageCount={pageCount} totalElements={totalElements} onPageChange={setPage} onPageSizeChange={setPageSize} />
    </div>
  );
}
