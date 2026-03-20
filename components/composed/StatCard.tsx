'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getIcon } from '@/lib/iconMap';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: string;
  change?: number;
  changeLabel?: string;
}

export function StatCard({
  title,
  value,
  unit,
  icon,
  change,
  changeLabel,
}: StatCardProps) {
  const Icon = icon ? getIcon(icon) : null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="size-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">
          {value}
          {unit && <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>}
        </p>
        {change !== undefined && (
          <p
            className={cn(
              'mt-1 text-xs',
              change >= 0 ? 'text-green-600' : 'text-red-600',
            )}
          >
            {change >= 0 ? '+' : ''}
            {change}%{changeLabel && ` ${changeLabel}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
