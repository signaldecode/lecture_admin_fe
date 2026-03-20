'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { StatusBadge } from '@/components/composed/StatusBadge';
import { formatCurrency, formatDateTime } from '@/lib/format';
import type { Order, OrderStatus } from '@/types';
import uiData from '@/data/uiData.json';

const ordersTexts = uiData.orders;
const detailTexts = uiData.orders.detail;
const statusLabels = uiData.orders.statusLabels;

interface OrderDetailCardProps {
  order: Order;
}

const statusVariantMap: Record<OrderStatus, 'success' | 'secondary' | 'warning' | 'destructive'> = {
  COMPLETED: 'success',
  CANCELLED: 'secondary',
  REFUND_REQUESTED: 'warning',
  REFUNDED: 'destructive',
};

export function OrderDetailCard({ order }: OrderDetailCardProps) {
  const handleApproveRefund = () => {
    // TODO: Call refund approval API
    console.log('Refund approved for order:', order.id);
  };

  const handleRejectRefund = () => {
    // TODO: Call refund rejection API
    console.log('Refund rejected for order:', order.id);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{detailTexts.cardTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">{ordersTexts.columns.id}</dt>
              <dd className="font-medium">#{order.id}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{ordersTexts.columns.memberName}</dt>
              <dd className="font-medium">{order.memberName}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{detailTexts.memberEmail}</dt>
              <dd>{order.memberEmail}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{ordersTexts.columns.courseTitle}</dt>
              <dd>{order.courseTitle}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{ordersTexts.columns.amount}</dt>
              <dd className="font-medium">{formatCurrency(order.amount)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{ordersTexts.columns.status}</dt>
              <dd>
                <StatusBadge
                  label={statusLabels[order.status]}
                  variant={statusVariantMap[order.status]}
                />
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{ordersTexts.columns.paymentMethod}</dt>
              <dd>{order.paymentMethod}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{ordersTexts.columns.createdAt}</dt>
              <dd>{formatDateTime(order.createdAt)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      {order.status === 'REFUND_REQUESTED' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{detailTexts.refundSection}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {detailTexts.refundDescription}
            </p>
            <Separator />
            <div className="flex gap-2">
              <Button onClick={handleApproveRefund}>
                {detailTexts.approveRefund}
              </Button>
              <Button variant="outline" onClick={handleRejectRefund}>
                {detailTexts.rejectRefund}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
