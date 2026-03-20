import type { Metadata } from 'next';
import { BannerListTable } from '@/components/content/BannerListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.content.banner;

export const metadata: Metadata = { title: texts.pageTitle };

export default function BannersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <BannerListTable />
    </div>
  );
}
