'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatNumber } from '@/lib/format';
import uiData from '@/data/uiData.json';

const texts = uiData.members.pointAdjust;
const commonTexts = uiData.common;

interface PointAdjustModalProps {
  memberId: number;
  memberName: string;
  currentPoint: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdjust?: (amount: number, reason: string) => void;
}

export function PointAdjustModal({
  memberId,
  memberName,
  currentPoint,
  open,
  onOpenChange,
  onAdjust,
}: PointAdjustModalProps) {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  function handleSubmit() {
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount === 0) return;
    // TODO: apiClient.post(`members/${memberId}/points`, { amount: numAmount, reason })
    onAdjust?.(numAmount, reason);
    setAmount('');
    setReason('');
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{texts.title}</DialogTitle>
          <DialogDescription>
            {memberName}{texts.description} ({texts.currentPrefix}{formatNumber(currentPoint)}P)
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="point-amount">{texts.amountLabel}</Label>
            <Input
              id="point-amount"
              type="number"
              placeholder={texts.amountPlaceholder}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="point-reason">{texts.reasonLabel}</Label>
            <Textarea
              id="point-reason"
              className="resize-none"
              placeholder={texts.reasonPlaceholder}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {commonTexts.cancel}
          </Button>
          <Button onClick={handleSubmit} disabled={!amount || Number(amount) === 0}>
            {texts.adjustButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
