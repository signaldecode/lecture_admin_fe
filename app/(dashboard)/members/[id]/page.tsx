import type { Metadata } from 'next';
import { MemberDetailCard } from '@/components/members/MemberDetailCard';
import { MemberDetailActions } from '@/components/members/MemberDetailActions';
import { MemberCourseHistory } from '@/components/members/MemberCourseHistory';
import { MemberOrderHistory } from '@/components/members/MemberOrderHistory';
import { getServerRole } from '@/lib/auth';
import uiData from '@/data/uiData.json';
import type { Member } from '@/types';

const texts = uiData.members.detail;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

interface MemberDetailPageProps {
  params: Promise<{ id: string }>;
}

// TODO: Replace with actual API call
const mockMember: Member = {
  id: 1,
  name: '김철수',
  email: 'kim@example.com',
  phone: '010-1234-5678',
  grade: 'GOLD',
  status: 'ACTIVE',
  point: 15000,
  createdAt: '2025-06-15T00:00:00',
  lastLoginAt: '2026-03-19T14:30:00',
};

export default async function MemberDetailPage({ params }: MemberDetailPageProps) {
  const { id } = await params;
  const role = await getServerRole();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <MemberDetailCard member={mockMember} />
      {role === 'SUPER_ADMIN' && (
        <MemberDetailActions member={mockMember} />
      )}
      <MemberCourseHistory memberId={Number(id)} />
      <MemberOrderHistory memberId={Number(id)} />
    </div>
  );
}
