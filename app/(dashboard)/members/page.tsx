import type { Metadata } from 'next';
import { MemberListTable } from '@/components/members/MemberListTable';

export const metadata: Metadata = {
  title: '회원 관리',
};

export default function MembersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">회원 관리</h1>
      <MemberListTable />
    </div>
  );
}
