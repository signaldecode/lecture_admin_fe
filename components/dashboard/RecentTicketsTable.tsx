'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatRelativeDate } from '@/lib/format';
import dashboardData from '@/data/dashboardData.json';
import type { Ticket, TicketStatus } from '@/types';

interface RecentTicketsTableProps {
  tickets: Ticket[];
}

const statusVariantMap: Record<TicketStatus, 'warning' | 'default' | 'success' | 'secondary'> = {
  PENDING: 'warning',
  IN_PROGRESS: 'default',
  RESOLVED: 'success',
  CLOSED: 'secondary',
};

const statusLabelMap: Record<TicketStatus, string> = {
  PENDING: '대기',
  IN_PROGRESS: '처리중',
  RESOLVED: '해결',
  CLOSED: '종료',
};

const texts = dashboardData.tables.recentTickets;

export function RecentTicketsTable({ tickets }: RecentTicketsTableProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">{texts.title}</CardTitle>
        <Link
          href={texts.viewAllPath}
          className="text-sm text-muted-foreground hover:underline"
        >
          {texts.viewAllLabel}
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>회원</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>등록일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.memberName}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {ticket.title}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    label={statusLabelMap[ticket.status]}
                    variant={statusVariantMap[ticket.status]}
                  />
                </TableCell>
                <TableCell>{formatRelativeDate(ticket.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
