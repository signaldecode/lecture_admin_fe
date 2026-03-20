'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatDate, formatNumber } from '@/lib/format';
import type { Member, MemberGrade, MemberStatus } from '@/types';

const gradeVariantMap: Record<MemberGrade, 'secondary' | 'default' | 'warning' | 'success'> = {
  BASIC: 'secondary',
  SILVER: 'default',
  GOLD: 'warning',
  PLATINUM: 'success',
};

const gradeLabelMap: Record<MemberGrade, string> = {
  BASIC: '일반',
  SILVER: '실버',
  GOLD: '골드',
  PLATINUM: '플래티넘',
};

const statusVariantMap: Record<MemberStatus, 'success' | 'destructive' | 'secondary'> = {
  ACTIVE: 'success',
  SUSPENDED: 'destructive',
  WITHDRAWN: 'secondary',
};

const statusLabelMap: Record<MemberStatus, string> = {
  ACTIVE: '활성',
  SUSPENDED: '정지',
  WITHDRAWN: '탈퇴',
};

export const memberColumns: ColumnDef<Member>[] = [
  {
    accessorKey: 'name',
    header: '이름',
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'email',
    header: '이메일',
  },
  {
    accessorKey: 'grade',
    header: '등급',
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
    header: '상태',
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
    header: '포인트',
    cell: ({ row }) => formatNumber(row.getValue('point')),
  },
  {
    accessorKey: 'createdAt',
    header: '가입일',
    cell: ({ row }) => formatDate(row.getValue('createdAt')),
  },
];
