import type { Metadata } from 'next';
import { MemberListTable } from '@/components/members/MemberListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.members;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function MembersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <MemberListTable />
    </div>
  );
}
