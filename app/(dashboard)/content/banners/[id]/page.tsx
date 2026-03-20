import type { Metadata } from 'next';
import { BannerForm } from '@/components/content/BannerForm';
import uiData from '@/data/uiData.json';

const texts = uiData.content.banner;

export const metadata: Metadata = {
  title: texts.editTitle,
};

interface BannerEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function BannerEditPage({ params }: BannerEditPageProps) {
  const { id } = await params;

  // TODO: Fetch banner from API - GET /api/admin/content/banners/{id}

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">{texts.editTitle} (ID: {id})</h1>
      <BannerForm mode="edit" />
    </div>
  );
}
