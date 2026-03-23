'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { ConfirmDialog } from '@/components/composed/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { useDataTable } from '@/hooks/useDataTable';
import { formatDate } from '@/lib/format';
import uiData from '@/data/uiData.json';
import type { Popup, PaginatedResponse } from '@/types';

const texts = uiData.content.popup;
const commonTexts = uiData.common;

const initialMockPopups: Popup[] = [
  { id: 1, title: '신규 가입 쿠폰 안내', content: '회원가입 시 10% 할인 쿠폰 지급', startDate: '2026-03-01T00:00:00', endDate: '2026-04-30T00:00:00', isActive: true },
  { id: 2, title: '서비스 점검 공지', content: '3/25 02:00~06:00 서비스 점검', imageUrl: '/popups/maintenance.jpg', startDate: '2026-03-24T00:00:00', endDate: '2026-03-25T00:00:00', isActive: true },
  { id: 3, title: '설 연휴 안내', content: '설 연휴 기간 CS 운영 안내', startDate: '2026-01-25T00:00:00', endDate: '2026-02-02T00:00:00', isActive: false },
];

export function PopupListTable() {
  const [mockPopups, setMockPopups] = useState(initialMockPopups);
  const [deleteTarget, setDeleteTarget] = useState<Popup | null>(null);

  const columns: ColumnDef<Popup>[] = [
    {
      accessorKey: 'title',
      header: texts.columns.title,
      cell: ({ row }) => (
        <Link href={`/content/popups/${row.original.id}`} className="font-medium text-primary hover:underline">
          {row.getValue('title')}
        </Link>
      ),
    },
    {
      accessorKey: 'startDate',
      header: texts.columns.startDate,
      cell: ({ row }) => formatDate(row.getValue('startDate')),
    },
    {
      accessorKey: 'endDate',
      header: texts.columns.endDate,
      cell: ({ row }) => formatDate(row.getValue('endDate')),
    },
    {
      accessorKey: 'isActive',
      header: texts.columns.isActive,
      cell: ({ row }) => (
        <StatusBadge
          label={row.getValue('isActive') ? texts.activeLabels.active : texts.activeLabels.inactive}
          variant={row.getValue('isActive') ? 'success' : 'secondary'}
        />
      ),
    },
    {
      id: 'actions',
      header: texts.columns_actions,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Link
            href={`/content/popups/${row.original.id}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
            aria-label={commonTexts.edit}
          >
            <Pencil className="h-4 w-4" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => setDeleteTarget(row.original)}
            aria-label={commonTexts.delete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const fetchFn = useCallback(
    async (params: { page: number; pageSize: number; query?: string }): Promise<PaginatedResponse<Popup>> => {
      // TODO: apiClient.get('content/popups', params)
      const filtered = params.query
        ? mockPopups.filter((p) => p.title.includes(params.query!))
        : mockPopups;
      return {
        content: filtered.slice(params.page * params.pageSize, (params.page + 1) * params.pageSize),
        totalElements: filtered.length,
        totalPages: Math.ceil(filtered.length / params.pageSize),
        page: params.page,
        pageSize: params.pageSize,
      };
    },
    [mockPopups],
  );

  const {
    data, isLoading, page, pageSize, pageCount, totalElements,
    sorting, searchQuery, setPage, setPageSize, setSorting, setSearchQuery, refetch,
  } = useDataTable<Popup>({ fetchFn });

  const handleDelete = useCallback(() => {
    if (!deleteTarget) return;
    // TODO: apiClient.delete(`content/popups/${deleteTarget.id}`)
    setMockPopups((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    refetch();
  }, [deleteTarget, refetch]);

  return (
    <div className="space-y-4">
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={texts.searchPlaceholder}
      />
      <DataTable
        columns={columns}
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

      <ConfirmDialog
        title={texts.deleteConfirmTitle}
        description={texts.deleteConfirmDescription}
        confirmLabel={commonTexts.delete}
        open={deleteTarget !== null}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
