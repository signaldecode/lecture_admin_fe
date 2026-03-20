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
import uiData from '@/data/uiData.json';

const texts = uiData.instructor.revenue;

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

const statusLabelMap = texts.statusLabels as Record<Settlement['status'], string>;

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
          title={texts.totalRevenueTitle}
          value={formatCurrency(totalRevenue)}
          icon="DollarSign"
        />
        <StatCard
          title={texts.settledTitle}
          value={formatCurrency(settledAmount)}
          icon="CheckCircle"
        />
        <StatCard
          title={texts.pendingTitle}
          value={formatCurrency(pendingAmount)}
          icon="Clock"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{texts.historyTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{texts.columns.period}</TableHead>
                <TableHead>{texts.columns.courseSales}</TableHead>
                <TableHead>{texts.columns.commission}</TableHead>
                <TableHead>{texts.columns.netAmount}</TableHead>
                <TableHead>{texts.columns.status}</TableHead>
                <TableHead>{texts.columns.settledAt}</TableHead>
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
