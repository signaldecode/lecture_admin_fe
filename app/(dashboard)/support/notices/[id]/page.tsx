import type { Metadata } from 'next';
import { NoticeForm } from '@/components/support/NoticeForm';
import uiData from '@/data/uiData.json';

const texts = uiData.support.notices;

export const metadata: Metadata = {
  title: texts.editTitle,
};

interface NoticeEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoticeEditPage({ params }: NoticeEditPageProps) {
  const { id } = await params;

  // TODO: Fetch notice data from API - GET /api/admin/support/notices/{id}

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">{texts.editTitle}</h1>
      <NoticeForm />
    </div>
  );
}
