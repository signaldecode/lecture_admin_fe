import type { Metadata } from 'next';
import Link from 'next/link';
import { CouponListTable } from '@/components/coupons/CouponListTable';
import { CouponPageActions } from '@/components/coupons/CouponPageActions';
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
        <CouponPageActions />
      </div>
      <CouponListTable />
    </div>
  );
}
