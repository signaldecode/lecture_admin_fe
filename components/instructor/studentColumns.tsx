'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { formatDate, formatPercent } from '@/lib/format';
import uiData from '@/data/uiData.json';
import type { InstructorStudent } from '@/types';

const texts = uiData.instructor.students;

export const studentColumns: ColumnDef<InstructorStudent>[] = [
  {
    accessorKey: 'studentName',
    header: texts.columns.studentName,
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('studentName')}</span>
    ),
  },
  {
    accessorKey: 'email',
    header: texts.columns.email,
  },
  {
    accessorKey: 'courseTitle',
    header: texts.columns.courseTitle,
  },
  {
    accessorKey: 'progressRate',
    header: texts.columns.progressRate,
    cell: ({ row }) => formatPercent(row.getValue('progressRate')),
  },
  {
    accessorKey: 'completionRate',
    header: texts.columns.completionRate,
    cell: ({ row }) => formatPercent(row.getValue('completionRate')),
  },
  {
    accessorKey: 'enrolledAt',
    header: texts.columns.enrolledAt,
    cell: ({ row }) => formatDate(row.getValue('enrolledAt')),
  },
];
