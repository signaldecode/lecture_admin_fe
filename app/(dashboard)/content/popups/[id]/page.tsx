import type { Metadata } from 'next';
import { PopupForm } from '@/components/content/PopupForm';
import uiData from '@/data/uiData.json';

const texts = uiData.content.popup;

export const metadata: Metadata = {
  title: texts.editTitle,
};

interface PopupEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function PopupEditPage({ params }: PopupEditPageProps) {
  const { id } = await params;

  // TODO: Fetch popup from API - GET /api/admin/content/popups/{id}

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">{texts.editTitle} (ID: {id})</h1>
      <PopupForm mode="edit" />
    </div>
  );
}
