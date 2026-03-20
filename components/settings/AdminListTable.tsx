'use client';

import { useCallback } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { useDataTable } from '@/hooks/useDataTable';
import { formatDate, formatDateTime } from '@/lib/format';
import uiData from '@/data/uiData.json';
import type { AdminAccount, AdminRole, PaginatedResponse } from '@/types';

const texts = uiData.settings.admins;

const roleLabelMap = texts.roleLabels as Record<AdminRole, string>;
const roleVariantMap: Record<AdminRole, 'success' | 'default' | 'warning'> = { SUPER_ADMIN: 'success', INSTRUCTOR: 'default', CS_AGENT: 'warning' };

const columns: ColumnDef<AdminAccount>[] = [
  { accessorKey: 'name', header: texts.columns.name, cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span> },
  { accessorKey: 'email', header: texts.columns.email },
  { accessorKey: 'role', header: texts.columns.role, cell: ({ row }) => { const role = row.getValue('role') as AdminRole; return <StatusBadge label={roleLabelMap[role]} variant={roleVariantMap[role]} />; } },
  { accessorKey: 'lastLoginAt', header: texts.columns.lastLoginAt, cell: ({ row }) => { const v = row.getValue('lastLoginAt') as string | undefined; return v ? formatDateTime(v) : '-'; } },
  { accessorKey: 'createdAt', header: texts.columns.createdAt, cell: ({ row }) => formatDate(row.getValue('createdAt')) },
];

const mockAdmins: AdminAccount[] = [
  { id: 1, name: '슈퍼관리자', email: 'admin@example.com', role: 'SUPER_ADMIN', lastLoginAt: '2026-03-20T10:30:00', createdAt: '2025-01-01T00:00:00' },
  { id: 2, name: '김강사', email: 'instructor@example.com', role: 'INSTRUCTOR', lastLoginAt: '2026-03-19T14:20:00', createdAt: '2025-06-15T00:00:00' },
  { id: 3, name: '박상담', email: 'cs@example.com', role: 'CS_AGENT', lastLoginAt: '2026-03-20T09:00:00', createdAt: '2025-09-01T00:00:00' },
  { id: 4, name: '이강사', email: 'lee@example.com', role: 'INSTRUCTOR', createdAt: '2025-11-10T00:00:00' },
];

export function AdminListTable() {
  const fetchFn = useCallback(async (params: { page: number; pageSize: number; query?: string }): Promise<PaginatedResponse<AdminAccount>> => {
    const filtered = params.query ? mockAdmins.filter((a) => a.name.includes(params.query!) || a.email.includes(params.query!)) : mockAdmins;
    return { content: filtered.slice(params.page * params.pageSize, (params.page + 1) * params.pageSize), totalElements: filtered.length, totalPages: Math.ceil(filtered.length / params.pageSize), page: params.page, pageSize: params.pageSize };
  }, []);

  const { data, isLoading, page, pageSize, pageCount, totalElements, sorting, searchQuery, setPage, setPageSize, setSorting, setSearchQuery } = useDataTable<AdminAccount>({ fetchFn });

  return (
    <div>
      <DataTableToolbar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder={texts.searchPlaceholder} />
      <DataTable columns={columns} data={data} pageCount={pageCount} pagination={{ pageIndex: page, pageSize }} onPaginationChange={(updater) => { if (typeof updater === 'function') { const next = updater({ pageIndex: page, pageSize }); setPage(next.pageIndex); } }} sorting={sorting} onSortingChange={(updater) => { const next = typeof updater === 'function' ? updater(sorting) : updater; setSorting(next); }} isLoading={isLoading} />
      <DataTablePagination page={page} pageSize={pageSize} pageCount={pageCount} totalElements={totalElements} onPageChange={setPage} onPageSizeChange={setPageSize} />
    </div>
  );
}
