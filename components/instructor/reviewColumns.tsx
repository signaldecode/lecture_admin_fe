'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate } from '@/lib/format';
import type { Review } from '@/types';

export const reviewColumns: ColumnDef<Review>[] = [
  {
    accessorKey: 'courseTitle',
    header: '강의',
  },
  {
    accessorKey: 'studentName',
    header: '수강생',
  },
  {
    accessorKey: 'rating',
    header: '평점',
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number;
      const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
      return (
        <span className="text-yellow-500" title={`${rating}점`}>
          {stars}
        </span>
      );
    },
  },
  {
    accessorKey: 'content',
    header: '내용',
    cell: ({ row }) => {
      const content = row.getValue('content') as string;
      return (
        <span className="line-clamp-1" title={content}>
          {content}
        </span>
      );
    },
  },
  {
    accessorKey: 'reply',
    header: '답변',
    cell: ({ row }) => {
      const reply = row.getValue('reply') as string | undefined;
      return reply ? (
        <StatusBadge label="답변 완료" variant="success" />
      ) : (
        <StatusBadge label="미답변" variant="secondary" />
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: '작성일',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
];
