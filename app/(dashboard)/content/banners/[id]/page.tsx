import type { Metadata } from 'next';
import { BannerForm } from '@/components/content/BannerForm';
import uiData from '@/data/uiData.json';
import type { Banner } from '@/types';

const texts = uiData.content.banner;

export const metadata: Metadata = {
  title: texts.editTitle,
};

interface BannerEditPageProps {
  params: Promise<{ id: string }>;
}

// TODO: Replace with actual API call to GET /api/admin/content/banners/{id}
const mockBannerMap: Record<string, Banner> = {
  '1': { id: 1, title: '봄학기 할인 이벤트', imageUrl: '/banners/spring.jpg', linkUrl: '/events/spring', position: 'TOP', startDate: '2026-03-01', endDate: '2026-03-31', isActive: true, order: 1 },
  '2': { id: 2, title: '신규 강의 오픈', imageUrl: '/banners/new.jpg', position: 'MIDDLE', startDate: '2026-03-15', endDate: '2026-04-15', isActive: true, order: 2 },
  '3': { id: 3, title: '설 연휴 특가', imageUrl: '/banners/holiday.jpg', position: 'TOP', startDate: '2026-01-25', endDate: '2026-02-05', isActive: false, order: 3 },
};

export default async function BannerEditPage({ params }: BannerEditPageProps) {
  const { id } = await params;

  // TODO: Fetch from API - GET /api/admin/content/banners/{id}
  const banner = mockBannerMap[id];

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">{texts.editTitle}</h1>
      <BannerForm mode="edit" banner={banner} />
    </div>
  );
}
