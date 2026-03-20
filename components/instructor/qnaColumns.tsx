'use client';

import Link from 'next/link';
import type { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate } from '@/lib/format';
import uiData from '@/data/uiData.json';
import type { Qna, QnaStatus } from '@/types';

const texts = uiData.instructor.qna;

const statusVariantMap: Record<QnaStatus, 'warning' | 'success' | 'secondary'> = {
  PENDING: 'warning',
  ANSWERED: 'success',
  CLOSED: 'secondary',
};

const statusLabelMap = texts.statusLabels as Record<QnaStatus, string>;

export const qnaColumns: ColumnDef<Qna>[] = [
  {
    accessorKey: 'courseTitle',
    header: texts.columns.courseTitle,
  },
  {
    accessorKey: 'question',
    header: texts.columns.question,
    cell: ({ row }) => {
      const question = row.getValue('question') as string;
      return (
        <Link
          href={`/instructor/qna/${row.original.id}`}
          className="line-clamp-1 font-medium text-primary hover:underline"
          title={question}
        >
          {question}
        </Link>
      );
    },
  },
  {
    accessorKey: 'studentName',
    header: texts.columns.studentName,
  },
  {
    accessorKey: 'status',
    header: texts.columns.status,
    cell: ({ row }) => {
      const status = row.getValue('status') as QnaStatus;
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
];
