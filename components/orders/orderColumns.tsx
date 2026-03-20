'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import type { Order, OrderStatus } from '@/types';
import uiData from '@/data/uiData.json';

const columnsTexts = uiData.orders.columns;
const statusLabels = uiData.orders.statusLabels;

const statusVariantMap: Record<OrderStatus, 'success' | 'secondary' | 'warning' | 'destructive'> = {
  COMPLETED: 'success',
  CANCELLED: 'secondary',
  REFUND_REQUESTED: 'warning',
  REFUNDED: 'destructive',
};

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: columnsTexts.id,
    cell: ({ row }) => {
      const id = row.getValue('id') as number;
      return (
        <Link
          href={`/orders/${id}`}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          #{id}
        </Link>
      );
    },
  },
  {
    accessorKey: 'memberName',
    header: columnsTexts.memberName,
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('memberName')}</span>
    ),
  },
  {
    accessorKey: 'courseTitle',
    header: columnsTexts.courseTitle,
    cell: ({ row }) => (
      <span className="block max-w-[200px] truncate" title={row.getValue('courseTitle')}>
        {row.getValue('courseTitle')}
      </span>
    ),
  },
  {
    accessorKey: 'amount',
    header: columnsTexts.amount,
    cell: ({ row }) => formatCurrency(row.getValue('amount')),
  },
  {
    accessorKey: 'status',
    header: columnsTexts.status,
    cell: ({ row }) => {
      const status = row.getValue('status') as OrderStatus;
      return (
        <StatusBadge
          label={statusLabels[status]}
          variant={statusVariantMap[status]}
        />
      );
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: columnsTexts.paymentMethod,
  },
  {
    accessorKey: 'createdAt',
    header: columnsTexts.createdAt,
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
];
