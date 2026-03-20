import type { Metadata } from 'next';
import { FaqListTable } from '@/components/support/FaqListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.support.faq;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function SupportFaqPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <FaqListTable />
    </div>
  );
}
