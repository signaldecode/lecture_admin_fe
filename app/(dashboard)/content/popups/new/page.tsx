import type { Metadata } from 'next';
import { PopupForm } from '@/components/content/PopupForm';
import uiData from '@/data/uiData.json';

const texts = uiData.content.popup;

export const metadata: Metadata = {
  title: texts.createTitle,
};

export default function NewPopupPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">{texts.createTitle}</h1>
      <PopupForm mode="create" />
    </div>
  );
}
