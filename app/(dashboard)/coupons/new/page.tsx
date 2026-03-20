import type { Metadata } from 'next';
import { CouponForm } from '@/components/coupons/CouponForm';
import uiData from '@/data/uiData.json';

const couponsTexts = uiData.coupons;

export const metadata: Metadata = {
  title: couponsTexts.createTitle,
};

export default function CouponNewPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">{couponsTexts.createTitle}</h1>
      <CouponForm />
    </div>
  );
}
