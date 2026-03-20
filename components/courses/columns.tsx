'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import uiData from '@/data/uiData.json';
import type { Course, CourseStatus } from '@/types';

const texts = uiData.courses;

const statusVariantMap: Record<CourseStatus, 'secondary' | 'warning' | 'success' | 'destructive'> = {
  DRAFT: 'secondary',
  PENDING: 'warning',
  PUBLISHED: 'success',
  UNPUBLISHED: 'destructive',
};

const statusLabelMap = texts.statusLabels as Record<CourseStatus, string>;
const difficultyLabelMap = texts.difficultyLabels as Record<string, string>;

export function getCourseColumns(showInstructor: boolean): ColumnDef<Course>[] {
  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: 'title',
      header: texts.columns.title,
      cell: ({ row }) => (
        <Link
          href={`/courses/${row.original.id}`}
          className="font-medium text-primary hover:underline"
        >
          {row.getValue('title')}
        </Link>
      ),
    },
  ];

  if (showInstructor) {
    columns.push({
      accessorKey: 'instructorName',
      header: texts.columns.instructorName,
    });
  }

  columns.push(
    {
      accessorKey: 'categoryName',
      header: texts.columns.categoryName,
    },
    {
      accessorKey: 'difficulty',
      header: texts.columns.difficulty,
      cell: ({ row }) => difficultyLabelMap[row.getValue('difficulty') as string] ?? row.getValue('difficulty'),
    },
    {
      accessorKey: 'price',
      header: texts.columns.price,
      cell: ({ row }) => formatCurrency(row.getValue('price')),
    },
    {
      accessorKey: 'studentCount',
      header: texts.columns.studentCount,
    },
    {
      accessorKey: 'status',
      header: texts.columns.status,
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
      header: texts.columns.createdAt,
      cell: ({ row }) => formatDate(row.getValue('createdAt')),
    },
  );

  return columns;
}
