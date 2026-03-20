'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import uiData from '@/data/uiData.json';

const bulkTexts = uiData.coupons.bulkIssue;
const gradeOptions = bulkTexts.gradeOptions;

interface BulkIssueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BulkIssueModal({ open, onOpenChange }: BulkIssueModalProps) {
  const [targetGrade, setTargetGrade] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const handleSubmit = () => {
    if (!targetGrade || !couponCode.trim()) {
      return;
    }
    // TODO: Call bulk issue API - POST /api/admin/coupons/bulk-issue
    console.log('Bulk issue submitted:', { targetGrade, couponCode });
    onOpenChange(false);
    setTargetGrade('');
    setCouponCode('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{bulkTexts.title}</DialogTitle>
          <DialogDescription>{bulkTexts.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bulk-target-grade">{bulkTexts.targetGradeLabel}</Label>
            <Select
              value={targetGrade}
              onValueChange={(value: string | null) => setTargetGrade(value ?? '')}
            >
              <SelectTrigger id="bulk-target-grade">
                <SelectValue placeholder={bulkTexts.targetGradePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">{gradeOptions.ALL}</SelectItem>
                <SelectItem value="BASIC">{gradeOptions.BASIC}</SelectItem>
                <SelectItem value="SILVER">{gradeOptions.SILVER}</SelectItem>
                <SelectItem value="GOLD">{gradeOptions.GOLD}</SelectItem>
                <SelectItem value="PLATINUM">{gradeOptions.PLATINUM}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bulk-coupon-code">{bulkTexts.couponCodeLabel}</Label>
            <Input
              id="bulk-coupon-code"
              placeholder={bulkTexts.couponCodePlaceholder}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!targetGrade || !couponCode.trim()}
          >
            {bulkTexts.submitButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
