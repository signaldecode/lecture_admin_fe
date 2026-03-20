'use client';

import Link from 'next/link';
import type { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate } from '@/lib/format';
import uiData from '@/data/uiData.json';
import type { Review } from '@/types';

const texts = uiData.instructor.reviews;

export const reviewColumns: ColumnDef<Review>[] = [
  {
    accessorKey: 'courseTitle',
    header: texts.columns.courseTitle,
  },
  {
    accessorKey: 'studentName',
    header: texts.columns.studentName,
  },
  {
    accessorKey: 'rating',
    header: texts.columns.rating,
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number;
      const stars = '\u2605'.repeat(rating) + '\u2606'.repeat(5 - rating);
      return (
        <span className="text-yellow-500" title={`${rating}점`}>
          {stars}
        </span>
      );
    },
  },
  {
    accessorKey: 'content',
    header: texts.columns.content,
    cell: ({ row }) => {
      const content = row.getValue('content') as string;
      return (
        <Link
          href={`/instructor/reviews/${row.original.id}`}
          className="line-clamp-1 text-primary hover:underline"
          title={content}
        >
          {content}
        </Link>
      );
    },
  },
  {
    accessorKey: 'reply',
    header: texts.columns.reply,
    cell: ({ row }) => {
      const reply = row.getValue('reply') as string | undefined;
      return reply ? (
        <StatusBadge label={texts.replyStatusLabels.replied} variant="success" />
      ) : (
        <StatusBadge label={texts.replyStatusLabels.notReplied} variant="secondary" />
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: texts.columns.createdAt,
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
];
