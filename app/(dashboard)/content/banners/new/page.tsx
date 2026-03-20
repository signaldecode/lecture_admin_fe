import type { Metadata } from 'next';
import { BannerForm } from '@/components/content/BannerForm';
import uiData from '@/data/uiData.json';

const texts = uiData.content.banner;

export const metadata: Metadata = {
  title: texts.createTitle,
};

export default function NewBannerPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">{texts.createTitle}</h1>
      <BannerForm mode="create" />
    </div>
  );
}
