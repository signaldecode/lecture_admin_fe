import type { Metadata } from 'next';
import Link from 'next/link';
import { PostDetailPanel } from '@/components/community/PostDetailPanel';
import uiData from '@/data/uiData.json';
import type { CommunityPost } from '@/types';

const texts = uiData.community.posts;

export const metadata: Metadata = {
  title: texts.detailTitle,
};

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

// TODO: Replace with actual API call
const mockPostMap: Record<string, CommunityPost> = {
  '1': { id: 1, title: 'React 19 새로운 기능 정리', authorName: '김철수', categoryName: '자유게시판', commentCount: 12, reportCount: 0, status: 'PUBLISHED', createdAt: '2026-03-18T10:00:00' },
  '2': { id: 2, title: 'Spring Boot 스터디 모집합니다', authorName: '이영희', categoryName: '스터디모집', commentCount: 8, reportCount: 0, status: 'PUBLISHED', createdAt: '2026-03-17T14:30:00' },
  '3': { id: 3, title: '부적절한 광고 게시글', authorName: '스팸계정', categoryName: '자유게시판', commentCount: 0, reportCount: 5, status: 'UNPUBLISHED', createdAt: '2026-03-16T09:15:00' },
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  const post = mockPostMap[id];
  if (!post) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center gap-2">
        <Link href="/community/posts" className="text-sm text-muted-foreground hover:underline">
          {texts.pageTitle}
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <h1 className="text-2xl font-bold">{texts.detailTitle}</h1>
      </div>
      <PostDetailPanel post={post} />
    </div>
  );
}
