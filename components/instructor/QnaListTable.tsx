'use client';

import { useCallback } from 'react';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { useDataTable } from '@/hooks/useDataTable';
import { qnaColumns } from '@/components/instructor/qnaColumns';
import uiData from '@/data/uiData.json';
import type { Qna, PaginatedResponse } from '@/types';

const texts = uiData.instructor.qna;

// TODO: Replace with actual API call to /api/admin/instructor/qna
const mockQnaItems: Qna[] = [
  { id: 1, courseId: 1, courseTitle: 'React 완전 정복', studentName: '김철수', question: 'useEffect에서 cleanup 함수는 언제 호출되나요?', status: 'PENDING', createdAt: '2026-03-15T10:30:00' },
  { id: 2, courseId: 1, courseTitle: 'React 완전 정복', studentName: '이영희', question: 'useState와 useRef의 차이점이 궁금합니다.', answer: 'useState는 리렌더링을 유발하고 useRef는 유발하지 않습니다.', status: 'ANSWERED', createdAt: '2026-03-10T14:00:00', answeredAt: '2026-03-11T09:00:00' },
  { id: 3, courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', studentName: '박민수', question: 'Generic에서 extends 키워드는 어떤 역할을 하나요?', status: 'PENDING', createdAt: '2026-03-18T16:20:00' },
  { id: 4, courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', studentName: '정수연', question: 'interface와 type alias의 차이를 알고 싶습니다.', answer: '대부분의 경우 동일하게 사용할 수 있지만 몇 가지 차이가 있습니다.', status: 'CLOSED', createdAt: '2026-02-28T11:00:00', answeredAt: '2026-03-01T08:30:00' },
];

export function QnaListTable() {
  const fetchQna = useCallback(
    async (params: {
      page: number;
      pageSize: number;
      query?: string;
    }): Promise<PaginatedResponse<Qna>> => {
      // TODO: Replace with actual API call
      const filtered = params.query
        ? mockQnaItems.filter(
            (q) =>
              q.question.includes(params.query!) ||
              q.studentName.includes(params.query!),
          )
        : mockQnaItems;

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
  } = useDataTable<Qna>({ fetchFn: fetchQna });

  return (
    <div>
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={texts.searchPlaceholder}
      />

      <DataTable
        columns={qnaColumns}
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
