'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/format';
import uiData from '@/data/uiData.json';

const refundTexts = uiData.refund;

interface RefundProcessModalProps {
  orderId: number;
  courseTitle: string;
  amount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RefundProcessModal({
  orderId,
  courseTitle,
  amount,
  open,
  onOpenChange,
}: RefundProcessModalProps) {
  const handleApprove = () => {
    // TODO: Call refund approval API - POST /api/admin/orders/{orderId}/refund/approve
    console.log('Refund approved:', { orderId, courseTitle, amount });
    onOpenChange(false);
  };

  const handleReject = () => {
    // TODO: Call refund rejection API - POST /api/admin/orders/{orderId}/refund/reject
    console.log('Refund rejected:', { orderId, courseTitle, amount });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{refundTexts.title}</DialogTitle>
          <DialogDescription>{refundTexts.description}</DialogDescription>
        </DialogHeader>
        <dl className="grid gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{refundTexts.orderIdLabel}</dt>
            <dd className="font-medium">#{orderId}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{refundTexts.courseTitleLabel}</dt>
            <dd className="font-medium">{courseTitle}</dd>
          </div>
          <Separator />
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{refundTexts.amountLabel}</dt>
            <dd className="font-semibold text-destructive">
              {formatCurrency(amount)}
            </dd>
          </div>
        </dl>
        <DialogFooter>
          <Button variant="outline" onClick={handleReject}>
            {refundTexts.rejectButton}
          </Button>
          <Button variant="destructive" onClick={handleApprove}>
            {refundTexts.approveButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
