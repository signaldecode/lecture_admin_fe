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
import uiData from '@/data/uiData.json';
import type { Banner, PaginatedResponse } from '@/types';

const texts = uiData.content.banner;
const positionLabels = texts.positionLabels as Record<string, string>;
const activeLabels = texts.activeLabels;

const columns: ColumnDef<Banner>[] = [
  { accessorKey: 'title', header: texts.columns.title, cell: ({ row }) => (
    <Link href={`/content/banners/${row.original.id}`} className="font-medium text-primary hover:underline">{row.getValue('title')}</Link>
  ) },
  {
    accessorKey: 'position',
    header: texts.columns.position,
    cell: ({ row }) => {
      return positionLabels[row.getValue('position') as string] ?? row.getValue('position');
    },
  },
  { accessorKey: 'order', header: texts.columns.order },
  { accessorKey: 'startDate', header: texts.columns.startDate, cell: ({ row }) => formatDate(row.getValue('startDate')) },
  { accessorKey: 'endDate', header: texts.columns.endDate, cell: ({ row }) => formatDate(row.getValue('endDate')) },
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
];

const mockBanners: Banner[] = [
  { id: 1, title: '봄학기 할인 이벤트', imageUrl: '/banners/spring.jpg', linkUrl: '/events/spring', position: 'TOP', startDate: '2026-03-01T00:00:00', endDate: '2026-03-31T00:00:00', isActive: true, order: 1 },
  { id: 2, title: '신규 강의 오픈', imageUrl: '/banners/new.jpg', position: 'MIDDLE', startDate: '2026-03-15T00:00:00', endDate: '2026-04-15T00:00:00', isActive: true, order: 2 },
  { id: 3, title: '설 연휴 특가', imageUrl: '/banners/holiday.jpg', position: 'TOP', startDate: '2026-01-25T00:00:00', endDate: '2026-02-05T00:00:00', isActive: false, order: 3 },
];

export function BannerListTable() {
  const fetchFn = useCallback(async (params: { page: number; pageSize: number; query?: string }): Promise<PaginatedResponse<Banner>> => {
    // TODO: apiClient.get('content/banners', params)
    const filtered = params.query ? mockBanners.filter((b) => b.title.includes(params.query!)) : mockBanners;
    return { content: filtered.slice(params.page * params.pageSize, (params.page + 1) * params.pageSize), totalElements: filtered.length, totalPages: Math.ceil(filtered.length / params.pageSize), page: params.page, pageSize: params.pageSize };
  }, []);

  const { data, isLoading, page, pageSize, pageCount, totalElements, sorting, searchQuery, setPage, setPageSize, setSorting, setSearchQuery } = useDataTable<Banner>({ fetchFn });

  return (
    <div>
      <DataTableToolbar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder={texts.searchPlaceholder} />
      <DataTable columns={columns} data={data} pageCount={pageCount} pagination={{ pageIndex: page, pageSize }} onPaginationChange={(updater) => { if (typeof updater === 'function') { const next = updater({ pageIndex: page, pageSize }); setPage(next.pageIndex); } }} sorting={sorting} onSortingChange={(updater) => { const next = typeof updater === 'function' ? updater(sorting) : updater; setSorting(next); }} isLoading={isLoading} />
      <DataTablePagination page={page} pageSize={pageSize} pageCount={pageCount} totalElements={totalElements} onPageChange={setPage} onPageSizeChange={setPageSize} />
    </div>
  );
}
