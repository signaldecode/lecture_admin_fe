'use client';

import { useCallback } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { useDataTable } from '@/hooks/useDataTable';
import { formatDate, formatNumber } from '@/lib/format';
import type { CommunityPost, PostStatus, PaginatedResponse } from '@/types';

const statusVariantMap: Record<PostStatus, 'success' | 'secondary' | 'destructive'> = {
  PUBLISHED: 'success',
  UNPUBLISHED: 'secondary',
  DELETED: 'destructive',
};

const statusLabelMap: Record<PostStatus, string> = {
  PUBLISHED: '공개',
  UNPUBLISHED: '비공개',
  DELETED: '삭제',
};

const postColumns: ColumnDef<CommunityPost>[] = [
  {
    accessorKey: 'title',
    header: '제목',
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('title')}</span>
    ),
  },
  {
    accessorKey: 'authorName',
    header: '작성자',
  },
  {
    accessorKey: 'categoryName',
    header: '카테고리',
  },
  {
    accessorKey: 'commentCount',
    header: '댓글',
    cell: ({ row }) => formatNumber(row.getValue('commentCount')),
  },
  {
    accessorKey: 'reportCount',
    header: '신고',
    cell: ({ row }) => {
      const count = row.getValue('reportCount') as number;
      return (
        <span className={count > 0 ? 'text-destructive font-medium' : ''}>
          {formatNumber(count)}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as PostStatus;
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
    header: '작성일',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
];

// TODO: Replace with actual API call
const mockPosts: CommunityPost[] = [
  { id: 1, title: 'React 19 새로운 기능 정리', authorName: '김철수', categoryName: '자유게시판', commentCount: 12, reportCount: 0, status: 'PUBLISHED', createdAt: '2026-03-18T10:00:00' },
  { id: 2, title: 'Spring Boot 스터디 모집합니다', authorName: '이영희', categoryName: '스터디모집', commentCount: 8, reportCount: 0, status: 'PUBLISHED', createdAt: '2026-03-17T14:30:00' },
  { id: 3, title: '부적절한 광고 게시글', authorName: '스팸계정', categoryName: '자유게시판', commentCount: 0, reportCount: 5, status: 'UNPUBLISHED', createdAt: '2026-03-16T09:15:00' },
  { id: 4, title: '취업 후기 공유드립니다', authorName: '박민수', categoryName: '취업정보', commentCount: 25, reportCount: 0, status: 'PUBLISHED', createdAt: '2026-03-15T16:45:00' },
  { id: 5, title: '삭제된 게시글입니다', authorName: '탈퇴회원', categoryName: '질문답변', commentCount: 3, reportCount: 2, status: 'DELETED', createdAt: '2026-03-14T11:20:00' },
];

export function PostListTable() {
  const fetchPosts = useCallback(
    async (params: {
      page: number;
      pageSize: number;
      query?: string;
    }): Promise<PaginatedResponse<CommunityPost>> => {
      // TODO: Replace with actual API call
      const filtered = params.query
        ? mockPosts.filter((p) => p.title.includes(params.query!))
        : mockPosts;

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
  } = useDataTable<CommunityPost>({ fetchFn: fetchPosts });

  return (
    <div>
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="제목으로 검색"
      />

      <DataTable
        columns={postColumns}
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
