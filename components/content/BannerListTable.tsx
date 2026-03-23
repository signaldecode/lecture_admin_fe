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
import type { Banner, PaginatedResponse } from '@/types';

const texts = uiData.content.banner;
const commonTexts = uiData.common;
const positionLabels = texts.positionLabels as Record<string, string>;
const activeLabels = texts.activeLabels;

const initialMockBanners: Banner[] = [
  { id: 1, title: '봄학기 할인 이벤트', imageUrl: '/banners/spring.jpg', linkUrl: '/events/spring', position: 'TOP', startDate: '2026-03-01T00:00:00', endDate: '2026-03-31T00:00:00', isActive: true, order: 1 },
  { id: 2, title: '신규 강의 오픈', imageUrl: '/banners/new.jpg', position: 'MIDDLE', startDate: '2026-03-15T00:00:00', endDate: '2026-04-15T00:00:00', isActive: true, order: 2 },
  { id: 3, title: '설 연휴 특가', imageUrl: '/banners/holiday.jpg', position: 'TOP', startDate: '2026-01-25T00:00:00', endDate: '2026-02-05T00:00:00', isActive: false, order: 3 },
];

export function BannerListTable() {
  const [mockBanners, setMockBanners] = useState(initialMockBanners);
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);

  const columns: ColumnDef<Banner>[] = [
    {
      accessorKey: 'title',
      header: texts.columns.title,
      cell: ({ row }) => (
        <Link href={`/content/banners/${row.original.id}`} className="font-medium text-primary hover:underline">
          {row.getValue('title')}
        </Link>
      ),
    },
    {
      accessorKey: 'position',
      header: texts.columns.position,
      cell: ({ row }) => positionLabels[row.getValue('position') as string] ?? row.getValue('position'),
    },
    { accessorKey: 'order', header: texts.columns.order },
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
          label={row.getValue('isActive') ? activeLabels.active : activeLabels.inactive}
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
            href={`/content/banners/${row.original.id}`}
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
    async (params: { page: number; pageSize: number; query?: string }): Promise<PaginatedResponse<Banner>> => {
      // TODO: apiClient.get('content/banners', params)
      const filtered = params.query
        ? mockBanners.filter((b) => b.title.includes(params.query!))
        : mockBanners;
      return {
        content: filtered.slice(params.page * params.pageSize, (params.page + 1) * params.pageSize),
        totalElements: filtered.length,
        totalPages: Math.ceil(filtered.length / params.pageSize),
        page: params.page,
        pageSize: params.pageSize,
      };
    },
    [mockBanners],
  );

  const {
    data, isLoading, page, pageSize, pageCount, totalElements,
    sorting, searchQuery, setPage, setPageSize, setSorting, setSearchQuery, refetch,
  } = useDataTable<Banner>({ fetchFn });

  const handleDelete = useCallback(() => {
    if (!deleteTarget) return;
    // TODO: apiClient.delete(`content/banners/${deleteTarget.id}`)
    setMockBanners((prev) => prev.filter((b) => b.id !== deleteTarget.id));
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
