import type { Metadata } from 'next';
import Link from 'next/link';
import { CouponListTable } from '@/components/coupons/CouponListTable';
import uiData from '@/data/uiData.json';

const couponsTexts = uiData.coupons;

export const metadata: Metadata = {
  title: couponsTexts.pageTitle,
};

export default function CouponsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{couponsTexts.pageTitle}</h1>
        <Link
          href="/coupons/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          {couponsTexts.createButton}
        </Link>
      </div>
      <CouponListTable />
    </div>
  );
}
