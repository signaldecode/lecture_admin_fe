'use client';

import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate, formatNumber } from '@/lib/format';
import uiData from '@/data/uiData.json';
import type { Member, MemberGrade, MemberStatus } from '@/types';

const texts = uiData.members;

const gradeVariantMap: Record<MemberGrade, 'secondary' | 'default' | 'warning' | 'success'> = {
  BASIC: 'secondary',
  SILVER: 'default',
  GOLD: 'warning',
  PLATINUM: 'success',
};

const gradeLabelMap = texts.gradeLabels as Record<MemberGrade, string>;

const statusVariantMap: Record<MemberStatus, 'success' | 'destructive' | 'secondary'> = {
  ACTIVE: 'success',
  SUSPENDED: 'destructive',
  WITHDRAWN: 'secondary',
};

const statusLabelMap = texts.statusLabels as Record<MemberStatus, string>;

export const memberColumns: ColumnDef<Member>[] = [
  {
    accessorKey: 'name',
    header: texts.columns.name,
    cell: ({ row }) => (
      <Link
        href={`/members/${row.original.id}`}
        className="font-medium text-primary hover:underline"
      >
        {row.getValue('name')}
      </Link>
    ),
  },
  {
    accessorKey: 'email',
    header: texts.columns.email,
  },
  {
    accessorKey: 'grade',
    header: texts.columns.grade,
    cell: ({ row }) => {
      const grade = row.getValue('grade') as MemberGrade;
      return (
        <StatusBadge
          label={gradeLabelMap[grade]}
          variant={gradeVariantMap[grade]}
        />
      );
    },
  },
  {
    accessorKey: 'status',
    header: texts.columns.status,
    cell: ({ row }) => {
      const status = row.getValue('status') as MemberStatus;
      return (
        <StatusBadge
          label={statusLabelMap[status]}
          variant={statusVariantMap[status]}
        />
      );
    },
  },
  {
    accessorKey: 'point',
    header: texts.columns.point,
    cell: ({ row }) => formatNumber(row.getValue('point')),
  },
  {
    accessorKey: 'createdAt',
    header: texts.columns.createdAt,
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
];
