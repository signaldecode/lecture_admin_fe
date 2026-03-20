'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate } from '@/lib/format';
import type { Qna, QnaStatus } from '@/types';

const statusVariantMap: Record<QnaStatus, 'warning' | 'success' | 'secondary'> = {
  PENDING: 'warning',
  ANSWERED: 'success',
  CLOSED: 'secondary',
};

const statusLabelMap: Record<QnaStatus, string> = {
  PENDING: '답변 대기',
  ANSWERED: '답변 완료',
  CLOSED: '종료',
};

export const qnaColumns: ColumnDef<Qna>[] = [
  {
    accessorKey: 'courseTitle',
    header: '강의',
  },
  {
    accessorKey: 'question',
    header: '질문',
    cell: ({ row }) => {
      const question = row.getValue('question') as string;
      return (
        <span className="line-clamp-1" title={question}>
          {question}
        </span>
      );
    },
  },
  {
    accessorKey: 'studentName',
    header: '수강생',
  },
  {
    accessorKey: 'status',
    header: '상태',
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
    header: '작성일',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
];
