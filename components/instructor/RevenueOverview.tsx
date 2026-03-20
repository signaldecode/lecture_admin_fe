'use client';

import { StatCard } from '@/components/composed/StatCard';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
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
import type { Settlement } from '@/types';

// TODO: Replace with actual API call to /api/admin/instructor/settlements
const mockSettlements: Settlement[] = [
  { id: 1, period: '2026년 1월', courseSales: 2500000, commission: 500000, netAmount: 2000000, status: 'SETTLED', settledAt: '2026-02-15T00:00:00' },
  { id: 2, period: '2026년 2월', courseSales: 3200000, commission: 640000, netAmount: 2560000, status: 'SETTLED', settledAt: '2026-03-15T00:00:00' },
  { id: 3, period: '2026년 3월', courseSales: 1800000, commission: 360000, netAmount: 1440000, status: 'PENDING' },
];

const statusVariantMap: Record<Settlement['status'], 'success' | 'warning'> = {
  SETTLED: 'success',
  PENDING: 'warning',
};

const statusLabelMap: Record<Settlement['status'], string> = {
  SETTLED: '정산 완료',
  PENDING: '정산 대기',
};

export function RevenueOverview() {
  // TODO: Replace with actual API call to /api/admin/instructor/revenue/summary
  const totalRevenue = mockSettlements.reduce((sum, s) => sum + s.courseSales, 0);
  const settledAmount = mockSettlements
    .filter((s) => s.status === 'SETTLED')
    .reduce((sum, s) => sum + s.netAmount, 0);
  const pendingAmount = mockSettlements
    .filter((s) => s.status === 'PENDING')
    .reduce((sum, s) => sum + s.netAmount, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          title="총 매출"
          value={formatCurrency(totalRevenue)}
          icon="DollarSign"
        />
        <StatCard
          title="정산 완료"
          value={formatCurrency(settledAmount)}
          icon="CheckCircle"
        />
        <StatCard
          title="정산 대기"
          value={formatCurrency(pendingAmount)}
          icon="Clock"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>정산 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>정산 기간</TableHead>
                <TableHead>강의 매출</TableHead>
                <TableHead>수수료</TableHead>
                <TableHead>정산 금액</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>정산일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSettlements.map((settlement) => (
                <TableRow key={settlement.id}>
                  <TableCell className="font-medium">{settlement.period}</TableCell>
                  <TableCell>{formatCurrency(settlement.courseSales)}</TableCell>
                  <TableCell>{formatCurrency(settlement.commission)}</TableCell>
                  <TableCell>{formatCurrency(settlement.netAmount)}</TableCell>
                  <TableCell>
                    <StatusBadge
                      label={statusLabelMap[settlement.status]}
                      variant={statusVariantMap[settlement.status]}
                    />
                  </TableCell>
                  <TableCell>
                    {settlement.settledAt ? formatDate(settlement.settledAt) : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
