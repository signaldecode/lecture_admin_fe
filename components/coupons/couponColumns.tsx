'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate, formatNumber, formatCurrency } from '@/lib/format';
import type { Coupon, CouponType, CouponStatus } from '@/types';
import uiData from '@/data/uiData.json';

const columnsTexts = uiData.coupons.columns;
const typeLabels = uiData.coupons.typeLabels;
const statusLabels = uiData.coupons.statusLabels;

const statusVariantMap: Record<CouponStatus, 'success' | 'secondary' | 'warning'> = {
  ACTIVE: 'success',
  EXPIRED: 'secondary',
  USED_OUT: 'warning',
};

function formatDiscountValue(type: CouponType, value: number): string {
  if (type === 'PERCENT') {
    return `${value}%`;
  }
  return formatCurrency(value);
}

export const couponColumns: ColumnDef<Coupon>[] = [
  {
    accessorKey: 'code',
    header: columnsTexts.code,
    cell: ({ row }) => (
      <span className="font-mono font-medium">{row.getValue('code')}</span>
    ),
  },
  {
    accessorKey: 'name',
    header: columnsTexts.name,
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'type',
    header: columnsTexts.type,
    cell: ({ row }) => {
      const type = row.getValue('type') as CouponType;
      return typeLabels[type];
    },
  },
  {
    accessorKey: 'discountValue',
    header: columnsTexts.discountValue,
    cell: ({ row }) => {
      const type = row.original.type;
      const value = row.getValue('discountValue') as number;
      return formatDiscountValue(type, value);
    },
  },
  {
    id: 'usage',
    header: columnsTexts.usage,
    cell: ({ row }) => {
      const used = row.original.usedCount;
      const limit = row.original.usageLimit;
      if (limit != null) {
        return `${formatNumber(used)} / ${formatNumber(limit)}`;
      }
      return formatNumber(used);
    },
  },
  {
    accessorKey: 'expiresAt',
    header: columnsTexts.expiresAt,
    cell: ({ row }) => formatDate(row.getValue('expiresAt')),
  },
  {
    accessorKey: 'status',
    header: columnsTexts.status,
    cell: ({ row }) => {
      const status = row.getValue('status') as CouponStatus;
      return (
        <StatusBadge
          label={statusLabels[status]}
          variant={statusVariantMap[status]}
        />
      );
    },
  },
];
