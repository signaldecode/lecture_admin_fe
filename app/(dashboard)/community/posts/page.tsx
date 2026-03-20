import type { Metadata } from 'next';
import { PostListTable } from '@/components/community/PostListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.community.posts;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function CommunityPostsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <PostListTable />
    </div>
  );
}
