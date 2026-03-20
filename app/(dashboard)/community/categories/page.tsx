import type { Metadata } from 'next';
import { CategoryListTable } from '@/components/community/CategoryListTable';

export const metadata: Metadata = {
  title: '카테고리 관리',
};

export default function CommunityCategoriesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">카테고리 관리</h1>
      <CategoryListTable />
    </div>
  );
}
