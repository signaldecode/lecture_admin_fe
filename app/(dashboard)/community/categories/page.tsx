import type { Metadata } from 'next';
import { CategoryListTable } from '@/components/community/CategoryListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.community.categories;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function CommunityCategoriesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <CategoryListTable />
    </div>
  );
}
