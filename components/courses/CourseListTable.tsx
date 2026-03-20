'use client';

import { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { DataTable } from '@/components/composed/DataTable';
import { DataTableToolbar } from '@/components/composed/DataTableToolbar';
import { DataTablePagination } from '@/components/composed/DataTablePagination';
import { Button } from '@/components/ui/button';
import { useDataTable } from '@/hooks/useDataTable';
import { useRole } from '@/hooks/useRole';
import { getCourseColumns } from '@/components/courses/columns';
import { apiClient } from '@/lib/api';
import { PlusCircle } from 'lucide-react';
import type { Course, PaginatedResponse } from '@/types';

// Mock data for development
const mockCourses: Course[] = [
  { id: 1, title: 'React 완전 정복', description: '', instructorId: 1, instructorName: '김강사', categoryId: 1, categoryName: '프론트엔드', price: 89000, status: 'PUBLISHED', difficulty: 'INTERMEDIATE', studentCount: 342, rating: 4.8, createdAt: '2026-01-15T00:00:00', updatedAt: '2026-03-10T00:00:00' },
  { id: 2, title: 'TypeScript 기초부터 실전까지', description: '', instructorId: 1, instructorName: '김강사', categoryId: 1, categoryName: '프론트엔드', price: 59000, status: 'PUBLISHED', difficulty: 'BEGINNER', studentCount: 518, rating: 4.6, createdAt: '2026-02-01T00:00:00', updatedAt: '2026-03-15T00:00:00' },
  { id: 3, title: 'Next.js 16 마스터클래스', description: '', instructorId: 2, instructorName: '이강사', categoryId: 1, categoryName: '프론트엔드', price: 99000, status: 'PENDING', difficulty: 'ADVANCED', studentCount: 0, rating: 0, createdAt: '2026-03-18T00:00:00', updatedAt: '2026-03-18T00:00:00' },
  { id: 4, title: 'Spring Boot 실전 가이드', description: '', instructorId: 3, instructorName: '박강사', categoryId: 2, categoryName: '백엔드', price: 79000, status: 'DRAFT', difficulty: 'INTERMEDIATE', studentCount: 0, rating: 0, createdAt: '2026-03-20T00:00:00', updatedAt: '2026-03-20T00:00:00' },
];

export function CourseListTable() {
  const { role } = useRole();
  const showInstructor = role === 'SUPER_ADMIN';

  const columns = useMemo(() => getCourseColumns(showInstructor), [showInstructor]);

  const fetchCourses = useCallback(
    async (params: {
      page: number;
      pageSize: number;
      sort?: string;
      query?: string;
    }): Promise<PaginatedResponse<Course>> => {
      // TODO: Replace with actual API call
      // return apiClient.get<PaginatedResponse<Course>>('courses', params);
      const filtered = params.query
        ? mockCourses.filter((c) =>
            c.title.toLowerCase().includes(params.query!.toLowerCase()),
          )
        : mockCourses;

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
  } = useDataTable<Course>({ fetchFn: fetchCourses });

  return (
    <div>
      <DataTableToolbar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="강의명으로 검색"
      >
        <Link
          href="/courses/new"
          className="inline-flex h-7 items-center gap-1 rounded-[min(var(--radius-md),12px)] bg-primary px-2.5 text-[0.8rem] font-medium text-primary-foreground hover:bg-primary/80"
        >
          <PlusCircle className="size-3.5" />
          강의 등록
        </Link>
      </DataTableToolbar>

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
    </div>
  );
}
