'use client';

import { useCallback } from 'react';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { useDataTable } from '@/hooks/useDataTable';
import { reviewColumns } from '@/components/instructor/reviewColumns';
import uiData from '@/data/uiData.json';
import type { Review, PaginatedResponse } from '@/types';

const texts = uiData.instructor.reviews;

// TODO: Replace with actual API call to /api/admin/instructor/reviews
const mockReviews: Review[] = [
  { id: 1, courseId: 1, courseTitle: 'React 완전 정복', studentName: '김철수', rating: 5, content: '정말 유익한 강의였습니다. 실무에 바로 적용할 수 있었어요.', reply: '감사합니다! 앞으로도 좋은 강의 만들겠습니다.', createdAt: '2026-03-10T00:00:00' },
  { id: 2, courseId: 1, courseTitle: 'React 완전 정복', studentName: '이영희', rating: 4, content: '전반적으로 좋지만 후반부 내용이 조금 어렵습니다.', createdAt: '2026-03-12T00:00:00' },
  { id: 3, courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', studentName: '박민수', rating: 5, content: '타입스크립트를 처음 배우는 사람에게 강력 추천합니다.', reply: '추천 감사합니다!', createdAt: '2026-02-25T00:00:00' },
  { id: 4, courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', studentName: '정수연', rating: 3, content: '예제가 더 다양했으면 좋겠습니다.', createdAt: '2026-03-05T00:00:00' },
];

export function ReviewListTable() {
  const fetchReviews = useCallback(
    async (params: {
      page: number;
      pageSize: number;
      query?: string;
    }): Promise<PaginatedResponse<Review>> => {
      // TODO: Replace with actual API call
      const filtered = params.query
        ? mockReviews.filter(
            (r) =>
              r.studentName.includes(params.query!) ||
              r.content.includes(params.query!),
          )
        : mockReviews;

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
  } = useDataTable<Review>({ fetchFn: fetchReviews });

  return (
    <div>
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={texts.searchPlaceholder}
      />

      <DataTable
        columns={reviewColumns}
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
