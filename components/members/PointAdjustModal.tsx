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
          <DialogTitle>포인트 조정</DialogTitle>
          <DialogDescription>
            {memberName}님의 포인트를 조정합니다. (현재: {formatNumber(currentPoint)}P)
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="point-amount">조정 포인트</Label>
            <Input
              id="point-amount"
              type="number"
              placeholder="양수: 지급 / 음수: 차감"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="point-reason">사유</Label>
            <Textarea
              id="point-reason"
              placeholder="포인트 조정 사유를 입력하세요"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={!amount || Number(amount) === 0}>
            조정
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
