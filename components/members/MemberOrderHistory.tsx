'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import type { OrderStatus } from '@/types';

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

const statusLabel: Record<OrderStatus, string> = { COMPLETED: '결제완료', CANCELLED: '취소', REFUND_REQUESTED: '환불요청', REFUNDED: '환불완료' };
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
        <CardTitle className="text-base">주문 이력</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>주문번호</TableHead>
              <TableHead>강의명</TableHead>
              <TableHead>금액</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>결제일</TableHead>
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
