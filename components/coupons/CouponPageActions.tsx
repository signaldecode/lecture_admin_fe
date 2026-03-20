'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BulkIssueModal } from '@/components/coupons/BulkIssueModal';
import uiData from '@/data/uiData.json';

const couponsTexts = uiData.coupons;
const bulkTexts = couponsTexts.bulkIssue;

export function CouponPageActions() {
  const [bulkOpen, setBulkOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setBulkOpen(true)}
          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-input bg-background px-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          {bulkTexts.title}
        </button>
        <Link
          href="/coupons/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          {couponsTexts.createButton}
        </Link>
      </div>
      <BulkIssueModal open={bulkOpen} onOpenChange={setBulkOpen} />
    </>
  );
}
