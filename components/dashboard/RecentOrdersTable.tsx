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
import { formatCurrency, formatDate } from '@/lib/format';
import dashboardData from '@/data/dashboardData.json';
import uiData from '@/data/uiData.json';
import type { Order, OrderStatus } from '@/types';

interface RecentOrdersTableProps {
  orders: Order[];
}

const statusVariantMap: Record<OrderStatus, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  COMPLETED: 'success',
  CANCELLED: 'secondary',
  REFUND_REQUESTED: 'warning',
  REFUNDED: 'destructive',
};

const statusLabelMap = uiData.dashboard.recentOrdersStatusLabels as Record<OrderStatus, string>;
const columnTexts = uiData.dashboard.recentOrdersColumns;
const texts = dashboardData.tables.recentOrders;

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
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
              <TableHead>{columnTexts.memberName}</TableHead>
              <TableHead>{columnTexts.courseTitle}</TableHead>
              <TableHead>{columnTexts.amount}</TableHead>
              <TableHead>{columnTexts.status}</TableHead>
              <TableHead>{columnTexts.createdAt}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.memberName}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {order.courseTitle}
                </TableCell>
                <TableCell>{formatCurrency(order.amount)}</TableCell>
                <TableCell>
                  <StatusBadge
                    label={statusLabelMap[order.status]}
                    variant={statusVariantMap[order.status]}
                  />
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
