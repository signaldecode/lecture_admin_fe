'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import type { Course, CourseStatus } from '@/types';

const statusVariantMap: Record<CourseStatus, 'secondary' | 'warning' | 'success' | 'destructive'> = {
  DRAFT: 'secondary',
  PENDING: 'warning',
  PUBLISHED: 'success',
  UNPUBLISHED: 'destructive',
};

const statusLabelMap: Record<CourseStatus, string> = {
  DRAFT: '임시저장',
  PENDING: '승인대기',
  PUBLISHED: '공개',
  UNPUBLISHED: '비공개',
};

const difficultyLabelMap: Record<string, string> = {
  BEGINNER: '입문',
  INTERMEDIATE: '중급',
  ADVANCED: '고급',
};

export function getCourseColumns(showInstructor: boolean): ColumnDef<Course>[] {
  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: 'title',
      header: '강의명',
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue('title')}</span>
      ),
    },
  ];

  if (showInstructor) {
    columns.push({
      accessorKey: 'instructorName',
      header: '강사',
    });
  }

  columns.push(
    {
      accessorKey: 'categoryName',
      header: '카테고리',
    },
    {
      accessorKey: 'difficulty',
      header: '난이도',
      cell: ({ row }) => difficultyLabelMap[row.getValue('difficulty') as string] ?? row.getValue('difficulty'),
    },
    {
      accessorKey: 'price',
      header: '가격',
      cell: ({ row }) => formatCurrency(row.getValue('price')),
    },
    {
      accessorKey: 'studentCount',
      header: '수강생',
    },
    {
      accessorKey: 'status',
      header: '상태',
      cell: ({ row }) => {
        const status = row.getValue('status') as CourseStatus;
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
      header: '등록일',
      cell: ({ row }) => formatDate(row.getValue('createdAt')),
    },
  );

  return columns;
}
