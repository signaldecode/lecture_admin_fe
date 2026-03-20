'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import dashboardData from '@/data/dashboardData.json';

interface SystemAlertsProps {
  pendingRefunds: number;
  pendingTickets: number;
}

const alertTexts = dashboardData.superAdmin.alerts;

export function SystemAlerts({ pendingRefunds, pendingTickets }: SystemAlertsProps) {
  const alerts = [
    { label: alertTexts.pendingRefundsLabel, count: pendingRefunds },
    { label: alertTexts.pendingTicketsLabel, count: pendingTickets },
  ].filter((a) => a.count > 0);

  if (alerts.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertTriangle className="size-4 text-yellow-500" />
          알림
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.label}
              className="flex items-center justify-between rounded-md bg-yellow-50 px-3 py-2 dark:bg-yellow-900/20"
            >
              <span className="text-sm">{alert.label}</span>
              <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">
                {alert.count}건
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
