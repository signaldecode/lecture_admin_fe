import type { Metadata } from 'next';
import { AdminListTable } from '@/components/settings/AdminListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.settings.admins;

export const metadata: Metadata = { title: texts.pageTitle };

export default function AdminsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <AdminListTable />
    </div>
  );
}
