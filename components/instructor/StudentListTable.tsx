'use client';

import { useCallback } from 'react';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { useDataTable } from '@/hooks/useDataTable';
import { studentColumns } from '@/components/instructor/studentColumns';
import uiData from '@/data/uiData.json';
import type { InstructorStudent, PaginatedResponse } from '@/types';

const texts = uiData.instructor.students;

// TODO: Replace with actual API call to /api/admin/instructor/students
const mockStudents: InstructorStudent[] = [
  { id: 1, courseId: 1, courseTitle: 'React 완전 정복', studentName: '김철수', email: 'kim@example.com', progressRate: 85.0, completionRate: 70.0, enrolledAt: '2025-09-01T00:00:00' },
  { id: 2, courseId: 1, courseTitle: 'React 완전 정복', studentName: '이영희', email: 'lee@example.com', progressRate: 45.5, completionRate: 30.0, enrolledAt: '2025-10-15T00:00:00' },
  { id: 3, courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', studentName: '박민수', email: 'park@example.com', progressRate: 100.0, completionRate: 100.0, enrolledAt: '2025-08-20T00:00:00' },
  { id: 4, courseId: 2, courseTitle: 'TypeScript 기초부터 실전까지', studentName: '정수연', email: 'jung@example.com', progressRate: 60.0, completionRate: 50.0, enrolledAt: '2025-11-01T00:00:00' },
  { id: 5, courseId: 1, courseTitle: 'React 완전 정복', studentName: '최지훈', email: 'choi@example.com', progressRate: 20.0, completionRate: 10.0, enrolledAt: '2025-12-01T00:00:00' },
];

export function StudentListTable() {
  const fetchStudents = useCallback(
    async (params: {
      page: number;
      pageSize: number;
      query?: string;
    }): Promise<PaginatedResponse<InstructorStudent>> => {
      // TODO: Replace with actual API call
      const filtered = params.query
        ? mockStudents.filter((s) => s.studentName.includes(params.query!))
        : mockStudents;

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
  } = useDataTable<InstructorStudent>({ fetchFn: fetchStudents });

  return (
    <div>
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={texts.searchPlaceholder}
      />

      <DataTable
        columns={studentColumns}
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
