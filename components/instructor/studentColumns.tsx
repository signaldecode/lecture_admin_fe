'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { formatDate, formatPercent } from '@/lib/format';
import type { InstructorStudent } from '@/types';

export const studentColumns: ColumnDef<InstructorStudent>[] = [
  {
    accessorKey: 'studentName',
    header: '수강생',
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('studentName')}</span>
    ),
  },
  {
    accessorKey: 'email',
    header: '이메일',
  },
  {
    accessorKey: 'courseTitle',
    header: '수강 강의',
  },
  {
    accessorKey: 'progressRate',
    header: '진도율',
    cell: ({ row }) => formatPercent(row.getValue('progressRate')),
  },
  {
    accessorKey: 'completionRate',
    header: '완료율',
    cell: ({ row }) => formatPercent(row.getValue('completionRate')),
  },
  {
    accessorKey: 'enrolledAt',
    header: '수강 시작일',
    cell: ({ row }) => formatDate(row.getValue('enrolledAt')),
  },
];
