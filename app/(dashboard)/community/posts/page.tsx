import type { Metadata } from 'next';
import { PostListTable } from '@/components/community/PostListTable';

export const metadata: Metadata = {
  title: '게시글 관리',
};

export default function CommunityPostsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">게시글 관리</h1>
      <PostListTable />
    </div>
  );
}
