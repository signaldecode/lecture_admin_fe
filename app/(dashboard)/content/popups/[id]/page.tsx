import type { Metadata } from 'next';
import { PopupForm } from '@/components/content/PopupForm';
import uiData from '@/data/uiData.json';
import type { Popup } from '@/types';

const texts = uiData.content.popup;

export const metadata: Metadata = {
  title: texts.editTitle,
};

interface PopupEditPageProps {
  params: Promise<{ id: string }>;
}

// TODO: Replace with actual API call to GET /api/admin/content/popups/{id}
const mockPopupMap: Record<string, Popup> = {
  '1': { id: 1, title: '신규 가입 쿠폰 안내', content: '회원가입 시 10% 할인 쿠폰 지급', startDate: '2026-03-01', endDate: '2026-04-30', isActive: true },
  '2': { id: 2, title: '서비스 점검 공지', content: '3/25 02:00~06:00 서비스 점검', imageUrl: '/popups/maintenance.jpg', startDate: '2026-03-24', endDate: '2026-03-25', isActive: true },
  '3': { id: 3, title: '설 연휴 안내', content: '설 연휴 기간 CS 운영 안내', startDate: '2026-01-25', endDate: '2026-02-02', isActive: false },
};

export default async function PopupEditPage({ params }: PopupEditPageProps) {
  const { id } = await params;

  // TODO: Fetch from API - GET /api/admin/content/popups/{id}
  const popup = mockPopupMap[id];

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">{texts.editTitle}</h1>
      <PopupForm mode="edit" popup={popup} />
    </div>
  );
}
