'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import type { OrderStatus } from '@/types';
import uiData from '@/data/uiData.json';

const texts = uiData.members.orderHistory;

interface OrderHistoryItem {
  orderId: number;
  courseTitle: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
}

interface MemberOrderHistoryProps {
  memberId: number;
}

const statusLabel = uiData.orders.statusLabels as Record<OrderStatus, string>;
const statusVariant: Record<OrderStatus, 'success' | 'secondary' | 'warning' | 'destructive'> = { COMPLETED: 'success', CANCELLED: 'secondary', REFUND_REQUESTED: 'warning', REFUNDED: 'destructive' };

const mockOrders: OrderHistoryItem[] = [
  { orderId: 101, courseTitle: 'React 완전 정복', amount: 89000, status: 'COMPLETED', createdAt: '2025-08-10T00:00:00' },
  { orderId: 145, courseTitle: 'TypeScript 기초부터 실전까지', amount: 59000, status: 'COMPLETED', createdAt: '2025-10-01T00:00:00' },
  { orderId: 210, courseTitle: 'Spring Boot 실전 가이드', amount: 79000, status: 'REFUNDED', createdAt: '2026-01-20T00:00:00' },
];

export function MemberOrderHistory({ memberId }: MemberOrderHistoryProps) {
  // TODO: apiClient.get(`members/${memberId}/orders`)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{texts.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{texts.columns.orderId}</TableHead>
              <TableHead>{texts.columns.courseTitle}</TableHead>
              <TableHead>{texts.columns.amount}</TableHead>
              <TableHead>{texts.columns.status}</TableHead>
              <TableHead>{texts.columns.createdAt}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>#{order.orderId}</TableCell>
                <TableCell className="font-medium">{order.courseTitle}</TableCell>
                <TableCell>{formatCurrency(order.amount)}</TableCell>
                <TableCell>
                  <StatusBadge label={statusLabel[order.status]} variant={statusVariant[order.status]} />
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
