'use client';

import { useCallback, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { ConfirmDialog } from '@/components/composed/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { useDataTable } from '@/hooks/useDataTable';
import { formatNumber } from '@/lib/format';
import { CategoryFormModal } from '@/components/community/CategoryFormModal';
import uiData from '@/data/uiData.json';
import type { CommunityCategory, PaginatedResponse } from '@/types';

const texts = uiData.community.categories;
const commonTexts = uiData.common;

const initialMockCategories: CommunityCategory[] = [
  { id: 1, name: '자유게시판', slug: 'free', postCount: 342, order: 1 },
  { id: 2, name: '질문답변', slug: 'qna', postCount: 189, order: 2 },
  { id: 3, name: '스터디모집', slug: 'study', postCount: 67, order: 3 },
  { id: 4, name: '취업정보', slug: 'career', postCount: 95, order: 4 },
  { id: 5, name: '후기', slug: 'review', postCount: 213, order: 5 },
];

export function CategoryListTable() {
  const [mockCategories, setMockCategories] = useState(initialMockCategories);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CommunityCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CommunityCategory | null>(null);

  const categoryColumns: ColumnDef<CommunityCategory>[] = [
    {
      accessorKey: 'name',
      header: texts.columns.name,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue('name')}</span>
      ),
    },
    {
      accessorKey: 'slug',
      header: texts.columns.slug,
      cell: ({ row }) => (
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
          {row.getValue('slug')}
        </code>
      ),
    },
    {
      accessorKey: 'postCount',
      header: texts.columns.postCount,
      cell: ({ row }) => formatNumber(row.getValue('postCount')),
    },
    {
      accessorKey: 'order',
      header: texts.columns.order,
    },
    {
      id: 'actions',
      header: texts.columns.actions,
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setEditTarget(row.original);
              setFormOpen(true);
            }}
            aria-label={commonTexts.edit}
          >
            <Pencil className="h-4 w-4" />
          </Button>
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

  const fetchCategories = useCallback(
    async (params: {
      page: number;
      pageSize: number;
    }): Promise<PaginatedResponse<CommunityCategory>> => {
      // TODO: apiClient.get('community/categories', params)
      return {
        content: mockCategories.slice(
          params.page * params.pageSize,
          (params.page + 1) * params.pageSize,
        ),
        totalElements: mockCategories.length,
        totalPages: Math.ceil(mockCategories.length / params.pageSize),
        page: params.page,
        pageSize: params.pageSize,
      };
    },
    [mockCategories],
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
    refetch,
  } = useDataTable<CommunityCategory>({ fetchFn: fetchCategories });

  const handleCreate = useCallback(
    (formData: { name: string; slug: string; order: number }) => {
      // TODO: apiClient.post('community/categories', formData)
      const newId = Math.max(...mockCategories.map((c) => c.id), 0) + 1;
      setMockCategories((prev) => [
        ...prev,
        { id: newId, ...formData, postCount: 0 },
      ]);
      refetch();
    },
    [mockCategories, refetch],
  );

  const handleEdit = useCallback(
    (formData: { name: string; slug: string; order: number }) => {
      if (!editTarget) return;
      // TODO: apiClient.put(`community/categories/${editTarget.id}`, formData)
      setMockCategories((prev) =>
        prev.map((c) =>
          c.id === editTarget.id ? { ...c, ...formData } : c,
        ),
      );
      setEditTarget(null);
      refetch();
    },
    [editTarget, refetch],
  );

  const handleDelete = useCallback(() => {
    if (!deleteTarget) return;
    // TODO: apiClient.delete(`community/categories/${deleteTarget.id}`)
    setMockCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
    refetch();
  }, [deleteTarget, refetch]);

  const handleFormSubmit = useCallback(
    (formData: { name: string; slug: string; order: number }) => {
      if (editTarget) {
        handleEdit(formData);
      } else {
        handleCreate(formData);
      }
    },
    [editTarget, handleEdit, handleCreate],
  );

  const handleFormOpenChange = useCallback(
    (open: boolean) => {
      setFormOpen(open);
      if (!open) setEditTarget(null);
    },
    [],
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditTarget(null);
            setFormOpen(true);
          }}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          {texts.createButton}
        </Button>
      </div>

      <DataTable
        columns={categoryColumns}
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

      <CategoryFormModal
        open={formOpen}
        onOpenChange={handleFormOpenChange}
        category={editTarget}
        onSubmit={handleFormSubmit}
      />

      <ConfirmDialog
        title={texts.deleteConfirmTitle}
        description={texts.deleteConfirmDescription}
        confirmLabel={commonTexts.delete}
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
